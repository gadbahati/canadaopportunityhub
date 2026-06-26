// Shared Authentication Logic for Global Opportunity Hub

function updateAuthUI() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const navAuth = document.getElementById('navAuth');
    const sidebarAuth = document.getElementById('sidebarAuth');
    const sidebarMenu = document.querySelector('.sidebar-menu');

    if (currentUser) {
        const signOutBtn = `<button onclick="signOut()" class="btn btn-outline" style="border: none; font-weight: 800;">Sign Out</button>`;
        const welcomeText = `<span class="welcome-msg" style="display: flex; align-items: center; font-weight: 700; color: var(--secondary);">Welcome, ${currentUser.firstName}</span>`;
        
        if (navAuth) navAuth.innerHTML = welcomeText + signOutBtn;
        if (sidebarAuth) sidebarAuth.innerHTML = signOutBtn;

        // Add Dashboard link to sidebar if not already there
        if (sidebarMenu && !document.getElementById('sidebarDashboard')) {
            const dashboardLi = document.createElement('li');
            dashboardLi.id = 'sidebarDashboard';
            dashboardLi.innerHTML = '<a href="dashboard.html" style="color: var(--primary);"><b>User Dashboard</b></a>';
            sidebarMenu.appendChild(dashboardLi);
        }

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
        // Redirect to real application page with job title
        window.location.href = `apply.html?job=${encodeURIComponent(jobTitle)}`;
    } else {
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

// Function to save application data to localStorage
function saveApplication(applicationData) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return false;

    let applications = JSON.parse(localStorage.getItem('applications')) || [];
    
    const newApp = {
        id: Date.now(),
        userEmail: currentUser.email,
        ...applicationData,
        status: 'Pending Review',
        date: new Date().toLocaleDateString()
    };

    applications.push(newApp);
    localStorage.setItem('applications', JSON.stringify(applications));
    return true;
}

// Initialize UI on load
window.addEventListener('DOMContentLoaded', updateAuthUI);
