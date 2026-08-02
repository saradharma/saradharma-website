const header = `

<header>

<div class="container">
    <!-- img src="assets/images/logo.png" alt="SaraDharma Logo" class="logo">
    <h1>SaraDharma</h1>
    <p class="tagline">Nourish Body • Nurture Mind • Live in Harmony</p -->
  </div>
</header>

`;

const navigation = `

<nav class="main-nav">

<ul>

<li><a href="index.html">Home</a></li>

<li><a href="vision.html">Vision</a></li>

<li><a href="facilities.html">Facilities</a></li>

<li><a href="residency.html">Residency</a></li>

<li class="dropdown">

<a href="location.html">Location</a>

<ul class="dropdown-menu">

<li><a href="life-in-halasuru.html">Life in Halasuru</a></li>

</ul>

</li>

<li><a href="registration.html">Registration</a></li>

<li><a href="sponsorship.html">Sponsorship</a></li>

<li><a href="donate.html">Donate</a></li>
<li><a href="contact.html">Contact</a></li>

</ul>

</nav>

`;

const footer = `

<footer>

 <div class="footer-container">
        <img src="assets/images/logo.png" class="logo" alt="SaraDharma Logo">
       

        <h2 class="footer-title">

            SaraDharma

        </h2>

        <p class="footer-tagline">

            Nourish Body • Nurture Mind • Live in Harmony

        </p>

        <p class="footer-motto">

            Living with Purpose • Growing in Harmony • Helping One Another

        </p>

        <div class="footer-divider"></div>

        <p class="footer-message">

            A Residential Wellness Community inspired by timeless
            values where older adults experience dignity,
            companionship, holistic well-being,
            and the joy of helping one another.

        </p>

        <div class="footer-divider"></div>

        <p class="footer-prayer">

            <strong>Sree Guruvayoorappan Sahayam</strong>

            <br><br>

            Hara Hara Shankara<br>

            Jaya Jaya Shankara

        </p>

        <div class="footer-divider"></div>

</footer>

`;

const copyright = `
<div class="copyright">

 © 2026 SaraDharma Community<br>

            All Rights Reserved.
</div>
`;




document.addEventListener("DOMContentLoaded", () => {

    const headerDiv = document.getElementById("header");
    if (headerDiv) {
        headerDiv.innerHTML = header;
    }

    const navigationDiv = document.getElementById("navigation");
    if (navigationDiv) {
        navigationDiv.innerHTML = navigation;
    }

    const footerDiv = document.getElementById("footer");
    if (footerDiv) {
        footerDiv.innerHTML = footer + copyright;
    }

    // Highlight current page
    const current = window.location.pathname.split("/").pop();

    document.querySelectorAll(".navbar a").forEach(link => {

        if (link.getAttribute("href") === current) {

            link.classList.add("active");

        }

    });

});

