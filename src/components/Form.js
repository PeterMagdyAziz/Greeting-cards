import React from 'react'
import {Formik, Form, Field, ErrorMessage, FieldArray } from "formik"
import * as Yup from "yup"
import axios from "axios"
import sample from '../images/sample.png';


const initialValues = {
    sender: "",
    receivers: [""],
    title: "",
    textmsg: "",
    image: ""
};

let successful = false;
let verify = false;

const onSubmit = (values, onSubmitProps)=>{
    console.log(values);
    successful = false;
    verify = false;
    axios.post('http://localhost:4000/sendmail', values)
      .then((res) =>{

        // if email is valid it will send directly
        if (res.data === "sent"){
            console.log(res.data);
            // waiting for resposnse when calling an API
            successful = true;
            verify = false
            onSubmitProps.setSubmitting(false);
        }else if (res.data === "verify"){

            // if first time he will have to validate his mail first 
            console.log(res.data);
            // waiting for resposnse when calling an API
            successful = false;
            verify = true;
            onSubmitProps.setSubmitting(false);
        }  
    })
};

const validationSchema = Yup.object({
        sender: Yup.string().email("Invalid E-Mail").required("E-Mail Required!"),
        receivers: Yup.array().of(
            Yup.string().email("Invalid E-Mail").required("Greet Your Friends!"),
        ),
        title: Yup.string().required("Title required"),
        textmsg: Yup.string().required("Please enter a wish"),
        image: Yup.string().url("Enter Correct URL").required("Choose and image")
});




function MyForm() {
    return (
        <Formik
            initialValues={initialValues} // itwil tsart with intial values as the formvalues is null
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {
                formik=>{
                    return (
                        <Form className="form-container">

                                <h1>From:</h1>
                                <div className="field-style">
                                    <label htmlFor="sender-email">E-mail: </label>
                                    <Field type="email" id="sender-email" name="sender"/>
                                    <ErrorMessage name="sender" component="div" className="error"/>
                                </div>
                               


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
                                                                <ErrorMessage name={name} >
                                                                    {
                                                                        (errorMsg)=> {
                                                                            return (
                                                                                (errorMsg === "Invalid E-Mail" || errorMsg ==="Greet Your Friends!") ?
                                                                                <div className="error"> {errorMsg} </div> : null
                                                                            )
                                                                        }
                                                                    }
                                                                </ErrorMessage>
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

                                            <img src={sample} alt="sample"  width="500" height="300" ></img>

                                            <div className="field-style">
                                                <label htmlFor="card-title">Enter Your Card Title: </label>
                                                <Field type="text" id="card-ttile" name="title"/>
                                                <ErrorMessage name="title" component="div" className="error"/>
                                            </div>

                                            <div className="field-style">
                                                <label htmlFor="card-text">Enter Your Card Text: </label>
                                                <Field as="textarea" rows="4" cols="45" id="card-text" name="textmsg"/>
                                                <ErrorMessage name="textmsg" component="div" className="error"/>
                                            </div>

                                            <div className="field-style">
                                                <label htmlFor="card-image">Enter Your Card Image URL: </label>
                                                <Field type="url" id="card-image" name="image" placeholder="https://example.com"/>
                                                <ErrorMessage name="image" component="div" className="error"/>
                                            </div>
                                            
                                            
                                            
                                        </fieldset>
                                </div>
                                
                                <button type="submit">Submit</button>
                                {successful ? <h1 className="sent">Sent successfully !!</h1> : null}
                                {verify? <h1 className="verify">Check Your e-mail and Verify ... then SEND gain !! </h1> : null}
                        </Form>
                    )
                }
            }  
        </Formik>
    )
}

export default MyForm
