function initializeNavigation() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".site-nav");
    const closeButton = document.querySelector(".drawer-close");

    if (!(toggle instanceof HTMLButtonElement) || !(nav instanceof HTMLElement)) {
        return;
    }

    const closeDrawer = () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
    };

    const openDrawer = () => {
        nav.classList.add("open");
        toggle.setAttribute("aria-expanded", "true");
    };

    toggle.addEventListener("click", () => {
        if (nav.classList.contains("open")) {
            closeDrawer();
        } else {
            openDrawer();
        }
    });

    closeButton?.addEventListener("click", closeDrawer);

    nav.addEventListener("click", (event) => {
        if (event.target === nav) {
            closeDrawer();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && nav.classList.contains("open")) {
            closeDrawer();
        }
    });
}

function initializeHeaderScroll() {
    const header = document.querySelector(".site-head");

    if (!(header instanceof HTMLElement)) {
        return;
    }

    let queued = false;

    const update = () => {
        header.classList.toggle("is-scrolled", window.scrollY > 12);
        queued = false;
    };

    const onScroll = () => {
        if (queued) {
            return;
        }

        queued = true;
        window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
}

initializeNavigation();
initializeHeaderScroll();
