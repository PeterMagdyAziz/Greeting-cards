import React from 'react'
import {Formik, Form, Field, ErrorMessage, FieldArray } from "formik"
import * as Yup from "yup"
import axios from "axios"
import sample from '../images/sample.png';

// intial values of form 
const initialValues = {
    senderEmail: "",
    senderName: "",
    receivers: [""],
    subject:"",
    title: "",
    textmsg: "",
    image: ""
};


// global variables used as keywords 
let successful = false;
let verify = false;

// action when form sumbitted 
const onSubmit = (values, onSubmitProps)=>{
    console.log(values);
    successful = false;
    verify = false;
    // TODO use sendMail function from mailApi.
    axios.post('http://localhost:4005/sendmail', values)
      .then((res) =>{

        // if email is valid it will send directly
        if (res.data === "sent"){
            console.log(res.data);
            // waiting for resposnse when calling an API to avoid double submit 
            successful = true;
            verify = false
            onSubmitProps.setSubmitting(false);

        }else if (res.data === "verify"){

            // if first time he will have to validate his mail first 
            console.log(res.data);
            // waiting for resposnse when calling an API to avoid double submit
            successful = false;
            verify = true;
            onSubmitProps.setSubmitting(false);
        }  
    })
};

//using yup for form fields validation
const validationSchema = Yup.object({
        senderEmail: Yup.string().email("Invalid E-Mail").required("E-Mail Required!"), // check type string, e-mail, and filled
        senderName: Yup.string().required("Name Required!"),// check type string and filled
        receivers: Yup.array().of(
            Yup.string().email("Invalid E-Mail").required("Greet Your Friends!"), //check type string, e-mail, and filled
        ),
        subject: Yup.string().required("Subject Required!"),// check type string and filled
        title: Yup.string().required("Title Required!"),// check type string and filled
        textmsg: Yup.string().required("Please Enter a Wish!"),// check type string and filled
        image: Yup.string().url("Enter Correct URL!").required("Choose and image!")// check type string, URL and filled
});




function MyForm() {
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

                                {/* TODO Remove From section */}
                                <h1>From:</h1>
                                {/**field for sender e-mail */}
                                <div className="field-style">
                                    <label htmlFor="sender-email">E-mail: </label>
                                    <Field type="email" id="sender-email" name="senderEmail"/>
                                    <ErrorMessage name="senderEmail" component="div" className="error"/>
                                </div>
                               
                               {/**field for sender name */}
                                <div className="field-style">
                                    <label htmlFor="sender-name">Name: </label>
                                    <Field type="text" id="sender-name" name="senderName"/>
                                    <ErrorMessage name="senderName" component="div" className="error"/>
                                </div>

                                {/**field for array of receivers e-mail */}
                                <h1>Send To:</h1>
                                <div className="field-style">
                                    <label htmlFor="rec-email">E-mail: </label>
                                    <FieldArray name="receivers">
                                        {
                                            props =>{
                                                const {push, remove, form} = props;
                                                const {values} =form;
                                                const {receivers} = values;
                                                return <div>
                                                    {
                                                        receivers.map((receiver, index)=>{
                                                            const name = `receivers[${index}]`;
                                                            return <div key={index}>
                                                                <Field type="email" name={name} />
                                                                {
                                                                    index > 0 && (<button type='button' onClick={() => remove(index)}> - </button>)
                                                                }
                                                                <button type="button" onClick={()=> push("")}> + </button>
                                                                <ErrorMessage name={name} component="div" className="error"/>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            }
                                        }
                                    </FieldArray>                                    
                                </div>
                                

                                <div className="card-fields">

                                        <fieldset>

                                            <legend>Card Details</legend>

                                            {/**image of the sample of card */}
                                            <div className="img-container">
                                                <h2>Card Sample: </h2>
                                                <img src={sample} alt="sample"  width="500" height="300" ></img>
                                            </div>

                                            {/**field for e-mail subject */}
                                            <div className="field-style">
                                                <label htmlFor="email-subject">Enter Your E-mail Subject: </label>
                                                <Field type="text" id="email-subject" name="subject"/>
                                                <ErrorMessage name="subject" component="div" className="error"/>
                                            </div>
                                            
                                            {/**field for e-mail title*/}
                                            <div className="field-style">
                                                <label htmlFor="card-title">Enter Your Card Title: </label>
                                                <Field type="text" id="card-ttile" name="title"/>
                                                <ErrorMessage name="title" component="div" className="error"/>
                                            </div>

                                            {/**field for e-mail text*/}
                                            <div className="field-style">
                                                <label htmlFor="card-text">Enter Your Card Text: </label>
                                                <Field as="textarea" rows="4" cols="45" id="card-text" name="textmsg"/>
                                                <ErrorMessage name="textmsg" component="div" className="error"/>
                                            </div>

                                            {/**field for e-mail image*/}
                                            <div className="field-style">
                                                <label htmlFor="card-image">Enter Your Card Image URL: </label>
                                                <Field type="url" id="card-image" name="image" placeholder="https://example.com"/>
                                                <ErrorMessage name="image" component="div" className="error"/>
                                            </div>
                                    
                                        </fieldset>
                                </div>
                                
                                {/**submit button */}
                                <button type="submit">Submit</button>
                                {/**message appear when sending email is successful */}
                                {successful ? <h1 className="sent">Sent successfully !!</h1> : null}
                                {/**message appear when user needs to verify his e-mail first */}
                                {verify? <h1 className="verify">Check Your e-mail and Verify ... then SEND gain !! </h1> : null}
                        </Form>
                    )
                }
            }  
        </Formik>
    )
}

export default MyForm
