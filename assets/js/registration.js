/**************************************************************************
 *
 * SaraDharma Registration
 *
 * Version 3.0
 *
 * Part 1
 *
 **************************************************************************/


/***********************************************************************
 CONFIGURATION
***********************************************************************/

const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbxbqB8BSOFaI6bcQ5xMf-H5lp1dqIc09eRLmyKZEz9ZT6tz8DM4uzixy6v9YMmzp7E77A/exec"

const MIN_MESSAGE_LENGTH = 10;

const MAX_MESSAGE_LENGTH = 1000;


/***********************************************************************
 DOM REFERENCES
***********************************************************************/

const form =
document.getElementById("registrationForm");

const submitButton =
document.getElementById("submitButton");

const clearButton =
document.getElementById("clearButton");

const spinner =
document.getElementById("spinner");

const successPanel =
document.getElementById("successPanel");

const message =
document.getElementById("message");

const counter =
document.getElementById("messageCount");


/***********************************************************************
 INITIALIZE FORM
***********************************************************************/

window.addEventListener(

    "load",

    initializeForm

);

function initializeForm(){

    setCurrentMonth();

    updateCounter();

    hideSuccessPanel();

}


/***********************************************************************
 SET CURRENT MONTH
***********************************************************************/

function setCurrentMonth(){

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

    document.getElementById(

        "moveMonth"

    ).value=

    months[new Date().getMonth()];

}


/***********************************************************************
 CHARACTER COUNTER
***********************************************************************/

message.addEventListener(

    "input",

    updateCounter

);

function updateCounter(){

    const count=

    message.value.length;

    counter.textContent=

    count;

    if(

        count>=MIN_MESSAGE_LENGTH

    ){

        counter.parentElement.classList.remove(

            "invalid"

        );

        counter.parentElement.classList.add(

            "valid"

        );

    }

    else{

        counter.parentElement.classList.remove(

            "valid"

        );

        counter.parentElement.classList.add(

            "invalid"

        );

    }

}


/***********************************************************************
 EMAIL VALIDATION
***********************************************************************/

function validateEmail(email){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email.trim());

}


/***********************************************************************
 PHONE VALIDATION
***********************************************************************/

function validatePhone(phone){

    return /^[0-9]{6,15}$/
        .test(phone.trim());

}

/***********************************************************************
 NAME VALIDATION
***********************************************************************/

function validateName(name){

    name = name.trim();

    if(name.length < 3){

        return false;

    }

    return /^[A-Za-z .'-]+$/.test(name);

}

/***********************************************************************
 MESSAGE VALIDATION
***********************************************************************/

function validateMessage(text){

    const len=

    text.trim().length;

    return(

        len>=MIN_MESSAGE_LENGTH &&

        len<=MAX_MESSAGE_LENGTH

    );

}


/***********************************************************************
 SHOW ERROR
***********************************************************************/

function showError(field,messageText){

    field.classList.remove("success");

    field.classList.add("error");

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
 HIDE SUCCESS PANEL
***********************************************************************/

function hideSuccessPanel(){

    // successPanel.style.display="none";  not needed

}


/***********************************************************************
 SHOW SUCCESS PANEL
***********************************************************************/

function showSuccessPanel(enquiryId){

    showSuccessDialog(enquiryId);

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

            "Please enter your full name."

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

            "Please confirm the information before submitting."

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
 RESET FORM
***********************************************************************/

function resetForm(){

    form.reset();

    setCurrentMonth();

    updateCounter();

    hideSuccessPanel();



    document

        .querySelectorAll(

            ".error,.success"

        )

        .forEach(function(item){

            item.classList.remove(

                "error",

                "success"

            );

        });

}


/***********************************************************************
 CLEAR FORM BUTTON
***********************************************************************/

clearButton.addEventListener(

    "click",

    function(){

        if(

            confirm(

                "Clear the entire enquiry form?"

            )

        ){

            resetForm();

        }

    }

);

/********************************************************************
SUCCESS DIALOG
********************************************************************/

let successTimer = null;

function showSuccessDialog(referenceNo){

    document.getElementById(
        "successReference"
    ).innerHTML = referenceNo;

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
        "registrationForm"
    ).reset();
     window.scrollTo({

        top:0,

        behavior:"smooth"

    });
}
/***********************************************************************
 HIDE SUCCESS WHEN USER EDITS
***********************************************************************/

form.querySelectorAll(

    "input,select,textarea"

).forEach(function(control){

    control.addEventListener(

        "input",

        hideSuccessPanel

    );



    control.addEventListener(

        "change",

        hideSuccessPanel

    );

});



/***********************************************************************
 SUBMIT FORM
***********************************************************************/

form.addEventListener(

    "submit",

    async function(e){

        e.preventDefault();

        hideSuccessPanel();

        if(!validateForm()){

            return;

        }

        submitButton.disabled=true;
     
        submitButton.innerHTML="Submitting...";

        try{

            const data=getFormData();

            const formData=new FormData();

            Object.keys(data).forEach(function(key){

                formData.append(

                    key,

                    data[key]

                );

            });

            formData.append(
                   "action",
                   "registration"
            );

            const response=

            await fetch(

                WEBAPP_URL,

                {

                    method:"POST",

                    body:formData

                }

            );

            if(!response.ok){

                throw new Error(

                    "Server returned "

                    + response.status

                );

            }

            const result=

            await response.json();

            submitButton.innerHTML="✓ Submitted";

            submitButton.disabled=false;

            if(result.success){

              showSuccessDialog(

               // result.enquiryId
               result.referenceId
             );

            setTimeout(function(){

              resetForm();

              submitButton.innerHTML="Submit Enquiry";

           },18000);

                

            }

            else{

                alert(

                    result.message ||

                    "Registration could not be completed."

                );

            }

        }

        catch(err){

            spinner.style.display="none";

            submitButton.disabled=false; 

            alert(

                "Unable to connect to SaraDharma Registration Service.\n\n"

                + err.message

            );

        }

    }

);
