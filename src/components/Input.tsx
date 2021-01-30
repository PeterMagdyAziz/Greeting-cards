import React from 'react'
import {Field, ErrorMessage } from "formik"


interface Props
  extends React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLInputElement>,HTMLInputElement> {
    name: string;
    id: string;
    type: string;
    label: string;
}


const Input: React.FC<Props> = ({name, id, type, label, ...rest}) =>{
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <Field type={type} id={id} name={name} {...rest}/>
            <ErrorMessage name={name} component="div" className="error"/>
        </div>
    )
}

//const {name, id, type,label,  ...rest} = props


export default Input
