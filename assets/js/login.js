
var needsValidation = document.querySelectorAll('.needs-validation');

Array.prototype.slice.call(needsValidation).forEach(function(form) {
    form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault(); // Prevent form submission

            // Get the input values
            var username = document.getElementById('yourUsername').value;
            var password = document.getElementById('yourPassword').value;

            // Validate credentials for early
            if (username === 'lalit@1jmv.com' && password === 'lalit@1jmv.com') {
                // Redirect to dashboard.html
                window.location.href = 'dashboard.html';
            } 
              // Validate credentials for on time
              if (username === 'lalit@2jmv.com' && password === 'lalit@2jmv.com') {
                // Redirect to dashboard.html
                window.location.href = 'dashboard2.html';
            }
              // Validate credentials for late
              if (username === 'lalit@3jmv.com' && password === 'lalit@3jmv.com') {
                // Redirect to dashboard.html
                window.location.href = 'dashboard3.html';
            }
            
            
            else {   
                           
                 toastBar();              
            }
        }

        form.classList.add('was-validated');
    }, false);
});

