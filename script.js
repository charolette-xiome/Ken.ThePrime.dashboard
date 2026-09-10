/* =========================================================
   KEN CASE COMPETITION
   DASHBOARD JAVASCRIPT
   ========================================================= */


/* =========================================================
   GET HTML ELEMENTS
   ========================================================= */

const chartGrid =
    document.getElementById("chart-grid");


const zoomInButton =
    document.getElementById("zoom-in");


const zoomOutButton =
    document.getElementById("zoom-out");


const resetButton =
    document.getElementById("reset-view");


const zoomLevel =
    document.getElementById("zoom-level");


/* =========================================================
   ZOOM SETTINGS
   ========================================================= */

let currentZoom = 1;

const zoomStep = 0.1;

const minimumZoom = 0.5;

const maximumZoom = 1.5;


/* =========================================================
   UPDATE ZOOM
   ========================================================= */

function updateZoom() {

    chartGrid.style.transform =
        `scale(${currentZoom})`;

    zoomLevel.textContent =
        `${Math.round(currentZoom * 100)}%`;

}


/* =========================================================
   ZOOM IN
   ========================================================= */

zoomInButton.addEventListener(
    "click",
    function () {

        if (currentZoom < maximumZoom) {

            currentZoom += zoomStep;

            currentZoom =
                Math.round(
                    currentZoom * 10
                ) / 10;

            updateZoom();

        }

    }
);


/* =========================================================
   ZOOM OUT
   ========================================================= */

zoomOutButton.addEventListener(
    "click",
    function () {

        if (currentZoom > minimumZoom) {

            currentZoom -= zoomStep;

            currentZoom =
                Math.round(
                    currentZoom * 10
                ) / 10;

            updateZoom();

        }

    }
);


/* =========================================================
   RESET ZOOM
   ========================================================= */

resetButton.addEventListener(
    "click",
    function () {

        currentZoom = 1;

        updateZoom();

    }
);


/* =========================================================
   CHECK IMAGE LOADING
   ========================================================= */

const images =
    document.querySelectorAll(
        ".chart-image"
    );


images.forEach(
    function (image) {

        image.addEventListener(
            "error",
            function () {

                console.error(
                    "Could not load image:",
                    image.src
                );

                image.style.display =
                    "none";

                const errorMessage =
                    document.createElement(
                        "div"
                    );

                errorMessage.textContent =
                    "Image could not be loaded.";

                errorMessage.style.padding =
                    "40px";

                errorMessage.style.textAlign =
                    "center";

                errorMessage.style.color =
                    "#777";

                image.parentElement.appendChild(
                    errorMessage
                );

            }
        );

    }
);


/* =========================================================
   INITIALIZE
   ========================================================= */

updateZoom();
