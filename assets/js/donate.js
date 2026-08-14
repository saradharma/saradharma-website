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
 * SUBMIT DONATION
 *
 * Razorpay is now the payment path.
 *
 **************************************************************************/

async function submitDonation(
    event
){

    event.preventDefault();


    /*
     * Do not save a donation directly.
     *
     * Start Razorpay payment instead.
     */

    await startRazorpayPayment();

}
/**************************************************************************
 * RAZORPAY TEST MODE
 *
 * Purpose:
 * Create a Razorpay Test Mode order and open Razorpay Checkout.
 *
 * IMPORTANT:
 *
 * The Razorpay Key Secret is NEVER present in this file.
 *
 * Only the Razorpay Key ID returned by the server is sent to Checkout.
 *
 **************************************************************************/


/**************************************************************************
 * START RAZORPAY PAYMENT
 **************************************************************************/

async function startRazorpayPayment(){

    /*
     * Validate the donation form first.
     */

    if(
        !validateDonationForm()
    ){

        return;

    }


    const paymentButton =
        document.getElementById(
            "razorpayButton"
        );


    if(!paymentButton){

        alert(
            "Razorpay payment button was not found."
        );

        return;

    }


    paymentButton.disabled = true;

    paymentButton.innerHTML =
        "Creating Payment...";


    try{

        /******************************************************************
         * COLLECT DONATION DATA
         ******************************************************************/

        const category =
            document.getElementById(
                "donationPurpose"
            ).value;


        const amount =
            Number(
                document.getElementById(
                    "donationAmount"
                ).value
            );


        const donorName =
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


        const address =
            document.getElementById(
                "donorAddress"
            ).value.trim();


        const country =
            document.getElementById(
                "donorCountry"
            ).value;


        const panNumber =
            document.getElementById(
                "panNumber"
            ).value.trim();


        const receiptRequired =
            document.getElementById(
                "receiptRequired"
            ).value;


        /******************************************************************
         * BUILD ORDER REQUEST
         ******************************************************************/

        const formData =
            new FormData();


        formData.append(
            "action",
            "razorpay_order"
        );


        formData.append(
            "category",
            category
        );


        formData.append(
            "amount",
            amount
        );


        formData.append(
            "donorName",
            donorName
        );


        formData.append(
            "email",
            email
        );


        formData.append(
            "phone",
            phone
        );


        formData.append(
            "address",
            address
        );


        formData.append(
            "country",
            country
        );


        formData.append(
            "panNumber",
            panNumber
        );


        formData.append(
            "receiptRequired",
            receiptRequired
        );


        /******************************************************************
         * ASK SARADHARMA SERVER TO CREATE RAZORPAY ORDER
         ******************************************************************/

        const response =
            await fetch(

                SaraDharma.WEBAPP_URL,

                {

                    method :
                        "POST",

                    body :
                        formData

                }

            );


        if(
            !response.ok
        ){

            throw new Error(

                "Server returned HTTP "
                +
                response.status

            );

        }


        const result =
            await response.json();


        if(
            !result.success
        ){

            throw new Error(
                result.message ||
                "Unable to create Razorpay order."
            );

        }


        /******************************************************************
         * STORE PAYMENT INFORMATION TEMPORARILY IN BROWSER
         *
         * This is NOT trusted payment information.
         *
         * The server remains the authority.
         ******************************************************************/

        window.SaraDharmaRazorpay =
            {

                donationId :
                    result.referenceId,

                orderId :
                    result.orderId,

                amount :
                    result.amount,

                currency :
                    result.currency,

                keyId :
                    result.keyId

            };


        /******************************************************************
         * OPEN RAZORPAY CHECKOUT
         ******************************************************************/

        await loadRazorpayCheckout();


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
                category,

            order_id :
                result.orderId,


            /**************************************************************
             * PREFILL DONOR INFORMATION
             **************************************************************/

            prefill : {

                name :
                    donorName,

                email :
                    email,

                contact :
                    phone

            },


            /**************************************************************
             * NOTES
             **************************************************************/

            notes : {

                donation_id :
                    result.referenceId

            },


            /**************************************************************
             * PAYMENT SUCCESS
             *
             * IMPORTANT:
             *
             * At this stage we DO NOT save the donation.
             *
             * We will send these three values to the server for
             * signature verification in the next step.
             **************************************************************/

            handler :
                function(
                    paymentResponse
                ){

                    handleRazorpaySuccess(
                        paymentResponse
                    );

                },


            /**************************************************************
             * MODAL
             **************************************************************/

            modal : {

                ondismiss :
                    function(){

                        paymentButton.disabled =
                            false;

                        paymentButton.innerHTML =
                            "Pay using Razorpay";

                    }

            }

        };


        const razorpay =
            new Razorpay(
                options
            );


        razorpay.on(
            "payment.failed",
            function(
                response
            ){

                console.error(
                    "Razorpay payment failed:",
                    response
                );


                alert(

                    "Payment was not completed.\n\n"
                    +
                    (
                        response.error &&
                        response.error.description
                        ?
                        response.error.description
                        :
                        "Please try again."
                    )

                );


                paymentButton.disabled =
                    false;

                paymentButton.innerHTML =
                    "Pay using Razorpay";

            }
        );


        razorpay.open();


    }


    catch(error){

        console.error(
            "Razorpay error:",
            error
        );


        alert(
            error.message ||
            "Unable to start Razorpay payment."
        );


        paymentButton.disabled =
            false;

        paymentButton.innerHTML =
            "Pay using Razorpay";

    }

}


