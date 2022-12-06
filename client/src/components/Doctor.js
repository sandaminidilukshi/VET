import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Doctor({ doctor }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  
  return (
    <div>
      { user?.isDoctor ?
      
      (<div className="card p-2 cursor-pointer">
      <h1 className="card-title">
        {doctor.firstName} {doctor.lastName}
      </h1>
      <hr />
      <p>
        <b>Phone Number : </b>
        {doctor.phoneNumber}
      </p>
      <p>
        <b>Specialization : </b>
        {doctor.specialization}
      </p>
      <p>
        <b>Fee per Visit : </b>
        {doctor.feePerCunsultation}
      </p>
      <p>
        <b>Timings : </b>
        {doctor.timings[0]} - {doctor.timings[1]}
      </p>
        
      </div>)
      
      :
      
      user?.isAdmin ? 
      
      (<div className="card p-2 cursor-pointer">
      <h1 className="card-title">
        {doctor.firstName} {doctor.lastName}
      </h1>
      <hr />
      <p>
        <b>Phone Number : </b>
        {doctor.phoneNumber}
      </p>
      <p>
        <b>Specialization : </b>
        {doctor.specialization}
      </p>
      <p>
        <b>Fee per Visit : </b>
        LKR.{doctor.feePerCunsultation}
      </p>
      <p>
        <b>Timings : </b>
        {doctor.timings[0]} - {doctor.timings[1]}
      </p>
        
      </div>)
      
      
      :
      
      (<div className="card p-2 cursor-pointer"
      onClick={() => navigate(`/book-appointment/${doctor._id}`)}>
        
        <h1 className="card-title">
        {doctor.firstName} {doctor.lastName}
      </h1>
      <hr />
      <p>
        <b>Phone Number : </b>
        {doctor.phoneNumber}
      </p>
      <p>
        <b>Specialization : </b>
        {doctor.specialization}
      </p>
      <p>
        <b>Fee per Visit : </b>
        {doctor.feePerCunsultation}
      </p>
      <p>
        <b>Timings : </b>
        {doctor.timings[0]} - {doctor.timings[1]}
      </p>
        </div>)}
    
     
    </div>
  
  );
}

export default Doctor;
