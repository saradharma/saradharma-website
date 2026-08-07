/**************************************************************************
 *
 * SaraDharma Community
 *
 * Version : 5.2
 *
 * File    : sponsorship.js
 *
 * Purpose :
 *
 * Resident & Infrastructure Sponsorship
 *
 **************************************************************************/

"use strict";

/**************************************************************************
CONFIGURATION
**************************************************************************/

const WEBAPP_URL ="https://script.google.com/macros/s/AKfycbw18QRd_utxUO4QRPiBxaataBMdX1jrDpPG1Sp-tLKglFRj-OOvVUjruQoKcLwNcN0GYg/exec";

let successTimer = null;



/**************************************************************************
INITIALIZE
**************************************************************************/

document.addEventListener(

    "DOMContentLoaded",

    initialiseSponsorship

);



function initialiseSponsorship(){

    initialiseSelectionCards();

    initialiseSponsorshipCards();

    document
        .getElementById(
            "sponsorshipForm"
        )
        .addEventListener(
            "submit",
            submitSponsorship
        );

}



/**************************************************************************
SPONSORSHIP TYPE
**************************************************************************/

function initialiseSelectionCards(){

    document
        .getElementById(
            "residentSelector"
        )
        .addEventListener(
            "click",
            showResidentSection
        );

    document
        .getElementById(
            "infrastructureSelector"
        )
        .addEventListener(
            "click",
            showInfrastructureSection
        );

}



/**************************************************************************
SHOW RESIDENT SECTION
**************************************************************************/

function showResidentSection(){

    document
        .getElementById(
            "residentSelector"
        )
        .classList
        .add(
            "active"
        );

    document
        .getElementById(
            "infrastructureSelector"
        )
        .classList
        .remove(
            "active"
        );

    document
        .getElementById(
            "residentSection"
        )
        .style
        .display =
        "block";

    document
        .getElementById(
            "infrastructureSection"
        )
        .style
        .display =
        "none";

}



/**************************************************************************
SHOW INFRASTRUCTURE SECTION
**************************************************************************/

function showInfrastructureSection(){

    document
        .getElementById(
            "residentSelector"
        )
        .classList
        .remove(
            "active"
        );

    document
        .getElementById(
            "infrastructureSelector"
        )
        .classList
        .add(
            "active"
        );

    document
        .getElementById(
            "residentSection"
        )
        .style
        .display =
        "none";

    document
        .getElementById(
            "infrastructureSection"
        )
        .style
        .display =
        "block";

}



/**************************************************************************
INITIALISE SPONSORSHIP CARDS
**************************************************************************/

function initialiseSponsorshipCards(){

    const cards =

        document.querySelectorAll(

            'input[name="sponsorshipChoice"]'

        );

    cards.forEach(function(card){

        card.addEventListener(

            "change",

            function(){

                updateSponsorshipSummary(

                    card

                );

            }

        );

    });

}


/**************************************************************************
PART 1 END
**************************************************************************/

/**************************************************************************
UPDATE SPONSORSHIP SUMMARY
**************************************************************************/

function updateSponsorshipSummary(card){

    const category =

        card.dataset.category;

    const item =

        card.dataset.item;

    const amount =

        Number(
            card.dataset.amount
        );



    document
        .getElementById(
            "sponsorshipCategory"
        )
        .value =
        category;

    document
        .getElementById(
            "selectedOption"
        )
        .value =
        item;

    document
        .getElementById(
            "selectedAmount"
        )
        .value =  amount

    
    document
        .getElementById(
            "selectedSponsorship"
        )
        .style
        .display =
        "block";



    document
        .getElementById(
            "sponsorshipForm"
        )
        .style
        .display =
        "block";

}



/**************************************************************************
VALIDATE FORM
**************************************************************************/

function validateForm(){

    if(

        document
        .getElementById(
            "selectedOption"
        )
        .value
        .trim()===""

    ){

        alert(

            "Please select a sponsorship."

        );

        return false;

    }



    if(

        document
        .getElementById(
            "sponsorName"
        )
        .value
        .trim()===""

    ){

        alert(

            "Please enter Sponsor Name."

        );

        document
            .getElementById(
                "sponsorName"
            )
            .focus();

        return false;

    }



    if(

        document
        .getElementById(
            "email"
        )
        .value
        .trim()===""

    ){

        alert(

            "Please enter Email Address."

        );

        document
            .getElementById(
                "email"
            )
            .focus();

        return false;

    }



    if(

        document
        .getElementById(
            "phone"
        )
        .value
        .trim()===""

    ){

        alert(

            "Please enter Mobile Number."

        );

        document
            .getElementById(
                "phone"
            )
            .focus();

        return false;

    }



    if(

        document
        .getElementById(
            "city"
        )
        .value
        .trim()===""

    ){

        alert(

            "Please enter City."

        );

        document
            .getElementById(
                "city"
            )
            .focus();

        return false;

    }



    if(

        document
        .getElementById(
            "country"
        )
        .value
        .trim()===""

    ){

        alert(

            "Please enter Country."

        );

        document
            .getElementById(
                "country"
            )
            .focus();

        return false;

    }



    if(

        !document
        .getElementById(
            "agree"
        )
        .checked

    ){

        alert(

            "Please accept the declaration."

        );

        return false;

    }



    return true;

}

