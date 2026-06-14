import { animate, inView, stagger } from "motion";
import Lenis from "lenis";
import {
    ArrowRight,
    BookOpen,
    Brain,
    CheckCircle2,
    CircleHelp,
    Coffee,
    Crown,
    ExternalLink,
    Gamepad2,
    Grid2X2,
    Languages,
    Moon,
    Music2,
    PanelsTopLeft,
    Play,
    Rocket,
    Search,
    SignalHigh,
    Sparkles,
    Sun,
    TimerReset,
    X,
    Zap,
    createElement
} from "lucide";
import "./styles.css";

const THEME_STORAGE_KEY = "blackopz-theme";
const LANGUAGE_STORAGE_KEY = "blackopz-lang";
const WELCOME_STORAGE_KEY = "blackopz-welcome-dismissed";

const root = document.documentElement;
const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const iconRegistry = {
    "arrow-right": ArrowRight,
    "book-open": BookOpen,
    brain: Brain,
    "check-circle-2": CheckCircle2,
    "circle-help": CircleHelp,
    coffee: Coffee,
    crown: Crown,
    "external-link": ExternalLink,
    "gamepad-2": Gamepad2,
    "grid-2x2": Grid2X2,
    languages: Languages,
    moon: Moon,
    "music-2": Music2,
    "panels-top-left": PanelsTopLeft,
    play: Play,
    rocket: Rocket,
    search: Search,
    "signal-high": SignalHigh,
    sparkles: Sparkles,
    sun: Sun,
    "timer-reset": TimerReset,
    x: X,
    zap: Zap
};

