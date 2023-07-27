import React, { useEffect } from 'react'
import { useSelector, useDispatch  } from 'react-redux';
import "./NavBarCom.scss"
import { Col, Row } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons'; 
import { getApplicationCategory, ApplicationCategorySelector, getApplicationSubCategory, 
  ApplicationSubCategorySelector } from '../../../features/application/bannerImage'; 
import "../../../fonts/Gilroy/stylesheet.css";
import {useNavigate } from 'react-router-dom';


const subDirectory = import.meta.env.ENV_BASE_URL

const NavBarCom = (e)=>{
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const applicationCategory = useSelector(ApplicationCategorySelector);
  const applicationSubCategory = useSelector(ApplicationSubCategorySelector);
 

  useEffect(() => {
    dispatch(getApplicationCategory(e?.CateId));
  }, [e?.CateId]);

  useEffect(() => {
    getdata()
  }, [applicationCategory]);


  const getdata=async()=>{
    if (applicationCategory?.data?.length > 0) {
      dispatch(getApplicationSubCategory(applicationCategory?.data[0]?.SubCateId));
    }


  }


  const getAppDeatils= async (subCateId)=>{
    dispatch(getApplicationSubCategory(subCateId));
    
  }

  const handleNavbaritems = (e)=>{
    navigate(`/${(e).toLowerCase()}`);
    window.location.reload()
  }
  
  

return(
  <>  

  <div className="nav_drp_Itms">
 

  <Row>


<Col span={5}>
          <div className="Left_Items">
            {applicationCategory?.data?.map((category) => (
              <button className="Left_List" key={category.SubCateId} onClick={()=>getAppDeatils(category?.SubCateId)}>
                {category.SubCategoryName} &nbsp;
                <p><ArrowRightOutlined class='Arrow'/></p>
              </button>
            ))}
          </div>
</Col>



<Col span={8}>
      <div className="Right_Items">
        <Row>
          {applicationSubCategory?.data?.map((category) => (
            <Col key={category.SubId}>
              <div className="Nav_right_items" 
              onClick={()=>handleNavbaritems(category.AppName)}>
                <img src={category.AppLogo} alt={category.AppName} style={{maxWidth:"60px"}} />
                &nbsp;&nbsp;
                <div className='Right_Items_text'>
                  <p>{category.AppName}</p>
                  <p className="app_des">{category.AppDescription}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Col>
 </Row>
 
   </div>
 
     
</>
)

}


export default NavBarCom