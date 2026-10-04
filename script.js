// Tab Switcher
function switchTab(event, tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    const navBtns = document.querySelectorAll('.ufc-nav-btn');
    navBtns.forEach(btn => btn.classList.remove('active'));

    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}

// Toggle Details
function toggleCardDetails(cardId, buttonElem) {
    const card = document.getElementById(cardId);
    if (card) {
        if (card.style.display === 'block') {
            card.style.display = 'none';
            buttonElem.textContent = 'FIGHT CARD';
        } else {
            card.style.display = 'block';
            buttonElem.textContent = 'HIDE CARD';
        }
    }
}

function prevMatchup(eventId) {}
function nextMatchup(eventId) {}