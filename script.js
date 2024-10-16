// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    // Set the current year in the footer
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Language Toggle Elements
    const languageToggleBtn = document.getElementById("language-toggle");
    const modalLanguageToggleBtn = document.getElementById("modal-language-toggle");
    const mainTitle = document.getElementById("main-title");
    const subtitle = document.getElementById("subtitle");
    const gameCards = document.querySelectorAll(".game-card");

    let isEnglish = true;
    let isAnimating = false; // Flag to prevent rapid toggling

    // Elements that need to be translated
    const translations = {
        en: {
            mainTitle: "🎲 BlackOpz MicroGames",
            subtitle: "🕹️ Explore, play, and challenge yourself! 🕹️",
            languageToggle: "Español",
            welcomeTitle: "Welcome to BlackOps MicroGames!",
            welcomeMessage: "These games are free to play. If you enjoy them, consider supporting us by clicking the 'Buy Me a Coffee' button. ☕",
            modalCloseBtn: "Start Playing",
            gameCards: [
                /* Assuming indexes 5 and 7 exist */
                null,
                null,
                null,
                null,
                null,
                "🧠 Learn English Memory Game 🏆",
                null,
                "🧠 Memory Game (Spanish) 🎖️",
                // Add more if needed
            ],
        },
        es: {
            mainTitle: "🎲 BlackOpz MicroGames",
            subtitle: "🕹️ ¡Explora, juega y desafíate a ti mismo! 🕹️",
            languageToggle: "English",
            welcomeTitle: "¡Bienvenido a BlackOps MicroJuegos!",
            welcomeMessage: "Estos juegos son gratuitos. Si te gustan, considera apoyarnos haciendo clic en el botón 'Invítame un Café'. ☕",
            modalCloseBtn: "Comenzar a Jugar",
            gameCards: [
                /* Assuming indexes 5 and 7 exist */
                null,
                null,
                null,
                null,
                null,
                "🧠 Aprende Inglés con Memoria 🏆",
                null,
                "🧠 Juego de Memoria (Español) 🎖️",
                // Add more if needed
            ],
        }
    };

    // Function to apply translations with animations
    function applyTranslations(lang) {
        // Add fade-out class to body for smooth transition
        document.body.classList.add("fade-out");

        // Wait for the fade-out animation to complete
        setTimeout(() => {
            // Update text content
            mainTitle.textContent = translations[lang].mainTitle;
            subtitle.textContent = translations[lang].subtitle;
            languageToggleBtn.textContent = translations[lang].languageToggle;
            modalLanguageToggleBtn.textContent = translations[lang].languageToggle;

            const welcomeTitle = document.getElementById("welcome-title");
            const welcomeMessage = document.getElementById("welcome-message");
            const modalCloseBtn = document.getElementById("modal-close-btn");

            if (welcomeTitle) welcomeTitle.textContent = translations[lang].welcomeTitle;
            if (welcomeMessage) welcomeMessage.textContent = translations[lang].welcomeMessage;
            if (modalCloseBtn) modalCloseBtn.textContent = translations[lang].modalCloseBtn;

            // Update specific game cards if they exist
            translations[lang].gameCards.forEach((text, index) => {
                if (text && gameCards[index]) {
                    gameCards[index].textContent = text;
                }
            });

            // Remove fade-out and add fade-in
            document.body.classList.remove("fade-out");
            document.body.classList.add("fade-in");

            // Remove fade-in class after animation completes
            setTimeout(() => {
                document.body.classList.remove("fade-in");
                isAnimating = false; // Re-enable toggling
            }, 500); // Duration should match the CSS animation duration
        }, 500); // Duration should match the CSS fade-out animation duration
    }

    // Toggle between English and Spanish content with animation
    function toggleLanguage() {
        if (isAnimating) return; // Prevent toggling during animation
        isAnimating = true;

        isEnglish = !isEnglish;
        const lang = isEnglish ? 'en' : 'es';
        applyTranslations(lang);
    }

    // Attach event listeners to language toggle buttons
    if (languageToggleBtn) {
        languageToggleBtn.addEventListener("click", toggleLanguage);
    }

    if (modalLanguageToggleBtn) {
        modalLanguageToggleBtn.addEventListener("click", toggleLanguage);
    }

    // Modal Elements
    const welcomeModal = document.getElementById("welcome-modal");
    const closeModalBtn = document.getElementById("close-modal");
    const modalCloseBtnElement = document.getElementById("modal-close-btn");

    // Function to open the modal with animation
    function openWelcomeModal() {
        if (welcomeModal) {
            welcomeModal.classList.add("open");
            welcomeModal.setAttribute("aria-hidden", "false");
            // Trap focus inside the modal
            trapFocus(welcomeModal);
        }
    }

    // Function to close the modal with animation
    function closeWelcomeModal() {
        if (welcomeModal) {
            welcomeModal.classList.add("fade-out");
            welcomeModal.classList.remove("open");
            welcomeModal.setAttribute("aria-hidden", "true");
            // Remove focus trap after animation
            setTimeout(() => {
                welcomeModal.classList.remove("fade-out");
                removeTrapFocus();
            }, 500); // Duration should match the CSS fade-out animation duration
        }
    }

    // Show the modal on page load with animation
    window.addEventListener("load", () => {
        openWelcomeModal();
    });

    // Close modal when the close button or Start Playing button is clicked
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", closeWelcomeModal);
    }

    if (modalCloseBtnElement) {
        modalCloseBtnElement.addEventListener("click", closeWelcomeModal);
    }

    // Close modal if clicking outside the modal content
    window.addEventListener("click", (event) => {
        if (event.target === welcomeModal) {
            closeWelcomeModal();
        }
    });

    // Close modal with Escape key
    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && welcomeModal.classList.contains("open")) {
            closeWelcomeModal();
        }
    });

    // Accessibility: Trap focus within the modal
    let focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]),' +
        'textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"],' +
        '[contenteditable]';
    let focusableElements;
    let firstFocusableElement;
    let lastFocusableElement;

    function trapFocus(modal) {
        focusableElements = modal.querySelectorAll(focusableElementsString);
        if (focusableElements.length === 0) return;
        firstFocusableElement = focusableElements[0];
        lastFocusableElement = focusableElements[focusableElements.length - 1];

        // Focus the first focusable element
        firstFocusableElement.focus();

        // Listen for tab events
        modal.addEventListener('keydown', handleFocusTrap);
    }

    function handleFocusTrap(e) {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === firstFocusableElement) {
                e.preventDefault();
                lastFocusableElement.focus();
            }
        } else { // Tab
            if (document.activeElement === lastFocusableElement) {
                e.preventDefault();
                firstFocusableElement.focus();
            }
        }
    }

    function removeTrapFocus() {
        if (welcomeModal) {
            welcomeModal.removeEventListener('keydown', handleFocusTrap);
        }
    }

    // Optional: Add debouncing if needed for other functions
    // Example debounce function
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Example usage of debounce (not currently needed)
    // const debouncedToggle = debounce(toggleLanguage, 300);
    // languageToggleBtn.addEventListener("click", debouncedToggle);
});
