import { Select } from 'antd'; 
import classnames from "classnames"
import FloatLabel from "./FloatLabel/index";
import React, {useState } from "react";

export const DropDowns = ({options,onChangeFunction,isOnchanges,className,defaultValue,disabled,...props}) => {
  


  const [inpValue , setInputValue] = useState('')
  const [isOnchange,setisOnchange] =useState(isOnchanges)

  const changeStatus =async()=>{
    await setisOnchange(true)

  }


  const {
      field,
      onChange,
      label,
      onBlur,
      forwardedRef,
      required,
      valueData,
      ...rest
    } = props;
    console.log(valueData,"label")

    

  

return(

  <FloatLabel 
        label={label} 
        value = {inpValue}
        isOnChange ={isOnchange}
       > 
  
  <Select
    showSearch
    style={{
      width: 250
     
    }}
    defaultValue={defaultValue?defaultValue:null}
    // placeholder={label}
    optionFilterProp="children"
    filterOption={(input, option) => (option?.label ?? '').includes(input)}
    filterSort={(optionA, optionB) =>
      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
    }
    value={valueData}
    onChange={(e) =>onChangeFunction(e)}
    onSelect={(e)=>changeStatus(e)}
    options={options} 
    className={classnames(` ${className}`)} 
    disabled={disabled ? true : false}
  />
   </FloatLabel>
     
      )
  };