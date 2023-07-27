import { Button, ConfigProvider  } from 'antd';
import './main.scss'
 
const Buttons = ({buttonText,color,handleSubmit,lineWidth,icon,htmlType, disabled}) =>

(

    
    <ConfigProvider
        theme={{
        // token: {
        //     colorPrimary: color,   
        // },
        }}
    > 
        <Button type="primary" htmlType= {htmlType ? "submit" : ''} disabled={disabled ? disabled: false} className="primary_Button" onClick={handleSubmit}>{buttonText}{icon}</Button>
        {/* <Button disabled>SUBMIT</Button> */}

     </ConfigProvider>
    
);

 

export default Buttons;


