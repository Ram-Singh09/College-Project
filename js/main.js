document.addEventListener("DOMContentLoaded", () => {
    // --- MODULE ROUTER ---
    // These only fire if their specific container exists on the current page
    if (document.getElementById("faculty-list-container")) {
        loadFaculty();
    }
    if (document.getElementById("creators-list-container")) {
        loadCreators();
    }
    if (document.getElementById("add-sem-btn")) {
        initCalculator();
    }
    if (document.getElementById("syllabus-results")) {
        initSyllabus();
    }
    if (document.getElementById("pyq-results")) {
        initPyq();
    }
});

/* =========================================
   1. DIRECTORY MODULE (Faculty & Creators)
========================================= */

function loadCreators() {
    const container = document.getElementById("creators-list-container");
    if (!container || typeof creatorInfo === 'undefined') return;

    container.innerHTML = ""; 
    creatorInfo.forEach((person) => {
        const imgName = person.name.toLowerCase().replace(/\s+/g, '_') + ".png";
        const imgPath = `../assets/images/creators/${imgName}`; 
        const defaultImg = `../assets/images/default_photo.png`;
        
        container.innerHTML += `
            <div class="faculty-row">
                <img src="${imgPath}" class="faculty-photo" onerror="this.src='${defaultImg}'">
                <div class="faculty-info">
                    <h3 style="margin: 0; font-size: 1.2rem;">${person.name}</h3>
                    <p style="margin: 5px 0 0; color: var(--accent); font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: 0.8rem; text-transform: uppercase;">
                        ${person.designation}
                    </p>
                </div>
            </div>`;
    });
}

function loadFaculty() {
    const container = document.getElementById("faculty-list-container");
    if (!container || typeof facultyNames === 'undefined') return;

    container.innerHTML = ""; 
    facultyNames.forEach((name, index) => {
        const imgName = name.toLowerCase().replace(/\s+/g, '_') + ".png";
        const imgPath = `../assets/images/teachers/${imgName}`; 
        const defaultImg = `../assets/images/default_photo.png`;
        const role = (index === 0) ? 'Head of Department' : 'Teacher';
        
        container.innerHTML += `
            <div class="faculty-row">
                <img src="${imgPath}" class="faculty-photo" onerror="this.src='${defaultImg}'">
                <div class="faculty-info">
                    <h3 style="margin: 0; font-size: 1.2rem;">${name}</h3>
                    <p style="margin: 5px 0 0; color: var(--accent); font-weight: 700;">${role}</p>
                </div>
            </div>`;
    });
}

/* =========================================
   2. UTILITY MODULE (CGPA Calculator)
========================================= */

function initCalculator() {
    const semList = document.getElementById("semester-list");
    const addBtn = document.getElementById("add-sem-btn");
    const calcBtn = document.getElementById("calc-cgpa-btn");
    const resultVal = document.getElementById("cgpa-val");
    const resultBox = document.getElementById("final-result");
    let semesterCount = 1;

    addBtn.addEventListener("click", () => {
        if (semesterCount < 8) {
            semesterCount++;
            const div = document.createElement("div");
            div.className = "sem-row";
            div.innerHTML = `<span>Semester ${semesterCount}</span><input type="number" step="0.01" class="sem-input" placeholder="0.00">`;
            semList.appendChild(div);
        }
    });

    calcBtn.addEventListener("click", () => {
        const inputs = document.querySelectorAll(".sem-input");
        let total = 0, count = 0;
        inputs.forEach(input => {
            const val = parseFloat(input.value);
            if (!isNaN(val) && val >= 0 && val <= 10) { total += val; count++; }
        });
        if (count > 0) {
            resultVal.innerText = (total / count).toFixed(2);
            resultBox.style.display = "block";
        }
    });
}

/* =========================================
   3. DATA MODULE (Syllabus & PYQ)
========================================= */

