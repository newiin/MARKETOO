Dropzone.options.dropzoneFrom = {
  autoProcessQueue: false,
  acceptedFiles: "image/*",
  paramName: "file",
  maxFilesize: 2,
  parallelUploads: 20,
  maxFiles: 20,
  init: function() {
    var submitButton = document.querySelector("#submit_image");
    dropzoneFrom = this;
    submitButton.addEventListener("click", function() {
      dropzoneFrom.processQueue();
    });
  }
};
