import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TestApp.css";
import image from "./logo192.png";

const TestApp = (props) => {
  const [flag, setFlag] = useState("true");
  const [buttonName, setButtonName] = useState("Add");
//   const [imageUrls, setImageUrls] = useState([]);
  const [objectUrls, setObjectUrls] = useState([{}])
  const [data, setData] = useState([]);
  console.log(flag);

  const fetchImage = async (imageUrl) => {
    const res = await fetch(imageUrl);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setObjectUrls(objectUrls => [...objectUrls, {imageUrl :imageObjectURL}])
  };

  useEffect(() => {
    axios
      .get(
        "http://saloonplus.com:8000/api_v1/store/public/getServiceListByStoreId?storeId=2&search=&lang=en"
      )
      .then((res) => {
        console.log(res.data.data)
        console.log(res.data.data[0].servicePictures[0].s3URL);
        setData(res.data.data);
        const array = res.data.data.map((ele)=>ele.servicePictures[0].s3URL)
        // setImageUrls(array)
        // fetchImage(res.data.data[0].servicePictures[0].s3URL)
        {array.map((ele)=>(
            fetchImage(ele)
        ))}
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (flag === "true") {
      setButtonName("Add");
    } else {
      setButtonName("Remove");
    }
  }, [flag]);
  const handleClick = () => {
    if (flag === "true") {
      setFlag("false");
    } else {
      setFlag("true");
    }
  };
  return (
    <div>
      <div>
      <button onClick={handleClick}>{buttonName}</button>
      </div>
      <div>
        {data.map((ele) => (
          <div className="card">
            <div className="image">
              {/* <img src={ele.servicePictures.s3URL} /> */}
              <img src={objectUrls.ele.servicePictures[0].s3URL} />
              {/* <img src={image}/> */}
            </div>
            <div className="card__content">
                <div className="header">
                    <h1>{ele.secondaryServiceName}</h1>
                    <i className="floated like icon"></i>
                </div>
                <div className="description">
                    <p>{ele.secondaryLanguageDesc}</p>
                </div>
                <div>
                </div>
                <div className="footer">
                  
                </div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default TestApp;