function initSyllabus() {
    const courseSelect = document.getElementById('course-select');
    const semesterSelect = document.getElementById('semester-select');
    const resultsContainer = document.getElementById('syllabus-results');

    if (!courseSelect || !semesterSelect || !resultsContainer) return;

    function updateSemesterOptions() {
        semesterSelect.innerHTML = ''; 
        const maxSems = courseSelect.value === 'BCA' ? 8 : 4;
        for (let i = 1; i <= maxSems; i++) {
            const option = document.createElement('option');
            option.value = i.toString();
            option.textContent = `Semester ${i}`;
            semesterSelect.appendChild(option);
        }
        renderSyllabus(); 
    }

    function renderSyllabus() {
        const course = courseSelect.value;
        const sem = semesterSelect.value;
        
        if (typeof syllabusData === 'undefined') {
            resultsContainer.innerHTML = `<p style="color:red;">Error: syllabus_data.js not loaded.</p>`;
            return;
        }

        const subjects = (syllabusData[course] && syllabusData[course][sem]) ? syllabusData[course][sem] : [];

        if (subjects.length === 0) {
            resultsContainer.innerHTML = `<p style="text-align:center; padding:20px; color:var(--text-dim);">No syllabus data available for ${course} Sem ${sem}.</p>`;
            return;
        }

        let html = '';
        subjects.forEach(sub => {
            let unitsHtml = '';
            
            if (sub.units && sub.units.length > 0) {
                sub.units.forEach(unit => {
                    let topicLinks = '';
                    if (unit.topics && unit.topics.length > 0) {
                        topicLinks = unit.topics.map(t =>
                            `<a href="${t.vid}" target="_blank" class="btn" style="padding: 5px 10px; font-size: 0.7rem; margin-right: 5px; margin-bottom: 5px;">📺 ${t.name}</a>`
                        ).join('');
                    }

                    unitsHtml += `
                        <div class="topic-card">
                            <h4 style="margin-bottom: 10px; color: var(--accent); border-bottom: 1px solid #334155; padding-bottom: 5px;">
                                ${unit.name}
                            </h4>
                            <div style="display: flex; flex-wrap: wrap; margin-bottom: 10px;">
                                ${topicLinks}
                            </div>
                            ${unit.pdf ? `<a href="${unit.pdf}" target="_blank" style="color: var(--text-main); font-size: 0.8rem; text-decoration: underline;">📄 Download Unit PDF</a>` : ''}
                        </div>`;
                });
            } else {
                unitsHtml = '<p style="color:var(--text-dim); padding:10px;">Detailed units coming soon...</p>';
            }

            html += `
                <details>
                    <summary>
                        <span style="font-weight:600;">${sub.title}</span>
                        <span class="subject-meta" style="color:var(--accent); font-weight:800;">${sub.credits} Credits</span>
                    </summary>
                    <div class="details-content">${unitsHtml}</div>
                </details>`;
        });
        resultsContainer.innerHTML = html;
    }

    courseSelect.addEventListener('change', updateSemesterOptions);
    semesterSelect.addEventListener('change', renderSyllabus);
    updateSemesterOptions();
}

function initPyq() {
    const courseSelect = document.getElementById('course-select');
    const semesterSelect = document.getElementById('semester-select');
    const resultsContainer = document.getElementById('pyq-results');

    if (!courseSelect || !semesterSelect || !resultsContainer) return;

    function updateSemesterOptions() {
        semesterSelect.innerHTML = ''; 
        const maxSems = courseSelect.value === 'BCA' ? 8 : 4;
        for (let i = 1; i <= maxSems; i++) {
            const option = document.createElement('option');
            option.value = i.toString();
            option.textContent = `Semester ${i}`;
            semesterSelect.appendChild(option);
        }
        renderPyq(); 
    }

    function renderPyq() {
        const course = courseSelect.value;
        const sem = semesterSelect.value;
        
        if (typeof pyqData === 'undefined') return;
        const papers = (pyqData[course] && pyqData[course][sem]) ? pyqData[course][sem] : [];

        if (papers.length === 0) {
            resultsContainer.innerHTML = `<p style="grid-column: 1/-1; text-align:center; padding:40px; color:var(--text-dim);">No question papers archived for this semester yet.</p>`;
            return;
        }

        resultsContainer.innerHTML = papers.map(paper => `
            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
                    <h3 style="margin: 0; font-size: 1.1rem;">${paper.subject}</h3>
                    <span style="background: var(--accent); color: var(--bg); padding: 2px 8px; font-weight: 800; font-size: 0.7rem;">${paper.year}</span>
                </div>
                <p style="font-size: 0.85rem; margin-bottom: 20px;">Full question paper PDF for the ${paper.year} examination cycle.</p>
                <a href="${paper.path}" target="_blank" class="btn">Download PDF</a>
            </div>
        `).join('');
    }

    courseSelect.addEventListener('change', updateSemesterOptions);
    semesterSelect.addEventListener('change', renderPyq);
    updateSemesterOptions();
}