// Switch Navigation Tabs
function switchTab(event, tabId) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));

    const navBtns = document.querySelectorAll('.ufc-nav-btn');
    navBtns.forEach(btn => btn.classList.remove('active'));

    if (tabId === 'upcoming' || tabId === 'past') {
        const eventsBtn = document.querySelector('.events-hover-btn');
        if (eventsBtn) eventsBtn.classList.add('active');
    } else if (event && event.target && event.target.classList.contains('ufc-nav-btn')) {
        event.target.classList.add('active');
    }

    const targetSection = document.getElementById(tabId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// Toggle Dropdown Fight Card Details
function toggleCardDetails(cardId, btnElement) {
    const cardDetails = document.getElementById(cardId);
    if (cardDetails) {
        cardDetails.classList.toggle('open');
        if (btnElement) {
            btnElement.textContent = cardDetails.classList.contains('open') ? 'HIDE CARD' : 'FIGHT CARD';
        }
    }
}

// Matchup Carousel Arrow Navigation
const matchups = {
    'ama001': ['TBD VS TBD', 'MAIN CARD #1 vs MAIN CARD #2', 'PRELIM #1 vs PRELIM #2'],
    'vtc001': ['TBD VS TBD', 'CO-MAIN TITLE BOUT', 'HEAVYWEIGHT CONTENDER BOUT']
};

let currentMatchupIndices = {
    'ama001': 0,
    'vtc001': 0
};

function nextMatchup(eventId) {
    currentMatchupIndices[eventId] = (currentMatchupIndices[eventId] + 1) % matchups[eventId].length;
    document.getElementById(`${eventId}-title`).textContent = matchups[eventId][currentMatchupIndices[eventId]];
}

function prevMatchup(eventId) {
    currentMatchupIndices[eventId] = (currentMatchupIndices[eventId] - 1 + matchups[eventId].length) % matchups[eventId].length;
    document.getElementById(`${eventId}-title`).textContent = matchups[eventId][currentMatchupIndices[eventId]];
}