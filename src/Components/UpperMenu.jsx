import { MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Row, Col } from 'antd';
import { useState } from 'react';
import { Link } from 'react-scroll';
import Restlogo from '../images/Restaurantlogo.png';
import '../styles/HomePage/UpperMenu.scss'

const items = [
  {
    label: 'Overview',
    key: 'overview',
    sectionId: 'overviewSection',
  },
  {
    label: 'Features',
    key: 'features',
    sectionId: 'featuresSection',
  },
  {
    label: 'Pricing',
    key: 'pricing',
    sectionId: 'pricingSection',
  },
  {
    label: 'FAQs',
    key: 'faqs',
    sectionId: 'faqsSection',
  },
  {
    label: 'Contact',
    key: 'Contact',
    sectionId: 'ContactSection',
  },
];

const UpperMenu = () => {
  const [current, setCurrent] = useState('overview');

  const handleClick = (sectionId) => {
    setCurrent(sectionId);
    scrollToSection(sectionId);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (

    <>

      <div className='dispflex'>
        <div className='divApplication'>
          <div className='divApplogo'>
            <img src={Restlogo} /></div>
          <div className='divAppname'>
            <p className='PayPreFont'>PayPre</p>
            <p>Restaurant</p>
          </div>

        </div>
        <div>

          <Menu mode="horizontal" selectedKeys={[current]}>
            {items.map((item) => (
              <Menu.Item key={item.key} onClick={() => handleClick(item.sectionId)}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu>





        </div>  
      </div>



    </>
  );

};

export default UpperMenu;