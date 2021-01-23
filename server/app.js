const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();

app.listen(4005);

const mailjet = require ('node-mailjet').connect('6ed5b78c98ce9d6ec1b0b1b0d4e67dff', '857d270c253e70a02d36bd58d3b71faa')
app.use(bodyParser.json());
app.use(cors());


// route for sending the email
app.post("/sendmail", (req, res)=>{

    // first check mail is verified by site or not
    const request = mailjet
	.post("sender", {'version': 'v3'})
	.id(req.body.senderEmail)
	.action("validate")
	.request()
    
    request
	.then((result) => {
        // to send verification email to a user and he will be able to send again
        console.log("varified", result.body)
        res.send("verify") // response sent to front-end used as keyword to implement the verify message on screen
	})
	.catch((err) => {

        // for valid emails it will send directly
        const sendmsg = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
        "Messages":[
            {
                // sender mail and name
                "From": {
					"Email": req.body.senderEmail,
					"name": req.body.senderName,
                },
				"To": req.body.receivers.map((receiver)=>{ return {Email: receiver}}), // sender mail
				"TemplateID": 2267890, // id template made in mailjet
				"TemplateLanguage": true,
				"Subject": req.body.subject, // setting a subject to email  
				"Variables": {
                    "greet": req.body.title, // setting card title
                    "text": req.body.textmsg, // setting card text 
                    "image": req.body.image, // setting card image
                }
            }
        ]
    })
     
        sendmsg
        .then((result) => {
            console.log("recieved",result.body)
            res.send("sent") // response sent to front-end used as keyword to implement the sent message on screen
        })
        .catch((errors) => {
            console.log("error",errors.statusCode)
            res.send("error")
        })
    })
})