import React, {useRef, useState } from 'react'
import './Image-generater.css'
import default_image from '../Assets/default_image.jpg'
const Imagegenerator = () => {
const key= "Bearer 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";
  const[image_url,setImage_url]=useState("/")
  let inputRef = useRef(null);
  const [loading,setloading]=useState(false);


  const imageGenerator= async()=>{
    if(inputRef.current.value===""){
      return 0;
    }
    setloading(true)
const response=await fetch("https://api.openai.com/v1/images/generations",{
  method:"POST",
  headers:{
    "content-Type":"application/json",
    Authorization:key,
    "User-Agent":"Chrome"

  },body:JSON.stringify({
    prompt:`${inputRef.current.value}`,
    n:1,
    size:"512x512",
  
  }),
});
let data=await response.json();
let data_array=data.data;
setImage_url(data_array[0].url);
setloading(false)
  }

  return (
    <div className='image-generator'>
      <div className="header">Ai image <span>generator</span></div>
      <div className="img-loading">
      <div className="image"><img src={image_url==="/"?default_image:image_url} alt=""/></div>
      <div className="loading">
    <div className={loading?"loading-bar-full":"loading-bar"}></div>
    <div className={loading?"loading-text":"display-none"}>loading.....</div>
   </div>
    
    </div>
    <div className="search-box">
      <input type="text" ref={inputRef} className='search-input' placeholder='discribe what you want to generate' />
      <div className="generate-btn" onClick={()=>{imageGenerator()}}>generate</div>
   
   
    </div>
    </div>
  )
}

export default Imagegenerator
