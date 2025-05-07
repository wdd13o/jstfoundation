document.addEventListener('DOMContentLoaded', function() {
    // Team member data
    const teamMembers = [
        {
            id: 1,
            name: 'John Tamba Sellu',
            position: 'Chief Executive Officer',
            department: 'management',
            bio: 'Visionary leader with extensive experience in organizational leadership and strategic development.',
            img: 'img/john.jpeg',
            social: {
                facebook: '#',
                twitter: '#',
                linkedin: '#',
                email: 'mailto:john@example.com'
            }
        },
        {
            id: 2,
            name: 'John Sahr Sellu M.D',
            position: 'Managing Director',
            department: 'management',
            bio: 'Medical professional with strong leadership skills in healthcare management.',
            img: 'img/john1.jpeg',
            social: {
                facebook: '#',
                twitter: '#',
                linkedin: '#',
                email: 'mailto:bassanio@example.com'
            }
        },
        {
            id: 3,
            name: 'Daniel Fallah Lebbie',
            position: 'Human Resources Manager',
            department: 'hr',
            bio: 'HR professional specializing in talent acquisition and organizational development.',
            img: 'img/daniel.jpeg',
            social: {
                facebook: '#',
                twitter: '#',
                linkedin: '#',
                email: 'mailto:bassanio@example.com'
            }
        },
        {
            id: 4,
            name: 'Christopher Sahr Foday',
            position: 'Project Coordinator',
            department: 'operations',
            bio: 'Experienced in coordinating complex projects and ensuring timely delivery.',
            img: 'img/foday.jpeg',
            social: {
                facebook: '#',
                twitter: '#',
                linkedin: '#',
                email: 'mailto:bassanio@example.com'
            }
        },
        {
            id: 5,
            name: 'Augustine T.C Tengbeh (Esq)',
            position: 'Legal Adviser',
            department: 'legal',
            bio: 'Legal expert providing guidance on corporate and compliance matters.',
            img: 'img/augustine.jpeg',
            social: {
                facebook: '#',
                twitter: '#',
                linkedin: '#',
                email: 'mailto:bassanio@example.com'
            }
        },
        {
            id: 6,
            name: 'Marian James',
            position: 'Fundraising Organiser',
            department: 'finance',
            bio: 'Skilled in developing fundraising strategies and donor relations.',
            img: 'img/marian.jpeg',
            social: {
                facebook: '#',
                twitter: '#',
                linkedin: '#',
                email: 'mailto:bassanio@example.com'
            }
        },
        {
            id: 7,
            name: 'Mohamed Tholley',
            position: 'Manager',
            department: 'management',
            bio: 'Operations manager with expertise in process optimization.',
            img: 'img/mohamed.jpeg',
            social: {
                facebook: '#',
                twitter: '#',
                linkedin: '#',
                email: 'mailto:bassanio@example.com'
            }
        },
        {
            id: 8,
            name: 'Prince Tamba Sellu',
            position: 'Secretary',
            department: 'administration',
            bio: 'Organized professional handling corporate communications and records.',
            img: 'img/prince.jpeg',
            social: {
                facebook: '#',
                twitter: '#',
                linkedin: '#',
                email: 'mailto:bassanio@example.com'
            }
        },

        {
            id: 8,
            name: 'Bundu Kallon',
            position: 'I.T Specialist',
            department: 'administration',
            bio: 'An IT Specialist at JST Foundation, with expertise in technical support, ensuring reliable technology solutions to advance the organization mission',
            img: 'img/kallon.jpeg',
            social: {
                facebook: 'https://www.facebook.com/share/1HuUZDDnNQ/',
                twitter: '#',
                linkedin: 'https://www.linkedin.com/in/bundu-kallon-117464241?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
                email: 'kallonbundujr99@gmail.com'
            }
        },
        {
            id: 9,
            name: 'Mary Fomba',
            position: 'Fundraising Manager',
            department: 'finance',
            bio: 'Experienced in donor engagement and fundraising campaign management.',
            img: 'img/mary.jpeg',
            social: {
                facebook: '#',
                twitter: '#',
                linkedin: '#',
                email: 'mailto:bassanio@example.com'
            }
        },
        {
            id: 10,
            name: 'Abubakarr Koroma',
            position: 'Development Project Director',
            department: 'operations',
            bio: 'Oversees development initiatives and project implementation.',
            img: 'img/koroma.jpeg',
            social: {
                facebook: '#',
                twitter: '#',
                linkedin: '#',
                email: 'mailto:bassanio@example.com'
            }
        },
        {
            id: 11,
            name: 'Sahr Moses Kpako James',
            position: 'Chairperson',
            department: 'management',
            bio: 'Provides strategic direction and governance oversight.',
            img: 'img/sahr.jpeg',
            social: {
                facebook: '#',
                twitter: '#',
                linkedin: '#',
                email: 'mailto:bassanio@example.com'
            }
        },
        {
            id: 12,
            name: 'Florence Fatmata Kamara',
            position: 'Executive Adviser',
            department: 'management',
            bio: 'Provides high-level strategic advice to the executive team.',
            img: 'img/florence.jpeg',
            social: {
                facebook: '#',
                twitter: '#',
                linkedin: '#',
                email: 'mailto:bassanio@example.com'
            }
        },
        {
            id: 13,
            name: 'Nullie James',
            position: 'Accountant General',
            department: 'finance',
            bio: 'Manages financial records and accounting operations.',
            img: 'img/nulie.jpeg',
            social: {
                facebook: '#',
                twitter: '#',
                linkedin: '#',
                email: 'mailto:bassanio@example.com'
            }
        },
        {
            id: 14,
            name: 'Dr. Horace Mohamed Gandi',
            position: 'Special Event Director',
            department: 'operations',
            bio: 'Plans and executes special events and programs.',
            img: 'img/gandi.jpeg',
            social: {
                facebook: '#',
                twitter: '#',
                linkedin: '#',
                email: 'mailto:bassanio@example.com'
            }
        },
        {
            id: 15,
            name: 'Bassanio Nyuma Lebbie',
            position: 'Public Relation Officer (P.R.O)',
            department: 'communications',
            bio: 'Manages public image and media relations.',
            img: 'img/bassanio.jpeg',
            social: {
                facebook: '#',
                twitter: '#',
                linkedin: '#',
                email: 'mailto:bassanio@example.com'
            }
        },
        {
            id: 16,
            name: 'Thomas Fallah Mambulu',
            position: 'Marketing Director',
            department: 'marketing',
            bio: 'Develops and implements marketing strategies.',
            img: 'img/thomas.jpeg',
            social: {
                facebook: '#',
                twitter: '#',
                linkedin: '#',
                email: 'mailto:bassanio@example.com'
            }
        }
    ];

    // DOM elements
    const teamContainer = document.getElementById('teamContainer');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Display all team members initially
    displayTeamMembers(teamMembers);

    // Filter team members based on department
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;
            if (filter === 'all') {
                displayTeamMembers(teamMembers);
            } else {
                const filteredMembers = teamMembers.filter(member => member.department === filter);
                displayTeamMembers(filteredMembers);
            }
        });
    });

    // Function to display team members
    function displayTeamMembers(members) {
        teamContainer.innerHTML = '';

        if (members.length === 0) {
            teamContainer.innerHTML = '<p class="no-results">No team members found in this category.</p>';
            return;
        }

        members.forEach(member => {
            const memberElement = document.createElement('div');
            memberElement.className = 'team-member';
            memberElement.dataset.department = member.department;

            // Create social links HTML
            let socialLinksHTML = '';
            for (const [platform, url] of Object.entries(member.social)) {
                let iconClass;
                switch(platform) {
                    case 'email': iconClass = 'fas fa-envelope'; break;
                    case 'facebook': iconClass = 'fab fa-facebook-f'; break;
                    case 'twitter': iconClass = 'fab fa-twitter'; break;
                    case 'linkedin': iconClass = 'fab fa-linkedin-in'; break;
                    default: iconClass = 'fas fa-share';
                }

                socialLinksHTML += `
                    <a href="${url}" target="_blank" aria-label="${platform}" class="social-link">
                        <i class="${iconClass}"></i>
                    </a>
                `;
            }

            memberElement.innerHTML = `
                <div class="member-img-container">
                    <img src="${member.img}" alt="${member.name}" class="member-img" 
                         onerror="this.src='https://via.placeholder.com/400x400?text=Photo+Not+Available'">
                </div>
                <div class="member-info">
                    <h3 class="member-name">${member.name}</h3>
                    <span class="member-position">${member.position}</span>
                    <p class="member-bio">${member.bio}</p>
                    <div class="social-links">
                        ${socialLinksHTML}
                    </div>
                </div>
            `;

            teamContainer.appendChild(memberElement);
        });
    }
});