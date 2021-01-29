import express, {Application, Request, Response, NextFunction} from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mailjet from "node-mailjet"
import {Email} from "node-mailjet"


const app: express.Application = express();


const connection: Email.Client = mailjet.connect('6ed5b78c98ce9d6ec1b0b1b0d4e67dff', '857d270c253e70a02d36bd58d3b71faa');

app.listen(4005, ()=>{
    console.log("Server running...");
});



app.use(bodyParser.json());
app.use(cors());



app.post("/send",(req: Request, res: Response, next: NextFunction)=>{
    
    console.log("server values", req.body)

    const params : Email.SendParams = {
        Messages: [
            {
                From: {
                    Email: "peter_magdy93@hotmail.com",
                    Name: "Peter"
                },
                To: req.body.receivers.map((receiver:string)=>{ return {Email: receiver}}),
                Variables: {
                    "image": req.body.image, // setting card image
                    "text": req.body.textmsg, // setting card text 
                },
                TemplateID: 2267890,
                TemplateLanguage: true,
                Subject: req.body.subject,
            }
        ]
    }

    const mailJetRequest: Email.PostResource = connection.post('send', { version: 'v3.1' });
    const mailJetResponse: Promise<Email.PostResponse> = mailJetRequest.request(params);

    mailJetResponse
        .then((result: Email.PostResponse) => {
            console.log(result.body)
            res.send(true)
        })
        .catch((err: Error) => {
            console.log(err)
        });

});