const copy = {
    en: {
        documentTitle: "BlackOpz MicroGames | Free Browser Game Arcade",
        metaDescription: "BlackOpz MicroGames is a fast launcher for eight free browser games, including chess, arcade, racket, emoji puzzle, music, and memory games.",
        skipLink: "Skip to games",
        banner: "Free browser games, fast launches, no installs.",
        languageToggle: "Español",
        languageAria: "Switch language to Spanish",
        eyebrow: "Micro arcade launcher",
        mainTitle: "BlackOpz MicroGames",
        subtitle: "Pick a compact web game and jump into a quick run.",
        playNow: "Play now",
        openGame: "Open game",
        donation: "Buy Me a Coffee",
        metricGames: "free games",
        metricInstalls: "installs",
        metricQuickValue: "quick",
        metricQuick: "sessions",
        libraryKicker: "Live library",
        libraryTitle: "Pick your next run",
        libraryDescription: "Eight free browser games tuned for fast sessions, clean launches, and easy discovery.",
        faqKicker: "Quick guide",
        faqTitle: "Free browser games in one launcher",
        faqIntro: "BlackOpz MicroGames gathers short-session web games in a lightweight arcade hub built for fast discovery.",
        faqFreeQuestion: "Are the games free?",
        faqFreeAnswer: "Yes. Every listed game opens for free in the browser, and support is optional.",
        faqInstallQuestion: "Do I need to install anything?",
        faqInstallAnswer: "No. The library links directly to web games, so you can start a session from a phone, tablet, or desktop browser.",
        faqGamesQuestion: "What kinds of games are included?",
        faqGamesAnswer: "The collection includes chess, arcade action, racket reflexes, emoji puzzle play, a drum machine, and language memory games.",
        footer: "All rights reserved.",
        sheetKicker: "Free to play",
        sheetTitle: "Ready for a quick run?",
        sheetMessage: "This launcher keeps the games free and fast. Support is optional and always appreciated.",
        sheetDismiss: "Got it",
        sheetCloseAria: "Close welcome note",
        sheetSupportAria: "Support the project",
        themeLight: "Switch to light theme",
        themeDark: "Switch to dark theme",
        opensNewTab: "Opens in a new tab.",
        toastLanguage: "Language set to English.",
        toastThemeLight: "Light mode enabled.",
        toastThemeDark: "Dark mode enabled.",
        toastReady: "Game library ready.",
        toastOpening: "Opening {title}.",
        games: {
            chess: ["Strategy", "ChessMaster Online", "Focused board play with a tactical edge."],
            crazyland: ["Arcade", "CrazyLand", "Bright, quick-play chaos for short breaks."],
            racketblitz: ["Reflex", "Racket Blitz", "Fast rallies, clean timing, instant restarts."],
            cascade: ["Puzzle", "Emoji Cascade", "Pattern matching with a playful cascade loop."],
            drum: ["Music", "Beat Maker Drum Machine", "Tap out beats and build compact rhythms."],
            english: ["Learning", "Learn English Memory Game", "Practice vocabulary through memory rounds."],
            portuguese: ["Portuguese", "Jogo da Memória", "Portuguese memory practice in a simple loop."],
            spanish: ["Spanish", "Juego de Memoria", "Spanish memorama with a focused learning path."]
        }
    },
    es: {
        documentTitle: "BlackOpz MicroJuegos | Arcade gratis en el navegador",
        metaDescription: "BlackOpz MicroJuegos es un lanzador rápido para ocho juegos gratis de navegador, con ajedrez, arcade, raqueta, puzzle, música y memorias de idiomas.",
        skipLink: "Ir a los juegos",
        banner: "Juegos gratis de navegador, lanzamientos rápidos y sin instalaciones.",
        languageToggle: "English",
        languageAria: "Cambiar idioma a inglés",
        eyebrow: "Lanzador micro arcade",
        mainTitle: "BlackOpz MicroJuegos",
        subtitle: "Elige un juego web compacto y entra a una partida rápida.",
        playNow: "Jugar ahora",
        openGame: "Abrir juego",
        donation: "Invítame un Café",
        metricGames: "juegos gratis",
        metricInstalls: "instalaciones",
        metricQuickValue: "rápidas",
        metricQuick: "sesiones",
        libraryKicker: "Biblioteca activa",
        libraryTitle: "Elige tu próxima partida",
        libraryDescription: "Ocho juegos gratis de navegador pensados para sesiones rápidas, lanzamientos limpios y fácil descubrimiento.",
        faqKicker: "Guía rápida",
        faqTitle: "Juegos gratis de navegador en un solo lanzador",
        faqIntro: "BlackOpz MicroJuegos reúne juegos web de sesiones cortas en un hub arcade ligero y fácil de explorar.",
        faqFreeQuestion: "¿Los juegos son gratis?",
        faqFreeAnswer: "Sí. Cada juego listado abre gratis en el navegador y el apoyo al proyecto es opcional.",
        faqInstallQuestion: "¿Necesito instalar algo?",
        faqInstallAnswer: "No. La biblioteca enlaza directo a juegos web para iniciar desde celular, tablet o computadora.",
        faqGamesQuestion: "¿Qué tipos de juegos incluye?",
        faqGamesAnswer: "La colección incluye ajedrez, acción arcade, reflejos con raqueta, puzzle de emojis, una caja de ritmos y juegos de memoria para idiomas.",
        footer: "Todos los derechos reservados.",
        sheetKicker: "Gratis para jugar",
        sheetTitle: "¿Listo para una partida rápida?",
        sheetMessage: "Este lanzador mantiene los juegos gratis y rápidos. El apoyo es opcional y siempre se agradece.",
        sheetDismiss: "Entendido",
        sheetCloseAria: "Cerrar nota de bienvenida",
        sheetSupportAria: "Apoyar el proyecto",
        themeLight: "Cambiar a modo claro",
        themeDark: "Cambiar a modo oscuro",
        opensNewTab: "Abre en una pestaña nueva.",
        toastLanguage: "Idioma cambiado a español.",
        toastThemeLight: "Modo claro activado.",
        toastThemeDark: "Modo oscuro activado.",
        toastReady: "Biblioteca lista.",
        toastOpening: "Abriendo {title}.",
        games: {
            chess: ["Estrategia", "ChessMaster Online", "Ajedrez enfocado con ventaja táctica."],
            crazyland: ["Arcade", "CrazyLand", "Caos colorido para descansos rápidos."],
            racketblitz: ["Reflejos", "Racket Blitz", "Rallys veloces, buen ritmo y reinicio instantáneo."],
            cascade: ["Puzzle", "Emoji Cascade", "Patrones en cascada con ritmo juguetón."],
            drum: ["Música", "Beat Maker Drum Machine", "Crea ritmos compactos con golpes rápidos."],
            english: ["Aprendizaje", "Memoria para aprender inglés", "Practica vocabulario con rondas de memoria."],
            portuguese: ["Portugués", "Jogo da Memória", "Práctica de memoria en portugués con una dinámica simple."],
            spanish: ["Español", "Juego de Memoria", "Memorama en español con una ruta de aprendizaje clara."]
        }
    }
};

const selectors = {};
let state = {
    lang: getInitialLanguage(),
    theme: getInitialTheme()
};
let lenis = null;
let motionReady = false;

function storageGet(key) {
    try {
        return window.localStorage.getItem(key);
    } catch {
        return null;
    }
}

function storageSet(key, value) {
    try {
        window.localStorage.setItem(key, value);
    } catch {
        // Preferences are progressive enhancement only.
    }
}

function getInitialLanguage() {
    const stored = storageGet(LANGUAGE_STORAGE_KEY);
    if (stored === "en" || stored === "es") {
        return stored;
    }
    return root.lang === "es" ? "es" : "en";
}

function getInitialTheme() {
    const stored = storageGet(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
        return stored;
    }
    return "dark";
}

