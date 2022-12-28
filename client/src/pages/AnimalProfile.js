import React from 'react'
import AnimalRegistration from '../components/AnimalRegistration';
import AnimalSideBar from '../components/AnimalSideBar';


function AnimalProfile() {
  return (
  <AnimalSideBar>
    <AnimalRegistration/>
  </AnimalSideBar>
  )
}

export default AnimalProfile
