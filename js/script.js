// Enhanced School System Data
const schoolData = {
    students: [
        { id: 1001, name: "John Doe", grade: "10th", email: "john@school.edu", phone: "555-0101", status: "active" },
        { id: 1002, name: "Jane Smith", grade: "11th", email: "jane@school.edu", phone: "555-0102", status: "active" },
        { id: 1003, name: "Michael Johnson", grade: "9th", email: "michael@school.edu", phone: "555-0103", status: "active" },
        { id: 1004, name: "Emily Davis", grade: "12th", email: "emily@school.edu", phone: "555-0104", status: "active" },
        { id: 1005, name: "Robert Wilson", grade: "10th", email: "robert@school.edu", phone: "555-0105", status: "inactive" }
    ],
    teachers: [
        { id: 2001, name: "Mr. Anderson", subject: "Mathematics", email: "anderson@school.edu", phone: "555-0201" },
        { id: 2002, name: "Ms. Thompson", subject: "English", email: "thompson@school.edu", phone: "555-0202" },
        { id: 2003, name: "Dr. Roberts", subject: "Science", email: "roberts@school.edu", phone: "555-0203" }
    ],
    courses: [
        { code: "MATH101", name: "Algebra II", teacher: "Mr. Anderson", schedule: "Mon/Wed 9:00-10:30", room: "A101" },
        { code: "ENG201", name: "English Literature", teacher: "Ms. Thompson", schedule: "Tue/Thu 11:00-12:30", room: "B205" },
        { code: "SCI301", name: "Biology", teacher: "Dr. Roberts", schedule: "Mon/Fri 1:00-2:30", room: "Lab 3" }
    ],
    grades: [
        { studentId: 1001, studentName: "John Doe", course: "Algebra II", grade: "A" },
        { studentId: 1001, studentName: "John Doe", course: "English Literature", grade: "B+" },
        { studentId: 1002, studentName: "Jane Smith", course: "Algebra II", grade: "A-" }
    ],
    classes: ["9th", "10th", "11th", "12th"],
    schedule: [
        { day: "Monday", time: "9:00-10:30", class: "10th", course: "Algebra II", teacher: "Mr. Anderson", room: "A101" },
        { day: "Monday", time: "11:00-12:30", class: "11th", course: "Chemistry", teacher: "Dr. Roberts", room: "Lab 1" },
        { day: "Tuesday", time: "9:00-10:30", class: "12th", course: "English Literature", teacher: "Ms. Thompson", room: "B205" }
    ]
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

function initApp() {
    // Initialize sidebar navigation
    initSidebar();
    
    // Initialize all sections
    initDashboard();
    initStudentsSection();
    initTeachersSection();
    initCoursesSection();
    initGradesSection();
    initScheduleSection();
    initSettingsSection();
    
    // Initialize modals
    initModals();
    
    // Initialize responsive menu toggle
    initResponsiveMenu();
}

function initSidebar() {
    const navItems = document.querySelectorAll('nav ul li');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get the section to show
            const sectionId = this.getAttribute('data-section');
            
            // Hide all sections
            document.querySelectorAll('.section-content').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show the selected section
            document.getElementById(`${sectionId}-section`).classList.add('active');
        });
    });
}

