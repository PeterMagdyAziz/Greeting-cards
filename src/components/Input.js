// field input types separate component

import React from 'react'
import {Field, ErrorMessage } from "formik"

function Input(props) {

    const {name, id, type,label,  ...rest} = props

    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <Field type={type} id={id} name={name} {...rest}/>
            <ErrorMessage name={name} component="div" className="error"/>
        </div>
    )
}

export default Input
