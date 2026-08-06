/**************************************************************************
 *
 * SaraDharma Community
 *
 * Version : 5.1
 * File    : sponsorship.js
 *
 * Purpose :
 * Resident & Infrastructure Sponsorship
 *
 **************************************************************************/

"use strict";


/**************************************************************************
CONFIGURATION
**************************************************************************/

const WEBAPP_URL =
"https://script.google.com/macros/s/AKfycbzQVWji2VOvG8omxm9KsUApNz_LS5Go73WmqCQ62qkTk5NlWhhjWcBxw0dzgdQVcg_W/exec";


let successTimer = null;


/**************************************************************************
INITIALIZE
**************************************************************************/

document.addEventListener(

    "DOMContentLoaded",

    initialiseSponsorship

);



function initialiseSponsorship(){

    initialiseResidentCards();

    initialiseFacilityCards();

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
RESIDENT SPONSORSHIP
**************************************************************************/

function initialiseResidentCards(){

    const radios =

        document.querySelectorAll(

            'input[name="residentDuration"]'

        );

    radios.forEach(function(radio){

        radio.addEventListener(

            "change",

            function(){

                updateResidentSummary(

                    radio

                );

            }

        );

    });

}



function updateResidentSummary(radio){

    document

        .getElementById(

            "residentDuration"

        )

        .value =

        radio.value;

    document

        .getElementById(

            "residentAmount"

        )

        .value =

        Number(

            radio.dataset.amount

        )

        .toLocaleString(

            "en-IN"

        );

}



/**************************************************************************
INFRASTRUCTURE SPONSORSHIP
**************************************************************************/

function initialiseFacilityCards(){

    const cards =

        document.querySelectorAll(

            'input[name="facilityItem"]'

        );

    cards.forEach(function(card){

        card.addEventListener(

            "change",

            function(){

                updateFacilitySummary(

                    card

                );

            }

        );

    });

}



function updateFacilitySummary(card){

    document

        .getElementById(

            "residentDuration"

        )

        .value =

        card.value;

    document

        .getElementById(

            "residentAmount"

        )

        .value =

        Number(

            card.dataset.amount

        )

        .toLocaleString(

            "en-IN"

        );

}



/**************************************************************************
VALIDATION
**************************************************************************/

function validateForm(){

    if(

        document

        .getElementById(

            "residentDuration"

        )

        .value===""

    ){

        alert(

            "Please select a Resident Sponsorship duration or an Infrastructure Sponsorship."

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
SUBMIT SPONSORSHIP
**************************************************************************/

async function submitSponsorship(event){

    event.preventDefault();

    if(!validateForm()){

        return;

    }

    const submitButton =
        event.target.querySelector(
            'button[type="submit"]'
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
            "duration",
            document.getElementById(
                "residentDuration"
            ).value
        );

        formData.append(
            "amount",
            document.getElementById(
                "residentAmount"
            ).value.replace(/,/g,"")
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

        const response =
            await fetch(
                WEBAPP_URL,
                {
                    method:"POST",
                    body:formData
                }
            );

        if(!response.ok){

            throw new Error(

                "Server returned " +

                response.status

            );

        }

        const result =
            await response.json();

        if(result.success){

            showSuccessDialog(

                result.sponsorshipId ||

                result.referenceId

            );

        }

        else{

            alert(

                result.message ||

                "Unable to submit sponsorship."

            );

        }

    }

    catch(error){

        console.error(error);

        alert(

            "Unable to connect to SaraDharma Sponsorship Service.\n\n"

            + error.message

        );

    }

    finally{

        submitButton.disabled=false;

        submitButton.innerHTML=

            "Proceed to Payment";

    }

}


/**************************************************************************
SUCCESS DIALOG
**************************************************************************/

function showSuccessDialog(referenceNo){

    document.getElementById(

        "successReference"

    ).innerHTML =

        referenceNo;

    document.getElementById(

        "successOverlay"

    ).style.display="flex";

    document.body.style.overflow="hidden";

    successTimer =

        setTimeout(

            closeSuccessDialog,

            8000

        );

}


/**************************************************************************
CLOSE SUCCESS DIALOG
**************************************************************************/

function closeSuccessDialog(){

    if(successTimer){

        clearTimeout(

            successTimer

        );

    }

    document.getElementById(

        "successOverlay"

    ).style.display="none";

    document.body.style.overflow="auto";

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

        "residentDuration"

    ).value="";

    document.getElementById(

        "residentAmount"

    ).value="";

    document

        .querySelectorAll(

            'input[name="residentDuration"]'

        )

        .forEach(function(r){

            r.checked=false;

        });

    document

        .querySelectorAll(

            'input[name="facilityItem"]'

        )

        .forEach(function(r){

            r.checked=false;

        });

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

