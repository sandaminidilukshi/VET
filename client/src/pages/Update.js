import React from 'react'
import AnimalRegistration from '../components/AnimalRegistration';
import AnimalSideBar from '../components/AnimalSideBar';
import UpdateAnimal from '../components/UpdateAnimal';


function AnimalProfile() {
  return (
  <AnimalSideBar>
    <UpdateAnimal/>
  </AnimalSideBar>
  )
}

export default AnimalProfile