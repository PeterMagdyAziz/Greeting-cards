import React from 'react'
import {Field, FieldArray, ErrorMessage} from "formik"



interface Props{
    name: string;
    id: string;
    label: string;
}

const InputArray: React.FC<Props> = ({name, id, label})=>{

    return (
        <div>
            <label htmlFor={id}>{label}</label>
                <FieldArray name={name}>
                    {
                        props =>{
                                    const {push, remove, form} = props;
                                    const {values} =form;
                                    const {receivers} = values;
                                    return <div>
                                        {
                                            receivers.map((receiver:string, index:number)=>{
                                                const fieldName = `receivers[${index}]`;
                                                    return <div key={index}>
                                                            <Field type="email" name={fieldName} />
                                                            {
                                                                index > 0 && (<button type='button' onClick={() => remove(index)}> - </button>)
                                                            }
                                                               <button type="button" onClick={()=> push("")}> + </button>
                                                                <ErrorMessage name={fieldName} component="div" className="error"/>
                                                           </div>
                                            })
                                        }
                                        </div>
                                }
                    }
                </FieldArray>
    </div>
    )
};

export default InputArray
