const {Admin,email} = require('../model/admin')


const adminAdd = (name,gender,aadhar,phone,ephone1,mail,village,pincode,state,pass1) => {
    const newAdmin = new Admin({
        username: name,
        gend:gender,
        adhar:aadhar,
        mobile:phone,
        Trustedp:ephone1,
        Mail:mail,
        Village:village,
        Pincode:pincode,
        State:state,
        password1: pass1
    });
    newAdmin.save();
};
const addmail = (mail)=>{
    const newmail = new email({
        gmail:mail
    })
    newmail.save()
}

module.exports = {adminAdd,addmail};