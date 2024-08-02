const express = require('express')
const {adminAdd,addmail} = require('../controllers/admin')
const {Admin} = require('../model/admin')
const bcrypt = require('bcrypt');
const { otp, verifyOtp } = require('../middleware/admin')
const mail = require('../middleware/mails')
const router = express.Router()
var userData = {};
var disaster ={};


router.post('/confirm',(req,res)=>{
    res.render('login')
})
router.post('/allow',(req,res)=>{
    res.redirect('/home')
})
router.get('/home',(req,res)=>{
    res.render('home')
})
router.post('/signup', async (req, res) => {
    const { name, gender, aadhar, phone, ephone1, mail, village, pincode, state, pass1 } = req.body;
    const foundUser = await Admin.findOne({ username: name });
    if (foundUser) {
        res.send("username already exist");
    }
    const send = otp(mail);
    const salts = 10;

    const hashedPass = await bcrypt.hash(pass1, salts);
    userData = {
        name: name,
        gender: gender,
        aadhar: aadhar,
        phone: phone,
        ephone1: ephone1,
        mail: mail,
        village: village,
        pincode: pincode,
        state: state,
        hashedPass: hashedPass
    };
    res.render('otp')
});
router.post('/otp', async (req, res) => {
    const userOtp = req.body;
    console.log(userOtp);
    const re = await verifyOtp(userOtp);
    const name = userData.name;
    const gender = userData.gender;
    const aadhar = userData.aadhar;
    const phone = userData.phone;
    const ephone1 = userData.ephone1;
    const mail = userData.mail;
    const village = userData.village;
    const pincode = userData.pincode;
    const state = userData.state;
    const hashedPass = userData.hashedPass;
    if (re) {
        const result = await adminAdd(name, gender, aadhar, phone, ephone1, mail, village, pincode, state, hashedPass);
        res.render('voluteer_page')
    }
    else {
        res.send("wrong OTP")
    }
})
router.post('/login', async (req, res) => {
    const { user, pass } = req.body;
    userData = {
        name:user
    }
    const foundUser = await Admin.findOne({ username: user });
    if (!foundUser) {
        return res.render('login', { message: "Invalid id or password" })

       
    }
    // console.log("Found user:", foundUser);
    else {
        const isPassMatch = await bcrypt.compare(pass, foundUser.password1);
        if (!isPassMatch) {

            return res.render('login', { message: "Invalid id or password" })
        }
        else{
            res.render('home',{id:foundUser._id});

        }

    }
});
router.post('/disaster',(req,res)=>{
    const distype = req.body;
    disaster = {
        distype : distype
    }
    res.redirect('/home')
})
router.post('/sendMails', async (req,res)=>{
    const {latitude,longitude} = req.body;
    const dis = disaster.distype.distype;
    console.log(latitude,longitude,dis);
    const  sendMails = await mail(latitude,longitude,dis);
    // res.status(200).send("Location mail sent successfully.");
    console.log("mails sent")
})
router.post('/home1',async(req,res)=>{
    const role = req.body.role;
    console.log(role);
    if(role === 'volunteer'){
        const m = await addmail(userData.mail);
    }
    res.redirect('/home');
})

router.get('/profile', async (req, res) => {
    try {
        const username = userData.name;
        const adminData = await Admin.findOne({ username });
        if (!adminData) {
            return res.status(404).json({ message: 'Admin data not found' });
        }
        res.json(adminData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
// router.get('/call',async (req,res)=>{
//     const username = userData.name;
//     const data = await Admin.findOne({username});
    
// })
module.exports = router;