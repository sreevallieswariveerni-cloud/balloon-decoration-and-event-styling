// =========================================================
// LOAD HEADER
// =========================================================

fetch("header.html")
    .then(response => response.text())
    .then(data => {

        document.getElementById("header").innerHTML = data;

// Set active navigation
setActiveNav();

// Initialize Dark Mode
initThemeToggle();

// Initialize RTL / LTR
initDirectionToggle();
initMobileMenu();
// Initialize Lucide icons
if (typeof lucide !== "undefined") {
    lucide.createIcons();
}

    })
    .catch(error => {
        console.error("Error loading header:", error);
    });


// =========================================================
// LOAD FOOTER
// =========================================================

fetch("footer.html")
    .then(response => response.text())
    .then(data => {

        document.getElementById("footer").innerHTML = data;

        // Initialize footer icons
        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }

    })
    .catch(error => {
        console.error("Error loading footer:", error);
    });


// =========================================================
// ACTIVE NAVIGATION
// =========================================================

function setActiveNav() {

    // Get current page name
    let currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();
    if (currentPage === "") {
        currentPage = "index.html";
    }


    // Get all navigation links
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.classList.remove("active");

    });

    navLinks.forEach(link => {

        const href = link.getAttribute("href");

        if (!href) return;


        const linkPage = href
            .split("/")
            .pop()
            .toLowerCase();


        // Normal pages
        if (linkPage === currentPage) {

            link.classList.add("active");

        }

    });


    // =====================================================
    // HOME DROPDOWN
    // =====================================================

    if (
        currentPage === "index.html" ||
        currentPage === "home-2.html"
    ) {

        const homeLink = document.querySelector(
            ".nav-dropdown > .nav-link"
        );

        if (homeLink) {

            homeLink.classList.add("active");

        }

    }

}
// =========================================================
// DARK MODE
// =========================================================

function initThemeToggle() {

    const themeToggle = document.getElementById("theme-toggle");

    if (!themeToggle) return;

    // Check saved theme
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }


    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        // Save theme
        if (document.body.classList.contains("dark-mode")) {

            localStorage.setItem("theme", "dark");

        } else {

            localStorage.setItem("theme", "light");

        }

    });

}


// =========================================================
// RTL / LTR
// =========================================================

function initDirectionToggle() {

    const directionToggle =
        document.getElementById("direction-toggle");

    if (!directionToggle) return;


    // Check saved direction
    const savedDirection =
        localStorage.getItem("direction");


    if (savedDirection === "rtl") {

        document.documentElement.setAttribute("dir", "rtl");

        document.body.classList.add("rtl-mode");

    } else {

        document.documentElement.setAttribute("dir", "ltr");

        document.body.classList.remove("rtl-mode");

    }


    directionToggle.addEventListener("click", () => {

        const currentDirection =
            document.documentElement.getAttribute("dir");


        if (currentDirection === "rtl") {

            // Change to LTR
            document.documentElement.setAttribute("dir", "ltr");

            document.body.classList.remove("rtl-mode");

            localStorage.setItem("direction", "ltr");

        } else {

            // Change to RTL
            document.documentElement.setAttribute("dir", "rtl");

            document.body.classList.add("rtl-mode");

            localStorage.setItem("direction", "rtl");

        }

    });

} 
// =========================================================
// MOBILE MENU
// =========================================================

function initMobileMenu() {
    const menuButton = document.getElementById("mobile-menu-toggle");
    const navigation = document.querySelector(".main-navigation");

    if (!menuButton || !navigation) return;

    // Mobile menu open / close
    menuButton.addEventListener("click", function () {
        navigation.classList.toggle("mobile-menu-open");

        const isOpen =
            navigation.classList.contains("mobile-menu-open");

        menuButton.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );
    });

    // =====================================================
    // HOME DROPDOWN
    // =====================================================

    const homeDropdown = navigation.querySelector(".nav-dropdown");
    const homeToggle = navigation.querySelector(
        ".nav-dropdown > .dropdown-toggle"
    );

    if (homeDropdown && homeToggle) {

        homeToggle.addEventListener("click", function (event) {

            // Only arrow click opens dropdown
            if (event.target.closest("svg")) {

                event.preventDefault();
                event.stopPropagation();

                homeDropdown.classList.toggle("dropdown-open");

            }

        });
    }

    // =====================================================
    // CLOSE MENU AFTER NORMAL LINK CLICK
    // =====================================================

    const navLinks = navigation.querySelectorAll(
        ".nav-link:not(.dropdown-toggle), .dropdown-menu a"
    );

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navigation.classList.remove("mobile-menu-open");

            if (homeDropdown) {
                homeDropdown.classList.remove("dropdown-open");
            }

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });

}