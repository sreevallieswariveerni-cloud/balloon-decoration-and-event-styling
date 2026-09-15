// =========================================
// LUCIDE ICONS
// =========================================

lucide.createIcons();


// =========================================
// DARK MODE
// =========================================

function initThemeToggle() {

    const themeToggle =
        document.getElementById("theme-toggle");

    if (!themeToggle) return;

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const isDark =
            document.body.classList.contains("dark-mode");

        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );

    });

}


// =========================================
// RTL / LTR
// =========================================

function initDirectionToggle() {

    const directionToggle =
        document.getElementById("direction-toggle");

    if (!directionToggle) return;

    const savedDirection =
        localStorage.getItem("direction");

    if (savedDirection === "rtl") {

        document.documentElement.setAttribute(
            "dir",
            "rtl"
        );

        document.body.classList.add("rtl-mode");

    }

    directionToggle.addEventListener("click", () => {

        const currentDirection =
            document.documentElement.getAttribute("dir");

        if (currentDirection === "rtl") {

            document.documentElement.setAttribute(
                "dir",
                "ltr"
            );

            document.body.classList.remove(
                "rtl-mode"
            );

            localStorage.setItem(
                "direction",
                "ltr"
            );

        } else {

            document.documentElement.setAttribute(
                "dir",
                "rtl"
            );

            document.body.classList.add(
                "rtl-mode"
            );

            localStorage.setItem(
                "direction",
                "rtl"
            );

        }

    });

}


// Initialize

initThemeToggle();
initDirectionToggle();