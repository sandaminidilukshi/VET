import React from 'react'
import AnimalRegistration from '../components/AnimalRegistration';
import AnimalSideBar from '../components/AnimalSideBar';
import DoctorForm from '../components/DoctorForm';
import SideBar from '../components/SideBar';
import SideBar1 from '../components/SideBar1';


function AnimalProfile() {
  return (
  <AnimalSideBar>
    <AnimalRegistration/>
  </AnimalSideBar>
  )
}

export default AnimalProfile
