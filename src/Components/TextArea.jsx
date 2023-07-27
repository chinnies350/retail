import React, {useState } from "react";
import { Input} from "antd";
import FloatLabel from "../FloatLabel/index.jsx";

import "./main.scss";



export const TextAreaInput = ({fieldState, fieldApi, ...props}) => {
  console.log("fieldState",props.value)
    const { value } = fieldState;
  
    const [inpValue , setInputValue] = useState('')
    const { TextArea } = Input;

    const {
        field,
        onChange,
        isOnChange,
        onBlur,
        label,
        forwardedRef,
        required,
        ...rest
      } = props;
    
      
  return (


    
    <div className="example">
      <FloatLabel 
        label={label} 
        value = {inpValue}
        isOnChange= {isOnChange}
       > 
        <TextArea 
                {...rest}
                id={field}
                ref={forwardedRef}
                defaultValue={value?.toString()}
                required={required}   
                onChange={(e) => {
                  setInputValue(e.target.value)
                if (onChange) {
                onChange(e);
                }
                
                }}
                onBlur={(e) => {
                    if (onBlur) {
                    onBlur(e);
                    }
                }} 
                
        />
      </FloatLabel>
      
     
    </div>
  );
};

export default TextAreaInput;