function initDashboard() {
    // Update stats cards
    document.getElementById('student-count').textContent = schoolData.students.length;
    document.getElementById('teacher-count').textContent = schoolData.teachers.length;
    document.getElementById('course-count').textContent = schoolData.courses.length;
    document.getElementById('class-count').textContent = schoolData.classes.length;

    // Populate students table
    const studentsTable = document.getElementById('students-table').getElementsByTagName('tbody')[0];
    studentsTable.innerHTML = '';
    schoolData.students.slice(0, 5).forEach(student => {
        const row = studentsTable.insertRow();
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.grade}</td>
            <td><span class="status ${student.status}">${student.status}</span></td>
            <td><button class="action-btn">View</button></td>
        `;
    });

    // Populate courses table
    const coursesTable = document.getElementById('courses-table').getElementsByTagName('tbody')[0];
    coursesTable.innerHTML = '';
    schoolData.courses.slice(0, 3).forEach(course => {
        const row = coursesTable.insertRow();
        row.innerHTML = `
            <td>${course.name}</td>
            <td>${course.teacher}</td>
            <td>${course.schedule}</td>
            <td>${course.room}</td>
        `;
    });
}

function initStudentsSection() {
    const tableBody = document.getElementById('students-management-table').getElementsByTagName('tbody')[0];
    
    // Populate students table
    function populateStudentsTable() {
        tableBody.innerHTML = '';
        schoolData.students.forEach(student => {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.grade}</td>
                <td>${student.email}</td>
                <td>${student.phone}</td>
                <td><span class="status ${student.status}">${student.status}</span></td>
                <td class="action-btns">
                    <button class="edit-btn" data-id="${student.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="delete-btn" data-id="${student.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            `;
        });
        
        // Add event listeners to edit and delete buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const studentId = parseInt(this.getAttribute('data-id'));
                editStudent(studentId);
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const studentId = parseInt(this.getAttribute('data-id'));
                deleteStudent(studentId);
            });
        });
    }
    
    // Add student button
    document.getElementById('add-student-btn').addEventListener('click', function() {
        openStudentModal();
    });
    
    // Initial population
    populateStudentsTable();
}

function initTeachersSection() {
    // Similar implementation to students section
    // ...
}

function initCoursesSection() {
    // Similar implementation to students section
    // ...
}

function initGradesSection() {
    // Implementation for grades section
    // ...
}

function initScheduleSection() {
    // Implementation for schedule section
    // ...
}

function initSettingsSection() {
    // Implementation for settings section
    // ...
}

function initModals() {
    // Student modal functionality
    const studentModal = document.getElementById('student-modal');
    const closeModal = document.querySelector('.close-modal');
    
    // Open modal
    window.openStudentModal = function(student = null) {
        const modalTitle = document.getElementById('modal-title');
        const form = document.getElementById('student-form');
        
        if (student) {
            // Edit mode
            modalTitle.textContent = 'Edit Student';
            document.getElementById('student-id').value = student.id;
            document.getElementById('student-name').value = student.name;
            document.getElementById('student-grade').value = student.grade;
            document.getElementById('student-email').value = student.email;
            document.getElementById('student-phone').value = student.phone;
            document.getElementById('student-status').value = student.status;
        } else {
            // Add mode
            modalTitle.textContent = 'Add New Student';
            form.reset();
        }
        
        // Populate grade options
        const gradeSelect = document.getElementById('student-grade');
        gradeSelect.innerHTML = '<option value="">Select Grade</option>';
        schoolData.classes.forEach(grade => {
            const option = document.createElement('option');
            option.value = grade;
            option.textContent = grade;
            gradeSelect.appendChild(option);
        });
        
        studentModal.style.display = 'flex';
    };
    
    // Close modal
    closeModal.addEventListener('click', function() {
        studentModal.style.display = 'none';
    });
    
    // Close when clicking outside modal
    window.addEventListener('click', function(event) {
        if (event.target === studentModal) {
            studentModal.style.display = 'none';
        }
    });
    
    // Form submission
    document.getElementById('student-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const studentId = document.getElementById('student-id').value;
        const studentData = {
            name: document.getElementById('student-name').value,
            grade: document.getElementById('student-grade').value,
            email: document.getElementById('student-email').value,
            phone: document.getElementById('student-phone').value,
            status: document.getElementById('student-status').value
        };
        
        if (studentId) {
            // Update existing student
            const index = schoolData.students.findIndex(s => s.id == studentId);
            if (index !== -1) {
                schoolData.students[index] = { ...schoolData.students[index], ...studentData };
            }
        } else {
            // Add new student
            const newId = Math.max(...schoolData.students.map(s => s.id)) + 1;
            schoolData.students.push({
                id: newId,
                ...studentData
            });
        }
        
        // Refresh tables
        initDashboard();
        initStudentsSection();
        
        // Close modal
        studentModal.style.display = 'none';
    });
}

function initResponsiveMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const toggleSidebarBtn = document.querySelector('.toggle-sidebar');
    
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    toggleSidebarBtn.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        
        // Change icon based on state
        const icon = this.querySelector('i');
        if (sidebar.classList.contains('active')) {
            icon.classList.remove('fa-chevron-right');
            icon.classList.add('fa-chevron-left');
        } else {
            icon.classList.remove('fa-chevron-left');
            icon.classList.add('fa-chevron-right');
        }
    });
}

// Helper functions
function editStudent(id) {
    const student = schoolData.students.find(s => s.id === id);
    if (student) {
        openStudentModal(student);
    }
}

function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        schoolData.students = schoolData.students.filter(s => s.id !== id);
        initDashboard();
        initStudentsSection();
    }
}




// script.js
document.addEventListener('DOMContentLoaded', function() {
    const languageBtn = document.querySelector('.language-btn');
    const languageDropdown = document.querySelector('.language-dropdown');
    const languageList = document.querySelector('.language-list');
    const languageSearch = document.querySelector('.language-search');
    
    // Comprehensive list of world languages with their native names
    const languages = [
        { code: 'en', name: 'English', native: 'English' },
        { code: 'es', name: 'Spanish', native: 'Español' },
        { code: 'fr', name: 'French', native: 'Français' },
        { code: 'de', name: 'German', native: 'Deutsch' },
        { code: 'it', name: 'Italian', native: 'Italiano' },
        { code: 'pt', name: 'Portuguese', native: 'Português' },
        { code: 'ru', name: 'Russian', native: 'Русский' },
        { code: 'zh', name: 'Chinese', native: '中文' },
        { code: 'ja', name: 'Japanese', native: '日本語' },
        { code: 'ko', name: 'Korean', native: '한국어' },
        { code: 'ar', name: 'Arabic', native: 'العربية' },
        { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
        { code: 'bn', name: 'Bengali', native: 'বাংলা' },
        { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
        { code: 'te', name: 'Telugu', native: 'తెలుగు' },
        { code: 'mr', name: 'Marathi', native: 'मराठी' },
        { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
        { code: 'ur', name: 'Urdu', native: 'اردو' },
        { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
        { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
        { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
        { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
        { code: 'th', name: 'Thai', native: 'ไทย' },
        { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt' },
        { code: 'tr', name: 'Turkish', native: 'Türkçe' },
        { code: 'fa', name: 'Persian', native: 'فارسی' },
        { code: 'pl', name: 'Polish', native: 'Polski' },
        { code: 'uk', name: 'Ukrainian', native: 'Українська' },
        { code: 'ro', name: 'Romanian', native: 'Română' },
        { code: 'nl', name: 'Dutch', native: 'Nederlands' },
        { code: 'hu', name: 'Hungarian', native: 'Magyar' },
        { code: 'sv', name: 'Swedish', native: 'Svenska' },
        { code: 'fi', name: 'Finnish', native: 'Suomi' },
        { code: 'da', name: 'Danish', native: 'Dansk' },
        { code: 'no', name: 'Norwegian', native: 'Norsk' },
        { code: 'cs', name: 'Czech', native: 'Čeština' },
        { code: 'el', name: 'Greek', native: 'Ελληνικά' },
        { code: 'he', name: 'Hebrew', native: 'עברית' },
        { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia' },
        { code: 'ms', name: 'Malay', native: 'Bahasa Melayu' },
        { code: 'tl', name: 'Filipino', native: 'Filipino' },
        { code: 'sw', name: 'Swahili', native: 'Kiswahili' },
        { code: 'am', name: 'Amharic', native: 'አማርኛ' },
        { code: 'ha', name: 'Hausa', native: 'Harshen Hausa' },
        { code: 'yo', name: 'Yoruba', native: 'Èdè Yorùbá' },
        { code: 'ig', name: 'Igbo', native: 'Asụsụ Igbo' },
        { code: 'zu', name: 'Zulu', native: 'isiZulu' },
        { code: 'xh', name: 'Xhosa', native: 'isiXhosa' },
        { code: 'af', name: 'Afrikaans', native: 'Afrikaans' },
        { code: 'ne', name: 'Nepali', native: 'नेपाली' },
        { code: 'si', name: 'Sinhala', native: 'සිංහල' },
        { code: 'my', name: 'Burmese', native: 'မြန်မာဘာသာ' },
        { code: 'km', name: 'Khmer', native: 'ភាសាខ្មែរ' },
        { code: 'lo', name: 'Lao', native: 'ພາສາລາວ' },
        { code: 'ka', name: 'Georgian', native: 'ქართული' },
        { code: 'hy', name: 'Armenian', native: 'Հայերեն' },
        { code: 'az', name: 'Azerbaijani', native: 'Azərbaycan dili' },
        { code: 'kk', name: 'Kazakh', native: 'Қазақ тілі' },
        { code: 'uz', name: 'Uzbek', native: 'Oʻzbekcha' },
        { code: 'ky', name: 'Kyrgyz', native: 'Кыргызча' },
        { code: 'tg', name: 'Tajik', native: 'Тоҷикӣ' },
        { code: 'tk', name: 'Turkmen', native: 'Türkmen dili' },
        { code: 'mn', name: 'Mongolian', native: 'Монгол хэл' },
        { code: 'ps', name: 'Pashto', native: 'پښتو' },
        { code: 'ku', name: 'Kurdish', native: 'Kurdî' },
        { code: 'sd', name: 'Sindhi', native: 'سنڌي' },
        { code: 'bo', name: 'Tibetan', native: 'བོད་སྐད་' },
        { code: 'dv', name: 'Dhivehi', native: 'ދިވެހި' },
        { code: 'ny', name: 'Chichewa', native: 'Chichewa' },
        { code: 'st', name: 'Southern Sotho', native: 'Sesotho' },
        { code: 'tn', name: 'Tswana', native: 'Setswana' },
        { code: 'sn', name: 'Shona', native: 'chiShona' },
        { code: 'rw', name: 'Kinyarwanda', native: 'Ikinyarwanda' },
        { code: 'mg', name: 'Malagasy', native: 'Malagasy' },
        { code: 'so', name: 'Somali', native: 'Soomaali' },
        { code: 'be', name: 'Belarusian', native: 'Беларуская' },
        { code: 'bs', name: 'Bosnian', native: 'Bosanski' },
        { code: 'hr', name: 'Croatian', native: 'Hrvatski' },
        { code: 'sr', name: 'Serbian', native: 'Српски' },
        { code: 'mk', name: 'Macedonian', native: 'Македонски' },
        { code: 'sl', name: 'Slovenian', native: 'Slovenščina' },
        { code: 'et', name: 'Estonian', native: 'Eesti' },
        { code: 'lv', name: 'Latvian', native: 'Latviešu' },
        { code: 'lt', name: 'Lithuanian', native: 'Lietuvių' },
        { code: 'is', name: 'Icelandic', native: 'Íslenska' },
        { code: 'ga', name: 'Irish', native: 'Gaeilge' },
        { code: 'gd', name: 'Scottish Gaelic', native: 'Gàidhlig' },
        { code: 'cy', name: 'Welsh', native: 'Cymraeg' },
        { code: 'br', name: 'Breton', native: 'Brezhoneg' },
        { code: 'eu', name: 'Basque', native: 'Euskara' },
        { code: 'ca', name: 'Catalan', native: 'Català' },
        { code: 'gl', name: 'Galician', native: 'Galego' },
        { code: 'fy', name: 'Frisian', native: 'Frysk' },
        { code: 'lb', name: 'Luxembourgish', native: 'Lëtzebuergesch' },
        { code: 'mt', name: 'Maltese', native: 'Malti' },
        { code: 'sq', name: 'Albanian', native: 'Shqip' },
        { code: 'rm', name: 'Romansh', native: 'Rumantsch' },
        { code: 'mi', name: 'Māori', native: 'Te Reo Māori' },
        { code: 'sm', name: 'Samoan', native: 'Gagana Samoa' },
        { code: 'to', name: 'Tongan', native: 'Lea Faka-Tonga' },
        { code: 'fj', name: 'Fijian', native: 'Vosa Vakaviti' },
        { code: 'ty', name: 'Tahitian', native: 'Reo Tahiti' },
        { code: 'haw', name: 'Hawaiian', native: 'ʻŌlelo Hawaiʻi' },
        { code: 'aa', name: 'Afar', native: 'Afaraf' },
        { code: 'ab', name: 'Abkhaz', native: 'Аҧсуа бызшәа' },
        // Add more languages as needed
    ];

    // Populate language dropdown
    function populateLanguageList(filter = '') {
        languageList.innerHTML = '';
        const filtered = languages.filter(lang => 
            lang.name.toLowerCase().includes(filter.toLowerCase()) || 
            lang.native.toLowerCase().includes(filter.toLowerCase())
        );
        
        filtered.forEach(lang => {
            const a = document.createElement('a');
            a.href = '#';
            a.setAttribute('data-lang', lang.code);
            a.innerHTML = `<span class="language-name">${lang.name}</span> <span class="native-name">${lang.native}</span>`;
            languageList.appendChild(a);
        });
    }

    // Initialize language list
    populateLanguageList();

    // Search functionality
    languageSearch.addEventListener('input', (e) => {
        populateLanguageList(e.target.value);
    });

    // Set initial language
    let currentLang = 'en';
    
    // Update language button text
    function updateLanguageButton(lang) {
        const selectedLang = languages.find(l => l.code === lang);
        if (selectedLang) {
            languageBtn.innerHTML = `🌐 ${selectedLang.name}`;
        }
    }
    
    // Translations object (extended with more phrases)
    const translations = {
        en: {
            welcome: "Welcome to our website!",
            description: "This is a demonstration of a comprehensive language selector.",
            home: "Home",
            about: "About",
            services: "Services",
            contact: "Contact"
        },
        es: {
            welcome: "¡Bienvenido a nuestro sitio web!",
            description: "Esta es una demostración de un selector de idioma completo.",
            home: "Inicio",
            about: "Acerca de",
            services: "Servicios",
            contact: "Contacto"
        },
        fr: {
            welcome: "Bienvenue sur notre site web!",
            description: "Ceci est une démonstration d'un sélecteur de langue complet.",
            home: "Accueil",
            about: "À propos",
            services: "Services",
            contact: "Contact"
        },
        // Add translations for more languages as needed
        // This would ideally be loaded from external files in a real application
    };
    
    // Translate page content
    function translatePage(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            } else if (translations['en'] && translations['en'][key]) {
                // Fallback to English if translation not available
                element.textContent = translations['en'][key];
            }
        });
    }
    
    // Handle language selection
    languageList.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const lang = e.target.getAttribute('data-lang');
            currentLang = lang;
            updateLanguageButton(lang);
            translatePage(lang);
            languageDropdown.style.display = 'none';
            
            // In a real app, save preference
            localStorage.setItem('preferredLanguage', lang);
        }
    });
    
    // Toggle dropdown visibility
    languageBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        languageDropdown.style.display = 
            languageDropdown.style.display === 'block' ? 'none' : 'block';
        if (languageDropdown.style.display === 'block') {
            languageSearch.focus();
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        languageDropdown.style.display = 'none';
    });

    // Check for saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && languages.some(l => l.code === savedLang)) {
        currentLang = savedLang;
        translatePage(savedLang);
    }
    
    // Initialize
    updateLanguageButton(currentLang);
});