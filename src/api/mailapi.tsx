
import {FormikHelpers, FormikValues} from 'formik';

interface MyFormValues {
    receivers: string[];
    subject: string;
    textmsg: string;
    image: string;
}


export const sendMail = async (url: string, recValues: object, onSubmitProps: FormikHelpers<MyFormValues>)=> {

    console.log(onSubmitProps);

    // header for the post request
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recValues)
    };

    // post request using async/await
    const res = await fetch(url, requestOptions);
    const data = await res.text();

    onSubmitProps.resetForm({}); // reset form fields after submission

    onSubmitProps.setSubmitting(false);// to avoid double submission before api respond

    return data // returning response from server to client 
}
