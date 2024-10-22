const forms = document.querySelector(".forms"),
    pwShowHide = document.querySelectorAll(".eye-icon"),
    links = document.querySelectorAll(".link"),
    loginForm = document.querySelector('.login form'),
    signupForm = document.querySelector('.signup form'),
    errorMessageLogin = document.createElement('p'),
    errorMessageSignup = document.createElement('p');

// Error message styling
errorMessageLogin.style.color = 'red';
errorMessageLogin.style.display = 'none';

errorMessageSignup.style.color = 'red';
errorMessageSignup.style.display = 'none';

// Toggle password visibility
pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let pwFields = eyeIcon.parentElement.querySelectorAll(".password");

        pwFields.forEach(password => {
            if (password.type === "password") {
                password.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
            } else {
                password.type = "password";
                eyeIcon.classList.replace("bx-show", "bx-hide");
            }
        });
    });
});

// Toggle between forms (login <-> signup)
links.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        forms.classList.toggle("show-signup");
    });
});

// Password validation rule: allowing special characters
const passwordPattern = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d\W]{8,}$/; // Lowercase, digit, at least 8 characters, allows special characters

// Login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Ensure form doesn't submit traditionally

    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    // Check if the user exists in localStorage
    const storedUser = JSON.parse(localStorage.getItem(email));

    if (storedUser && storedUser.password === password) {
        alert('Login successful');
        errorMessageLogin.style.display = 'none';
    } else {
        showErrorMessageLogin('Invalid email or password.');
    }
});

// Signup form submission
signupForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Ensure form doesn't submit traditionally

    const email = signupForm.querySelector('input[type="email"]').value;
    const password = signupForm.querySelector('input[type="password"]').value;

    console.log("Password entered: ", password);

    // Validate password
    if (passwordPattern.test(password)) {
        // Check if user already exists
        if (localStorage.getItem(email)) {
            showErrorMessageSignup('User already exists. Please login.');
        } else {
            // Store user credentials in localStorage
            const userData = {
                email: email,
                password: password
            };
            localStorage.setItem(email, JSON.stringify(userData));
            alert('Signup successful');
            errorMessageSignup.style.display = 'none';
            forms.classList.remove('show-signup'); // Switch to login form
        }
    } else {
        showErrorMessageSignup('Password must contain at least 8 characters, including one lowercase letter and one digit.');
        console.log("Password validation failed");
    }
});

// Display error message for login
function showErrorMessageLogin(message) {
    errorMessageLogin.textContent = message;
    errorMessageLogin.style.display = 'block';
    loginForm.appendChild(errorMessageLogin);
}

// Display error message for signup
function showErrorMessageSignup(message) {
    errorMessageSignup.textContent = message;
    errorMessageSignup.style.display = 'block';
    signupForm.appendChild(errorMessageSignup);
}

// Ensure the layout is responsive
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        document.body.classList.add('responsive');
    } else {
        document.body.classList.remove('responsive');
    }
});