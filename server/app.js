const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();

app.listen(4005);

const mailjet = require ('node-mailjet').connect('6ed5b78c98ce9d6ec1b0b1b0d4e67dff', '857d270c253e70a02d36bd58d3b71faa')
app.use(bodyParser.json());
app.use(cors());



app.post("/send", (req, res)=>{

     // TODO Data validation

    

    console.log("server values", req.body)

    
    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
        "Messages":[
            {
                "From": {
                    "Email": "peter_magdy93@hotmail.com",
                    "Name": "Peter"
                },
                "To": req.body.receivers.map((receiver)=>{ return {Email: receiver}}),
                "TemplateID": 2267890,
                "TemplateLanguage": true,
                "Subject": req.body.subject, // setting a subject to email  
				"Variables": {
                    "image": req.body.image, // setting card image
                    "text": req.body.textmsg, // setting card text 
                }
            }
        ]
    })
    request
    .then((result) => {
        console.log("recieved",result.body)
        res.send(true) // response sent to front-end used as keyword to implement the sent message on screen
    })
    .catch((err) => {
        console.log(err.statusCode)
        res.send("error")
    })
})