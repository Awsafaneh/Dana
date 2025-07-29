document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Function to handle tab switching
    const showTab = (targetId) => {
        // Remove active class from all nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to the clicked nav link
        const activeLink = document.querySelector(`[data-tab-target="${targetId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Hide all tab contents
        tabContents.forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none'; // Ensure it's hidden for layout purposes
        });

        // Show the target tab content
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.classList.add('active');
            targetContent.style.display = 'block'; // Most sections are block. Adjust if any section needs 'flex' or 'grid' as its root display.
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top of the page
        }
    };

    // Event listeners for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor link behavior
            const targetId = link.dataset.tabTarget;
            showTab(targetId);

            // Close hamburger menu if open (for mobile)
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Event listener for hamburger menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Handle initial load based on URL hash (if any)
    const initialHash = window.location.hash.substring(1);
    if (initialHash && document.getElementById(initialHash)) {
        showTab(initialHash);
    } else {
        // Default to 'home' tab if no valid hash is present
        showTab('home');
    }

    // Optional: Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        // Check if the click is outside the nav menu and hamburger icon AND the nav menu is active
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});
