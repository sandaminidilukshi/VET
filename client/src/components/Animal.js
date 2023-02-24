import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Animal({ animal }) {
    const navigate = useNavigate();
  return (
    
      <div className="card p-2 cursor-pointer"
        onClick={() => navigate(`/view-details/${animal._id}`)}>
      <h1 className="card-title">
        {animal.animalName}
      </h1>
      <hr />
      <p>
        <b>Gender : </b>
        {animal.gender}
      </p>
      <p>
        <b>Reproduction Status : </b>
        {animal.reproduction}
      </p>
      <p>
        <b>Weight: </b>
        {animal.weight}
      </p>
      <p>
        <b>Animal Type : </b>
        {animal.animalType}
      </p>
        
      </div>
  )
}
 
export default Animal;