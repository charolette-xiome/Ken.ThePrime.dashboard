document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================================
    // 1. FILTER FUNCTIONALITY
    // =========================================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const chartCards = document.querySelectorAll('.chart-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and add to the clicked one
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            chartCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('is-hidden');
                } else {
                    card.classList.add('is-hidden');
                }
            });
        });
    });

    // =========================================================
    // 2. ZOOM FUNCTIONALITY
    // =========================================================
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const resetZoomBtn = document.getElementById('reset-view');
    const zoomLevelText = document.getElementById('zoom-level');
    const chartGrid = document.getElementById('chart-grid');

    let currentZoom = 100;
    const zoomStep = 10;
    const maxZoom = 150;
    const minZoom = 50;

    function applyZoom() {
        chartGrid.style.transform = `scale(${currentZoom / 100})`;
        zoomLevelText.textContent = `${currentZoom}%`;
        
        // Adjust grid margin based on scale to prevent overlap/cutoff
        if (currentZoom !== 100) {
            chartGrid.style.marginBottom = `${((currentZoom - 100) / 100) * chartGrid.scrollHeight}px`;
        } else {
            chartGrid.style.marginBottom = '0';
        }
    }

    zoomInBtn.addEventListener('click', () => {
        if (currentZoom < maxZoom) {
            currentZoom += zoomStep;
            applyZoom();
        }
    });

    zoomOutBtn.addEventListener('click', () => {
        if (currentZoom > minZoom) {
            currentZoom -= zoomStep;
            applyZoom();
        }
    });

    resetZoomBtn.addEventListener('click', () => {
        currentZoom = 100;
        applyZoom();
    });

    // =========================================================
    // 3. LIGHTBOX FUNCTIONALITY
    // =========================================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    chartCards.forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('.chart-image');
            const title = card.querySelector('.chart-title');

            if (img && img.src) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightboxCaption.textContent = title ? title.textContent.trim() : '';
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore background scrolling
        // Delay clearing src to allow fade-out animation to complete
        setTimeout(() => { lightboxImg.src = ''; }, 300);
    }

    lightboxClose.addEventListener('click', closeLightbox);

    // Close when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // =========================================================
    // 4. BROKEN IMAGE FALLBACK (Optional but helpful)
    // =========================================================
    const allImages = document.querySelectorAll('.chart-image');
    allImages.forEach(img => {
        img.addEventListener('error', function() {
            this.classList.add('image-error');
            this.alt = "Image failed to load";
        });
    });
});
