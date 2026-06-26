const notifications = [
    { name: "Sarah Omondi", country: "Kenya", action: "paid 180 CAD processing fee" },
    { name: "Ahmed Farah", country: "Somalia", action: "was approved for Canada Visa" },
    { name: "John Doe", country: "Uganda", action: "just submitted an application for US Tech role" },
    { name: "Musa Hassan", country: "Nigeria", action: "paid 180 CAD processing fee" },
    { name: "Fatuma Ali", country: "Tanzania", action: "was approved by CEO for Healthcare role" },
    { name: "Gad Bahati", country: "Kenya", action: "is now working in Toronto, Canada" },
    { name: "Elena Petrova", country: "South Africa", action: "paid 180 CAD processing fee" },
    { name: "Kwame Nkrumah", country: "Ghana", action: "was approved for US H-1B Sponsorship" },
    { name: "Zainab Abdi", country: "Somalia", action: "just secured a Driver role in USA" },
    { name: "David Kimani", country: "Kenya", action: "paid 180 CAD processing fee" }
];

function showNotification() {
    const notif = notifications[Math.floor(Math.random() * notifications.length)];
    const div = document.createElement('div');
    div.className = 'live-notification';
    div.innerHTML = `
        <div class="notif-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <div class="notif-content">
            <b>${notif.name}</b> from ${notif.country} ${notif.action}
        </div>
    `;
    document.body.appendChild(div);

    setTimeout(() => div.classList.add('show'), 100);
    setTimeout(() => {
        div.classList.remove('show');
        setTimeout(() => div.remove(), 600);
    }, 6000);
}

// Show first notification after 5 seconds, then every 10 minutes (600000ms)
// For testing/demo purposes, we'll use 30 seconds (30000ms) to show it's working
setTimeout(() => {
    showNotification();
    setInterval(showNotification, 600000); 
}, 5000);
