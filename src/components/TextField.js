// field form elements separate component

import React from 'react'
import {Field, ErrorMessage} from "formik"

function TextField(props) {

    const {name, id, as, label,  ...rest} = props

    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <Field as={as} id={id} name={name} {...rest} />
            <ErrorMessage name={name} component="div" className="error"/>
        </div>
    )
}

export default TextField
