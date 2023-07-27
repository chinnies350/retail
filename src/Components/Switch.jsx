import { Switch } from 'antd';
import classnames from "classnames"

export const Toggle = ({ style, defaultChecked,functionName,...props }) => {

      
      
      return  (
         
         <Switch 
         defaultChecked={defaultChecked}
         onChange={functionName} 
         />

      );




}

