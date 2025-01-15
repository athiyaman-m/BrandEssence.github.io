document.querySelector('.php-email-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(this);

  fetch('forms/php-email-form.php', {
      method: 'POST',
      body: formData
  })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              document.querySelector('.sent-message').style.display = 'block';
              document.querySelector('.error-message').style.display = 'none';
          } else {
              document.querySelector('.error-message').textContent = data.error;
              document.querySelector('.error-message').style.display = 'block';
          }
      })
      .catch(error => {
          console.error('Error:', error);
          document.querySelector('.error-message').textContent = 'An unexpected error occurred.';
          document.querySelector('.error-message').style.display = 'block';
      });
});