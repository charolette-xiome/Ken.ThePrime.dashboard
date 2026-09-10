/* =========================================================
   KEN CASE COMPETITION DASHBOARD
   INTERACTIVE SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       ELEMENTS
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
       LIGHTBOX
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
       ZOOM SETTINGS
    ========================================================= */

    let currentZoom = 1;

    const zoomStep = 0.1;
    const minimumZoom = 0.6;
    const maximumZoom = 1.4;


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
       LIGHTBOX
    ========================================================= */

    chartCards.forEach(card => {

        card.addEventListener("click", function () {

            const img =
                this.querySelector(".chart-image");

            const title =
                this.querySelector(".chart-title")
                    .textContent
                    .trim();


            if (!img) {
                return;
            }


            /*
             * Do not open the lightbox if the image
             * itself failed to load.
             */

            if (!img.complete || img.naturalWidth === 0) {

                console.warn(
                    "Image could not be loaded:",
                    img.src
                );

                return;
            }


            lightboxImg.src = img.src;

            lightboxImg.alt =
                img.alt || title;

            lightboxCaption.textContent =
                title;

            lightbox.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });



    /* =========================================================
       CLOSE LIGHTBOX
    ========================================================= */

    function closeLightbox() {

        lightbox.classList.remove("active");

        lightboxImg.src = "";

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
       ESCAPE KEY
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
       IMAGE DEBUGGING
    ========================================================= */

    const images =
        document.querySelectorAll(".chart-image");


    images.forEach(image => {

        image.addEventListener(
            "error",
            function () {

                console.error(
                    "IMAGE FAILED TO LOAD:",
                    image.getAttribute("src")
                );

                /*
                 * Keep the broken image visible in DevTools
                 * instead of replacing it with a fake
                 * "Visualization unavailable" message.
                 */

                image.classList.add("image-error");

            }
        );


        image.addEventListener(
            "load",
            function () {

                console.log(
                    "IMAGE LOADED:",
                    image.getAttribute("src")
                );

            }
        );

    });



    /* =========================================================
       INITIALIZE
    ========================================================= */

    updateZoom();

});
