import React, { useEffect, useState } from 'react'
import { useNavigate, useNavigation } from 'react-router-dom';
import Generate from './Generate';

const Result = ({prediction, user, handleChange}) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(!prediction) {
      navigate("/");
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    
    navigate("/download");
  }

  return (
    <div className={show ? "result-container opac" : "result-container"}>
      {show && <Generate user={user} handleChange={handleChange} setShow={setShow} submitHandler={submitHandler} />}
      <div className="result">
        <p>Emotion recognized: <span style={{color: "#6990F2"}}>{prediction.prediction}</span></p>
        <p>Want to download the result in pdf? <button onClick={()=>setShow(true)} className='result-btn'>Continue</button></p>
      </div>
    </div>
  )
}

export default Result