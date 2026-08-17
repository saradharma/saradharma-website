/**************************************************************************

SaraDharma Community

Version : 1.0

File : sponsorship.js

**************************************************************************/

"use strict";


/***********************************************************************
CONFIGURATION
***********************************************************************/


const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbw9Lb04HVLvHiq-E6GtkXqgbzKXRof20dp2CXMrwAyMMZct7OrqS2eYbcAEtKsLe6L3/exec"


/***********************************************************************
INITIALIZATION
***********************************************************************/

document.addEventListener(

    "DOMContentLoaded",

    initialiseSponsorship

);


function initialiseSponsorship(){

    initialiseDurationCards();

    document

        .getElementById("sponsorshipForm")

        .addEventListener(

            "submit",

            submitSponsorship

        );

}


/***********************************************************************
DURATION SELECTION
***********************************************************************/

function initialiseDurationCards(){

    const radios = document.querySelectorAll(

        'input[name="residentDuration"]'

    );

    radios.forEach(function(radio){

        radio.addEventListener(

            "change",

            function(){

                updateSummary(radio);

            }

        );

    });

}


function updateSummary(radio){

    document.getElementById(

        "residentDuration"

    ).value = radio.value;

    document.getElementById(

        "residentAmount"

    ).value =

        Number(

            radio.dataset.amount

        ).toLocaleString(

            "en-IN"

        );

}


/***********************************************************************
VALIDATION
***********************************************************************/

function validateForm(){

    const form =

        document.getElementById(

            "sponsorshipForm"

        );

    if(

        !form.checkValidity()

    ){

        form.reportValidity();

        return false;

    }

    if(

        document.getElementById(

            "residentDuration"

        ).value===""
    ){

        alert(

            "Please choose a sponsorship duration."

        );

        return false;

    }

    return true;

}


/***********************************************************************
SUBMIT
***********************************************************************/

async function submitSponsorship(event){

    event.preventDefault();

    if(

        !validateForm()

    ){

        return;

    }

    const submitButton =

        event.target.querySelector(

            'button[type="submit"]'

        );

    submitButton.disabled=true;

    submitButton.innerHTML="Submitting...";

    try{

        const formData =

            new FormData();

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

            "pan",

            document.getElementById(

                "pan"

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


        const response =

            await fetch(

                WEBAPP_URL,

                {

                    method:"POST",

                    body:formData

                }

            );

        const result =

            await response.json();

        if(

            result.success

        ){

            showSuccessDialog(

              result.referenceId

            );

        }

        else{

            alert(

                result.message

            );

        }

    }

    catch(error){

        console.error(error);

        alert(

            "Unable to submit sponsorship request."

        );

    }

    finally{

        submitButton.disabled=false;

        submitButton.innerHTML=

            "Proceed to Payment";

    }

}


/***********************************************************************
SUCCESS DIALOG
***********************************************************************/

let successTimer=null;


function showSuccessDialog(referenceNo){

    document.getElementById(

        "successReference"

    ).innerHTML=

        referenceNo;

    document.getElementById(

        "successOverlay"

    ).style.display="flex";

    document.body.style.overflow="hidden";

    successTimer=setTimeout(

        closeSuccessDialog,

        8000

    );

}


function closeSuccessDialog(){

    if(successTimer){

        clearTimeout(successTimer);

    }

    document.getElementById(

        "successOverlay"

    ).style.display="none";

    document.body.style.overflow="auto";

    document.getElementById(

        "sponsorshipForm"

    ).reset();

    document.getElementById(

        "residentDuration"

    ).value="";

    document.getElementById(

        "residentAmount"

    ).value="";

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}
