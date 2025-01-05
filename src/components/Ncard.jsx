import axios from 'axios'
import React from 'react'
import { useState} from 'react'
import { useEffect } from 'react'
function Ncard({title,description,imageUrl,articleUrl,author,date}) {
  const khol=()=>{
    window.open(articleUrl);
  }
  return (
    //Card for each info being taken from the Api
    <div class="max-w-sm  overflow-hidden  shadow-lg bg-white my-4  ">
    <img class="w-full h-48 object-cover" src={imageUrl?imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTku6Q9q8P41OCNBfP7llzFpVW8LQz-jqix1DjLiU1LMrKj2u0Rlo7jhGQE&s"} alt="Card image"/>
    <div class="px-6 py-4">
        <h2 class="text-xl font-semibold text-gray-800">{title}</h2>
      <p class="text-gray-700 text-base mt-2">
       {description}
      </p>
    </div>
    <div class=" py-4 flex justify-between items-center">
      <div>
      <span class="text-sm text-gray-600">Author: </span>
      <span class="text-sm text-gray-600">{author}</span>
      </div>
      
      
      <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300" onClick={khol}>
        Read More
      </button>
      
    </div>
    <div class="flex items-center gap-1">
      <span class="text-sm text-gray-600">Date:</span>
      <p class="text-sm text-gray-600">{date.substr(0,10)}</p>
      </div>
  </div>
    
   
  
  )
}

export default Ncard