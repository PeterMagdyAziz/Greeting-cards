import React from 'react'
import {Field, ErrorMessage} from "formik"


interface Props
  extends React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLTextAreaElement>,HTMLTextAreaElement> {
    name: string;
    id: string;
    as: string;
    label: string;
    rows: string;
    cols: string;
}

const TextField: React.FC<Props> = ({name, id, as, label, rows, cols}) =>{
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <Field as={as} id={id} name={name} rows={rows} cols={cols} />
            <ErrorMessage name={name} component="div" className="error" />
        </div>
    )
}


export default TextField






