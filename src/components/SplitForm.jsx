import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import PdfDropzone from "./PdfDropzone";
import NumberInput from "./NumberInput";
import ResponseMessage from "./ResponseMessage";

export default function SplitForm() {
  const [file, setFile] = useState(null);
  const [numSplits, setNumSplits] = useState(1);
  const [pagesPer, setPagesPer] = useState(20);
  const [message, setMessage] = useState("");
  const [activeInput, setActiveInput] = useState("numSplits");
  const [pdfMetadata, setPdfMetadata] = useState(null);

  const handleFileAccepted = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleFileChange = async (selectedFile) => {
    setFile(selectedFile);

    // Extract metadata
    const arrayBuffer = await selectedFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    // console.log()

    const metadata = {
      fileName: selectedFile.name,
      title: pdfDoc.getTitle(),
      author: pdfDoc.getAuthor(),
      subject: pdfDoc.getSubject(),
      producer: pdfDoc.getProducer(),
      creator: pdfDoc.getCreator(),
      pageCount: pdfDoc.getPageCount(),
      fileSize: (selectedFile.size / 1024 / 1024).toFixed(2) + " MB",
    };

    setPdfMetadata(metadata);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setMessage("Processing...");

    const pdfBytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(pdfBytes);
    const totalPages = pdf.getPageCount();

    const chunkSize =
      activeInput === "pagesPer" ? pagesPer : Math.ceil(totalPages / numSplits);

    const zip = new JSZip();

    for (let start = 0; start < totalPages; start += chunkSize) {
      const end = Math.min(start + chunkSize, totalPages);
      const newPdf = await PDFDocument.create();
      const pages = await newPdf.copyPages(
        pdf,
        Array.from({ length: end - start }, (_, i) => i + start)
      );
      pages.forEach((p) => newPdf.addPage(p));
      zip.file(`split_${start + 1}-${end}.pdf`, await newPdf.save());
    }

    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "splits.zip");
    setMessage("Done!");
  };

  return (
    <form className="form-controllers" onSubmit={handleSubmit}>
      <div className="fields-wrapper">
        <PdfDropzone onFileAccepted={handleFileAccepted} />
        <div className="input-requirements flex-field">
          <NumberInput
            label="number of splits"
            value={numSplits}
            isActive={activeInput === "numSplits"}
            onChange={(val) => {
              if (activeInput === "numSplits") setNumSplits(val);
            }}
            onHover={() => setActiveInput("numSplits")}
          />
          <NumberInput
            label="pages per split"
            value={pagesPer}
            isActive={activeInput === "pagesPer"}
            onChange={(val) => {
              if (activeInput === "pagesPer") setPagesPer(val);
            }}
            onHover={() => setActiveInput("pagesPer")}
          />
        </div>
      </div>
      <div>
        <button type="submit" className="submit-btn">
          <span>Split now!</span>
          <img className="catSvg" src="/assets/cat-repo.svg" alt="icon" />
        </button>
        <ResponseMessage message={message} />
      </div>
    </form>
  );
}
