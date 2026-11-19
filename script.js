/* =================================
   MY PORTFOLIO - JAVASCRIPT
================================= */

// Wait until the page is ready
document.addEventListener("DOMContentLoaded", () => {

    // =============================
    // 1. DARK MODE TOGGLE
    // =============================

    const themeButton = document.createElement("button");

    themeButton.innerHTML = "☾";
    themeButton.className = "theme-toggle";
    themeButton.title = "Toggle dark mode";

    document.body.appendChild(themeButton);

    // Restore saved theme
    if (localStorage.getItem("portfolioTheme") === "dark") {
        document.body.classList.add("dark-mode");
        themeButton.innerHTML = "☀";
    }

    themeButton.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const isDark = document.body.classList.contains("dark-mode");

        themeButton.innerHTML = isDark ? "☀" : "☾";

        localStorage.setItem(
            "portfolioTheme",
            isDark ? "dark" : "light"
        );

    });


    // =============================
    // 2. BACK TO TOP BUTTON
    // =============================

    const topButton = document.createElement("button");

    topButton.innerHTML = "↑";
    topButton.className = "back-to-top";
    topButton.title = "Back to top";

    document.body.appendChild(topButton);

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {
            topButton.classList.add("show");
        } else {
            topButton.classList.remove("show");
        }

    });

    topButton.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    // =============================
    // 3. SCROLL REVEAL ANIMATION
    // =============================

    const revealElements = document.querySelectorAll(
        ".section, .card, .gallery-card, .gallery-ending"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("revealed");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {

            element.classList.add("reveal");

            revealObserver.observe(element);

        });

    }


    // =============================
    // 4. BREAD SURPRISE BUTTON 🍞
    // =============================

    const aboutSection = document.querySelector("#about");

    if (aboutSection) {

        const breadButton = document.createElement("button");

        breadButton.innerHTML = "🍞 Click for a bread surprise!";
        breadButton.className = "bread-button";

        aboutSection.appendChild(breadButton);

        breadButton.addEventListener("click", () => {

            const breadMessages = [
                "Bread makes everything better! 🍞",
                "You deserve unlimited bread!",
                "Life is better with freshly baked bread ♡",
                "In bread we trust. MWEHEHE!",
                "Sending you a virtual loaf of happiness!"
            ];

            const randomMessage = breadMessages[
                Math.floor(Math.random() * breadMessages.length)
            ];

            showToast(randomMessage);

        });

    }


    // =============================
    // 5. GALLERY IMAGE VIEWER
    // =============================

    const galleryImages = document.querySelectorAll(
        ".gallery-card img"
    );

    if (galleryImages.length > 0) {

        const lightbox = document.createElement("div");

        lightbox.className = "image-lightbox";

        lightbox.innerHTML = `
            <button class="lightbox-close" aria-label="Close image viewer">
                &times;
            </button>
            <img src="" alt="Expanded gallery image">
            <p class="lightbox-caption"></p>
        `;

        document.body.appendChild(lightbox);

        const lightboxImage = lightbox.querySelector("img");
        const lightboxCaption = lightbox.querySelector(
            ".lightbox-caption"
        );

        const closeLightbox = () => {
            lightbox.classList.remove("active");
            document.body.classList.remove("lightbox-open");
        };

        galleryImages.forEach(img => {

            img.style.cursor = "zoom-in";

            img.addEventListener("click", () => {

                lightboxImage.src = img.src;
                lightboxImage.alt = img.alt;

                const caption = img
                    .closest(".gallery-card")
                    .querySelector("h3");

                lightboxCaption.textContent = caption
                    ? caption.textContent
                    : img.alt;

                lightbox.classList.add("active");
                document.body.classList.add("lightbox-open");

            });

        });

        lightbox.querySelector(".lightbox-close")
            .addEventListener("click", closeLightbox);

        lightbox.addEventListener("click", event => {

            if (event.target === lightbox) {
                closeLightbox();
            }

        });

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeLightbox();
            }

        });

    }


    // =============================
    // 6. WELCOME MESSAGE
    // =============================

    if (window.location.pathname.endsWith("index.html") ||
        window.location.pathname.endsWith("/")) {

        setTimeout(() => {
            showToast("Welcome to my little world! ♡");
        }, 1000);

    }


    // =============================
    // TOAST NOTIFICATION
    // =============================

    function showToast(message) {

        let toast = document.querySelector(".portfolio-toast");

        if (!toast) {

            toast = document.createElement("div");

            toast.className = "portfolio-toast";

            document.body.appendChild(toast);

        }

        toast.textContent = message;

        toast.classList.add("toast-show");

        clearTimeout(toast.hideTimer);

        toast.hideTimer = setTimeout(() => {

            toast.classList.remove("toast-show");

        }, 3000);

    }

});


/* ==============================
   BREAD PIÑATA SURPRISE 🍞
============================== */

document.addEventListener("DOMContentLoaded", () => {

    const breadButton = document.getElementById("breadPinata");
    const breadMessage = document.getElementById("breadMessage");

    if (!breadButton || !breadMessage) return;

    let isBreaking = false;

    breadButton.addEventListener("click", () => {

        if (isBreaking) return;

        isBreaking = true;

        // Shake the bread icon
        breadButton.classList.add("breaking");

        // Find the center of the bread button
        const rect = breadButton.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Bread, sweets and sparkles
        const treats = [
            "🍞", "🥐", "🥖", "🥯",
            "🍩", "🧁", "🍪", "💗",
            "💕", "✨", "🌸", "⭐"
        ];

        // Release 24 flying treats
        for (let i = 0; i < 24; i++) {

            const particle = document.createElement("span");

            particle.className = "bread-particle";

            particle.textContent =
                treats[Math.floor(Math.random() * treats.length)];

            particle.style.left = centerX + "px";
            particle.style.top = centerY + "px";

            // Random explosion direction
            const angle = Math.random() * Math.PI * 2;
            const distance = 90 + Math.random() * 170;

            const moveX = Math.cos(angle) * distance;
            const moveY = Math.sin(angle) * distance;

            particle.style.setProperty(
                "--move-x",
                moveX + "px"
            );

            particle.style.setProperty(
                "--move-y",
                moveY + "px"
            );

            particle.style.setProperty(
                "--rotation",
                (Math.random() * 720 - 360) + "deg"
            );

            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 1400);

        }

        // Show the surprise message
        setTimeout(() => {

            breadMessage.classList.add("show");

        }, 350);

        // Hide the message
        setTimeout(() => {

            breadMessage.classList.remove("show");

        }, 2800);

        // Reset the bread button
        setTimeout(() => {

            breadButton.classList.remove("breaking");
            isBreaking = false;

        }, 1000);

    });

});