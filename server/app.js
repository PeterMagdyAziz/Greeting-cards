const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "petergreetingimagescloud",
    api_key: "836476119276936",
    api_secret: "9mK7Kerpkyrr3PML3nIjHs0Gm58",
});


const app = express();

app.listen(4005);

const mailjet = require ('node-mailjet').connect('6ed5b78c98ce9d6ec1b0b1b0d4e67dff', '857d270c253e70a02d36bd58d3b71faa')
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());



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
            "TemplateID": 2267890,
            "TemplateLanguage": true,
            "Subject": "Greets",
            "Variables": {
                    "greet": "Happy Birthday",
                    "text": "enjoy",
                    "image": ""
            }
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

