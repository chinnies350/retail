import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { Menu } from 'antd';
import {  MenuOutlined} from '@ant-design/icons';
import Collapse from "./Collapse"
import {  Popover  } from 'antd';
import NavBarCom from './NavBarComps/NavBarCom';
import { getCookieData,storeCookieData } from '../../Services/others';   
import { ApplicationsSelector,getApplication,getApplicationCategory  } from '../../features/application/bannerImage';
import {useNavigate } from 'react-router-dom'; 
const HomeDirectory = import.meta.env.ENV_HOME_BASE_URL
const MainDirectory = import.meta.env.ENV_HOME_BASE_URL
const HomesubDirectory = import.meta.env.ENV_HOME_BASE_URL
// import Loginform  from './publicsignin/Signin';  


const dropitems = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item (disabled)
      </a>
    ), 
    disabled: true,
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: '4',
    danger: true,
    label: 'a danger item',
  },
];


 

const NavBar = () => {
  const [collapsed, setCollapsed] = useState(false); // State for toggle
  const [isSmallScreen, setIsSmallScreen] = useState(false); // State for small screen detection
  const [open, setOpen] = useState(false);
  const [UserId, setUserId] = useState(
    getCookieData("UserId") ? getCookieData("UserId") : null
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const applications = useSelector(ApplicationsSelector);
  

  

  useEffect(() => {
    dispatch(getApplication())
  }, []);

  


  const handleToggle = () => {
    setCollapsed(!collapsed); // Toggle the collapsed state
  };

  const handleClick = (e) => {
    // Dispatch an action to update the current selected menu item
  };

  const openSignInModal =() =>{
    setOpen(true);
  }


  const handleCancel = () => {
    alert("i am called")
    setOpen(false);
  };
  

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 900); // Adjust the breakpoint as per your requirement
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const handleCategoryClick = (cateId) => {
    dispatch(getApplicationCategory(cateId));
  };

  const handleCategoryNavigate= () => {
    if(UserId){
      navigate(`${HomeDirectory}landing-page/home`)
      window.location.reload()

    }
    else{
      navigate(`${HomeDirectory}`)
      window.location.reload()

    }
    
  };

  

  return (

    <>
    
        <div className="Home-navbar">
              <img src="fav.ico" alt="Logo" 
                  style={{ width: '6.2vw', height: 'auto',  }}  onClick={()=>handleCategoryNavigate()}
                 
                  />
 
          <div className="menu-container  ">
          {!isSmallScreen && applications?.data?.length > 0 && (
            <Menu onClick={handleClick} selectedKeys={[]} mode="horizontal">
              {applications?.data?.map((application) => (
                <Menu.Item key={application.CateId}>
                  <Popover content={<NavBarCom CateId={application.CateId}/>} trigger="hover">
                    <div className="ant-menu-title-content nav-btn"
                     onMouseEnter={() => handleCategoryClick(application.CateId)}>{application.CategoryName}</div>
                  </Popover>
                </Menu.Item>
              ))}
            </Menu>
          )}
          </div>


          <div className="menu-container">
            {!isSmallScreen && (
              <Menu onClick={handleClick} selectedKeys={[]} mode="horizontal">
                {!getCookieData('UserId') && ( 
                <Menu.Item key="Contact Sales" ><div className="ant-menu-title-content nav-btn" > Contact Sales </div> </Menu.Item>
                )}
                {!getCookieData('UserId') && (
                <Menu.Item key="Sign In" > 
                <div  type="primary" onClick={()=>{navigate(`${HomesubDirectory}public-signin/`)
                window.location.reload()
              }}>  
                          SIGN IN
                </div>  
                </Menu.Item>
              )}
              {!getCookieData('UserId') && (
                <Menu.Item key="Entertainment">  
                <div className=" FreeAccBtn " type="primary" onClick={()=>{navigate(`${HomesubDirectory}public-signin/`)
                window.location.reload()
              }}>  
                          GET STARTED — IT'S FREE
                </div>  
                </Menu.Item> 
               )}
                <div >   
                </div>
              </Menu>

            )}
          </div> 
        </div>
 
        <div className='small_nav'>
          {isSmallScreen && (
            <div className="toggle-container">
              <img src="fav.ico" alt="Logo" style={{ width: '7vh', height: 'auto' }} />

              <div className='extra_small_nav'>
                {applications?.data?.map((application) => (
                  <div className='extra_small_div' key={application.CateId}>
                    &nbsp; {application.CategoryName}
                  </div>
                ))}
              </div>

              <div className="toggle-button" onClick={handleToggle}>
                <MenuOutlined />
              </div>
            </div>
          )}

          {isSmallScreen && collapsed && (
            <div className="collapsed-menu">
              <Menu onClick={handleClick} selectedKeys={[]} mode="vertical">
                {/* Add your menu items here */}
              </Menu>
              <Collapse/>
            </div>
          )}
        </div>

</>
  );
};

export default NavBar;