/**************************************************************************
PART 2 END
**************************************************************************/

/**************************************************************************
SUBMIT SPONSORSHIP
**************************************************************************/

async function submitSponsorship(event){

    event.preventDefault();

    if(!validateForm()){

        return;

    }

    const submitButton =

        document.getElementById(

            "submitButton"

        );

    submitButton.disabled = true;

    submitButton.innerHTML = "Submitting...";

    try{

        const formData = new FormData();

        formData.append(

            "action",

            "sponsorship"

        );

        formData.append(

            "category",

            document.getElementById(

                "sponsorshipCategory"

            ).value

        );

        formData.append(

            "duration",

            document.getElementById(

                "selectedOption"

            ).value

        );

        formData.append(

            "amount",

            document.getElementById(

                "selectedAmount"

            ).value

        );

        formData.append(

            "sponsorName",

            document.getElementById(

                "sponsorName"

            ).value.trim()

        );

        formData.append(

            "email",

            document.getElementById(

                "email"

            ).value.trim()

        );

        formData.append(

            "countryCode",

            document.getElementById(

                "countryCode"

            ).value

        );

        formData.append(

            "phone",

            document.getElementById(

                "phone"

            ).value.trim()

        );

        formData.append(

            "city",

            document.getElementById(

                "city"

            ).value.trim()

        );

        formData.append(

            "country",

            document.getElementById(

                "country"

            ).value.trim()

        );

        formData.append(

            "receipt80G",

            document.getElementById(

                "receipt80G"

            ).value

        );

        formData.append(

            "recognitionName",

            document.getElementById(

                "recognitionName"

            ).value.trim()

        );

        formData.append(

            "dedicationType",

            document.getElementById(

                "dedicationType"

            ).value

        );

        formData.append(

            "dedicationName",

            document.getElementById(

                "dedicationName"

            ).value.trim()

        );

        formData.append(

            "comments",

            document.getElementById(

                "comments"

            ).value.trim()

        );

        const response = await fetch(

            WEBAPP_URL,

            {

                method:"POST",

                body:formData

            }

        );

        const result =

            await response.json();

        if(result.success){
             console.log(result);
            showSuccessDialog(
                
                result.referenceId

            );

        }

        else{

            throw new Error(

                result.message

            );

        }

    }

    catch(error){

        alert(

            error.message

        );

    }

    finally{

        submitButton.disabled = false;

        submitButton.innerHTML =

            "Proceed to Payment";

    }

}



/**************************************************************************
SUCCESS DIALOG
**************************************************************************/

function showSuccessDialog(reference){

    document.getElementById(

        "successReference"

    ).innerHTML = reference;

    document.getElementById(

        "successOverlay"

    ).style.display = "flex";

    document.body.style.overflow = "hidden";

}



/**************************************************************************
CLOSE SUCCESS DIALOG
**************************************************************************/

function closeSuccessDialog(){

    document.getElementById(

        "successOverlay"

    ).style.display = "none";

    document.body.style.overflow = "auto";

    resetForm();

}



/**************************************************************************
RESET FORM
**************************************************************************/

function resetForm(){

    document.getElementById(

        "sponsorshipForm"

    ).reset();

    document.getElementById(

        "selectedSponsorship"

    ).style.display = "none";

    document.getElementById(

        "sponsorshipForm"

    ).style.display = "none";

    document.getElementById(

        "residentSection"

    ).style.display = "none";

    document.getElementById(

        "infrastructureSection"

    ).style.display = "none";

    document.getElementById(

        "residentSelector"

    ).classList.remove(

        "active"

    );

    document.getElementById(

        "infrastructureSelector"

    ).classList.remove(

        "active"

    );

    document.querySelectorAll(

        'input[name="sponsorshipChoice"]'

    ).forEach(function(item){

        item.checked = false;

    });

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

/**************************************************************************
END OF FILE
**************************************************************************/
