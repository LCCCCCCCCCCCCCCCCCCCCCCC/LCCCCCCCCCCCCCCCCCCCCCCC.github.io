document.addEventListener('DOMContentLoaded', function() {
    
    const eventForm = document.getElementById('eventRegistration');
    if (eventForm) {
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const studentId = document.getElementById('studentId').value.trim();
            const gameChoice = document.getElementById('gameChoice').value;
            
            if (!name) {
                alert('Please enter your name');
                document.getElementById('name').focus();
                return false;
            }
            
            if (!email) {
                alert('Please enter your email');
                document.getElementById('email').focus();
                return false;
            }
            
            if (!email.includes('@') || !email.includes('.')) {
                alert('Please enter a valid email address');
                document.getElementById('email').focus();
                return false;
            }
            
            if (!studentId || studentId.length !== 9 || isNaN(studentId)) {
                alert('Student ID must be exactly 9 digits');
                document.getElementById('studentId').focus();
                return false;
            }
            
            if (!gameChoice) {
                alert('Please select a game');
                document.getElementById('gameChoice').focus();
                return false;
            }
            
            alert('Registration successful! Thank you for signing up, ' + name + '!\n\nYou will receive a confirmation email at: ' + email);
            eventForm.reset();
            return false;
        });
    }
    
    const memberForm = document.getElementById('membershipApplication');
    if (memberForm) {
        memberForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const studentId = document.getElementById('studentId').value.trim();
            const whyJoin = document.getElementById('whyJoin').value.trim();
            
            const genreBoxes = document.querySelectorAll('input[name="genres"]:checked');
            const codeOfConduct = document.getElementById('codeOfConduct').checked;
            const duePaid = document.getElementById('duePaid').checked;
            
            if (!fullName) {
                alert('Please enter your full name');
                document.getElementById('fullName').focus();
                return false;
            }
            
            if (!email) {
                alert('Please enter your email');
                document.getElementById('email').focus();
                return false;
            }
            
            if (!email.includes('@') || !email.includes('.')) {
                alert('Please enter a valid email address');
                document.getElementById('email').focus();
                return false;
            }
            
            if (!email.toLowerCase().includes('uncc.edu') && !email.toLowerCase().includes('charlotte.edu')) {
                alert('Please use your UNCC email address (@uncc.edu or @charlotte.edu)');
                document.getElementById('email').focus();
                return false;
            }
            
            if (!studentId || studentId.length !== 9 || isNaN(studentId)) {
                alert('Student ID must be exactly 9 digits');
                document.getElementById('studentId').focus();
                return false;
            }
            
            if (genreBoxes.length === 0) {
                alert('Please select at least one game genre');
                return false;
            }
            
            if (!whyJoin) {
                alert('Please tell us why you want to join');
                document.getElementById('whyJoin').focus();
                return false;
            }
            
            if (!codeOfConduct) {
                alert('You must agree to the code of conduct');
                return false;
            }
            
            if (!duePaid) {
                alert('You must acknowledge the membership fee');
                return false;
            }
            
            alert('Application submitted successfully!\n\nThank you, ' + fullName + '!\n\nYou will receive a confirmation email at: ' + email + '\n\nWelcome to UNCC Gaming Club!');
            memberForm.reset();
            return false;
        });
    }
    
    const emailInputs = document.querySelectorAll('input[type="text"][id*="email"], input[id*="email"]');
    emailInputs.forEach(function(input) {
        input.addEventListener('blur', function() {
            const email = this.value.trim();
            if (email && (!email.includes('@') || !email.includes('.'))) {
                this.style.borderColor = 'red';
                this.style.backgroundColor = '#ffe0e0';
            } else {
                this.style.borderColor = '';
                this.style.backgroundColor = '';
            }
        });
    });
    
    const studentIdInputs = document.querySelectorAll('input[id*="studentId"], input[id*="StudentId"]');
    studentIdInputs.forEach(function(input) {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
            if (this.value.length > 9) {
                this.value = this.value.slice(0, 9);
            }
        });
        
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

    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('header nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    const scrollBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
});