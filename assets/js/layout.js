/**************************************************************************
 *
 * SaraDharma Community
 *
 * Version : 6.3
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

    WEBAPP_URL : "https://script.google.com/macros/s/AKfycbygi6hl0nyFSFXym8YIVv3mcMGd2MBxuSPgF5m2XEtspNsuzCpm_hokvYMEkLv1bRn2xA/exec",

    VERSION : "5.3"

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

    <!-- SaraDharma Home dropdown -->
        <li class="nav-brand dropdown">
        <a href="index.html">

            <span class="nav-title">

                SaraDharma Home

            </span>

        </a>

        <ul class="dropdown-menu">

        <li>

            <a href="about.html">

                About Us

            </a>

        </li>

    </ul>
       
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
    
<!-- Affiliation -->

<li class="dropdown">

    <a href="affiliation.html">

        Affiliation

    </a>

    <ul class="dropdown-menu">

        <li>

            <a href="community-partnerships.html">

                Community Partnerships

            </a>

        </li>
         <li>

            <a href="Healthcare_Partner.html">

                Healthcare Partners

            </a>

        </li>
        <li>

            <a href="PartnerInputForm.html">

                Partner Input Form

            </a>

        </li> 

    </ul>

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

            // v6.3: remove any legacy brand/logo fragment that may still
            // exist in an older cached/assembled navigation container.
            navigationDiv.querySelectorAll(
                ".nav-logo, .logo-link, .site-title, .header-container"
            ).forEach(function(el){
                if(el.closest(".nav-menu") || el.closest(".main-nav")){
                    el.remove();
                }
            });

            // Remove an accidental standalone legacy text node if present.
            const mainNav = navigationDiv.querySelector(".main-nav");
            if(mainNav){
                Array.from(mainNav.childNodes).forEach(function(node){
                    if(node.nodeType === Node.TEXT_NODE &&
                       node.textContent.trim() === "SaraDharma") {
                        node.remove();
                    }
                });
            }

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
                /*
                 * Do not highlight the SaraDharma Home brand.
                 * The brand is the Home link, but should always
                 * remain integrated with the brown navigation bar.
                 */
            
                if(
                    link.closest(".nav-brand")
                ){
                    return;
                }
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
        CLEANUP + MOBILE NAVIGATION
        Version 6.2
        **************************************************************/

        // Remove any legacy header/brand that may still exist in an older
        // page template. The current site uses the navigation bar directly.
        document.querySelectorAll("#header, .site-header, .header-container")
            .forEach(function(el){
                el.remove();
            });

        const mainNav = document.querySelector(".main-nav");

        if(mainNav){

            if(!mainNav.querySelector(".sd-mobile-trigger")){

                const mobileTrigger = document.createElement("button");
                mobileTrigger.type = "button";
                mobileTrigger.className = "sd-mobile-trigger";
                mobileTrigger.setAttribute("aria-label", "Open navigation menu");
                mobileTrigger.setAttribute("aria-expanded", "false");
                mobileTrigger.setAttribute("aria-controls", "sd-mobile-nav-menu");
                mobileTrigger.innerHTML = "☰";

                const mobileTitle = document.createElement("div");
                mobileTitle.className = "sd-mobile-title";
                mobileTitle.textContent = "SaraDharma";

                mainNav.insertBefore(mobileTitle, mainNav.firstChild);
                mainNav.insertBefore(mobileTrigger, mainNav.firstChild);
            }

            const mobileTrigger = mainNav.querySelector(".sd-mobile-trigger");
            const mobileMenu = mainNav.querySelector(".nav-menu");

            if(mobileMenu){

                mobileMenu.id = "sd-mobile-nav-menu";

                let overlay = document.querySelector(".sd-mobile-overlay");

                if(!overlay){
                    overlay = document.createElement("div");
                    overlay.className = "sd-mobile-overlay";
                    overlay.setAttribute("aria-hidden", "true");
                    document.body.appendChild(overlay);
                }

                const closeMobileMenu = function(){

                    mobileMenu.classList.remove("sd-mobile-open");
                    overlay.classList.remove("sd-mobile-overlay-open");
                    document.body.classList.remove("sd-mobile-menu-open");

                    mobileMenu.querySelectorAll(".sd-mobile-dropdown-open")
                        .forEach(function(dropdown){
                            dropdown.classList.remove("sd-mobile-dropdown-open");
                        });

                    mobileMenu.querySelectorAll(".sd-mobile-dropdown-toggle.open")
                        .forEach(function(toggle){
                            toggle.classList.remove("open");
                            toggle.setAttribute("aria-expanded", "false");
                            toggle.setAttribute("aria-label", "Expand submenu");
                        });

                    if(mobileTrigger){
                        mobileTrigger.setAttribute("aria-expanded", "false");
                        mobileTrigger.setAttribute("aria-label", "Open navigation menu");
                    }
                };

                const openMobileMenu = function(){

                    mobileMenu.classList.add("sd-mobile-open");
                    overlay.classList.add("sd-mobile-overlay-open");
                    document.body.classList.add("sd-mobile-menu-open");

                    if(mobileTrigger){
                        mobileTrigger.setAttribute("aria-expanded", "true");
                        mobileTrigger.setAttribute("aria-label", "Close navigation menu");
                    }
                };

                if(mobileTrigger){
                    mobileTrigger.addEventListener("click", function(event){
                        event.preventDefault();
                        event.stopPropagation();

                        if(mobileMenu.classList.contains("sd-mobile-open")){
                            closeMobileMenu();
                        }else{
                            openMobileMenu();
                        }
                    });
                }

                overlay.addEventListener("click", closeMobileMenu);

                // Build reliable mobile submenu toggles. The toggle button
                // works independently, and the entire parent label also
                // toggles its submenu on screens <= 768px.
                mobileMenu.querySelectorAll(".dropdown").forEach(function(dropdown){

                    const children = Array.from(dropdown.children);
                    const topLink = children.find(function(child){
                        return child.tagName === "A";
                    });
                    const submenu = children.find(function(child){
                        return child.tagName === "UL" &&
                               child.classList.contains("dropdown-menu");
                    });

                    if(!topLink || !submenu){
                        return;
                    }

                    let toggle = children.find(function(child){
                        return child.classList &&
                               child.classList.contains("sd-mobile-dropdown-toggle");
                    });

                    if(!toggle){
                        toggle = document.createElement("button");
                        toggle.type = "button";
                        toggle.className = "sd-mobile-dropdown-toggle";
                        toggle.setAttribute("aria-label", "Expand submenu");
                        toggle.setAttribute("aria-expanded", "false");
                        toggle.setAttribute("aria-controls", "");
                        toggle.innerHTML = "<span aria-hidden=\"true\"></span>";
                        dropdown.insertBefore(toggle, submenu);
                    }

                    const setDropdownState = function(isOpen){
                        dropdown.classList.toggle("sd-mobile-dropdown-open", isOpen);
                        toggle.classList.toggle("open", isOpen);
                        toggle.setAttribute("aria-expanded", String(isOpen));
                        toggle.setAttribute(
                            "aria-label",
                            isOpen ? "Collapse submenu" : "Expand submenu"
                        );
                    };

                    // Arrow button: open/close only.
                    toggle.addEventListener("click", function(event){
                        event.preventDefault();
                        event.stopPropagation();
                        setDropdownState(
                            !dropdown.classList.contains("sd-mobile-dropdown-open")
                        );
                    });

                    // Parent label: on mobile, open/close instead of
                    // immediately navigating away from the menu.
                    topLink.addEventListener("click", function(event){
                        if(window.innerWidth <= 768){
                            event.preventDefault();
                            event.stopPropagation();
                            setDropdownState(
                                !dropdown.classList.contains("sd-mobile-dropdown-open")
                            );
                        }
                    });
                });

                // Close only when a real destination is selected.
                mobileMenu.querySelectorAll("a").forEach(function(link){
                    if(link.parentElement &&
                       link.parentElement.classList.contains("dropdown-menu")){
                        link.addEventListener("click", closeMobileMenu);
                    }else if(!link.parentElement ||
                             !link.parentElement.classList.contains("dropdown")){
                        link.addEventListener("click", closeMobileMenu);
                    }
                });

                document.addEventListener("keydown", function(event){
                    if(event.key === "Escape"){
                        closeMobileMenu();
                    }
                });

                window.addEventListener("resize", function(){
                    if(window.innerWidth > 768){
                        closeMobileMenu();
                    }
                });
            }
        }




    }

);



