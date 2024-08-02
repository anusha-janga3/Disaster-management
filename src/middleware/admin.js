const otpgenerate = require('otp-generator')
const nodemailer = require('nodemailer');
require('dotenv').config();
let data={};
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bharathbrave99@gmail.com',
        pass: 'niyw bqwy haqc ewbf'
    }
});
async function otp(mail) {
    const otpp = otpgenerate.generate(6, { upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets:false});
    data = {
        otp: otpp
    };
    let mailOptions = {
        from: 'DISASTER MANAGEMENT',
        to: mail,
        subject: 'ACCOUNT CREATION',
        text: `your otp is ${otpp}` 
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log(`OTP sent successfully to ${mail}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

async function verifyOtp(userOtp){
    otpp=String(data.otp)
    userotp = String(userOtp.userOtp);
    console.log("otpp:", otpp);
    console.log("userOtp:", userotp);

    if (otpp === userotp) {
        console.log("true");
        return true;
    }

    else{
        console.log("false")
        return false;
    }
}


let mydata;

const accessData = (Data) => {
    mydata = Data
 
}

const sendMail = async ( callback ) => {

    let successCount = 0; // Counter for successful emails
    let errorCount = 0; // Counter for failed emails
    
    mydata.forEach(entry => {
        Object.keys(entry).forEach(email => {
            entry[email].forEach(mail => {
                accessData(mail, email);
                try {

                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'bharathbrave99@gmail.com',
                            pass: 'yytk ezvr ukhb prnv',
                        }
                    });
                    if ("geolocation" in navigator) {
                        navigator.geolocation.getCurrentPosition(
                            function(position) {
                                const latitude = position.coords.latitude;
                                const longitude = position.coords.longitude;
                                message = `i am stucked in ${m} disaster and My current location is https://maps.google.com/?q=${latitude},${longitude}`;
                                sendEmail(recipientEmails, subject, message);
                            },
                            function(error) {
                                console.error('Error getting location:', error);
                                promptForLocation();
                            },
                            { timeout: 10000 }
                        );
                    } else {
                        promptForLocation();
                    }
                    // Email message content
                    var mailOptions = {
                        from: 'DISASTER MANAGEMENT',
                        to: `${email.mail}@gamil.com`,
                        subject: 'DISASTER',
                        text: message
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                            errorCount++;
                        } else {
                            console.log('Email sent: ✅ ' + info.response);
                            successCount++;
                        }

                        // Check if all emails have been sent
                        if (successCount + errorCount === mydata.length) {
                            if (errorCount === 0) {
                                // All emails sent successfully
                                console.log("Result: All emails sent successfully 🎉 ")
                                callback(null, 'All emails sent successfully');
                            } else {
                                // Some emails failed to send
                                callback(`${errorCount} emails failed to send, null`);
                            }
                        }
                    });
                } catch (error) {
                    console.log(error);
                    errorCount++;
                }
            });
        });
    });
} 

module.exports = { sendMail, accessData };
module.exports={otp,verifyOtp};