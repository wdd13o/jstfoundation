document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const eventForm = document.getElementById('eventForm');
    const eventsContainer = document.getElementById('eventsContainer');
    const searchInput = document.getElementById('searchEvents');
    const filterDate = document.getElementById('filterDate');
    
    // Initialize events array from localStorage or empty array
    let events = JSON.parse(localStorage.getItem('events')) || [];
    
    // Set default date to today
    document.getElementById('eventDate').valueAsDate = new Date();
    
    // Form submission
    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const title = document.getElementById('eventTitle').value;
        const date = document.getElementById('eventDate').value;
        const time = document.getElementById('eventTime').value;
        const location = document.getElementById('eventLocation').value;
        const description = document.getElementById('eventDescription').value;
        const image = document.getElementById('eventImage').value || 'https://via.placeholder.com/400x200?text=Event+Image';
        
        // Create event object
        const event = {
            id: Date.now(),
            title,
            date,
            time,
            location,
            description,
            image
        };
        
        // Add to events array
        events.unshift(event);
        
        // Save to localStorage
        localStorage.setItem('events', JSON.stringify(events));
        
        // Render events
        renderEvents(events);
        
        // Reset form
        eventForm.reset();
        document.getElementById('eventDate').valueAsDate = new Date();
        
        // Show success message
        alert('Event posted successfully!');
    });
    
    // Search and filter functionality
    searchInput.addEventListener('input', filterEvents);
    filterDate.addEventListener('change', filterEvents);
    
    // Initial render
    renderEvents(events);
    
    // Function to render events
    function renderEvents(eventsToRender) {
        if (eventsToRender.length === 0) {
            eventsContainer.innerHTML = '<div class="no-events">No events found. Be the first to post one!</div>';
            return;
        }
        
        eventsContainer.innerHTML = '';
        
        eventsToRender.forEach(event => {
            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString('en-US', { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
            
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.innerHTML = `
                <div class="event-image" style="background-image: url('${event.image}')"></div>
                <div class="event-details">
                    <h3 class="event-title">${event.title}</h3>
                    <div class="event-date">
                        <i class="far fa-calendar-alt"></i>
                        ${formattedDate} at ${event.time}
                    </div>
                    <div class="event-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${event.location}
                    </div>
                    <p class="event-description">${event.description}</p>
                    <button class="delete-btn" data-id="${event.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            `;
            
            eventsContainer.appendChild(eventCard);
        });
        
        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const eventId = parseInt(this.getAttribute('data-id'));
                deleteEvent(eventId);
            });
        });
    }
    
    // Function to delete an event
    function deleteEvent(id) {
        if (confirm('Are you sure you want to delete this event?')) {
            events = events.filter(event => event.id !== id);
            localStorage.setItem('events', JSON.stringify(events));
            renderEvents(events);
        }
    }
    
    // Function to filter events based on search and date filter
    function filterEvents() {
        const searchTerm = searchInput.value.toLowerCase();
        const dateFilter = filterDate.value;
        
        let filteredEvents = events.filter(event => {
            const matchesSearch = event.title.toLowerCase().includes(searchTerm) || 
                                 event.description.toLowerCase().includes(searchTerm) || 
                                 event.location.toLowerCase().includes(searchTerm);
            
            if (!matchesSearch) return false;
            
            const eventDate = new Date(event.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (dateFilter === 'today') {
                return eventDate.toDateString() === today.toDateString();
            } else if (dateFilter === 'week') {
                const nextWeek = new Date(today);
                nextWeek.setDate(nextWeek.getDate() + 7);
                return eventDate >= today && eventDate <= nextWeek;
            } else if (dateFilter === 'month') {
                const nextMonth = new Date(today);
                nextMonth.setMonth(nextMonth.getMonth() + 1);
                return eventDate >= today && eventDate <= nextMonth;
            }
            
            return true;
        });
        
        renderEvents(filteredEvents);
    }
});