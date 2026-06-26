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
        
        if (sidebarAuth) {
            sidebarAuth.innerHTML = `
                <a href="cv-editor.html" class="btn btn-primary" style="width: 100%; margin-bottom: 12px; background: #059669; border: none; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 8px;"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                    <b>AI CV Optimizer</b>
                </a>
                ${signOutBtn}
            `;
            // Adjust signOutBtn in sidebarAuth to be full width
            const sidebarSignOut = sidebarAuth.querySelector('button');
            if (sidebarSignOut) {
                sidebarSignOut.style.width = '100%';
                sidebarSignOut.style.marginTop = '12px';
                sidebarSignOut.style.padding = '14px';
                sidebarSignOut.style.border = '1px solid var(--border)';
            }
        }

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
