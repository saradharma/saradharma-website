/**************************************************************************
 *
 * SaraDharma Community
 *
 * Version : 5.1
 * File    : layout.js
 *
 * Purpose :
 * Common Header, Navigation and Footer used by all pages.
 *
 **************************************************************************/


/**************************************************************************
HEADER
**************************************************************************/

const header = `

<header class="site-header">

    <div class="header-container">

        <a href="index.html" class="logo-link">

            <img
                src="assets/images/logo.png"
                alt="SaraDharma Community"
                class="logo">

        </a>

        <div class="site-title">

            <h1>

                SaraDharma Community

            </h1>

            <div class="site-motto">

                HELP • ONE • ANOTHER

            </div>

            <div class="site-tagline">

                Nourish Body • Nurture Mind • Live in Harmony

            </div>

        </div>

    </div>

</header>

`;


/**************************************************************************
NAVIGATION
**************************************************************************/

const navigation = `

<nav class="main-nav">

<ul>

<li>

<a href="index.html">

Home

</a>

</li>



<li>

<a href="vision.html">

Vision

</a>

</li>



<li>

<a href="facilities.html">

Facilities

</a>

</li>



<li>

<a href="residency.html">

Residency

</a>

</li>



<li class="dropdown">

<a href="location.html">

Location

</a>

<ul class="dropdown-menu">

<li>

<a href="life-in-halasuru.html">

Life in Halasuru

</a>

</li>

</ul>

</li>



<li>

<a href="registration.html">

Registration

</a>

</li>



<li>

<a href="sponsorship.html">

Sponsorship

</a>

</li>



<li>

<a href="donate.html">

Donate

</a>

</li>



<li class="dropdown">

<a href="contact.html">

Contact

</a>

<ul class="dropdown-menu">

<li>

<a href="contact.html">

Contact Us

</a>

</li>

<li>

<a href="faq.html">

FAQ

</a>

</li>

<li>

<a href="employment.html">

Employment

</a>

</li>

</ul>

</li>

</ul>

</nav>

`;


/**************************************************************************
FOOTER
**************************************************************************/

const footer = `

<footer class="site-footer">

<div class="footer-container">

    <img
        src="assets/images/logo.png"
        class="logo"
        alt="SaraDharma Logo">

    <h2 class="footer-title">

        SaraDharma Community

    </h2>

    <p class="footer-tagline">

        Nourish Body • Nurture Mind • Live in Harmony

    </p>

    <p class="footer-motto">

        Living with Purpose •
        Growing in Harmony •
        Helping One Another

    </p>

    <div class="footer-divider"></div>

    <p class="footer-message">

        A Residential Wellness Community
        inspired by timeless values where
        older adults experience dignity,
        companionship,
        holistic well-being,
        and the joy of helping one another.

    </p>

    <div class="footer-divider"></div>

    <p class="footer-prayer">

        <strong>

        Sree Guruvayoorappan Sahayam

        </strong>

        <br><br>

        Hara Hara Shankara

        <br>

        Jaya Jaya Shankara

    </p>

    <div class="footer-divider"></div>

</div>

</footer>

`;


/**************************************************************************
COPYRIGHT
**************************************************************************/

const copyright = `

<div class="copyright">

© 2026 SaraDharma Community

<br>

All Rights Reserved.

</div>

`;

/**************************************************************************
INITIALIZE COMMON LAYOUT
**************************************************************************/

document.addEventListener(

    "DOMContentLoaded",

    function(){

        /**************************************************************
        HEADER
        **************************************************************/

        const headerDiv =

            document.getElementById(

                "header"

            );

        if(headerDiv){

            headerDiv.innerHTML = header;

        }



        /**************************************************************
        NAVIGATION
        **************************************************************/

        const navigationDiv =

            document.getElementById(

                "navigation"

            );

        if(navigationDiv){

            navigationDiv.innerHTML = navigation;

        }



        /**************************************************************
        FOOTER
        **************************************************************/

        const footerDiv =

            document.getElementById(

                "footer"

            );

        if(footerDiv){

            footerDiv.innerHTML =

                footer +

                copyright;

        }



        /**************************************************************
        ACTIVE MENU
        **************************************************************/

        let current =

            window.location.pathname

            .split("/")

            .pop();

        if(

            current===""

            ||

            current===undefined

        ){

            current="index.html";

        }



        document

        .querySelectorAll(

            ".main-nav a"

        )

        .forEach(function(link){

            const href =

                link.getAttribute(

                    "href"

                );

            if(

                href===current

            ){

                link.classList.add(

                    "active"

                );

            }

        });



        /**************************************************************
        OPEN PARENT DROPDOWN
        **************************************************************/

        document

        .querySelectorAll(

            ".dropdown"

        )

        .forEach(function(dropdown){

            if(

                dropdown.querySelector(

                    ".active"

                )

            ){

                dropdown.classList.add(

                    "current"

                );

            }

        });



        /**************************************************************
        MOBILE NAVIGATION
        (Reserved for Version 6)
        **************************************************************/



    }

);



