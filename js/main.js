/* ==========================================
   ARKOBOMBS V4
   HOMEPAGE JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const navbar =
        document.querySelector(".navbar");


    /* ======================================
       NAVBAR SCROLL EFFECT
    ====================================== */

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            navbar.style.boxShadow =
                "0 18px 45px rgba(91,54,160,.14)";

            navbar.style.background =
                "rgba(255,255,255,.86)";

        } else {

            navbar.style.boxShadow =
                "0 15px 40px rgba(108,72,160,.08)";

            navbar.style.background =
                "rgba(255,255,255,.72)";

        }

    });


    /* ======================================
       SCROLL REVEAL
    ====================================== */

    const revealItems =
        document.querySelectorAll(
            ".feature-card, .prototype-card, .about-card"
        );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                    }

                });

            },
            {
                threshold: .15
            }
        );


    revealItems.forEach(item => {

        item.style.opacity = "0";

        item.style.transform =
            "translateY(25px)";

        item.style.transition =
            "opacity .7s ease, transform .7s ease";

        observer.observe(item);

    });


    /* ======================================
       LAPTOP FLOATING MOVEMENT
    ====================================== */

    const laptop =
        document.querySelector(
            ".laptop-wrapper"
        );


    document.addEventListener(
        "mousemove",
        event => {

            if (!laptop) return;

            const x =
                (event.clientX /
                    window.innerWidth) -
                .5;

            const y =
                (event.clientY /
                    window.innerHeight) -
                .5;


            laptop.style.transform =
                `translateX(15px)
                 rotate(-1deg)
                 translate(${x * 7}px, ${y * 7}px)`;

        }
    );


    console.log(
        "ARKOBOMBS V4 Homepage Loaded."
    );

});