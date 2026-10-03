// SUPABASE CONFIGURATION
const SUPABASE_URL = 'https://cxzftptwawicdwrzvpki.supabase.co/rest/v1/';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4emZ0cHR3YXdpY2R3cnp2cGtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwNTA0NDAsImV4cCI6MjEwNjYyNjQ0MH0.baRfrSG032zTZEt1AtMNLYfn7GKmMJjN3Nju9PBwNBw';
const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

// Tab Navigation Function
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

    if (tabId === 'roster') {
        fetchRoster();
    }
}

// Toggle Fight Card Details
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

// Fetch Active Roster from Supabase
async function fetchRoster() {
    const rosterContainer = document.getElementById('roster-list');
    if (!supabaseClient) {
        rosterContainer.innerHTML = `<div class="info-card"><p style="text-align: center; color: #666;">Database not connected.</p></div>`;
        return;
    }

    const { data: profiles, error } = await supabaseClient
        .from('profiles')
        .select('*');

    if (error || !profiles || profiles.length === 0) {
        rosterContainer.innerHTML = `<div class="info-card"><p style="text-align: center; color: #666;">No active fighters registered yet.</p></div>`;
        return;
    }

    rosterContainer.innerHTML = profiles.map(fighter => `
        <div class="info-card" style="margin-bottom: 15px;">
            <h3>${fighter.username}</h3>
            <p><strong>Weight Class:</strong> ${fighter.weight_class || 'N/A'}</p>
            <p><strong>Stance:</strong> ${fighter.stance || 'Orthodox'}</p>
            <p><strong>Record:</strong> ${fighter.record || '0-0-0'}</p>
        </div>
    `).join('');
}

// Load roster on initial page launch
document.addEventListener('DOMContentLoaded', () => {
    fetchRoster();
});