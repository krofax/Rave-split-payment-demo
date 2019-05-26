//My public key
const API_publicKey = "FLWPUBK_TEST-9070a8d235099f5ac7db26a0356e92b3-X";

function splitPayment() {
    var x = getpaidSetup({
        PBFPubKey: API_publicKey,
        customer_email: "bkrofegha@gmail.com", //used my email instead
        amount: document.getElementById("amt").value,
        currency: "NGN",
        txref: "rave-123456",
        //creating two subaccounts
        subaccounts: [
            {
                id: "RS_F1EC5985C24D45AD410199ECA6B72D3D",

                transaction_split_ratio: "10",
                transaction_charge_type: "flat",
                transaction_charge: "500"
            },

            {
                id: "RS_344DD49DB5D471EF565C897ECD67CD95",
                transaction_split_ratio: "5",
                transaction_charge_type: "flat",
                transaction_charge: "300"
            },


        ],
        meta: [{
            metaname: "flightID",
            metavalue: "AP1234"
        }],
        onclose: function () { },
        callback: function (response) {
            var txref = response.tx.txRef; // collect flwRef returned and pass to a server page to complete status check.
            console.log("This is the response returned after a charge", response);
            if (
                response.tx.chargeResponseCode == "00" ||
                response.tx.chargeResponseCode == "0"
            ) {
                //redirect t o dashboard to check transaction overview
                location.replace("https://rave.flutterwave.com/dashboard/overview/total")
            } else {
                alert("Please Contact our customer care for prompt support")
            }

            x.close(); // use this to close the modal immediately after payment.
        }
    });
}