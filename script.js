"use strict";


/* =========================================================
   STICKING TO THE GOAL
   KEN CASE COMPETITION 2026
   Dashboard Interaction System
========================================================= */

document.documentElement.classList.add("js-enabled");


document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENT REFERENCES
    ====================================================== */

    const body = document.body;

    const chartGrid =
        document.getElementById("visualizations");

    const chartCards =
        Array.from(
            document.querySelectorAll(".chart-card")
        );

    const filterButtons =
        Array.from(
            document.querySelectorAll(".filter-btn")
        );

    const searchInput =
        document.getElementById("chart-search");

    const visibleCount =
        document.getElementById("visible-count");

    const noResults =
        document.getElementById("no-results");

    const clearSearchButton =
        document.getElementById("clear-search");

    const zoomInButton =
        document.getElementById("zoom-in");

    const zoomOutButton =
        document.getElementById("zoom-out");

    const resetViewButton =
        document.getElementById("reset-view");

    const zoomLevel =
        document.getElementById("zoom-level");

    const themeToggle =
        document.getElementById("theme-toggle");

    const scrollProgress =
        document.getElementById(
            "scroll-progress-bar"
        );

    const backToTop =
        document.getElementById("back-to-top");


    /* =====================================================
       STATE
    ====================================================== */

    let activeFilter = "all";

    let searchTerm = "";

    let currentZoom = 100;

    const minZoom = 80;

    const maxZoom = 120;

    const zoomStep = 10;

    let visibleCards = [...chartCards];

    let currentLightboxIndex = 0;

    let lastFocusedElement = null;


    /* =====================================================
       HELPERS
    ====================================================== */

    function normalize(value) {
        return String(value || "")
            .trim()
            .toLowerCase();
    }


    function updateResultCount() {

        const count = visibleCards.length;

        visibleCount.textContent = count;

        noResults.classList.toggle(
            "visible",
            count === 0
        );
    }


    /* =====================================================
       FILTER + SEARCH
    ====================================================== */

    function applyFilters() {

        visibleCards = [];

        chartCards.forEach(card => {

            const category =
                normalize(
                    card.dataset.category
                );

            const title =
                normalize(
                    card.dataset.title
                );

            const descriptionElement =
                card.querySelector(
                    ".card-heading p"
                );

            const description =
                normalize(
                    descriptionElement
                        ? descriptionElement.textContent
                        : ""
                );

            const matchesCategory =
                activeFilter === "all" ||
                category === activeFilter;

            const matchesSearch =
                !searchTerm ||
                title.includes(searchTerm) ||
                category.includes(searchTerm) ||
                description.includes(searchTerm);

            const shouldShow =
                matchesCategory &&
                matchesSearch;

            card.classList.toggle(
                "is-hidden",
                !shouldShow
            );

            if (shouldShow) {
                visibleCards.push(card);
            }
        });

        updateResultCount();

        updateGridState();
    }


    function updateGridState() {

        chartGrid.style.opacity = "0.45";

        requestAnimationFrame(() => {

            chartGrid.style.opacity = "1";

        });
    }


    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                filterButtons.forEach(
                    item => {
                        item.classList.remove(
                            "active"
                        );
                    }
                );

                button.classList.add("active");

                activeFilter =
                    button.dataset.filter ||
                    "all";

                applyFilters();
            }
        );

    });


    searchInput.addEventListener(
        "input",
        event => {

            searchTerm =
                normalize(
                    event.target.value
                );

            applyFilters();
        }
    );


    clearSearchButton.addEventListener(
        "click",
        () => {

            searchInput.value = "";

            searchTerm = "";

            activeFilter = "all";

            filterButtons.forEach(
                button => {

                    button.classList.toggle(
                        "active",
                        button.dataset.filter === "all"
                    );

                }
            );

            applyFilters();

            searchInput.focus();
        }
    );


    /* =====================================================
       SEARCH KEYBOARD SHORTCUT
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            const tag =
                document.activeElement.tagName;

            const isTyping =
                tag === "INPUT" ||
                tag === "TEXTAREA" ||
                tag === "SELECT";

            if (
                event.key === "/" &&
                !isTyping
            ) {

                event.preventDefault();

                searchInput.focus();
            }

        }
    );


    /* =====================================================
       ZOOM
    ====================================================== */

    function applyZoom() {

        /*
         * Instead of scaling the complete CSS grid with
         * transform(), we modify the grid's column density.
         *
         * This avoids the strange whitespace and overflow
         * caused by transform-based layout zooming.
         */

        if (currentZoom === 80) {

            chartGrid.style.gridTemplateColumns =
                "repeat(5, minmax(0, 1fr))";

        } else if (currentZoom === 90) {

            chartGrid.style.gridTemplateColumns =
                "repeat(4, minmax(0, 1fr))";

        } else if (currentZoom === 100) {

            chartGrid.style.gridTemplateColumns =
                "repeat(4, minmax(0, 1fr))";

        } else if (currentZoom === 110) {

            chartGrid.style.gridTemplateColumns =
                "repeat(3, minmax(0, 1fr))";

        } else if (currentZoom === 120) {

            chartGrid.style.gridTemplateColumns =
                "repeat(3, minmax(0, 1fr))";
        }

        zoomLevel.textContent =
            `${currentZoom}%`;
    }


    zoomInButton.addEventListener(
        "click",
        () => {

            if (currentZoom < maxZoom) {

                currentZoom += zoomStep;

                applyZoom();
            }

        }
    );


    zoomOutButton.addEventListener(
        "click",
        () => {

            if (currentZoom > minZoom) {

                currentZoom -= zoomStep;

                applyZoom();
            }

        }
    );


    resetViewButton.addEventListener(
        "click",
        () => {

            currentZoom = 100;

            applyZoom();

            searchInput.value = "";

            searchTerm = "";

            activeFilter = "all";

            filterButtons.forEach(
                button => {

                    button.classList.toggle(
                        "active",
                        button.dataset.filter === "all"
                    );

                }
            );

            applyFilters();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    );


    /* =====================================================
       THEME
    ====================================================== */

    const storedTheme =
        localStorage.getItem(
            "ken-dashboard-theme"
        );

    if (storedTheme === "light") {

        body.classList.add(
            "light-theme"
        );
    }


    themeToggle.addEventListener(
        "click",
        () => {

            body.classList.toggle(
                "light-theme"
            );

            const isLight =
                body.classList.contains(
                    "light-theme"
                );

            localStorage.setItem(
                "ken-dashboard-theme",
                isLight
                    ? "light"
                    : "dark"
            );
        }
    );


    /* =====================================================
       LIGHTBOX REFERENCES
    ====================================================== */

    const lightbox =
        document.getElementById(
            "lightbox"
        );

    const lightboxImage =
        document.getElementById(
            "lightbox-img"
        );

    const lightboxCaption =
        document.getElementById(
            "lightbox-caption"
        );

    const lightboxCategory =
        document.getElementById(
            "lightbox-category"
        );

    const lightboxCurrent =
        document.getElementById(
            "lightbox-current"
        );

    const lightboxTotal =
        document.getElementById(
            "lightbox-total"
        );

    const lightboxClose =
        document.getElementById(
            "lightbox-close"
        );

    const lightboxPrev =
        document.getElementById(
            "lightbox-prev"
        );

    const lightboxNext =
        document.getElementById(
            "lightbox-next"
        );

    const copyTitleButton =
        document.getElementById(
            "copy-title"
        );

    const downloadImage =
        document.getElementById(
            "download-image"
        );


    /* =====================================================
       LIGHTBOX DATA
    ====================================================== */

    function getVisibleCards() {

        return chartCards.filter(
            card =>
                !card.classList.contains(
                    "is-hidden"
                )
        );
    }


    function updateLightbox(index) {

        const cards =
            getVisibleCards();

        if (!cards.length) {
            return;
        }

        if (index < 0) {
            index = cards.length - 1;
        }

        if (index >= cards.length) {
            index = 0;
        }

        currentLightboxIndex = index;

        const card = cards[index];

        const image =
            card.querySelector(
                ".chart-image"
            );

        const title =
            card.dataset.title ||
            "Visualization";

        const category =
            card.dataset.category ||
            "Research";

        if (!image) {
            return;
        }

        lightboxImage.src =
            image.currentSrc ||
            image.src;

        lightboxImage.alt =
            image.alt ||
            title;

        lightboxCaption.textContent =
            title;

        lightboxCategory.textContent =
            category;

        lightboxCurrent.textContent =
            String(index + 1).padStart(2, "0");

        lightboxTotal.textContent =
            String(cards.length).padStart(2, "0");

        downloadImage.href =
            image.currentSrc ||
            image.src;

        downloadImage.download =
            `ken-case-${String(
                card.dataset.index || index + 1
            ).padStart(2, "0")}.jpg`;
    }


    function openLightbox(card) {

        const cards =
            getVisibleCards();

        const index =
            cards.indexOf(card);

        if (index === -1) {
            return;
        }

        lastFocusedElement =
            document.activeElement;

        updateLightbox(index);

        lightbox.classList.add(
            "active"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

        body.style.overflow =
            "hidden";

        lightboxClose.focus();
    }


    function closeLightbox() {

        lightbox.classList.remove(
            "active"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        body.style.overflow = "";

        lightboxImage.src = "";

        if (
            lastFocusedElement &&
            typeof lastFocusedElement.focus ===
                "function"
        ) {

            lastFocusedElement.focus();

        }

    }


    function nextVisualization() {

        updateLightbox(
            currentLightboxIndex + 1
        );
    }


    function previousVisualization() {

        updateLightbox(
            currentLightboxIndex - 1
        );
    }


    /* =====================================================
       CARD CLICK
    ====================================================== */

    chartCards.forEach(card => {

        card.addEventListener(
            "click",
            event => {

                /*
                 * Ignore accidental activation when
                 * clicking an internal control.
                 */

                if (
                    event.target.closest(
                        "button, a"
                    )
                ) {
                    return;
                }

                openLightbox(card);
            }
        );


        card.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openLightbox(card);
                }

            }
        );

    });


    /* =====================================================
       LIGHTBOX CONTROLS
    ====================================================== */

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );


    lightboxPrev.addEventListener(
        "click",
        previousVisualization
    );


    lightboxNext.addEventListener(
        "click",
        nextVisualization
    );


    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                lightbox ||
                event.target.classList.contains(
                    "lightbox-backdrop"
                )
            ) {

                closeLightbox();
            }

        }
    );


    /* =====================================================
       LIGHTBOX KEYBOARD NAVIGATION
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox.classList.contains(
                    "active"
                )
            ) {
                return;
            }

            switch (event.key) {

                case "Escape":

                    closeLightbox();

                    break;

                case "ArrowRight":

                    nextVisualization();

                    break;

                case "ArrowLeft":

                    previousVisualization();

                    break;

                default:
                    break;
            }

        }
    );


    /* =====================================================
       COPY TITLE
    ====================================================== */

    copyTitleButton.addEventListener(
        "click",
        async () => {

            const title =
                lightboxCaption.textContent;

            try {

                await navigator.clipboard.writeText(
                    title
                );

                const originalText =
                    copyTitleButton.textContent;

                copyTitleButton.textContent =
                    "Copied ✓";

                setTimeout(
                    () => {

                        copyTitleButton.textContent =
                            originalText;

                    },
                    1300
                );

            } catch (error) {

                /*
                 * Clipboard may be unavailable in
                 * restricted browser contexts.
                 */

                copyTitleButton.textContent =
                    "Copy unavailable";

                setTimeout(
                    () => {

                        copyTitleButton.textContent =
                            "Copy title";

                    },
                    1300
                );
            }

        }
    );


    /* =====================================================
       IMAGE FALLBACK
    ====================================================== */

    chartCards.forEach(card => {

        const image =
            card.querySelector(
                ".chart-image"
            );

        if (!image) {
            return;
        }

        image.addEventListener(
            "error",
            () => {

                image.classList.add(
                    "image-error"
                );

                image.alt =
                    "Visualization could not be loaded.";
            }
        );

    });


    /* =====================================================
       SCROLL PROGRESS
    ====================================================== */

    function updateScrollProgress() {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement
                .scrollHeight;

        const viewportHeight =
            window.innerHeight;

        const scrollable =
            documentHeight -
            viewportHeight;

        const progress =
            scrollable > 0
                ? (scrollTop / scrollable) * 100
                : 0;

        scrollProgress.style.width =
            `${Math.min(
                100,
                Math.max(0, progress)
            )}%`;

        backToTop.classList.toggle(
            "visible",
            scrollTop > 700
        );
    }


    window.addEventListener(
        "scroll",
        updateScrollProgress,
        { passive: true }
    );


    /* =====================================================
       BACK TO TOP
    ====================================================== */

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =====================================================
       REVEAL ON SCROLL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );

    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "revealed"
                                );

                                observer.unobserve(
                                    entry.target
                                );
                            }

                        }
                    );

                },
                {
                    threshold: 0.08,
                    rootMargin: "0px 0px -40px 0px"
                }
            );

        revealElements.forEach(
            element => {
                observer.observe(element);
            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "revealed"
                );

            }
        );

    }


    /* =====================================================
       INITIALIZE
    ====================================================== */

    applyZoom();

    applyFilters();

    updateScrollProgress();

});
