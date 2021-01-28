import React, {useState} from 'react'
import {Formik, Form,} from "formik"
import * as Yup from "yup"
import Input from './Input';
import TextField from './TextField';
import InputArray from './InputArray';
import { sendMail } from '../api/mailApi';


const apiBaseUrl = "http://localhost:4005";

// intial values of form 
const initialValues = {
    receivers: [""],
    subject:"",
    textmsg: "",
    image: ""
};


//using yup for form fields validation
const validationSchema = Yup.object({
        receivers: Yup.array().of(
            Yup.string().email("Invalid E-Mail").required("Greet Your Friends!"), //check type string, e-mail, and filled
        ),
        subject: Yup.string().required("Subject Required!"),// check type string and filled
        textmsg: Yup.string().required("Enter a Text!"),// check type string and filled
        image: Yup.string().url("Enter Correct URL!").required("Choose an image!")// check type string, URL and filled
});




function MyForm() {

    // state for message shown when form submitted
    const [successful, setSuccessful] = useState(false);

    // action when form sumbitted 
    const onSubmit = (values, onSubmitProps)=>{
        console.log("props", onSubmitProps)
        setSuccessful(false); // first set successful to false
        sendMail(`${apiBaseUrl}/send`, values, onSubmitProps, initialValues)
        .then( res => {
            setSuccessful(res); // setting successful to true if e-mail sent
            
        });
    };


    return (
        <Formik
            initialValues={initialValues} // setting intial values of form fields and relting to names 
            validationSchema={validationSchema} // setting the form validation
            onSubmit={onSubmit} // setting action of submit
        >
            {
                formik=>{
                
                    return (
                        <Form className="form-container">

                            <h2>Send To:</h2>

                            <div className="field-style">

                                {/**field for array of receivers e-mail */}
                                <InputArray name="receivers" id="rec-email" label="E-mail" />                                  

                            </div>


                                {/**field for e-mail subject */}
                                <div className="field-style">
                                    <Input name="subject" id="email-subject" type="text" label="Enter Your E-mail Subject: " />
                                </div>

                                {/**field for card image*/}
                                <div className="field-style">
                                    <Input name="image" id="card-image" type="url" placeholder="https://example.com" label="Enter Image URL: "/>
                                </div>

                                {/**field for card text*/}
                                <div className="field-style">
                                    <TextField name="textmsg" id="card-text" as="textarea" label="Enter Your Card Text" rows="10" cols="60"/>
                                </div>

                            
                                
                            {/**submit button */}
                            <button type="submit">Send</button>

                            {/**message appear when sending email is successful and form is empty after submit till we type new data*/}
                            {
                                (successful && !formik.dirty ? <h1 className="sent">Sent successfully !!</h1> : null)
                            }
                        </Form>
                    )
                }
            }  
        </Formik>
    )
}

export default MyForm
