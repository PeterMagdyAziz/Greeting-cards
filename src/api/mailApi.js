export const sendMail = async (url, recValues, submitProps, initialValues)=> {

    console.log(submitProps);

    // header for the post request
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recValues)
    };

    // post request using async/await
    const res = await fetch(url, requestOptions);
    const data = await res.text();

    submitProps.resetForm(initialValues); // reset form fields after submission

    submitProps.setSubmitting(false);// to avoid double submission before api respond

    return data // returning response from server to client 
}



/**
 * // Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React POST Request Example' })
    };
    fetch('https://jsonplaceholder.typicode.com/posts', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ postId: data.id }));
}
 */

/*export function sendMail(url, recValues, submitProps) {

    let sent 
    // TODO call api request to send Email using apiBaseUrl variable. 
    axios.post(url, recValues)
      .then((res) =>{

        // if email is valid it will send directly
        if (res.data === "sent"){
            console.log(res.data);
            // waiting for resposnse when calling an API to avoid double submit 
            submitProps.setSubmitting(false);
            sent = true;
        }else if (res.data === "verify"){

            // if first time he will have to validate his mail first 
            console.log(res.data);
            // waiting for resposnse when calling an API to avoid double submit
            submitProps.setSubmitting(false);
            sent = false;
        }  
    })

    return sent;
}*/