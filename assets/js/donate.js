/**************************************************************************
 *
 * SaraDharma Community
 *
 * File    : donate.js
 * Version : 1.0
 *
 * Purpose :
 * Donation page client-side logic.
 *
 **************************************************************************/

/**************************************************************************
GLOBAL VARIABLES
**************************************************************************/

"use strict";

let selectedPurpose = "";

let selectedAmount = 0;

let donationMode = "";

const GENERAL_FUND_MIN = 10000;


/**************************************************************************
INITIALIZATION
**************************************************************************/

document.addEventListener(

    "DOMContentLoaded",

    function(){

        const formSection =

            document.getElementById(

                "donationFormSection"

            );

        if(formSection){

            formSection.style.display = "none";

        }

    }

);


/**************************************************************************
SELECT DONATION PURPOSE
**************************************************************************/

function selectDonationPurpose(

    purpose,

    amount

){

    selectedPurpose = purpose;

    selectedAmount  = amount;

    document.getElementById(

        "donationSelection"

    ).style.display = "none";

    document.getElementById(

        "donationFormSection"

    ).style.display = "block";

    document.getElementById(

        "donationPurpose"

    ).value = purpose;

    const amountField =

        document.getElementById(

            "donationAmount"

        );

    amountField.value = amount;

    if(

        purpose === "General Fund"

    ){

        donationMode = "GENERAL";

        amountField.readOnly = false;

        amountField.min = GENERAL_FUND_MIN;

    }

    else{

        donationMode = "FIXED";

        amountField.readOnly = true;

    }

    window.scrollTo({

        top:

            document.getElementById(

                "donationFormSection"

            ).offsetTop - 30,

        behavior:"smooth"

    });

}



/**************************************************************************
CANCEL DONATION
**************************************************************************/

function cancelDonation(){

    document.getElementById(

        "donationForm"

    ).reset();

    document.getElementById(

        "donationFormSection"

    ).style.display = "none";

    document.getElementById(

        "donationSelection"

    ).style.display = "block";

    selectedPurpose = "";

    selectedAmount  = 0;

    donationMode    = "";

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}


/**************************************************************************
VALIDATE DONATION FORM
**************************************************************************/

function validateDonationForm(){

    const name =

        document.getElementById(

            "donorName"

        ).value.trim();

    const email =

        document.getElementById(

            "donorEmail"

        ).value.trim();

    const phone =

        document.getElementById(

            "donorPhone"

        ).value.trim();

    const amount =

        Number(

            document.getElementById(

                "donationAmount"

            ).value

        );

    const declaration =

        document.getElementById(

            "donationDeclaration"

        ).checked;


    if(name===""){

        alert(

            "Please enter Donor Name."

        );

        return false;

    }


    if(email===""){

        alert(

            "Please enter Email Address."

        );

        return false;

    }


    const emailPattern =

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(

        !emailPattern.test(email)

    ){

        alert(

            "Please enter a valid Email Address."

        );

        return false;

    }


    if(phone===""){

        alert(

            "Please enter Mobile Number."

        );

        return false;

    }


    if(

        donationMode==="GENERAL"

        &&

        amount<GENERAL_FUND_MIN

    ){

        alert(

            "General Fund donations must be at least ₹10,000."

        );

        return false;

    }


    if(amount<=0){

        alert(

            "Donation amount is invalid."

        );

        return false;

    }


    if(

        !declaration

    ){

        alert(

            "Please certify the declaration before proceeding."

        );

        return false;

    }


    return true;

}



/**************************************************************************
SUBMIT DONATION
**************************************************************************/

