import  React, {useState} from "react";
import * as Yup from "yup";
import {Formik, FormikHelpers} from 'formik';
import Input from "./Input";
import TextField from "./TextField"
import InputArray from "./InputArray"
import {sendMail}  from "../api/mailapi"
import { boolean } from "yup/lib/locale";


const apiBaseUrl : string = "http://localhost:4005";


interface MyFormValues {
    receivers: string[];
    subject: string;
    textmsg: string;
    image: string;
}



const MyForm : React.FC <{}>=()=>{

    const [successful, setSuccessful] = useState < boolean | string> (false)

    const initialValues: MyFormValues = { 
        receivers: [""],
        subject:"",
        textmsg: "",
        image: "" 
    };

    const validationSchema = Yup.object({
        receivers: Yup.array().of(
            Yup.string().email("Invalid E-Mail").required("Greet Your Friends!"), //check type string, e-mail, and filled
        ),
        subject: Yup.string().required("Subject Required!"),// check type string and filled
        textmsg: Yup.string().required("Enter a Text!"),// check type string and filled
        image: Yup.string().url("Enter Correct URL!").required("Choose an image!")// check type string, URL and filled
    });


    /*const onSubmit = (values: MyFormValues, onSubmitProps: FormikHelpers<MyFormValues>)=> {
        console.log("submit")
        console.log({ values, onSubmitProps });
        console.log("props", onSubmitProps);
        setSuccessful(false); // first set successful to false
        /*sendMail(`${apiBaseUrl}/send`, values, onSubmitProps, initialValues)
        .then( res => {
            setSuccessful(res); // setting successful to true if e-mail sent
            
        });
    };*/


    
    const onSubmit = (values: MyFormValues, onSubmitProps: FormikHelpers<MyFormValues>) => {
        console.log({ values, onSubmitProps });
        
        
        console.log("submit")
        console.log({ values, onSubmitProps });
        console.log("props", onSubmitProps);
        setSuccessful(false); // first set successful to false
        sendMail(`${apiBaseUrl}/send`, values, onSubmitProps)
        .then( (res )  => {

            setSuccessful(res); // setting successful to true if e-mail sent    
        });
        
        //alert(JSON.stringify(values, null, 2));
        //onSubmitProps.setSubmitting(false);
        //onSubmitProps.resetForm({})
       // setSuccessful(true);
    }


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            render={(formik) => (
                <form onSubmit={formik.handleSubmit}>
                    
                <h2>Send To:</h2>

                {/**field for array of receivers e-mail */}
                <div className="field-style">
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
                 <button type="submit" disabled = {formik.isSubmitting} >Send</button>

                {/**message appear when sending email is successful and form is empty after submit till we type new data*/}
                {
                    (formik.isSubmitting ? <h1 className="sent">Sending...</h1> : null)
                }

                {/**message appear when sending email is successful and form is empty after submit till we type new data*/}
                {
                    (successful && !formik.dirty ? <h1 className="sent">Sent successfully !!</h1> : null)
                }
                </form>
            )}
        />
          
    )
}


export default MyForm
