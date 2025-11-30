document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('introForm');
    const resultDiv = document.getElementById('result');
    const clearBtn = document.getElementById('clearBtn');
    const addCourseBtn = document.getElementById('addCourseBtn');
    const coursesContainer = document.getElementById('coursesContainer');

    function addCourseEntry() {
        const courseEntry = document.createElement('div');
        courseEntry.className = 'course-entry';
        courseEntry.innerHTML = `
            <hr>
            <label>Course Department: <span class="required">*</span></label>
            <input type="text" class="courseDept" placeholder="e.g., ITIS" required>

            <label>Course Number: <span class="required">*</span></label>
            <input type="text" class="courseNumber" placeholder="e.g., 3135" required>

            <label>Course Name: <span class="required">*</span></label>
            <input type="text" class="courseName" placeholder="e.g., Web Development" required>

            <label>Reason for Taking: <span class="required">*</span></label>
            <input type="text" class="courseReason" placeholder="e.g., Required for major" required>
            
            <button type="button" class="deleteCourseBtn">Delete This Course</button>
        `;
        
        coursesContainer.appendChild(courseEntry);
        
        const deleteBtn = courseEntry.querySelector('.deleteCourseBtn');
        deleteBtn.addEventListener('click', function() {
            courseEntry.remove();
        });
    }

    function resetToForm() {
        resultDiv.style.display = 'none';
        form.style.display = 'block';
        form.reset();
        
        const formTitle = document.getElementById('formTitle');
        const formInstruction = document.getElementById('formInstruction');
        if (formTitle) formTitle.style.display = 'block';
        if (formInstruction) formInstruction.style.display = 'block';
        
        window.scrollTo(0, 0);
    }

    function generateIntroduction() {
        const firstName = document.getElementById('firstName').value;
        const middleName = document.getElementById('middleName').value;
        const nickname = document.getElementById('nickname').value;
        const lastName = document.getElementById('lastName').value;
        const acknowledgmentStatement = document.getElementById('acknowledgmentStatement').value;
        const acknowledgmentDate = document.getElementById('acknowledgmentDate').value;
        const mascotAdjective = document.getElementById('mascotAdjective').value;
        const mascotAnimal = document.getElementById('mascotAnimal').value;
        const divider = document.getElementById('divider').value;
        const pictureURL = document.getElementById('pictureURL').value;
        const pictureCaption = document.getElementById('pictureCaption').value;
        const personalStatement = document.getElementById('personalStatement').value;
        const personalBackground = document.getElementById('personalBackground').value;
        const professionalBackground = document.getElementById('professionalBackground').value;
        const academicBackground = document.getElementById('academicBackground').value;
        const subjectBackground = document.getElementById('subjectBackground').value;
        const computerPlatform = document.getElementById('computerPlatform').value;
        const quote = document.getElementById('quote').value;
        const quoteAuthor = document.getElementById('quoteAuthor').value;
        const funnyThing = document.getElementById('funnyThing').value;
        const shareItem = document.getElementById('shareItem').value;

        let fullName = firstName;
        if (middleName) fullName += ' ' + middleName;
        fullName += ' ' + lastName;

        let displayName = firstName;
        if (middleName) displayName += ' ' + middleName;
        displayName += ' ' + lastName;
        if (nickname) displayName += ' "' + nickname + '"';

        const courseEntries = coursesContainer.querySelectorAll('.course-entry');
        let coursesHTML = '';
        courseEntries.forEach((entry) => {
            const dept = entry.querySelector('.courseDept').value;
            const number = entry.querySelector('.courseNumber').value;
            const name = entry.querySelector('.courseName').value;
            const reason = entry.querySelector('.courseReason').value;
            
            if (dept && number && name && reason) {
                coursesHTML += `<li><strong>${dept} ${number} - ${name}:</strong> ${reason}</li>\n`;
            }
        });

        const links = [];
        for (let i = 1; i <= 7; i++) {
            const linkName = document.getElementById(`link${i}Name`).value;
            const linkURL = document.getElementById(`link${i}URL`).value;
            if (linkName && linkURL) {
                links.push({ name: linkName, url: linkURL });
            }
        }

        let linksHTML = '';
        links.forEach((link, index) => {
            linksHTML += `<a href="${link.url}" target="_blank">${link.name}</a>`;
            if (index < links.length - 1) {
                linksHTML += ` ${divider} `;
            }
        });

        const dateParts = acknowledgmentDate.split('-');
        const dateObj = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
        const formattedDate = dateObj.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        const generatedHTML = `
            <h2>Introduction Form</h2>
            
            <p><strong>${fullName}</strong> | <em>${mascotAdjective} ${mascotAnimal}</em></p>
            
            <figure>
                <img src="${pictureURL}" alt="${fullName}'s photo" width="300">
                <figcaption>${pictureCaption}</figcaption>
            </figure>

            <p><em>${acknowledgmentStatement}</em></p>
            <p><strong>Date:</strong> ${formattedDate}</p>

            <hr>

            <ul>
                <li><strong>Personal Background:</strong> ${personalBackground}</li>
                
                <li><strong>Professional Background:</strong> ${professionalBackground}</li>
                
                <li><strong>Academic Background:</strong> ${academicBackground}</li>
                
                <li><strong>Background in this Subject:</strong> ${subjectBackground}</li>
                
                <li><strong>Primary Computer Platform:</strong> ${computerPlatform}</li>
                
                <li><strong>Courses I'm Taking & Why:</strong>
                    <ul>
                        ${coursesHTML}
                    </ul>
                </li>
                ${funnyThing ? `<li><strong>Funny/Interesting Item to Remember me by:</strong> ${funnyThing}</li>` : ''}
                
                ${shareItem ? `<li><strong>I'd also like to Share:</strong> ${shareItem}</li>` : ''}
            </ul>

            <hr>

            <blockquote>
                <p>"${quote}"</p>
                <footer>— <cite>${quoteAuthor}</cite></footer>
            </blockquote>

            <hr>

            <p><a href="#" id="resetLink">Reset Form</a></p>
        `;

        form.style.display = 'none';
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = generatedHTML;
        
        const formTitle = document.getElementById('formTitle');
        const formInstruction = document.getElementById('formInstruction');
        if (formTitle) formTitle.style.display = 'none';
        if (formInstruction) formInstruction.style.display = 'none';

        document.getElementById('resetLink').addEventListener('click', function(e) {
            e.preventDefault();
            resetToForm();
        });

        window.scrollTo(0, 0);
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!form.checkValidity()) {
            alert('Please fill out all required fields.');
            return;
        }
        
        generateIntroduction();
    });

    clearBtn.addEventListener('click', function() {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach((input) => {
            input.value = '';
        });
    });

    addCourseBtn.addEventListener('click', function() {
        addCourseEntry();
    });
});