const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.listen(4003);

const mailjet = require ('node-mailjet').connect('6ed5b78c98ce9d6ec1b0b1b0d4e67dff', '857d270c253e70a02d36bd58d3b71faa')

app.use(cors());
app.use(bodyParser.json());


app.post("/sendmail", (req, res)=>{
    console.log(req.body)
    const request = mailjet
	.post("sender", {'version': 'v3'})
	.id(req.body.sender)
	.action("validate")
	.request()
    request
	.then((result) => {
        // to send verification email to a user 
        console.log("varified", result.body)
        res.send("verify")
	})
	.catch((err) => {
        // for valid emails it will send directly
        console.log( "error" ,err.statusCode)

        const sendmsg = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
        "Messages":[
            {
            "From": {
                "Email": req.body.sender,
                "Name": "Peter"
            },
            "To": req.body.receivers.map((receiver)=>{ return {Email: receiver}}),
            "Subject": "Greetings from Mailjet.",
            "TextPart": "My first Mailjet email",
            "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
            "CustomID": "AppGettingStartedTest"
            }
        ]
        })
        sendmsg
        .then((result) => {
            console.log("recieved",result.body)
            res.send("sent")
        })
        .catch((errors) => {
            console.log(errors.statusCode)
            res.send("error")
        })
    })
})
