/* Gaming Club JavaScript - Cai Li, ITIS 3135
   
   Three main dynamic features:
   1. Form validation for event registration and membership
   2. Real-time feedback for email and student ID inputs
   3. Mobile menu and scroll to top button
*/

// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    
    // FEATURE 1: Event Registration Form Validation
    
    const eventForm = document.getElementById('eventRegistration');
    if (eventForm) {
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const studentId = document.getElementById('studentId').value.trim();
            const gameChoice = document.getElementById('gameChoice').value;
            
            // Check if name is filled
            if (!name) {
                alert('Please enter your name');
                document.getElementById('name').focus();
                return false;
            }
            
            // Check email
            if (!email) {
                alert('Please enter your email');
                document.getElementById('email').focus();
                return false;
            }
            
            // Make sure email has @ and .
            if (!email.includes('@') || !email.includes('.')) {
                alert('Please enter a valid email address');
                document.getElementById('email').focus();
                return false;
            }
            
            // Student ID must be 9 numbers
            if (!studentId || studentId.length !== 9 || isNaN(studentId)) {
                alert('Student ID must be exactly 9 digits');
                document.getElementById('studentId').focus();
                return false;
            }
            
            // Make sure they picked a game
            if (!gameChoice) {
                alert('Please select a game');
                document.getElementById('gameChoice').focus();
                return false;
            }
            
            // Success message
            alert('Registration successful! Thank you for signing up, ' + name + '!\n\nYou will receive a confirmation email at: ' + email);
            eventForm.reset();
            return false;
        });
    }
    
    // FEATURE 2: Membership Application Form Validation
    const memberForm = document.getElementById('membershipApplication');
    if (memberForm) {
        memberForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get all the form values
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const studentId = document.getElementById('studentId').value.trim();
            const whyJoin = document.getElementById('whyJoin').value.trim();
            
            // Check which genres are selected
            const genreBoxes = document.querySelectorAll('input[name="genres"]:checked');
            
            // Check the agreement boxes
            const codeOfConduct = document.getElementById('codeOfConduct').checked;
            const duePaid = document.getElementById('duePaid').checked;
            
            // Check full name
            if (!fullName) {
                alert('Please enter your full name');
                document.getElementById('fullName').focus();
                return false;
            }
            
            // Check email
            if (!email) {
                alert('Please enter your email');
                document.getElementById('email').focus();
                return false;
            }
            
            // Email format check
            if (!email.includes('@') || !email.includes('.')) {
                alert('Please enter a valid email address');
                document.getElementById('email').focus();
                return false;
            }
            
            // Make sure it's a UNCC email
            if (!email.toLowerCase().includes('uncc.edu') && !email.toLowerCase().includes('charlotte.edu')) {
                alert('Please use your UNCC email address (@uncc.edu or @charlotte.edu)');
                document.getElementById('email').focus();
                return false;
            }
            
            // Student ID check
            if (!studentId || studentId.length !== 9 || isNaN(studentId)) {
                alert('Student ID must be exactly 9 digits');
                document.getElementById('studentId').focus();
                return false;
            }
            
            // Make sure at least one genre is picked
            if (genreBoxes.length === 0) {
                alert('Please select at least one game genre');
                return false;
            }
            
            // Check why join text
            if (!whyJoin) {
                alert('Please tell us why you want to join');
                document.getElementById('whyJoin').focus();
                return false;
            }
            
            // Make sure they agreed to code of conduct
            if (!codeOfConduct) {
                alert('You must agree to the code of conduct');
                return false;
            }
            
            // Make sure they know about the fee
            if (!duePaid) {
                alert('You must acknowledge the membership fee');
                return false;
            }
            
            // Success!
            alert('Application submitted successfully!\n\nThank you, ' + fullName + '!\n\nYou will receive a confirmation email at: ' + email + '\n\nWelcome to UNCC Gaming Club!');
            memberForm.reset();
            return false;
        });
    }
    
    // Real-time email validation - shows red if format is wrong
    const emailInputs = document.querySelectorAll('input[type="text"][id*="email"], input[id*="email"]');
    emailInputs.forEach(function(input) {
        input.addEventListener('blur', function() {
            const email = this.value.trim();
            
            // Check format when user leaves the field
            if (email && (!email.includes('@') || !email.includes('.'))) {
                this.style.borderColor = 'red';
                this.style.backgroundColor = '#ffe0e0';
            } else {
                this.style.borderColor = '';
                this.style.backgroundColor = '';
            }
        });
    });
    
    // Real-time student ID validation - only allows numbers, max 9 digits
    const studentIdInputs = document.querySelectorAll('input[id*="studentId"], input[id*="StudentId"]');
    studentIdInputs.forEach(function(input) {
        // Remove non-numbers as user types
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // Max 9 digits
            if (this.value.length > 9) {
                this.value = this.value.slice(0, 9);
            }
        });
        
        // Check length when leaving field
        input.addEventListener('blur', function() {
            if (this.value && this.value.length !== 9) {
                this.style.borderColor = 'red';
                this.style.backgroundColor = '#ffe0e0';
            } else {
                this.style.borderColor = '';
                this.style.backgroundColor = '';
            }
        });
    });

    // FEATURE 3: Mobile hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('header nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // Scroll to top button - shows after scrolling down
    const scrollBtn = document.getElementById('scrollToTop');
    
    // Show button after scrolling 300px
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    // Smooth scroll to top when clicked
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
});