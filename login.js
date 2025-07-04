document.addEventListener('DOMContentLoaded', function() {
  // Toggle between login and signup forms
  const toggleLinks = document.querySelectorAll('.toggle-form');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  
  toggleLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          if (loginForm.style.display === 'none') {
              loginForm.style.display = 'block';
              signupForm.style.display = 'none';
          } else {
              loginForm.style.display = 'none';
              signupForm.style.display = 'block';
          }
      });
  });
  
  // Toggle password visibility
  const togglePasswordIcons = document.querySelectorAll('.toggle-password');
  
  togglePasswordIcons.forEach(icon => {
      icon.addEventListener('click', function() {
          const targetId = this.getAttribute('data-target');
          const passwordInput = document.getElementById(targetId);
          
          if (passwordInput.type === 'password') {
              passwordInput.type = 'text';
              this.classList.remove('fa-eye');
              this.classList.add('fa-eye-slash');
          } else {
              passwordInput.type = 'password';
              this.classList.remove('fa-eye-slash');
              this.classList.add('fa-eye');
          }
      });
  });
  
  // Password strength indicator
  const passwordInput = document.getElementById('signup-password');
  const strengthBars = document.querySelectorAll('.strength-bar');
  const strengthText = document.querySelector('.strength-text');
  
  if (passwordInput) {
      passwordInput.addEventListener('input', function() {
          const password = this.value;
          let strength = 0;
          
          // Check for length
          if (password.length >= 8) strength++;
          
          // Check for uppercase letters
          if (/[A-Z]/.test(password)) strength++;
          
          // Check for numbers
          if (/[0-9]/.test(password)) strength++;
          
          // Check for special characters
          if (/[^A-Za-z0-9]/.test(password)) strength++;
          
          // Update strength bars
          strengthBars.forEach((bar, index) => {
              if (index < strength) {
                  bar.style.backgroundColor = getStrengthColor(strength);
              } else {
                  bar.style.backgroundColor = '#ddd';
              }
          });
          
          // Update strength text
          const strengthMessages = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
          strengthText.textContent = strengthMessages[strength];
          strengthText.style.color = getStrengthColor(strength);
      });
  }
  
  function getStrengthColor(strength) {
      const colors = ['#ff4757', '#ff6b6b', '#ffa502', '#2ed573', '#1dd1a1'];
      return colors[strength];
  }
  
  // Form submission
  loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      
      // Here you would typically validate and send to server
      console.log('Login attempt with:', email, password);
      alert('Login functionality would be implemented here');
  });
  
  signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('signup-name').value;
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;
      const confirmPassword = document.getElementById('signup-confirm-password').value;
      
      // Basic validation
      if (password !== confirmPassword) {
          alert('Passwords do not match!');
          return;
      }
      
      // Here you would typically validate and send to server
      console.log('Signup attempt with:', name, email, password);
      alert('Account created successfully (demo)');
  });
});