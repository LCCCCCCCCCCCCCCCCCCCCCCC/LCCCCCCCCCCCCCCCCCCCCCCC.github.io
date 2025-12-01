document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('introForm');
    const resultDiv = document.getElementById('result');
    
    const buttonGroup = document.querySelector('.button-group');
    const generateJsonBtn = document.createElement('button');
    generateJsonBtn.type = 'button';
    generateJsonBtn.id = 'generateJsonBtn';
    generateJsonBtn.textContent = 'Generate JSON';
    buttonGroup.appendChild(generateJsonBtn);

    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, (m) => map[m]);
    }

    function resetToForm() {
        resultDiv.style.display = 'none';
        form.style.display = 'block';
        
        const formTitle = document.getElementById('formTitle');
        const formInstruction = document.getElementById('formInstruction');
        if (formTitle) formTitle.style.display = 'block';
        if (formInstruction) formInstruction.style.display = 'block';
        
        window.scrollTo(0, 0);
    }

    function generateJSON() {
        const firstName = document.getElementById('firstName').value;
        const preferredName = document.getElementById('nickname').value || firstName;
        const middleInitial = document.getElementById('middleName').value ? 
                              document.getElementById('middleName').value.charAt(0) : '';
        const lastName = document.getElementById('lastName').value;
        const divider = document.getElementById('divider').value;
        const mascotAdjective = document.getElementById('mascotAdjective').value;
        const mascotAnimal = document.getElementById('mascotAnimal').value;
        const image = document.getElementById('pictureURL').value;
        const imageCaption = document.getElementById('pictureCaption').value;
        const personalStatement = document.getElementById('personalStatement').value;
        const personalBackground = document.getElementById('personalBackground').value;
        const professionalBackground = document.getElementById('professionalBackground').value;
        const academicBackground = document.getElementById('academicBackground').value;
        const subjectBackground = document.getElementById('subjectBackground').value;
        const primaryComputer = document.getElementById('computerPlatform').value;

        const courseEntries = document.querySelectorAll('.course-entry');
        const courses = [];
        courseEntries.forEach((entry) => {
            const dept = entry.querySelector('.courseDept').value;
            const number = entry.querySelector('.courseNumber').value;
            const name = entry.querySelector('.courseName').value;
            const reason = entry.querySelector('.courseReason').value;
            
            if (dept && number && name && reason) {
                courses.push({
                    department: dept,
                    number: number,
                    name: name,
                    reason: reason
                });
            }
        });

        const links = [];
        for (let i = 1; i <= 7; i++) {
            const linkName = document.getElementById(`link${i}Name`).value;
            const linkURL = document.getElementById(`link${i}URL`).value;
            if (linkName && linkURL) {
                links.push({
                    name: linkName,
                    href: linkURL
                });
            }
        }

        const jsonData = {
            firstName: firstName,
            preferredName: preferredName,
            middleInitial: middleInitial,
            lastName: lastName,
            divider: divider,
            mascotAdjective: mascotAdjective,
            mascotAnimal: mascotAnimal,
            image: image,
            imageCaption: imageCaption,
            personalStatement: personalStatement,
            personalBackground: personalBackground,
            professionalBackground: professionalBackground,
            academicBackground: academicBackground,
            subjectBackground: subjectBackground,
            primaryComputer: primaryComputer,
            courses: courses,
            links: links
        };

        const jsonString = JSON.stringify(jsonData, null, 2);

        const generatedHTML = `
            <h2>Introduction JSON</h2>
            
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"><\/script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/json.min.js"><\/script>
            
            <section>
                <pre><code class="language-json">${escapeHtml(jsonString)}</code></pre>
            </section>

            <p><a href="#" id="resetLink">Reset Form</a></p>

            <script>
                document.addEventListener('DOMContentLoaded', function() {
                    hljs.highlightAll();
                });
                hljs.highlightAll();
            <\/script>
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

    generateJsonBtn.addEventListener('click', function() {
        if (!form.checkValidity()) {
            alert('Please fill out all required fields.');
            return;
        }
        generateJSON();
    });
});