function shouldReduceMotion() {
    return reduceMotionQuery.matches;
}

function getCurrentCopy() {
    return copy[state.lang];
}

function setText(target, value) {
    if (target && typeof value === "string") {
        target.textContent = value;
    }
}

function renderIcon(target, iconName) {
    const iconNode = iconRegistry[iconName];
    if (!target || !iconNode) return;

    target.dataset.icon = iconName;
    const svg = createElement(iconNode, {
        class: "icon",
        "aria-hidden": "true",
        focusable: "false"
    });
    target.replaceChildren(svg);
}

function hydrateIcons(scope = document) {
    scope.querySelectorAll("[data-icon]").forEach((target) => {
        renderIcon(target, target.dataset.icon);
    });
}

function cacheSelectors() {
    selectors.year = document.getElementById("year");
    selectors.languageToggle = document.getElementById("language-toggle");
    selectors.themeToggle = document.getElementById("theme-toggle");
    selectors.themeIconSlot = document.getElementById("theme-icon-slot");
    selectors.welcomeSheet = document.getElementById("welcome-sheet");
    selectors.sheetDismiss = document.getElementById("sheet-dismiss");
    selectors.sheetClose = document.getElementById("sheet-close");
    selectors.toastRegion = document.getElementById("toast-region");
}

function applyTheme({ persist = false, announce = false } = {}) {
    root.dataset.theme = state.theme;
    const text = getCurrentCopy();
    const isDark = state.theme === "dark";

    if (persist) {
        storageSet(THEME_STORAGE_KEY, state.theme);
    }

    renderIcon(selectors.themeIconSlot, isDark ? "sun" : "moon");
    selectors.themeToggle?.setAttribute("aria-label", isDark ? text.themeLight : text.themeDark);
    selectors.themeToggle?.setAttribute("title", isDark ? text.themeLight : text.themeDark);

    if (announce) {
        showToast(isDark ? text.toastThemeDark : text.toastThemeLight);
        emitBurst(selectors.themeToggle);
    }
}

function updateMetadata(text) {
    document.title = text.documentTitle;
    document.querySelector('meta[name="description"]')?.setAttribute("content", text.metaDescription);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", text.documentTitle);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", text.metaDescription);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", text.documentTitle);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", text.metaDescription);
}

