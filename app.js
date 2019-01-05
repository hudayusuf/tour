const express=require("express");
const bodyParser=require("body-parser");
const exphbs=require("express-handlebars");
const nodemailer=require("nodemailer");
const path=require("path");
const app=express();


//view engine setup

app.engine("handlebars",exphbs());
app.set("view engine", "handlebars");

//static folder
// app.use("/public",express.static(path.join(__dirname,"public")));
app.use(express.static(__dirname + '/View'));/////////////
app.use(express.static('public'));////////////

//body parser middleware

app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())



 // app.get("/",(req, res)=>{
 // res.render("contact");
 // })
 app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html');
  //__dirname : It will resolve to your project folder.
});

app.get('/page1.html',function(req,res){
  res.sendFile(__dirname+'/page1.html');
  //__dirname : It will resolve to your project folder.
});
 app.get('/page2.html',function(req,res){
  res.sendFile(__dirname+'/page2.html');
  //__dirname : It will resolve to your project folder.
});
 app.get('/page3.html',function(req,res){
  res.sendFile(__dirname+'/page3.html');
  //__dirname : It will resolve to your project folder.
});

 app.get('/form.html',function(req,res){
  res.render("contact");
  //__dirname : It will resolve to your project folder.
});



app.post("/send",(req,res)=> {

const output= `
<p>u have a new contact</p
<h3>contact detail</h3>
<ul>
  <li>Name: ${req.body.firstname}</li>
   <li>lastname: ${req.body.lastname}</li>
  <li>email: ${req.body.email}</li>
</ul>
<h3>message</h3>
<p >${req.body.subject} </p>
 `;

 let transporter = nodemailer.createTransport({
         host: "smtp-mail.outlook.com", // hostname
        secure: false, // TLS requires secureConnection to be false
         port: 587, // port for secure SMTP

    tls: {
       rejectUnauthorized:false
    },
        auth: {
            user: "huda_peace2@outlook.com", // generated ethereal user
            pass: "sundus1996" // generated ethereal password
        }




    });

//  var transporter = nodemailer.createTransport({
//     host: "smtp-mail.outlook.com", // hostname
//     secureConnection: false, // TLS requires secureConnection to be false
//     port: 587, // port for secure SMTP
//     tls: {
//        ciphers:'SSLv3'
//     },
//     auth: {
//         user: 'huda_peace2@outlook.com',
//         pass: 'sundus1996'
//     }
// });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '" Nodemailer Contact"  <huda_peace2@outlook.com>', // sender address
        to: 'huda_peace2@outlook.com', // list of receivers
        subject: 'node contact request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render("contact",{msg:"Thank you.We will get back to you shortly"})
        
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });

});

app.listen(process.env.PORT || 3000,()=> 
console.log("server started"));