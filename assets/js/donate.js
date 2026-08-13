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

async function submitDonation(event){

    event.preventDefault();

    if(

        !validateDonationForm()

    ){

        return;

    }

    const submitButton =

        document.getElementById(

            "submitButton"

        );

    submitButton.disabled = true;

    submitButton.innerHTML =

        "Submitting...";

    try{

        const formData =

            new FormData();

        formData.append(

            "action",

            "donation"

        );

        formData.append(

            "category",

            document.getElementById(

                "donationPurpose"

            ).value

        );

        formData.append(

            "amount",

            document.getElementById(

                "donationAmount"

            ).value

        );

        formData.append(

            "donorName",

            document.getElementById(

                "donorName"

            ).value.trim()

        );

        formData.append(

            "email",

            document.getElementById(

                "donorEmail"

            ).value.trim()

        );

        formData.append(

            "phone",

            document.getElementById(

                "donorPhone"

            ).value.trim()

        );

        formData.append(

            "address",

            document.getElementById(

                "donorAddress"

            ).value.trim()

        );

        formData.append(

            "country",

            document.getElementById(

                "donorCountry"

            ).value

        );

        formData.append(

            "panNumber",

            document.getElementById(

                "panNumber"

            ).value.trim()

        );

        formData.append(

            "receiptRequired",

            document.getElementById(

                "receiptRequired"

            ).value

        );

        formData.append(

            "paymentMethod",

            "SIMULATED"

        );

        formData.append(

            "paymentStatus",

            "SIMULATED"

        );

        formData.append(

            "paymentId",

            ""

        );

        const response =

            await fetch(

                SaraDharma.WEBAPP_URL,

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

            console.log(

                result

            );

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

            "Donate Now";

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

/**************************************************************************
SUCCESS DIALOG
**************************************************************************/

function showSuccessDialog(donationId){

    const overlay =
        document.getElementById(
            "successOverlay"
        );

    const reference =
        document.getElementById(
            "successReference"
        );

    if(!overlay){

        console.error(
            "successOverlay element not found."
        );

        return;

    }

    if(reference){

        reference.textContent =
            donationId || "-";

    }

    overlay.style.display = "flex";

}


function closeSuccessDialog(){

    const overlay =
        document.getElementById(
            "successOverlay"
        );

    if(overlay){

        overlay.style.display = "none";

    }

}


/**************************************************************************
RAZORPAY
(Placeholder for Production)
**************************************************************************/

/**************************************************************************
 * START RAZORPAY PAYMENT
 *
 * TEST MODE
 *
 * This stage:
 *
 * Donate Now
 *      ↓
 * Create Razorpay Order
 *      ↓
 * Open Razorpay Checkout
 *
 * No donation is saved yet.
 * No email is sent yet.
 * Payment verification comes next.
 **************************************************************************/

async function startRazorpayPayment(){

    const amount =
        Number(
            document
                .getElementById(
                    "donationAmount"
                )
                .value
        );


    const donorName =
        document
            .getElementById(
                "donorName"
            )
            .value
            .trim();


    const donorEmail =
        document
            .getElementById(
                "donorEmail"
            )
            .value
            .trim();


    const donorPhone =
        document
            .getElementById(
                "donorPhone"
            )
            .value
            .trim();


    try{

        const formData =
            new FormData();


        formData.append(
            "action",
            "razorpayOrder"
        );


        formData.append(
            "amount",
            amount
        );


        const response =
            await fetch(

                SaraDharma.WEBAPP_URL,

                {
                    method : "POST",
                    body : formData
                }

            );


        const result =
            await response.json();


        if(
            !result.success
        ){

            throw new Error(
                result.message
            );

        }


        console.log(
            "Razorpay Order:",
            result
        );


        const options = {

            key :
                result.keyId,

            amount :
                result.amount,

            currency :
                result.currency,

            name :
                "SaraDharma Community",

            description :
                "Donation - "
                +
                document
                    .getElementById(
                        "donationPurpose"
                    )
                    .value,

            order_id :
                result.orderId,


            prefill : {

                name :
                    donorName,

                email :
                    donorEmail,

                contact :
                    donorPhone

            },


            notes : {

                donationReference :
                    result.referenceId

            },


            theme : {

                color :
                    "#B46A1F"

            },


            handler :
                function(paymentResponse){

                    console.log(
                        "Razorpay Test Payment Response:",
                        paymentResponse
                    );


                    alert(

                        "Razorpay test payment response received.\n\n"
                        +
                        "Payment ID: "
                        +
                        paymentResponse.razorpay_payment_id

                    );

                },


            modal : {

                ondismiss :
                    function(){

                        console.log(
                            "Razorpay Checkout closed."
                        );

                    }

            }

        };


        const razorpay =
            new Razorpay(
                options
            );


        razorpay.on(
            "payment.failed",
            function(response){

                console.error(
                    "Razorpay Payment Failed:",
                    response.error
                );


                alert(

                    "Payment failed.\n\n"
                    +
                    response.error.description

                );

            }
        );


        razorpay.open();

    }

    catch(error){

        console.error(
            error
        );


        alert(
            error.message
        );

    }

}


/**************************************************************************
COPY UPI ID
**************************************************************************/

/**************************************************************************
 * COPY UPI ID
 **************************************************************************/

function copyUpiId(){

    navigator.clipboard.writeText(
        "vishrantam@kbl"
    );

    alert(
        "UPI ID copied to clipboard."
    );

}




