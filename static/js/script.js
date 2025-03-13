const responseMessage = document.querySelector('.server-response')

const form = document.querySelector(".form-controllers");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // var form = document.querySelector(".form-controllers");
  var formData = new FormData(form);

  console.log(formData);

  // TO-DO make it a function that returns fileInfo obj
  const fileInput = document.getElementById("pdf-upload");
  const file = fileInput.files[0];

  console.log("nina", file, file instanceof File);
  // Access file information
  // const fileInfo = {
  //   name: file.name,
  //   size: file.size,
  //   type: file.type,
  //   file: file
  // };
  // for (const key in fileInfo) {
  //   formData.append(`file-${key.toUpperCase()}`, fileInfo[key]);
  // }
  // for (let [key, value] of formData) {
  //   console.log(key, value);
  // }

  formData.append("file", file);

  // POST to backend
  fetch("/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("upload successful: ", data.message);
        responseMessage.textContent = data.message
      } else {
        console.error("Upload failed:", data.error);
        responseMessage.textContent = data.error
      }
      fileInput.value = ''
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
      responseMessage.textContent = error
    });
});







/**
 *
 * @param {File} fileObj - input File
 * @returns {}
 */
function fileInfo(fileObj) {
  if (fileObj instanceof File) {
    // Access file information
    const fileInfo = {
      name: files[0].name,
      size: files[0].size,
      type: files[0].type,
    };
    return fileInfo;
  } else {
    throw new Error("input must be a File object");
  }
}
