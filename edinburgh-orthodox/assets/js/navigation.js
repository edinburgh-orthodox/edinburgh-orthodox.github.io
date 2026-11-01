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

// Pagefind hands focus back to the search button when the dialog closes. If the
// user closed it with Escape, the browser marks that programmatic focus as
// keyboard focus and draws the focus ring, which reads like a lingering
// selection. Suppress the ring for that state only; tabbing to the button still
// shows it.
function initializeSearchFocusReturn() {
    const modal = document.querySelector("pagefind-modal");
    const trigger = document.querySelector(".search-trigger");

    if (!(modal instanceof HTMLElement) || !(trigger instanceof HTMLElement)) {
        return;
    }

    const clear = () => trigger.classList.remove("is-focus-returned");

    const watchDialog = (dialog) => {
        // Escape closes the dialog and focus returns in the same task, so mark
        // the button before the browser paints the returned focus.
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && dialog.hasAttribute("open")) {
                trigger.classList.add("is-focus-returned");
            }
        }, true);

        const observer = new MutationObserver(() => {
            if (dialog.hasAttribute("open")) {
                clear();
                return;
            }

            // Other keyboard closes (the mobile close button) restore focus a
            // moment later, so re-check once the task finishes.
            window.setTimeout(() => {
                if (trigger.contains(document.activeElement)) {
                    trigger.classList.add("is-focus-returned");
                }
            }, 0);
        });

        observer.observe(dialog, { attributes: true, attributeFilter: ["open"] });
    };

    const dialog = modal.querySelector("dialog");

    if (dialog) {
        watchDialog(dialog);
    } else {
        // The component adds its dialog after the script runs.
        const observer = new MutationObserver(() => {
            const added = modal.querySelector("dialog");

            if (added) {
                watchDialog(added);
                observer.disconnect();
            }
        });

        observer.observe(modal, { childList: true });
    }

    trigger.addEventListener("focusout", clear);
    document.addEventListener("pointerdown", clear, true);
}

initializeNavigation();
initializeHeaderScroll();
initializeSearchFocusReturn();
