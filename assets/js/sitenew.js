// SaraDharma Website
// site.js
// Version 1.0

document.addEventListener("DOMContentLoaded", function () {
    highlightCurrentMenu();
    enableSmoothScrolling();
    enableFormValidation();
    updateFooterYear();
});

// ---------------------------------------------------
// Highlight current page
// ---------------------------------------------------

function highlightCurrentMenu() {

    const page = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".main-nav a").forEach(link => {

        if (link.getAttribute("href") === page) {

            link.classList.add("active");

        }

    });

}

// ---------------------------------------------------
// Smooth scrolling
// ---------------------------------------------------

function enableSmoothScrolling() {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });

}

// ---------------------------------------------------
// Simple Form Validation
// ---------------------------------------------------

function enableFormValidation() {

    document.querySelectorAll("form").forEach(form => {

        form.addEventListener("submit", function (e) {

            let valid = true;

            this.querySelectorAll("[required]").forEach(field => {

                field.classList.remove("error");

                if (field.value.trim() === "") {

                    valid = false;

                    field.classList.add("error");

                }

            });

            const email = this.querySelector('input[type="email"]');

            if (email && email.value !== "") {

                const pattern =
                    /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

                if (!pattern.test(email.value)) {

                    valid = false;

                    email.classList.add("error");

                }

            }

            if (!valid) {

                e.preventDefault();

                alert("Please complete the highlighted fields.");

            }

        });

    });

}

// ---------------------------------------------------
// Footer Year
// ---------------------------------------------------

function updateFooterYear() {

    const year = new Date().getFullYear();

    document.querySelectorAll(".currentYear").forEach(el => {

        el.innerHTML = year;

    });

}

// ---------------------------------------------------
// Placeholder Modules
// ---------------------------------------------------

const SaraDharma = {

    donation() {

        console.log("Donation Module");

    },

    maps() {

        console.log("Google Maps Module");

    },

    gallery() {

        console.log("Gallery Module");

    },

    registration() {

        console.log("Registration Module");

    }

};