function applyLanguage({ persist = false, announce = false } = {}) {
    const text = getCurrentCopy();

    root.lang = state.lang;
    if (persist) {
        storageSet(LANGUAGE_STORAGE_KEY, state.lang);
    }

    updateMetadata(text);

    document.querySelectorAll("[data-i18n]").forEach((node) => {
        setText(node, text[node.dataset.i18n]);
    });

    selectors.languageToggle?.setAttribute("aria-label", text.languageAria);
    selectors.sheetClose?.setAttribute("aria-label", text.sheetCloseAria);
    selectors.welcomeSheet?.querySelector('a[href*="buymeacoffee"]')?.setAttribute("aria-label", text.sheetSupportAria);

    document.querySelectorAll(".game-card").forEach((card) => {
        const game = text.games[card.dataset.game];
        if (!game) return;

        const [kicker, title, description] = game;
        setText(card.querySelector("[data-card-kicker]"), kicker);
        setText(card.querySelector("[data-card-title]"), title);
        setText(card.querySelector("[data-card-description]"), description);
        card.setAttribute("aria-label", `${title}. ${description} ${text.opensNewTab}`);
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
    applyLanguage({ persist: true, announce: true });
    window.setTimeout(() => root.classList.remove("is-translating"), 220);
}

function toggleTheme() {
    state.theme = state.theme === "dark" ? "light" : "dark";
    applyTheme({ persist: true, announce: true });
}

function showWelcomeSheet() {
    if (!selectors.welcomeSheet || storageGet(WELCOME_STORAGE_KEY) === "true") return;
    if (window.matchMedia("(max-width: 760px)").matches) return;

    selectors.welcomeSheet.hidden = false;
    selectors.welcomeSheet.setAttribute("aria-hidden", "false");

    requestAnimationFrame(() => {
        selectors.welcomeSheet.classList.add("is-open");
        if (!shouldReduceMotion()) {
            animate(
                selectors.welcomeSheet,
                { opacity: [0, 1], y: [18, 0] },
                { duration: 0.38, ease: [0.16, 1, 0.3, 1] }
            );
        }
    });
}

function hideWelcomeSheet({ remember = true, announce = false } = {}) {
    if (!selectors.welcomeSheet) return;

    if (remember) {
        storageSet(WELCOME_STORAGE_KEY, "true");
    }

    selectors.welcomeSheet.classList.remove("is-open");
    selectors.welcomeSheet.setAttribute("aria-hidden", "true");

    const finish = () => {
        selectors.welcomeSheet.hidden = true;
    };

    if (!shouldReduceMotion()) {
        Promise.resolve(
            animate(
                selectors.welcomeSheet,
                { opacity: 0, y: 12 },
                { duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }
            )
        ).then(finish);
    } else {
        finish();
    }

    if (announce) {
        showToast(getCurrentCopy().toastReady);
        emitBurst(selectors.sheetDismiss);
    }
}

function showToast(message) {
    if (!selectors.toastRegion || !message) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.textContent = message;
    selectors.toastRegion.append(toast);

    if (!shouldReduceMotion()) {
        animate(toast, { opacity: [0, 1], y: [10, 0] }, { duration: 0.24, ease: [0.16, 1, 0.3, 1] });
        window.setTimeout(() => {
            Promise.resolve(
                animate(toast, { opacity: 0, y: 8 }, { duration: 0.2, ease: [0.2, 0.8, 0.2, 1] })
            ).then(() => toast.remove());
        }, 2600);
    } else {
        window.setTimeout(() => toast.remove(), 2600);
    }
}

function emitBurst(target) {
    if (!target || shouldReduceMotion()) return;

    const rect = target.getBoundingClientRect();
    const burst = document.createElement("div");
    burst.className = "burst";
    burst.style.setProperty("--burst-x", `${rect.left + rect.width / 2}px`);
    burst.style.setProperty("--burst-y", `${rect.top + rect.height / 2}px`);

    const colors = ["var(--mint)", "var(--lime)", "var(--coral)", "var(--gold)"];
    const animations = [];

    for (let index = 0; index < 10; index += 1) {
        const particle = document.createElement("span");
        const angle = (index / 10) * Math.PI * 2;
        const distance = 28 + (index % 3) * 8;
        particle.style.setProperty("--burst-color", colors[index % colors.length]);
        burst.append(particle);

        animations.push(
            Promise.resolve(
                animate(
                    particle,
                    {
                        x: [0, Math.cos(angle) * distance],
                        y: [0, Math.sin(angle) * distance],
                        opacity: [1, 0],
                        scale: [1, 0.25]
                    },
                    { duration: 0.58, ease: [0.16, 1, 0.3, 1] }
                )
            )
        );
    }

    document.body.append(burst);
    Promise.all(animations).then(() => burst.remove());
}

function setupMotion() {
    if (motionReady || shouldReduceMotion()) return;
    motionReady = true;
    root.classList.add("motion-ready");

    animate(
        ".topbar, .hero__eyebrow, .hero h1, .hero__subtitle, .hero__actions, .hero__visual",
        { opacity: [0, 1], y: [16, 0] },
        { delay: stagger(0.055), duration: 0.62, ease: [0.16, 1, 0.3, 1] }
    );

    inView(
        ".game-card, .faq-section",
        (element) => {
            animate(element, { opacity: 1, y: 0 }, { duration: 0.48, ease: [0.16, 1, 0.3, 1] });
        },
        { margin: "0px 0px -10% 0px" }
    );
}

function setupSmoothScroll() {
    if (lenis || shouldReduceMotion()) return;

    lenis = new Lenis({
        duration: 0.95,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true
    });

    const raf = (time) => {
        if (!lenis) return;
        lenis.raf(time);
        requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
}

function teardownEnhancedMotion() {
    if (lenis) {
        lenis.destroy();
        lenis = null;
    }

    root.classList.remove("motion-ready");
    document.querySelectorAll(".reveal").forEach((node) => {
        node.style.opacity = "";
        node.style.transform = "";
    });
}

function bindEvents() {
    selectors.languageToggle?.addEventListener("click", toggleLanguage);
    selectors.themeToggle?.addEventListener("click", toggleTheme);
    selectors.sheetDismiss?.addEventListener("click", () => hideWelcomeSheet({ announce: true }));
    selectors.sheetClose?.addEventListener("click", () => hideWelcomeSheet());

    document.querySelectorAll(".game-card").forEach((card) => {
        card.addEventListener("click", () => {
            const title = card.querySelector("[data-card-title]")?.textContent?.trim() || "game";
            showToast(getCurrentCopy().toastOpening.replace("{title}", title));
            emitBurst(card);
        });
    });

    reduceMotionQuery.addEventListener("change", () => {
        if (shouldReduceMotion()) {
            teardownEnhancedMotion();
            return;
        }

        motionReady = false;
        setupSmoothScroll();
        setupMotion();
    });
}

function init() {
    cacheSelectors();
    hydrateIcons();
    setText(selectors.year, new Date().getFullYear().toString());
    applyTheme();
    applyLanguage();
    bindEvents();

    if (!shouldReduceMotion()) {
        setupSmoothScroll();
        setupMotion();
    }

    window.setTimeout(showWelcomeSheet, 2400);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
    init();
}
