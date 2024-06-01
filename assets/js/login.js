
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

            // Validate credentials
            if (username === 'lalit@jmv.com' && password === 'lalit@jmv.com') {
                // Redirect to dashboard.html
                window.location.href = 'dashboard.html';
            } else {   
                           
                 toastBar();              
            }
        }

        form.classList.add('was-validated');
    }, false);
});

