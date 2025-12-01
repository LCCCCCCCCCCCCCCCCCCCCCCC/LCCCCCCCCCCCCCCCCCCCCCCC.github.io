document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('introForm');
    const resultDiv = document.getElementById('result');
    
    const buttonGroup = document.querySelector('.button-group');
    const generateHtmlBtn = document.createElement('button');
    generateHtmlBtn.type = 'button';
    generateHtmlBtn.id = 'generateHtmlBtn';
    generateHtmlBtn.textContent = 'Generate HTML';
    buttonGroup.appendChild(generateHtmlBtn);

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

    function generateHTML() {
        const firstName = document.getElementById('firstName').value;
        const middleName = document.getElementById('middleName').value;
        const nickname = document.getElementById('nickname').value;
        const lastName = document.getElementById('lastName').value;
        const mascotAdjective = document.getElementById('mascotAdjective').value;
        const mascotAnimal = document.getElementById('mascotAnimal').value;
        const divider = document.getElementById('divider').value;
        const pictureURL = document.getElementById('pictureURL').value;
        const pictureCaption = document.getElementById('pictureCaption').value;
        const personalBackground = document.getElementById('personalBackground').value;
        const professionalBackground = document.getElementById('professionalBackground').value;
        const academicBackground = document.getElementById('academicBackground').value;
        const subjectBackground = document.getElementById('subjectBackground').value;
        const computerPlatform = document.getElementById('computerPlatform').value;

        let fullName = firstName;
        if (middleName) fullName += ' ' + middleName;
        fullName += ' ' + lastName;
        if (nickname) fullName += ' "' + nickname + '"';

        const courseEntries = document.querySelectorAll('.course-entry');
        let coursesHTML = '';
        courseEntries.forEach((entry) => {
            const dept = entry.querySelector('.courseDept').value;
            const number = entry.querySelector('.courseNumber').value;
            const name = entry.querySelector('.courseName').value;
            const reason = entry.querySelector('.courseReason').value;
            
            if (dept && number && name && reason) {
                coursesHTML += `        <li>\n`;
                coursesHTML += `            <strong>${dept} ${number} - ${name}:</strong> ${reason}\n`;
                coursesHTML += `        </li>\n`;
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
            linksHTML += `<a href="${link.url}">${link.name}</a>`;
            if (index < links.length - 1) {
                linksHTML += ` ${divider} `;
            }
        });

        const htmlContent = `<h2>Introduction HTML</h2>
<h3>${fullName} ${divider} ${mascotAdjective} ${mascotAnimal}</h3>
<figure>
    <img
        src="${pictureURL}"
        alt="${fullName}'s photo"
    />
    <figcaption>${pictureCaption}</figcaption>
</figure>
<ul>
    <li>
        <strong>Personal Background:</strong> ${personalBackground}
    </li>
    <li>
        <strong>Professional Background:</strong> ${professionalBackground}
    </li>
    <li>
        <strong>Academic Background:</strong> ${academicBackground}
    </li>
    <li>
        <strong>Background in this Subject:</strong> ${subjectBackground}
    </li>
    <li>
        <strong>Primary Computer Platform:</strong> ${computerPlatform}
    </li>
    <li>
        <strong>Courses I'm Taking & Why:</strong>
        <ul>
${coursesHTML}    </ul>
    </li>
</ul>
<p>${linksHTML}</p>`;

        const generatedHTML = `
            <h2>Introduction HTML</h2>
            
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"><\/script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/xml.min.js"><\/script>
            
            <section>
                <pre><code class="language-html">${escapeHtml(htmlContent)}</code></pre>
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

    generateHtmlBtn.addEventListener('click', function() {
        if (!form.checkValidity()) {
            alert('Please fill out all required fields.');
            return;
        }
        generateHTML();
    });
});