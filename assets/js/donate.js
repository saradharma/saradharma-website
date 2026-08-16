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


        


        const receiptRequired =
            document.getElementById(
                "receiptRequired"
            ).value;


        /******************************************************************
         * BUILD ORDER REQUEST
         ******************************************************************/

          const result =
    await requestRazorpayOrderJsonp({

        category:
            category,

        amount:
            amount,

        donorName:
            donorName,

        email:
            email,

        phone:
            phone,

        address:
            address,

        country:
            country,

        receiptRequired:
            receiptRequired

    });

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
                function(paymentResponse){
            
                    console.log(
                        "Razorpay Payment Response:",
                        paymentResponse
                    );
            
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
 * REQUEST RAZORPAY ORDER USING JSONP
 **************************************************************************/

function requestRazorpayOrderJsonp(data){

    return new Promise(
        function(resolve, reject){

            const callbackName =
                "razorpayOrderCallback_" +
                Date.now();


            let script = null;


            window[callbackName] =
                function(result){

                    delete window[callbackName];


                    if(
                        script &&
                        script.parentNode
                    ){

                        script.parentNode.removeChild(
                            script
                        );

                    }


                    if(
                        !result ||
                        !result.success
                    ){

                        reject(

                            new Error(
                                result &&
                                result.message
                                    ? result.message
                                    : "Unable to create Razorpay order."
                            )

                        );

                        return;

                    }


                    console.log(
                        "Razorpay order created:",
                        result
                    );


                    resolve(result);

                };


            const url =
                SaraDharma.WEBAPP_URL
                +
                "?action=razorpayorder"
                +
                "&amount="
                +
                encodeURIComponent(
                    data.amount
                )
                +
                "&category="
                +
                encodeURIComponent(
                    data.category
                )
                +
                "&donorName="
                +
                encodeURIComponent(
                    data.donorName
                )
                +
                "&email="
                +
                encodeURIComponent(
                    data.email
                )
                +
                "&phone="
                +
                encodeURIComponent(
                    data.phone
                )
                +
                "&address="
                +
                encodeURIComponent(
                    data.address
                )
                +
                "&country="
                +
                encodeURIComponent(
                    data.country
                )
                +
                "&receiptRequired="
                +
                encodeURIComponent(
                    data.receiptRequired
                )
                +
                "&callback="
                +
                encodeURIComponent(
                    callbackName
                );


            script =
                document.createElement(
                    "script"
                );


            script.src = url;

            script.async = true;


            script.onerror =
                function(){

                    delete window[callbackName];


                    if(
                        script &&
                        script.parentNode
                    ){

                        script.parentNode.removeChild(
                            script
                        );

                    }


                    reject(

                        new Error(
                            "Unable to contact the SaraDharma payment server."
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
 * REQUEST RAZORPAY PAYMENT VERIFICATION USING JSONP
 *
 * Sends only the three Razorpay verification values.
 *
 * No donor information.
 * No PAN.
 * No Razorpay secret.
 **************************************************************************/

function requestRazorpayVerificationJsonp(
    data
){

    return new Promise(

        function(
            resolve,
            reject
        ){

            const callbackName =
                "razorpayVerifyCallback_" +
                Date.now();


            let script = null;


            /******************************************************************
             * JSONP CALLBACK
             ******************************************************************/

            window[callbackName] =
                function(result){

                    delete window[
                        callbackName
                    ];


                    if(
                        script
                        &&
                        script.parentNode
                    ){

                        script.parentNode.removeChild(
                            script
                        );

                    }


                    if(
                        !result
                        ||
                        !result.success
                    ){

                        reject(

                            new Error(

                                result
                                &&
                                result.message

                                    ? result.message

                                    : "Payment verification failed."

                            )

                        );

                        return;

                    }


                    resolve(
                        result
                    );

                };


            /******************************************************************
             * BUILD VERIFICATION URL
             ******************************************************************/

            const url =

                SaraDharma.WEBAPP_URL

                +

                "?action=razorpayverify"

                +

                "&razorpay_payment_id="

                +

                encodeURIComponent(
                    data.razorpay_payment_id
                )

                +

                "&razorpay_order_id="

                +

                encodeURIComponent(
                    data.razorpay_order_id
                )

                +

                "&razorpay_signature="

                +

                encodeURIComponent(
                    data.razorpay_signature
                )

                +

                "&callback="

                +

                encodeURIComponent(
                    callbackName
                );


            /******************************************************************
             * CREATE JSONP SCRIPT
             ******************************************************************/

            script =
                document.createElement(
                    "script"
                );


            script.src =
                url;


            script.onerror =
                function(){

                    delete window[
                        callbackName
                    ];


                    if(
                        script
                        &&
                        script.parentNode
                    ){

                        script.parentNode.removeChild(
                            script
                        );

                    }


                    reject(

                        new Error(
                            "Unable to contact SaraDharma payment verification server."
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
 * Razorpay has returned:
 *
 *     razorpay_payment_id
 *     razorpay_order_id
 *     razorpay_signature
 *
 * These are sent to the SaraDharma server for verification.
 *
 * The browser NEVER verifies the signature.
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


    try{

        /******************************************************************
         * CHECK THAT RAZORPAY RETURNED ALL THREE VALUES
         ******************************************************************/

        if(
            !paymentResponse
            ||
            !paymentResponse.razorpay_payment_id
            ||
            !paymentResponse.razorpay_order_id
            ||
            !paymentResponse.razorpay_signature
        ){

            throw new Error(
                "Razorpay did not return the complete payment verification data."
            );

        }


        /******************************************************************
         * SEND PAYMENT RESPONSE TO SERVER
         *
         * IMPORTANT:
         *
         * We use JSONP here.
         *
         * We do NOT use fetch().
         *
         * We send ONLY:
         *
         *     payment_id
         *     order_id
         *     signature
         *
         * No PAN.
         * No donor information.
         ******************************************************************/

        const result =
            await requestRazorpayVerificationJsonp({

                razorpay_payment_id :
                    paymentResponse.razorpay_payment_id,

                razorpay_order_id :
                    paymentResponse.razorpay_order_id,

                razorpay_signature :
                    paymentResponse.razorpay_signature

            });


        /******************************************************************
         * SERVER VERIFIED PAYMENT
         ******************************************************************/

        if(
            !result
            ||
            !result.success
        ){

            throw new Error(

                result &&
                result.message

                    ? result.message

                    : "Payment verification failed."

            );

        }


        console.log(
            "Razorpay payment verified:",
            result
        );


   
 
/******************************************************************
 * PAYMENT SUCCESS
 *
 * Payment has been verified by the SaraDharma server.
 * Show the standard SaraDharma success dialog.
 ******************************************************************/

showSuccessDialog(
    result.referenceId,
    paymentResponse.razorpay_payment_id,
    result.receiptEmailed,
    result.receiptGenerated
);
        /******************************************************************
         * RESET BUTTON
         ******************************************************************/

        if(paymentButton){

            paymentButton.disabled =
                false;

            paymentButton.innerHTML =
                "Pay using Razorpay";

        }

    }


    catch(error){

        console.error(
            "Razorpay verification error:",
            error
        );


        alert(

            "Payment verification failed.\n\n"

            +

            error.message

            +

            "\n\n"

            +

            "Please contact SaraDharma if your bank account was charged."

        );


        if(paymentButton){

            paymentButton.disabled =
                false;

            paymentButton.innerHTML =
                "Pay using Razorpay";

        }

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
 * DONATION SUCCESS DIALOG
 **************************************************************************/

function showSuccessDialog(
    donationId,
    paymentId,
    receiptEmailed,
    receiptGenerated
){

    const overlay =
        document.getElementById(
            "successOverlay"
        );

    const reference =
        document.getElementById(
            "successReference"
        );

    const payment =
        document.getElementById(
            "successPaymentId"
        );

    const receiptMessage =
        document.getElementById(
            "successReceiptMessage"
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


    if(payment){

        payment.textContent =
            paymentId || "-";

    }


    if(receiptMessage){

        if(receiptEmailed){

            receiptMessage.textContent =
                "Your donation receipt has been emailed to you.";

        }

        else if(receiptGenerated){

            receiptMessage.textContent =
                "Your donation receipt was generated, but could not be emailed.";

        }

        else{

            receiptMessage.textContent =
                "Your donation receipt could not be generated. Please contact SaraDharma.";

        }

    }


    overlay.style.display =
        "flex";

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

