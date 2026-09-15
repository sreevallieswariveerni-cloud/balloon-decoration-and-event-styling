document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       AOS
    ===================================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({

            duration: 850,

            easing: "ease-out-cubic",

            once: true,

            offset: 80

        });

    }


    /* =====================================================
       LUCIDE ICONS
    ===================================================== */

    if (typeof lucide !== "undefined") {

        lucide.createIcons();

    }



    /* =====================================================
       GALLERY FILTER
    ===================================================== */

    const filterButtons =
        document.querySelectorAll(".gallery-filter");

    const galleryItems =
        document.querySelectorAll(".gallery-item");


    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {


            /* Remove active from all */

            filterButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });


            /* Add active to clicked button */

            button.classList.add("active");


            const filter =
                button.getAttribute("data-filter");


            galleryItems.forEach(function (item) {

                const category =
                    item.getAttribute("data-category");


                if (
                    filter === "all" ||
                    category === filter
                ) {

                    item.classList.remove("hidden");

                    item.style.animation =
                        "galleryReveal 0.5s ease forwards";

                }

                else {

                    item.classList.add("hidden");

                }

            });


        });

    });



    /* =====================================================
       LIGHTBOX
    ===================================================== */

    const lightbox =
        document.getElementById("galleryLightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxCaption =
        document.getElementById("lightboxCaption");

    const closeButton =
        document.getElementById("lightboxClose");

    const prevButton =
        document.getElementById("lightboxPrev");

    const nextButton =
        document.getElementById("lightboxNext");


    let visibleItems = [];

    let currentIndex = 0;



    /* =====================================================
       UPDATE VISIBLE ITEMS
    ===================================================== */

    function updateVisibleItems() {

        visibleItems =
            Array.from(galleryItems)
                .filter(function (item) {

                    return !item.classList.contains("hidden");

                });

    }


    updateVisibleItems();



    /* =====================================================
       OPEN LIGHTBOX
    ===================================================== */

    function openLightbox(index) {

        updateVisibleItems();

        currentIndex = index;

        showImage(currentIndex);

        lightbox.classList.add("active");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";

    }



    /* =====================================================
       SHOW IMAGE
    ===================================================== */

    function showImage(index) {

        if (!visibleItems.length) return;


        if (index < 0) {

            currentIndex =
                visibleItems.length - 1;

        }

        else if (
            index >= visibleItems.length
        ) {

            currentIndex = 0;

        }

        else {

            currentIndex = index;

        }


        const item =
            visibleItems[currentIndex];


        const image =
            item.querySelector("img");


        const category =
            item.querySelector(".gallery-overlay span");


        lightboxImage.src =
            image.src;

        lightboxImage.alt =
            image.alt;


        lightboxCaption.textContent =
            category
                ? category.textContent
                : "";


        lightboxImage.style.opacity = "0";


        setTimeout(function () {

            lightboxImage.style.opacity = "1";

        }, 80);

    }



    /* =====================================================
       IMAGE CLICK
    ===================================================== */

    galleryItems.forEach(function (item) {

        const image =
            item.querySelector(".gallery-image");


        image.addEventListener("click", function () {

            updateVisibleItems();


            const index =
                visibleItems.indexOf(item);


            openLightbox(index);

        });

    });



    /* =====================================================
       CLOSE LIGHTBOX
    ===================================================== */

    function closeLightbox() {

        lightbox.classList.remove("active");

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";

    }


    closeButton.addEventListener(
        "click",
        closeLightbox
    );



    /* =====================================================
       PREVIOUS
    ===================================================== */

    prevButton.addEventListener(
        "click",
        function () {

            showImage(currentIndex - 1);

        }
    );



    /* =====================================================
       NEXT
    ===================================================== */

    nextButton.addEventListener(
        "click",
        function () {

            showImage(currentIndex + 1);

        }
    );



    /* =====================================================
       CLICK OUTSIDE IMAGE
    ===================================================== */

    lightbox.addEventListener(
        "click",
        function (event) {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );



    /* =====================================================
       KEYBOARD CONTROLS
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {


            if (
                !lightbox.classList.contains("active")
            ) {

                return;

            }


            if (event.key === "Escape") {

                closeLightbox();

            }


            if (event.key === "ArrowLeft") {

                showImage(currentIndex - 1);

            }


            if (event.key === "ArrowRight") {

                showImage(currentIndex + 1);

            }

        }
    );



    /* =====================================================
       UPDATE VISIBLE ITEMS AFTER FILTER
    ===================================================== */

    filterButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                updateVisibleItems();

            }
        );

    });


});