/**************************************************************************
 * LOAD RAZORPAY CHECKOUT
 *
 * Loads Razorpay's official checkout.js only when required.
 **************************************************************************/

function loadRazorpayCheckout(){

    return new Promise(
        function(
            resolve,
            reject
        ){

            /*
             * Already loaded.
             */

            if(
                typeof Razorpay !==
                "undefined"
            ){

                resolve();

                return;

            }


            const script =
                document.createElement(
                    "script"
                );


            script.src =
                "https://checkout.razorpay.com/v1/checkout.js";


            script.onload =
                function(){

                    resolve();

                };


            script.onerror =
                function(){

                    reject(

                        new Error(
                            "Unable to load Razorpay Checkout."
                        )

                    );

                };


            document.head.appendChild(
                script
            );

        }
    );

}


/**************************************************************************
 * HANDLE RAZORPAY SUCCESS
 *
 * IMPORTANT:
 *
 * This function does NOT save the donation yet.
 *
 * It will be completed after we add the server-side signature
 * verification endpoint.
 **************************************************************************/

async function handleRazorpaySuccess(
    paymentResponse
){

    console.log(
        "Razorpay payment response:",
        paymentResponse
    );


    const paymentButton =
        document.getElementById(
            "razorpayButton"
        );


    if(paymentButton){

        paymentButton.disabled =
            true;

        paymentButton.innerHTML =
            "Verifying Payment...";

    }


    /*
     * We intentionally stop here for this stage.
     *
     * The next server-side function will:
     *
     * 1. Receive razorpay_payment_id
     * 2. Receive razorpay_order_id
     * 3. Receive razorpay_signature
     * 4. Retrieve the REAL order from PendingPayments
     * 5. Generate HMAC-SHA256 using RAZORPAY_KEY_SECRET
     * 6. Verify the signature
     * 7. Confirm payment status
     * 8. Save the donation
     * 9. Send donor/admin emails
     *
     * This prevents an unverified browser response from being
     * treated as a successful donation.
     */


    alert(

        "Razorpay Test payment completed.\n\n"
        +
        "Payment ID : "
        +
        paymentResponse.razorpay_payment_id
        +
        "\n\n"
        +
        "Verification will be connected in the next step."

    );


    if(paymentButton){

        paymentButton.disabled =
            false;

        paymentButton.innerHTML =
            "Pay using Razorpay";

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


/**************************************************************************
 * RAZORPAY BUTTON INITIALIZATION
 **************************************************************************/

document.addEventListener(
    "DOMContentLoaded",
    function(){

        const razorpayButton =
            document.getElementById(
                "razorpayButton"
            );


        if(
            razorpayButton
        ){

            razorpayButton.addEventListener(
                "click",
                startRazorpayPayment
            );

        }

    }
);

