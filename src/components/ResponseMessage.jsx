import React from "react";

export default function ResponseMessage({ message }) {
  // return <span className="server-response">{message}</span>;
  return (
    <span className="server-response">
      {message || <span style={{ visibility: "hidden" }}>placeholder</span>}
    </span>
  );
}
