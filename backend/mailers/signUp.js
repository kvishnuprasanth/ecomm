const nodemailer=require('../config/nodemailer');

module.exports.signUp = async(email) => {
   
   try {
    let info=await nodemailer.transporter.sendMail({
        from:'c4746665@gmail.com',
        to: email,
        subject: "Thank You",
        html: `Succesfully register on E-commerce`
     });
     return ;
   } catch (error) {
    console.log('error in sendind mail',error);
   }
    
}