async function submitDonation(){

    if(

        !validateDonationForm()

    ){

        return;

    }

    const data = {

        category :

            document.getElementById(

                "donationPurpose"

            ).value,

        amount :

            document.getElementById(

                "donationAmount"

            ).value,

        donorName :

            document.getElementById(

                "donorName"

            ).value.trim(),

        email :

            document.getElementById(

                "donorEmail"

            ).value.trim(),

        phone :

            document.getElementById(

                "donorPhone"

            ).value.trim(),

        address :

            document.getElementById(

                "donorAddress"

            ).value.trim(),

        country :

            document.getElementById(

                "donorCountry"

            ).value,

        panNumber :

            document.getElementById(

                "panNumber"

            ).value.trim(),

        receiptRequired :

            document.getElementById(

                "receiptRequired"

            ).value

    };


    try{

        const response =

            await fetch(

                window.SaraDharma.WEBAPP_URL,

                {

                    method : "POST",

                    headers : {

                        "Content-Type":

                        "application/json"

                    },

                    body :

                        JSON.stringify({

                            action :

                                "donation",

                            data :

                                data

                        })

                }

            );

        const result =

            await response.json();

        console.log(

            result

        );

        if(

            result.success

        ){

            showSuccessDialog(

                result.referenceId,

                "Donation Request Submitted Successfully"

            );

        }

        else{

            alert(

                result.message ||

                "Unable to submit your donation."

            );

        }

    }

    catch(error){

        console.error(

            error

        );

        alert(

            "Unable to contact the server."

        );

    }

}/**************************************************************************
SUBMIT DONATION
**************************************************************************/

async function submitDonation(){

    if(

        !validateDonationForm()

    ){

        return;

    }

    const data = {

        category :

            document.getElementById(

                "donationPurpose"

            ).value,

        amount :

            document.getElementById(

                "donationAmount"

            ).value,

        donorName :

            document.getElementById(

                "donorName"

            ).value.trim(),

        email :

            document.getElementById(

                "donorEmail"

            ).value.trim(),

        phone :

            document.getElementById(

                "donorPhone"

            ).value.trim(),

        address :

            document.getElementById(

                "donorAddress"

            ).value.trim(),

        country :

            document.getElementById(

                "donorCountry"

            ).value,

        panNumber :

            document.getElementById(

                "panNumber"

            ).value.trim(),

        receiptRequired :

            document.getElementById(

                "receiptRequired"

            ).value

    };


    try{

        const response =

            await fetch(

                window.SaraDharma.WEBAPP_URL,

                {

                    method : "POST",

                    headers : {

                        "Content-Type":

                        "application/json"

                    },

                    body :

                        JSON.stringify({

                            action :

                                "donation",

                            data :

                                data

                        })

                }

            );

        const result =

            await response.json();

        console.log(

            result

        );

        if(

            result.success

        ){

            showSuccessDialog(

                result.referenceId,

                "Donation Request Submitted Successfully"

            );

        }

        else{

            alert(

                result.message ||

                "Unable to submit your donation."

            );

        }

    }

    catch(error){

        console.error(

            error

        );

        alert(

            "Unable to contact the server."

        );

    }

}



/**************************************************************************
CLEAR DONATION FORM
**************************************************************************/

function clearDonationForm(){

    document.getElementById(

        "donationForm"

    ).reset();

    document.getElementById(

        "donationSelection"

    ).style.display = "block";

    document.getElementById(

        "donationFormSection"

    ).style.display = "none";

    selectedPurpose = "";

    selectedAmount  = 0;

    donationMode    = "";

}


/**************************************************************************
SUCCESS DIALOG
**************************************************************************/

function showSuccessDialog(

    donationId,

    message

){

    alert(

        message +

        "\n\nDonation Reference : " +

        donationId +

        "\n\nThank you for supporting SaraDharma Community."

    );

    clearDonationForm();

}


/**************************************************************************
RAZORPAY
(Placeholder for Production)
**************************************************************************/

function startRazorpayPayment(){

    alert(

        "Razorpay integration will be enabled after the production website is published."

    );

}


/**************************************************************************
COPY UPI ID
**************************************************************************/

function copyUpiId(){

    navigator.clipboard.writeText(

        "your-upi@bank"

    );

    alert(

        "UPI ID copied to clipboard."

    );

}




