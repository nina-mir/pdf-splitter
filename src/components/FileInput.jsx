import React from "react";

export default function FileInput({ onFileChange }) {
  return (
    <fieldset className="upload-form flex-field">
      <label htmlFor="pdf-upload" className="form-label">
        Select a PDF file
      </label>
      <input
        required
        type="file"
        id="pdf-upload"
        accept=".pdf"
        onChange={(e) => onFileChange(e.target.files[0])}
      />
    </fieldset>
  );
}
