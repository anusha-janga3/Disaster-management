const {email} = require('../model/admin')
const nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bharathbrave99@gmail.com',
        pass: 'niyw bqwy haqc ewbf'
    }
});

async function mail(latitude, longitude,dis) {
    try {
        const emailBody = `I am structed in ${dis} disaster please help me......My current location is https://maps.google.com/?q=${latitude},${longitude} HELP ME`;
        const emails = await email.find({}, 'gmail').lean();
        for (const emailData of emails) {
            try {
                await transporter.sendMail({
                    from: 'DISASTER MANAGEMENT',
                    to: emailData.gmail,
                    subject: 'HELP ME',
                    text: emailBody
                });
                console.log(`Email sent to ${emailData.gmail}`);
            } catch (error) {
                console.error(`Error sending email to ${emailData.gmail}:`, error);
            }
        }
    } catch (error) {
        console.error('Error fetching emails:', error);
    }
}
module.exports = mail;