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
GLOBAL CONFIGURATION
**************************************************************************/

window.SaraDharma = {

    WEBAPP_URL :
    "https://script.google.com/macros/s/AKfycbwDt4ZfF7LLFdPdgrPtokxy-vnrO6nKLqDwvc2k_rrI2vBjHXp3s8VXvtl9N8SYZ_C7DA/exec",

    VERSION : "5.2"

};



/**************************************************************************
NAVIGATION
**************************************************************************/
/**************************************************************************
NAVIGATION
**************************************************************************/

const navigation = `

<nav class="main-nav">

<ul class="nav-menu">

    <!-- Brand -->

    <li class="nav-brand">

        <a href="index.html">

            <img
                src="assets/images/logo.png"
                alt="SaraDharma"
                class="nav-logo">

            <span class="nav-title">

                SaraDharma Home

            </span>

        </a>

    </li>

    <!-- Vision -->

    <li>

        <a href="vision.html">

            Vision

        </a>

    </li>

    <!-- Facilities -->

    <li>

        <a href="facilities.html">

            Facilities

        </a>

    </li>

    <!-- Residency -->

    <li>

        <a href="residency.html">

            Residency

        </a>

    </li>

    <!-- Location -->

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

    <!-- Registration -->

    <li>

        <a href="registration.html">

            Registration

        </a>

    </li>

    <!-- Sponsorship -->

    <li>

        <a href="sponsorship.html">

            Sponsorship

        </a>

    </li>

    <!-- Donate -->

    <li>

        <a href="donate.html">

            Donate

        </a>

    </li>

    <!-- Contact -->

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

    <div class="footer-row">

        <div class="footer-logo">

            <img
                src="assets/images/logo.png"
                alt="SaraDharma Community">

        </div>

        <div class="footer-item">

            <strong>Living with Purpose</strong><br>
            Care • Dignity • Community

        </div>

        <div class="footer-item">

            <strong>Nourish Body</strong><br>
            Nurture Mind • Live in Harmony

        </div>

        <div class="footer-item">

           <strong>Sree Guruvayoorappan Sahayam</strong><br>

            Hara Hara Shankara<br>

            Jaya Jaya Shankara

            </div>

    </div>

    <div class="footer-copyright">

        © 2026 SaraDharma Community • Bengaluru, Karnataka, India

    </div>

</footer>

`;


/**************************************************************************
COPYRIGHT
**************************************************************************/

/** const copyright = `

<div class="copyright">

© 2026 SaraDharma Community

<br>

All Rights Reserved.

</div>

`;  **/

/**************************************************************************
INITIALIZE COMMON LAYOUT
**************************************************************************/

document.addEventListener(

    "DOMContentLoaded",

    function(){

        /**************************************************************
        HEADER
        **************************************************************/

       /* const headerDiv =

            document.getElementById(

                "header"

            );

        if(headerDiv){

            headerDiv.innerHTML = header;

        }  */



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

            footerDiv.innerHTML = footer;
    

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



