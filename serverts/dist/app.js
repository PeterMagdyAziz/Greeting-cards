"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const node_mailjet_1 = __importDefault(require("node-mailjet"));
const app = express_1.default();
const connection = node_mailjet_1.default.connect('6ed5b78c98ce9d6ec1b0b1b0d4e67dff', '857d270c253e70a02d36bd58d3b71faa');
app.listen(4005, () => {
    console.log("Server running...");
});
app.use(body_parser_1.default.json());
app.use(cors_1.default());
app.post("/send", (req, res, next) => {
    console.log("server values", req.body);
    const params = {
        Messages: [
            {
                From: {
                    Email: "peter_magdy93@hotmail.com",
                    Name: "Peter"
                },
                To: req.body.receivers.map((receiver) => { return { Email: receiver }; }),
                Variables: {
                    "image": req.body.image,
                    "text": req.body.textmsg,
                },
                TemplateID: 2267890,
                TemplateLanguage: true,
                Subject: req.body.subject,
            }
        ]
    };
    const mailJetRequest = connection.post('send', { version: 'v3.1' });
    const mailJetResponse = mailJetRequest.request(params);
    mailJetResponse
        .then((result) => {
        console.log(result.body);
        res.send(true);
    })
        .catch((err) => {
        console.log(err);
    });
});
