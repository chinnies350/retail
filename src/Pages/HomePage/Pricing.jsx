import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Toggle } from '../../Components/Switch'
// import Sliders from './Components/Slider'
import giftimg from '../../images/giftimg.png'
import priceadd from '../../images/priceadd.png'
import { ArrowRightOutlined } from '@ant-design/icons';
import { Messages } from '../../Components/Notifications/Messages';
import {pricingTypeSelector,getPricingType,postFreeOption,getPricingFeatures,pricingTypeFeatSelector,getPricingTypeAppId} from '../../features/pricingType/pricingType';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
// import { getCookieData } from "../../Services/others";
import { getCookieData,storeCookieData } from '../../Services/others';
import { EyeOutlined,CheckOutlined } from '@ant-design/icons';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Table } from 'antd';
import '../../Components/table.scss';

  const Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };



const subDirectory = import.meta.env.ENV_BASE_URL 
const HomesubDirectory = import.meta.env.ENV_HOME_BASE_URL

const Pricing = () => {
  // const [sliderValue, setSliderValue] = useState(100);
  const [toggleValue, setToggleValue] = useState('Y');
  const [messageType, setMessageType] = useState(null);
  const [messageData, setMessageData] = useState(null);
  const [extendPack, setextendPack] = useState(null);
  const navigate = useNavigate()
  


  const dispatch = useDispatch();

  const pricingTypeSelector = (state) => state.pricingType.PricingType;
   
  const pricingData = useSelector(pricingTypeSelector);
  let checkPurchase = pricingData.filter((val) => val["PricingName"].toUpperCase() !== "FREE")
                            .filter(eachFeature => eachFeature.Status == "Extend Pack" ).length > 0
                            
  console.log(pricingData ,"eteryety")

  const [AppId, setAppId] = useState(
    getCookieData("AppId") ?? "16"
  );

  const [UserId, setUserId] = useState(
    getCookieData("UserId") ? getCookieData("UserId") : null
  );

  const pricingTypeFeatSelector = (state) => state.pricingType.PricingTypeFeat;
  
  const dataSource=useSelector(pricingTypeFeatSelector);

  const getUniqueFeatures = (dataSource) => {
    const uniqueFeatures = new Set();
    dataSource.forEach((record) => {
      record?.FeatureDetails?.forEach((feature) => {
        uniqueFeatures.add(feature.FeatName);
      });
    });
    return Array.from(uniqueFeatures);
  };
  
  const generateColumns = (dataSource) => {
    const columns = dataSource.map((record) => {
      let name;
      if(record.PricingName == "Free")
      {
        name = "Feature Name";
      }
      return {

        title: name,
        dataIndex: record.PricingId.toString(),
        key: record.PricingId.toString(),
        width: '220px'
      };
    });
    return columns;
  };
  
  const generateDataSource = (dataSource, uniqueFeatures) => {
    const transformedData = [];
  
    uniqueFeatures.forEach((feature) => {
      const transformedRecord = {
        FeatureName: feature,
      };
  
      dataSource.forEach((record) => {
        const featureDetail = record.FeatureDetails.find(
          (feat) => feat.FeatName === feature
        );
        if(record.PricingName == "Free")
        {
          transformedRecord[record.PricingId.toString()] =
          featureDetail && featureDetail.FeatName ? featureDetail.FeatName : '';
        }
        else{
          transformedRecord[record.PricingId.toString()] =
          featureDetail && featureDetail.Status  == "Y" &&  featureDetail.FeatConstraint > 0 ? 
          featureDetail.FeatConstraint  : featureDetail.Status  == "Y"  &&  featureDetail.FeatConstraint <= 0  ? <CheckOutlined/> : "";
        }
        
      });
  
      transformedData.push(transformedRecord);
    });
  
    return transformedData;
  };
  
  const uniqueFeatures = getUniqueFeatures(dataSource);
  const columns = generateColumns(dataSource);
  const transformedDataSource = generateDataSource(dataSource, uniqueFeatures);
  

  const onComplete = useCallback(() => {
    setMessageData(null);
    setMessageType(null);
    
    
  }, [])




  // const handleSliderChange = (value) => {
  //   setSliderValue(value);
  //   dispatch(getPricingType({ sliderValue: value, toggleValue }));
    
  // };

  // const handleToggleChange = (checked) => {
  //   const newToggleValue = checked ? 'M' : 'Y';
  //   setToggleValue(newToggleValue);
  //   dispatch(getPricingType({ sliderValue, toggleValue: newToggleValue }));
    
  // };

  const handleToggleChange = (checked) => {
    const newToggleValue = checked ? 'Y' : 'M';
    setToggleValue(newToggleValue);
    // dispatch(getPricingType({ toggleValue: newToggleValue, AppId,UserId }));
    if (!UserId){
      dispatch(getPricingTypeAppId({ toggleValue: newToggleValue, AppId }));
      }
      else{
       
        dispatch(getPricingType({ toggleValue: newToggleValue, AppId,UserId }));
      }
    
  };

  // useEffect(() => {
  //   dispatch(getPricingType({ sliderValue, toggleValue }));
  // }, [sliderValue, toggleValue, dispatch]);

  useEffect(() => {
    if (!UserId){

      
      dispatch(getPricingTypeAppId({ toggleValue, AppId }));
     
      }
      else{
        
        dispatch(getPricingType({ toggleValue, AppId,UserId }));
      
      }
      dispatch(getPricingFeatures({ toggleValue, AppId })).unwrap();
    // dispatch(getPricingType({ toggleValue, AppId,UserId }));
    
  }, [toggleValue,AppId,UserId, dispatch]);

 
  

  const handleStartNow = async (pricingData) => {
    
    const currentDate = new Date();
    const purDate = moment(currentDate).format('YYYY-MM-DD HH:mm:ss');
    const validityStartDate = moment(currentDate).format('YYYY-MM-DD HH:mm:ss');
    const validityEndDate = moment(currentDate).add(pricingData["NoOfDays"], 'days').format('YYYY-MM-DD HH:mm:ss');
   
    if (getCookieData("UserId")){
        const postData = {
        
          UserId: getCookieData("UserId"),
          AppId: getCookieData("AppId") == undefined?"16":getCookieData("AppId"),
          PricingId: pricingData["PricingId"],
          PurDate:purDate,
          PaymentMode: 27,
          PaymentStatus: "S",
          LicenseStatus: "A",
          Price: pricingData["Price"],
          ValidityStart: validityStartDate,
          ValidityEnd: validityEndDate,
          CreatedBy: getCookieData("UserId") || 7,
        };
        const response=await dispatch(postFreeOption(postData)).unwrap()
        if (response.data.statusCode == 1){
          setMessageType("success");
          setMessageData(response.data.response);
          if (getCookieData("UserId")) {
              await reloadhome()
          } else {

            await reloadPublicSignin()
            
          }
      }else{
      setMessageType("error")
      setMessageData(response.data.response)
      }
        }
    else {
      navigate(`${HomesubDirectory}public-signin`);
      window.location.reload()
    }
    };
        
  const reloadhome=()=>{
    navigate(`${HomesubDirectory}landing-page/home`);
            window.location.reload()
  }
  const reloadPublicSignin=()=>{
    navigate(`${HomesubDirectory}public-signin`);
            window.location.reload()
  }

  const handleSubmit = useCallback((pricingData) => {
    storeCookieData('AppId', pricingData["AppId"]);
    storeCookieData('PricingId', pricingData["PricingId"]);
    if (getCookieData("UserId")) {
      navigate(`${subDirectory}invoice-detail`);
      window.location.reload();
      
    } else {
      navigate(`${HomesubDirectory}public-signin`);
      window.location.reload();
    }
    
  },[]);
  return (
    <div className='pricing'>
      {console.log('check')}
      <Messages messageType={messageType} messageData={messageData} onComplete={onComplete} />
      <div>
        <p>PRICING</p>
        <div className='pricingtext'><p>Simple, transparent pricing</p></div>
        <div className='pricingtoggle'>
            <div className='pricingsubtext'><p>Choose the package that suits you.<span>No Contracts. No surprise fees.</span> </p>
                
            </div>
            <div className='subtoggle'>
                <div className='monthtext'>Monthly  <Toggle defaultChecked={true} 
                        functionName={handleToggleChange} 
                        /></div> 
                
                <div className='yeartext'>Yearly
                {/* <button className='discountdiv'> 10% Discount </button> */}
                </div>  
            </div>
        </div>
        <div className='sliderdiv'>
        {/* <Sliders 
        value={sliderValue} 
        onChange={handleSliderChange} 
        /> */}
        </div> 
        
        <div className='pricingcont'>

          <Slider {...Settings}>
            
            <div>
            <div  className='pricingdiv' >  
              <div className='pricingcardsdiv'>
            
              {/* {pricingData.map((val, i) => {  */}
              {[
                pricingData.find((val) => val["PricingName"].toUpperCase() === "FREE"), // Free pricing card object
                ...pricingData.filter((val) => val["PricingName"].toUpperCase() !== "FREE"), // Other pricing card objects
              ].map((val, i) => {
                
                if (val) {  
                return (
                  <div key={i} className='pricingcards'>
                    <div className='pricingname'>
                        <p>{val["PricingName"].toUpperCase()}</p>
                      </div>
                    <div className='pricingcontent'>
                    <div>{val["PricingName"].toUpperCase()=="FREE" ? 
                      (<img className='gitfimg' src={giftimg}></img>) : 
                      ((
                        <div>
                          <span className="net-price">₹{val["NetPrice"]}</span>
                          <span className="net-price-strike">₹{val["DisplayPrice"]}</span>
                        </div>
                      ))}
                    </div>
                    {val["PricingName"].toUpperCase() !== "FREE" && (
                      <>
                        {val['FeatureDetails']?.map((feature, index) => {
                        //   if (feature.Status == 'Y') { 
                        //   return (
                        //       <React.Fragment key={index}>
                        //         {index === 0 && <p className="small-font" style={{ color:"green"}}>No of Users</p>}
                        //         {index === 0 && <p className="small-font" style={{ lineHeight: "0.1em", margin: "1px 0" }}>&nbsp;</p>} {/* Add a smaller gap */}
                        //         <p className="small-font">{feature.FeatName}: {feature.FeatConstraint}</p>
                        //         {/* <p className="small-font">{feature.FeatName}</p>
                        //         <p className="small-font">{"No of Users: " + feature.FeatConstraint}</p> */}
                        //       </React.Fragment>
                        //   )
                        // }
                      }
                        )}
                      </>
                    )}
                   
                    </div>
                    <div className='pricingstart'>
                      {val["PricingName"].toUpperCase() === "FREE" ? (
                        
                        <div className={`freebtn ${val["Status"] === "Already Used" ? "disabled" : ""}`} onClick={() => handleStartNow(val)}>
                          {(val["Status"] === "Already Used" || 
                            checkPurchase ) 
                            ? (
                            <button className="disabled-button-free" disabled>
                              Already Used
                            </button>
                          ) : (
                            <>
                              <p>Start Now</p>
                              <ArrowRightOutlined />
                            </>
                          )}
                        </div>
                      ) :(
                        <div className='btntext' onClick={() => handleSubmit(val)}>
                         
                          {val["Status"] === "Extend Pack" ? "Extend Pack" : "Start Now"}
                         
                          <ArrowRightOutlined />
                      
                        </div>
                      )}
                    </div>
                  </div>
                );
              } else {
                return null; // Handle the case where pricingData is empty or does not contain the Free pricing card
              }
              })}
              
            </div> 
          {/* <div className='heart_img'>
                <img className='priceadd' src={priceadd}></img>
            </div> */}
            </div>
            </div>

 
             
            </Slider>
            {/* <Table
    dataSource={pricingFeatData.flatMap((record) => record.FeatureDetails)}
    columns={columns}
    pagination={false}
  /> */}

          <Table dataSource={transformedDataSource} columns={columns} bordered pagination={false} />
          </div>
      </div>
    </div>
  )
}

export default Pricing




