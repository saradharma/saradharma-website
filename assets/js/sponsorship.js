/**************************************************************************
 *
 * SaraDharma Community
 *
 * Version : 5.3
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
SUBMIT SPONSORSHIP — RAZORPAY
**************************************************************************/

async function submitSponsorship(event){

    event.preventDefault();

    if(!validateForm()){
        return;
    }

    const paymentButton =
        document.getElementById(
            "submitButton"
        );

    paymentButton.disabled = true;
    paymentButton.innerHTML = "Preparing Payment...";

    try{

        await loadRazorpayCheckout();

        const data = {

            category :
                document.getElementById(
                    "sponsorshipCategory"
                ).value.trim(),

            duration :
                document.getElementById(
                    "selectedOption"
                ).value.trim(),

            amount :
                document.getElementById(
                    "selectedAmount"
                ).value.trim(),

            sponsorName :
                document.getElementById(
                    "sponsorName"
                ).value.trim(),

            email :
                document.getElementById(
                    "email"
                ).value.trim(),

            countryCode :
                document.getElementById(
                    "countryCode"
                ).value,

            phone :
                document.getElementById(
                    "phone"
                ).value.trim(),

            city :
                document.getElementById(
                    "city"
                ).value.trim(),

            country :
                document.getElementById(
                    "country"
                ).value.trim(),

            receipt80G :
                document.getElementById(
                    "receipt80G"
                ).value,

            recognitionName :
                document.getElementById(
                    "recognitionName"
                ).value.trim(),

            dedicationType :
                document.getElementById(
                    "dedicationType"
                ).value,

            dedicationName :
                document.getElementById(
                    "dedicationName"
                ).value.trim(),

            comments :
                document.getElementById(
                    "comments"
                ).value.trim()

        };

        paymentButton.innerHTML = "Creating Secure Payment...";

        const order =
            await requestSponsorshipRazorpayOrderJsonp(
                data
            );

        if(
            !order ||
            !order.success
        ){
            throw new Error(
                order &&
                order.message
                    ? order.message
                    : "Unable to create the Razorpay order."
            );
        }

        const options = {

            key :
                order.keyId,

            amount :
                order.amount,

            currency :
                order.currency || "INR",

            name :
                "SaraDharma Community",

            description :
                data.category +
                " - " +
                data.duration,

            order_id :
                order.orderId,

            prefill : {
                name :
                    data.sponsorName,
                email :
                    data.email,
                contact :
                    data.countryCode +
                    data.phone
            },

            notes : {
                sponsorship_id :
                    order.referenceId
            },

            theme : {
                color :
                    "#C66A00"
            },

            handler :
                function(
                    paymentResponse
                ){

                    handleSponsorshipRazorpaySuccess(
                        paymentResponse
                    );

                },

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
            function(response){

                console.error(
                    "Razorpay sponsorship payment failed:",
                    response
                );

                alert(
                    "Payment was not completed.\n\n" +
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
            "Sponsorship Razorpay error:",
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
LOAD RAZORPAY CHECKOUT
**************************************************************************/

function loadRazorpayCheckout(){

    return new Promise(
        function(resolve,reject){

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
REQUEST RAZORPAY SPONSORSHIP ORDER USING JSONP
**************************************************************************/

function requestSponsorshipRazorpayOrderJsonp(
    data
){

    return new Promise(
        function(resolve,reject){

            const callbackName =
                "sponsorshipOrderCallback_" +
                Date.now();

            let script = null;

            window[callbackName] =
                function(result){

                    delete window[
                        callbackName
                    ];

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
                                    ?
                                result.message
                                    :
                                "Unable to create Razorpay sponsorship order."
                            )
                        );

                        return;

                    }

                    console.log(
                        "Razorpay sponsorship order created:",
                        result
                    );

                    resolve(result);

                };

            const params = new URLSearchParams();

            params.set(
                "action",
                "sponsorshiprazorpayorder"
            );

            Object.keys(data).forEach(
                function(key){

                    params.set(
                        key,
                        data[key] == null
                            ? ""
                            : data[key]
                    );

                }
            );

            params.set(
                "callback",
                callbackName
            );

            script =
                document.createElement(
                    "script"
                );

            script.src =
                SaraDharma.WEBAPP_URL +
                "?" +
                params.toString();

            script.async = true;

            script.onerror =
                function(){

                    delete window[
                        callbackName
                    ];

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
REQUEST RAZORPAY SPONSORSHIP PAYMENT VERIFICATION USING JSONP
**************************************************************************/

function requestSponsorshipRazorpayVerificationJsonp(
    data
){

    return new Promise(
        function(resolve,reject){

            const callbackName =
                "sponsorshipVerifyCallback_" +
                Date.now();

            let script = null;

            window[callbackName] =
                function(result){

                    delete window[
                        callbackName
                    ];

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
                                    ?
                                result.message
                                    :
                                "Sponsorship payment verification failed."
                            )
                        );

                        return;

                    }

                    resolve(result);

                };

            const params =
                new URLSearchParams();

            params.set(
                "action",
                "sponsorshiprazorpayverify"
            );

            params.set(
                "razorpay_payment_id",
                data.razorpay_payment_id
            );

            params.set(
                "razorpay_order_id",
                data.razorpay_order_id
            );

            params.set(
                "razorpay_signature",
                data.razorpay_signature
            );

            params.set(
                "callback",
                callbackName
            );

            script =
                document.createElement(
                    "script"
                );

            script.src =
                SaraDharma.WEBAPP_URL +
                "?" +
                params.toString();

            script.async = true;

            script.onerror =
                function(){

                    delete window[
                        callbackName
                    ];

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
                            "Unable to contact the SaraDharma payment server for verification."
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
HANDLE VERIFIED RAZORPAY SUCCESS
**************************************************************************/

async function handleSponsorshipRazorpaySuccess(
    paymentResponse
){

    const paymentButton =
        document.getElementById(
            "submitButton"
        );

    paymentButton.disabled =
        true;

    paymentButton.innerHTML =
        "Verifying Payment...";

    try{

        if(
            !paymentResponse ||
            !paymentResponse.razorpay_payment_id ||
            !paymentResponse.razorpay_order_id ||
            !paymentResponse.razorpay_signature
        ){

            throw new Error(
                "Razorpay did not return the complete payment verification data."
            );

        }

        const result =
            await requestSponsorshipRazorpayVerificationJsonp({

                razorpay_payment_id :
                    paymentResponse.razorpay_payment_id,

                razorpay_order_id :
                    paymentResponse.razorpay_order_id,

                razorpay_signature :
                    paymentResponse.razorpay_signature

            });

        if(
            !result ||
            !result.success
        ){

            throw new Error(
                result &&
                result.message
                    ?
                result.message
                    :
                "Sponsorship payment verification failed."
            );

        }

        console.log(
            "Razorpay sponsorship payment verified:",
            result
        );

        showSponsorshipSuccessDialog(
            result.referenceId,
            result.paymentId,
            result.receiptEmailed
        );

    }
    catch(error){

        console.error(
            "Sponsorship payment verification error:",
            error
        );

        alert(
            "Payment verification failed.\n\n" +
            error.message +
            "\n\n" +
            "Please contact SaraDharma if your bank account was charged."
        );

        paymentButton.disabled =
            false;

        paymentButton.innerHTML =
            "Pay using Razorpay";

    }

}


/**************************************************************************
SUCCESS DIALOG
**************************************************************************/

function showSponsorshipSuccessDialog(
    reference,
    paymentId,
    receiptEmailed
){

    document.getElementById(
        "successReference"
    ).textContent =
        reference || "N/A";

    document.getElementById(
        "successPaymentId"
    ).textContent =
        paymentId || "N/A";

    document.getElementById(
        "successReceiptMessage"
    ).textContent =
        receiptEmailed
            ?
        "Your sponsorship receipt has been emailed to you."
            :
        "Your sponsorship has been recorded successfully. The receipt email could not be confirmed.";

    document.getElementById(
        "successOverlay"
    ).style.display =
        "flex";

    document.body.style.overflow =
        "hidden";

}


/**************************************************************************
CLOSE SUCCESS DIALOG
**************************************************************************/

function closeSuccessDialog(){

    document.getElementById(
        "successOverlay"
    ).style.display =
        "none";

    document.body.style.overflow =
        "auto";

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
    ).style.display =
        "none";

    document.getElementById(
        "sponsorshipForm"
    ).style.display =
        "none";

    document.getElementById(
        "residentSection"
    ).style.display =
        "none";

    document.getElementById(
        "infrastructureSection"
    ).style.display =
        "none";

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

        item.checked =
            false;

    });

    const paymentButton =
        document.getElementById(
            "submitButton"
        );

    if(paymentButton){

        paymentButton.disabled =
            false;

        paymentButton.innerHTML =
            "Pay using Razorpay";

    }

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}


/**************************************************************************
END OF FILE
**************************************************************************/
