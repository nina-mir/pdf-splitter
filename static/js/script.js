const submitButton = document.querySelector(".submit-btn");

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  var form = document.querySelector(".form-controllers");
  var formData = new FormData(form);

  // TO-DO make it a function that returns fileInfo obj

  const fileInput = document.getElementById("pdf-upload");
  const files = fileInput.files;

  console.log('nina', files, files[0] instanceof File)
  // Access file information
  const fileInfo = {
    name: files[0].name,
    size: files[0].size,
    type: files[0].type,
  };
  for (const key in fileInfo) {
    formData.append(`file-${key.toUpperCase()}`, fileInfo[key]);
  }

  for (var [key, value] of formData) {
    console.log(key, value);
  }

  // POST to backend
  fetch('/upload', {
    method: 'POST',
    body: formData,
  })


});
/**
 * 
 * @param {File} fileObj - input File
 * @returns {}
 */
function fileInfo (fileObj) {
  if (fileObj instanceof File) {
    // Access file information
    const fileInfo = {
      name: files[0].name,
      size: files[0].size,
      type: files[0].type,
    };
    return fileInfo
  } else{
    throw new Error('input must be a File object')
  }
} 