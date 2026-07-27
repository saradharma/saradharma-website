/*************************************************************************
    SaraDharma Registration
    registration.js
    Version 2.0
*************************************************************************/


/***********************************************************************
 DOM REFERENCES
***********************************************************************/

const form = document.getElementById("registrationForm");

const submitButton = document.getElementById("submitButton");

const clearButton = document.getElementById("clearButton");

const spinner = document.getElementById("spinner");

const successPanel = document.getElementById("successPanel");

const message = document.getElementById("message");

const counter = document.getElementById("messageCount");


/***********************************************************************
 CURRENT MONTH
***********************************************************************/

(function(){

    const months=[

        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"

    ];

    document.getElementById("moveMonth").value=
        months[new Date().getMonth()];

})();


/***********************************************************************
 CHARACTER COUNTER
***********************************************************************/

function updateCounter(){

    const count = message.value.trim().length;

    counter.textContent = count;

    counter.parentElement.classList.remove("valid","invalid");

    if(count >= 100){

        counter.parentElement.classList.add("valid");

    }
    else{

        counter.parentElement.classList.add("invalid");

    }

}

message.addEventListener("input",updateCounter);

updateCounter();


/***********************************************************************
 EMAIL VALIDATION
***********************************************************************/

function validateEmail(email){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}


/***********************************************************************
 PHONE VALIDATION
***********************************************************************/

function validatePhone(phone){

    return /^[0-9]{6,15}$/.test(phone);

}


/***********************************************************************
 NAME VALIDATION
***********************************************************************/

function validateName(name){

    name=name.trim();

    if(name.length < 3){

        return false;

    }

    return /^[A-Za-z .'-]+$/.test(name);

}


/***********************************************************************
 MESSAGE VALIDATION
***********************************************************************/

function validateMessage(text){

    const len=text.trim().length;

    return len>=100 && len<=1000;

}


/***********************************************************************
 SHOW ERROR
***********************************************************************/

function showError(field,messageText){

    field.classList.add("error");

    field.classList.remove("success");

    alert(messageText);

    field.focus();

}


/***********************************************************************
 SHOW SUCCESS
***********************************************************************/

function showSuccess(field){

    field.classList.remove("error");

    field.classList.add("success");

}


/***********************************************************************
 VALIDATE FORM
***********************************************************************/

function validateForm(){

    const fullName=document.getElementById("fullName");

    const email=document.getElementById("email");

    const phone=document.getElementById("phone");

    const confirm=document.getElementById("confirmInformation");



    if(!validateName(fullName.value)){

        showError(

            fullName,

            "Please enter a valid full name."

        );

        return false;

    }

    showSuccess(fullName);



    if(!validateEmail(email.value)){

        showError(

            email,

            "Please enter a valid email address."

        );

        return false;

    }

    showSuccess(email);



    if(!validatePhone(phone.value)){

        showError(

            phone,

            "Please enter a valid phone number."

        );

        return false;

    }

    showSuccess(phone);



    if(!validateMessage(message.value)){

        showError(

            message,

            "Please enter between 100 and 1000 characters."

        );

        return false;

    }

    showSuccess(message);



    if(!confirm.checked){

        alert(

            "Please confirm that the information is correct."

        );

        confirm.focus();

        return false;

    }

    return true;

}


/***********************************************************************
 COLLECT FORM DATA
***********************************************************************/

function getFormData(){

    return{

        fullName:

            form.fullName.value.trim(),

        email:

            form.email.value.trim(),

        countryCode:

            form.countryCode.value,

        phone:

            form.phone.value.trim(),

        city:

            form.city.value.trim(),

        applicantType:

            form.applicantType.value,

        ageGroup:

            form.ageGroup.value,

        accommodation:

            form.accommodation.value,

        moveMonth:

            form.moveMonth.value,

        moveYear:

            form.moveYear.value,

        message:

            form.message.value.trim(),

        sendCopy:

            form.sendCopy.checked

    };

}

/***********************************************************************
 APPS SCRIPT WEB APP URL   "YOUR_WEBAPP_URL_HERE";
***********************************************************************/

const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbzmYvUjaZamm6EcG6z7iDgsCCQFkrDU_2x7sxSmMeTtKF5sL0SCruwiNP5ymEcgDNj2bQ/exec"


/***********************************************************************
 SHOW / HIDE SUCCESS PANEL
***********************************************************************/

function hideSuccess(){

    successPanel.style.display="none";

}

function showSuccessPanel(){

    successPanel.style.display="block";

}


/***********************************************************************
 RESET FORM
***********************************************************************/

function resetForm(){

    form.reset();

    updateCounter();

    hideSuccess();

    /* restore current month */

    const months=[

        "January","February","March","April","May","June",

        "July","August","September","October","November","December"

    ];

    document.getElementById("moveMonth").value =
        months[new Date().getMonth()];

}


/***********************************************************************
 CLEAR BUTTON
***********************************************************************/

clearButton.addEventListener(

    "click",

    function(){

        setTimeout(resetForm,10);

    }

);


/***********************************************************************
 HIDE SUCCESS WHEN USER STARTS EDITING AGAIN
***********************************************************************/

form.querySelectorAll(

    "input,select,textarea"

).forEach(function(control){

    control.addEventListener(

        "input",

        hideSuccess

    );

    control.addEventListener(

        "change",

        hideSuccess

    );

});


/***********************************************************************
 SUBMIT FORM
***********************************************************************/

form.addEventListener(

    "submit",

    async function(e){

        e.preventDefault();

        if(!validateForm()){

            return;

        }

        submitButton.disabled=true;

        spinner.style.display="block";

        const data=getFormData();

        try{

            const response = await fetch(

                WEBAPP_URL,

                {

                    method:"POST",

                    headers:{

                        "Content-Type":"application/json"

                    },

                    body:JSON.stringify(data)

                }

            );

            const result = await response.json();

            spinner.style.display="none";

            submitButton.disabled=false;

            if(result.success){

                showSuccessPanel();

                form.reset();

                updateCounter();

                window.scrollTo({

                    top:0,

                    behavior:"smooth"

                });

            }

            else{

                alert(

                    result.message ||

                    "Unable to submit your enquiry."

                );

            }

        }

        catch(err){

            spinner.style.display="none";

            submitButton.disabled=false;

            alert(

                "Unable to connect to the SaraDharma server.\n\n"

                + err.message

            );

        }

    }

);