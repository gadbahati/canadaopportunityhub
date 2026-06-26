// Shared Authentication Logic for Global Opportunity Hub

function updateAuthUI() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const navAuth = document.getElementById('navAuth');
    const sidebarAuth = document.getElementById('sidebarAuth');

    if (currentUser) {
        const signOutBtn = `<button onclick="signOut()" class="btn btn-outline" style="border: none; font-weight: 800;">Sign Out</button>`;
        const welcomeText = `<span class="welcome-msg" style="display: flex; align-items: center; font-weight: 700; color: var(--secondary);">Welcome, ${currentUser.firstName}</span>`;
        
        if (navAuth) navAuth.innerHTML = welcomeText + signOutBtn;
        if (sidebarAuth) sidebarAuth.innerHTML = signOutBtn;

        // Grant apply privileges: Hide auth modal and proceed with application
        window.hasAccess = true;
    } else {
        window.hasAccess = false;
    }
}

function signOut() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

function handleApply(jobTitle) {
    if (window.hasAccess) {
        // User is logged in, they can apply
        alert(`Thank you for your interest in the ${jobTitle} position. Your application has been received and our team will contact you shortly.`);
    } else {
        // User is not logged in, show the auth modal
        const modal = document.getElementById('authModal');
        if (modal) {
            modal.style.display = 'flex';
        } else {
            window.location.href = 'signin.html';
        }
    }
}

function hideAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.style.display = 'none';
}

// Initialize UI on load
window.addEventListener('DOMContentLoaded', updateAuthUI);
