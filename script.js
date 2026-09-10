/* =========================================================
   KEN CASE COMPETITION DASHBOARD
   INTERACTIVE SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       HTML ELEMENTS
       ========================================================= */

    const chartGrid = document.getElementById("chart-grid");

    const zoomInButton = document.getElementById("zoom-in");
    const zoomOutButton = document.getElementById("zoom-out");
    const resetButton = document.getElementById("reset-view");

    const zoomLevel = document.getElementById("zoom-level");

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const chartCards =
        document.querySelectorAll(".chart-card");


    /* =========================================================
       LIGHTBOX ELEMENTS
       ========================================================= */

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImg =
        document.getElementById("lightbox-img");

    const lightboxCaption =
        document.getElementById("lightbox-caption");

    const lightboxClose =
        document.querySelector(".lightbox-close");


    /* =========================================================
       ZOOM STATE
       ========================================================= */

    let currentZoom = 1;

    const zoomStep = 0.1;
    const minimumZoom = 0.6;
    const maximumZoom = 1.4;


    /* =========================================================
       ZOOM SYSTEM
       ========================================================= */

    function updateZoom() {

        chartGrid.style.transform =
            `scale(${currentZoom})`;

        zoomLevel.textContent =
            `${Math.round(currentZoom * 100)}%`;
    }


    zoomInButton.addEventListener("click", function () {

        if (currentZoom < maximumZoom) {

            currentZoom += zoomStep;

            currentZoom =
                Math.round(currentZoom * 10) / 10;

            updateZoom();
        }
    });


    zoomOutButton.addEventListener("click", function () {

        if (currentZoom > minimumZoom) {

            currentZoom -= zoomStep;

            currentZoom =
                Math.round(currentZoom * 10) / 10;

            updateZoom();
        }
    });


    resetButton.addEventListener("click", function () {

        currentZoom = 1;

        updateZoom();
    });


    /* =========================================================
       CATEGORY FILTERING
       ========================================================= */

    filterButtons.forEach(button => {

        button.addEventListener("click", function () {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            this.classList.add("active");

            const filterValue =
                this.getAttribute("data-filter");


            chartCards.forEach(card => {

                const cardCategory =
                    card.getAttribute("data-category");


                if (
                    filterValue === "all" ||
                    cardCategory === filterValue
                ) {

                    card.classList.remove("is-hidden");

                } else {

                    card.classList.add("is-hidden");
                }
            });
        });
    });


    /* =========================================================
       LIGHTBOX EXPANSION
       ========================================================= */

    chartCards.forEach(card => {

        card.addEventListener("click", function () {

            const img =
                this.querySelector(".chart-image");

            const title =
                this.querySelector(".chart-title")
                    .textContent;


            if (img && img.src) {

                lightboxImg.src = img.src;

                lightboxImg.alt =
                    img.alt || title;

                lightboxCaption.textContent =
                    title;

                lightbox.classList.add("active");

                document.body.style.overflow = "hidden";
            }
        });
    });


    /* =========================================================
       CLOSE LIGHTBOX
       ========================================================= */

    function closeLightbox() {

        lightbox.classList.remove("active");

        document.body.style.overflow = "";
    }


    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );


    lightbox.addEventListener(
        "click",
        function (event) {

            if (event.target === lightbox) {
                closeLightbox();
            }
        }
    );


    /* =========================================================
       ESC KEY — CLOSE LIGHTBOX
       ========================================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                lightbox.classList.contains("active")
            ) {
                closeLightbox();
            }
        }
    );


    /* =========================================================
       IMAGE ERROR HANDLING
       ========================================================= */

    const images =
        document.querySelectorAll(".chart-image");


    images.forEach(image => {

        image.addEventListener(
            "error",
            function () {

                console.error(
                    "Could not load image:",
                    image.src
                );


                const parent =
                    image.parentElement;


                image.style.display = "none";


                const errorBox =
                    document.createElement("div");


                errorBox.textContent =
                    "Visualization unavailable";


                errorBox.style.padding =
                    "30px";

                errorBox.style.textAlign =
                    "center";

                errorBox.style.color =
                    "#9ca3af";

                errorBox.style.fontSize =
                    "13px";


                parent.appendChild(errorBox);
            }
        );
    });


    /* =========================================================
       INITIALIZE
       ========================================================= */

    updateZoom();

});
