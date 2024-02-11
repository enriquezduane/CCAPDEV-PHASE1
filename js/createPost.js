document.addEventListener('DOMContentLoaded', function() {
  var textarea = document.querySelector('.create-post-textarea');

  function resizeTextarea() {
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight) + 'px';
  }

  textarea.addEventListener('input', resizeTextarea);

  resizeTextarea();
});
