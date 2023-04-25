import React from 'react'

import { FaTimes } from 'react-icons/fa'

const Generate = ({user, handleChange, setShow, submitHandler}) => {

  

  return (
    <div className="generate-container">
      <span className='close' onClick={() => setShow(false)}><FaTimes style={{color: "crimson", cursor: "pointer"}} /></span>
      <form>
        <h2>Patient Information</h2>
        <div className="form-group">
          <label htmlFor="title">Title</label>

          <select name="title" id="title" value={user.title} onChange={handleChange}>
            <option disabled value="">Select an option</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Ms">Ms</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" name="fullName" id="fullName" value={user.fullName} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of birth</label>
          <input type="date" name="dob" id="dob" value={user.dob} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="mno">Mobile Number</label>
          <input type="text" name="mno" id="mno" value={user.mno} onChange={handleChange} />
        </div>

        <button onClick={submitHandler}>Download PDF</button>
      </form>
    </div>
  )
}

export default Generate