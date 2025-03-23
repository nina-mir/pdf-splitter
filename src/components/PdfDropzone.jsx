// PdfDropzone.jsx - A reusable drag & drop + click PDF uploader with metadata display

import React, { useCallback, useState, useEffect, useMemo } from "react";

import { useDropzone } from "react-dropzone";
import { PDFDocument } from "pdf-lib";

export default function PdfDropzone({ onFileAccepted }) {
  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState(null);
  const [emojiBg, setEmojiBg] = useState(true);

  const isMobile = window.innerWidth <= 600;

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file || file.type !== "application/pdf") {
        setError("Only PDF files are allowed.");
        return;
      }
      setError(null);
      onFileAccepted(file); // Notify parent SplitForm

      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const metadata = {
          fileName: file.name,
          title: pdfDoc.getTitle(),
          author: pdfDoc.getAuthor(),
          subject: pdfDoc.getSubject(),
          producer: pdfDoc.getProducer(),
          creator: pdfDoc.getCreator(),
          pageCount: pdfDoc.getPageCount(),
          fileSize: (file.size / 1024 / 1024).toFixed(2) + " MB",
        };
        setMetadata(metadata);
      } catch (err) {
        setError("Error reading PDF metadata.");
      }
    },
    [onFileAccepted]
  );

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   onDrop,
  //   accept: { "application/pdf": [] },
  // });

  const dropzoneConfig = useMemo(
    () => ({
      onDrop,
      accept: { "application/pdf": [] },
    }),
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone(dropzoneConfig);

  return (
    <div className="upload-wrapper">
      <div
        className="upload-form flex-field"
        style={{
          padding: "2rem",
          borderRadius: "15px",
          position: "relative",
          overflow: "hidden",
          minHeight: "4rem",
          background: emojiBg ? "var(--body-gradient_rotate)" : "transparent",
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />

        {emojiBg && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              flexWrap: "wrap",
              fontSize: "2rem",
              opacity: 0.2,
              pointerEvents: "none",
              backgroundImage: `url('assets/bg_emojis.svg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        )}

        <div
          style={{
            position: "relative",
            textAlign: "center",
            zIndex: 10,
            background: "var(--body-gradient)",
            padding: "1rem",
            borderRadius: "12px",
            maxWidth: "90%",
            margin: "0 auto",
          }}
        >
          <p>
            {isDragActive ? (
              <span>Drop your PDF here...</span>
            ) : (
              <span className="dropzone-message">
                <img
                  className="svgIcon"
                  src={"assets/pdf-repo.svg"}
                  alt="icon"
                />
                <span>
                  {isMobile
                    ? "Touch here to select a PDF file, please!👆🏿"
                    : "Drag and drop a PDF here, or click to browse, please!👆🏿"}
                </span>
              </span>
            )}
          </p>
        </div>
      </div>

      {error && (
        <p style={{ color: "red", textAlign: "center", marginTop: "0.5rem" }}>
          {error}
        </p>
      )}

      {metadata ? (
        isMobile ? (
          <p className="pdf-meta mobile-paragraph">
            <strong>Title:</strong> {metadata?.fileName || "Unknown"} | <strong>Author:</strong>
            {metadata?.author || "Unknown"} | <strong>Pages:</strong> {metadata?.pageCount} |
            Producer: {metadata?.producer || "Unknown"} | Creator:{" "}
            {metadata?.creator || "Unknown"} | File Size: {metadata?.fileSize}
          </p>
        ) : (
          <details className="pdf-meta" style={{ marginTop: "1rem" }} open>
            <summary
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
            >
              PDF Metadata
            </summary>
            <ul
              className="metaDataList"
              style={{ listStyle: "none", paddingLeft: 0, marginTop: "0.5rem" }}
            >
              <li>
                <strong>Title:</strong> {metadata.fileName || "Unknown"}
              </li>
              <li>
                <strong>Author:</strong> {metadata.author || "Unknown"}
              </li>
              <li>
                <strong>Pages:</strong> {metadata.pageCount}
              </li>
              <li>
                <strong>Producer:</strong> {metadata.producer || "Unknown"}
              </li>
              <li>
                <strong>Creator:</strong> {metadata.creator || "Unknown"}
              </li>
              <li>
                <strong>File Size:</strong> {metadata.fileSize}
              </li>
            </ul>
          </details>
        )
      ) : null}
    </div>
  );
}
