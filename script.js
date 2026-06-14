(() => {
    const THEME_STORAGE_KEY = "blackopz-theme";
    const root = document.documentElement;

    const copy = {
        en: {
            documentTitle: "BlackOpz MicroGames",
            banner: "All games are free to play. Have fun and support us with a donation.",
            eyebrow: "Arcade Command Center",
            mainTitle: "BlackOpz MicroGames",
            subtitle: "Choose a mission, open a game, and keep the streak alive.",
            languageToggle: "Español",
            languageAria: "Switch language to Spanish",
            libraryKicker: "Live library",
            libraryTitle: "Pick your next run",
            libraryDescription: "Eight browser games, tuned for fast sessions and clean launches.",
            footer: "All rights reserved.",
            donation: "Buy Me a Coffee",
            modalKicker: "Free to play",
            welcomeTitle: "Welcome to BlackOpz MicroGames",
            welcomeMessage: "These games are free to play. If you enjoy them, consider supporting the project through the donation button.",
            modalClose: "Start Playing",
            closeModalAria: "Close welcome message",
            themeLight: "Switch to light theme",
            themeDark: "Switch to dark theme",
            toastLanguage: "Language set to English.",
            toastThemeLight: "Light mode enabled.",
            toastThemeDark: "Dark mode enabled.",
            toastReady: "Game library ready.",
            toastOpening: "Opening {title}.",
            games: {
                chess: ["Strategy", "ChessMaster Online", "Focused board play with a tactical edge."],
                crazyland: ["Arcade", "CrazyLand", "Bright, quick-play chaos for short breaks."],
                racketblitz: ["Reflex", "Racket Blitz", "Fast rallies, clean timing, instant restarts."],
                cascade: ["Beta", "Emoji Cascade", "Pattern matching with a playful cascade loop."],
                drum: ["Music", "Beat Maker Drum Machine", "Tap out beats and build compact rhythms."],
                english: ["Learning", "Learn English Memory Game", "Practice vocabulary through memory rounds."],
                portuguese: ["Portuguese", "Jogo da Memória", "Portuguese memory practice in a simple loop."],
                spanish: ["Spanish", "Juego de Memoria", "Spanish memorama with a focused learning path."]
            }
        },
        es: {
            documentTitle: "BlackOpz MicroJuegos",
            banner: "Todos los juegos son gratis. Diviértete y apoya el proyecto con una donación.",
            eyebrow: "Centro de Comando Arcade",
            mainTitle: "BlackOpz MicroJuegos",
            subtitle: "Elige una misión, abre un juego y mantén viva la racha.",
            languageToggle: "English",
            languageAria: "Cambiar idioma a inglés",
            libraryKicker: "Biblioteca activa",
            libraryTitle: "Elige tu próxima partida",
            libraryDescription: "Ocho juegos web, pensados para sesiones rápidas y lanzamientos limpios.",
            footer: "Todos los derechos reservados.",
            donation: "Invítame un Café",
            modalKicker: "Gratis para jugar",
            welcomeTitle: "Bienvenido a BlackOpz MicroJuegos",
            welcomeMessage: "Estos juegos son gratuitos. Si te gustan, considera apoyar el proyecto con el botón de donación.",
            modalClose: "Comenzar a jugar",
            closeModalAria: "Cerrar mensaje de bienvenida",
            themeLight: "Cambiar a modo claro",
            themeDark: "Cambiar a modo oscuro",
            toastLanguage: "Idioma cambiado a español.",
            toastThemeLight: "Modo claro activado.",
            toastThemeDark: "Modo oscuro activado.",
            toastReady: "Biblioteca lista.",
            toastOpening: "Abriendo {title}.",
            games: {
                chess: ["Estrategia", "ChessMaster Online", "Ajedrez enfocado con ventaja táctica."],
                crazyland: ["Arcade", "CrazyLand", "Caos colorido para descansos rápidos."],
                racketblitz: ["Reflejos", "Racket Blitz", "Rallys veloces, buen ritmo y reinicio instantáneo."],
                cascade: ["Beta", "Emoji Cascade", "Patrones en cascada con ritmo juguetón."],
                drum: ["Música", "Beat Maker Drum Machine", "Crea ritmos compactos con golpes rápidos."],
                english: ["Aprendizaje", "Memoria para aprender inglés", "Practica vocabulario con rondas de memoria."],
                portuguese: ["Portugués", "Jogo da Memória", "Práctica de memoria en portugués con una dinámica simple."],
                spanish: ["Español", "Juego de Memoria", "Memorama en español con una ruta de aprendizaje clara."]
            }
        }
    };

    const state = {
        lang: "en",
        theme: getInitialTheme()
    };

    const selectors = {};
    let previousFocus = null;
    let isModalOpen = false;

    function getInitialTheme() {
        const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
        if (stored === "light" || stored === "dark") {
            return stored;
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    function getCurrentCopy() {
        return copy[state.lang];
    }

    function setText(target, value) {
        if (target) {
            target.textContent = value;
        }
    }

    function applyTheme({ persist = false, announce = false } = {}) {
        root.dataset.theme = state.theme;

        if (persist) {
            window.localStorage.setItem(THEME_STORAGE_KEY, state.theme);
        }

        if (selectors.themeToggle && selectors.themeIcon) {
            const text = getCurrentCopy();
            const isDark = state.theme === "dark";
            selectors.themeIcon.setAttribute("href", isDark ? "#icon-sun" : "#icon-moon");
            selectors.themeToggle.setAttribute("aria-label", isDark ? text.themeLight : text.themeDark);
            selectors.themeToggle.setAttribute("title", isDark ? text.themeLight : text.themeDark);
        }

        if (announce) {
            showToast(state.theme === "dark" ? getCurrentCopy().toastThemeDark : getCurrentCopy().toastThemeLight);
            emitBurst(selectors.themeToggle);
        }
    }

    function applyLanguage({ announce = false } = {}) {
        const text = getCurrentCopy();
        root.lang = state.lang;
        document.title = text.documentTitle;

        document.querySelectorAll("[data-banner-copy]").forEach((node) => setText(node, text.banner));
        setText(selectors.eyebrow, text.eyebrow);
        setText(selectors.mainTitle, text.mainTitle);
        setText(selectors.subtitle, text.subtitle);
        setText(selectors.libraryKicker, text.libraryKicker);
        setText(selectors.libraryTitle, text.libraryTitle);
        setText(selectors.libraryDescription, text.libraryDescription);
        setText(selectors.footerCopy, text.footer);
        setText(selectors.donationLabel, text.donation);
        setText(selectors.modalKicker, text.modalKicker);
        setText(selectors.welcomeTitle, text.welcomeTitle);
        setText(selectors.welcomeMessage, text.welcomeMessage);
        setText(selectors.modalCloseLabel, text.modalClose);
        setText(selectors.languageLabel, text.languageToggle);
        setText(selectors.modalLanguageLabel, text.languageToggle);

        if (selectors.languageToggle) {
            selectors.languageToggle.setAttribute("aria-label", text.languageAria);
        }

        if (selectors.modalLanguageToggle) {
            selectors.modalLanguageToggle.setAttribute("aria-label", text.languageAria);
        }

        if (selectors.closeModal) {
            selectors.closeModal.setAttribute("aria-label", text.closeModalAria);
        }

        document.querySelectorAll(".game-card").forEach((card) => {
            const game = text.games[card.dataset.game];
            if (!game) return;

            const [kicker, title, description] = game;
            setText(card.querySelector("[data-card-kicker]"), kicker);
            setText(card.querySelector("[data-card-title]"), title);
            setText(card.querySelector("[data-card-description]"), description);
            card.setAttribute("aria-label", `${title}. ${description}`);
        });

        applyTheme();

        if (announce) {
            showToast(text.toastLanguage);
            emitBurst(selectors.languageToggle);
        }
    }

    function toggleLanguage() {
        state.lang = state.lang === "en" ? "es" : "en";
        root.classList.add("is-translating");
        applyLanguage({ announce: true });
        window.setTimeout(() => root.classList.remove("is-translating"), 240);
    }

    function toggleTheme() {
        state.theme = state.theme === "dark" ? "light" : "dark";
        applyTheme({ persist: true, announce: true });
    }

    function openWelcomeModal() {
        const modal = selectors.welcomeModal;
        if (!modal || isModalOpen) return;

        previousFocus = document.activeElement;
        isModalOpen = true;
        modal.hidden = false;
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-lock");

        requestAnimationFrame(() => {
            modal.classList.add("is-open");
            selectors.modalDialog?.focus({ preventScroll: true });
        });
    }

    function closeWelcomeModal({ celebrate = false } = {}) {
        const modal = selectors.welcomeModal;
        if (!modal || !isModalOpen) return;

        isModalOpen = false;
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-lock");

        if (celebrate) {
            showToast(getCurrentCopy().toastReady);
            emitBurst(selectors.modalClose);
        }

        window.setTimeout(() => {
            modal.hidden = true;
            if (previousFocus && typeof previousFocus.focus === "function") {
                previousFocus.focus({ preventScroll: true });
            }
        }, 260);
    }

    function handleModalKeydown(event) {
        if (!isModalOpen || !selectors.welcomeModal) return;

        if (event.key === "Escape") {
            closeWelcomeModal();
            return;
        }

        if (event.key !== "Tab") return;

        const focusable = selectors.welcomeModal.querySelectorAll(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    function showToast(message) {
        if (!selectors.toastRegion || !message) return;

        const toast = document.createElement("div");
        toast.className = "toast";
        toast.setAttribute("role", "status");
        toast.textContent = message;
        selectors.toastRegion.append(toast);

        window.setTimeout(() => toast.classList.add("is-leaving"), 2600);
        window.setTimeout(() => toast.remove(), 2950);
    }

    function emitBurst(target) {
        if (!target || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const rect = target.getBoundingClientRect();
        const burst = document.createElement("div");
        burst.className = "burst";
        burst.style.setProperty("--burst-x", `${rect.left + rect.width / 2}px`);
        burst.style.setProperty("--burst-y", `${rect.top + rect.height / 2}px`);

        const colors = ["var(--color-accent-strong)", "var(--color-lime)", "var(--color-coral)", "var(--color-gold)"];
        for (let index = 0; index < 10; index += 1) {
            const particle = document.createElement("span");
            particle.style.setProperty("--angle", `${index * 36}deg`);
            particle.style.setProperty("--burst-color", colors[index % colors.length]);
            burst.append(particle);
        }

        document.body.append(burst);
        window.setTimeout(() => burst.remove(), 720);
    }

    function prepareRevealAnimations() {
        const revealItems = document.querySelectorAll(".reveal");

        if (!("IntersectionObserver" in window)) {
            revealItems.forEach((item) => item.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.18 });

        revealItems.forEach((item, index) => {
            item.style.transitionDelay = `${Math.min(index * 45, 280)}ms`;
            observer.observe(item);
        });
    }

    function bindGameCards() {
        document.querySelectorAll(".game-card").forEach((card) => {
            card.addEventListener("click", () => {
                const title = card.querySelector("[data-card-title]")?.textContent?.trim() || "game";
                showToast(getCurrentCopy().toastOpening.replace("{title}", title));
                emitBurst(card);
            });
        });
    }

    function cacheSelectors() {
        selectors.year = document.getElementById("year");
        selectors.languageToggle = document.getElementById("language-toggle");
        selectors.modalLanguageToggle = document.getElementById("modal-language-toggle");
        selectors.languageLabel = document.querySelector("[data-language-label]");
        selectors.modalLanguageLabel = document.querySelector("[data-modal-language-label]");
        selectors.themeToggle = document.getElementById("theme-toggle");
        selectors.themeIcon = document.getElementById("theme-icon");
        selectors.eyebrow = document.querySelector("[data-eyebrow]");
        selectors.mainTitle = document.getElementById("main-title");
        selectors.subtitle = document.getElementById("subtitle");
        selectors.libraryKicker = document.querySelector("[data-library-kicker]");
        selectors.libraryTitle = document.querySelector("[data-library-title]");
        selectors.libraryDescription = document.querySelector("[data-library-description]");
        selectors.footerCopy = document.querySelector("[data-footer-copy]");
        selectors.donationLabel = document.querySelector("[data-donation-label]");
        selectors.welcomeModal = document.getElementById("welcome-modal");
        selectors.modalDialog = document.querySelector(".modal__dialog");
        selectors.closeModal = document.getElementById("close-modal");
        selectors.modalClose = document.getElementById("modal-close-btn");
        selectors.modalCloseLabel = document.querySelector("[data-modal-close-label]");
        selectors.modalKicker = document.querySelector("[data-modal-kicker]");
        selectors.welcomeTitle = document.getElementById("welcome-title");
        selectors.welcomeMessage = document.getElementById("welcome-message");
        selectors.toastRegion = document.getElementById("toast-region");
    }

    function bindEvents() {
        selectors.languageToggle?.addEventListener("click", toggleLanguage);
        selectors.modalLanguageToggle?.addEventListener("click", toggleLanguage);
        selectors.themeToggle?.addEventListener("click", toggleTheme);
        selectors.closeModal?.addEventListener("click", () => closeWelcomeModal());
        selectors.modalClose?.addEventListener("click", () => closeWelcomeModal({ celebrate: true }));
        selectors.welcomeModal?.addEventListener("click", (event) => {
            if (event.target?.matches("[data-modal-dismiss]")) {
                closeWelcomeModal();
            }
        });
        document.addEventListener("keydown", handleModalKeydown);
    }

    function init() {
        cacheSelectors();
        setText(selectors.year, new Date().getFullYear());
        applyTheme();
        applyLanguage();
        bindEvents();
        bindGameCards();
        prepareRevealAnimations();
        window.addEventListener("load", openWelcomeModal, { once: true });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
        init();
    }
})();
