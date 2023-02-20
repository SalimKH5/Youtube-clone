import {useState,useEffect} from 'react'
import {Box,Stack,Typography} from "@mui/material"

import {Sidebar,Videos} from './'

import {fetchFromAPI} from "../utils/fetchFromAPI"

import {useParams} from "react-router-dom"

function SearchFeed() {

  const [videos,setVideos]=useState(null)

  const {searchTerm}=useParams()
  console.log(searchTerm)
  useEffect(()=>{
    setVideos(null);
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
      .then((data) => setVideos(data.items))
      
    },[searchTerm])


  return (
   
      
      
      <Box p={2} minHeight="95vh">
          <Typography variant='h4' fontWeight="900" color="#fff" mb={3} ml={{sm:"100px"}}>
           Search Video for<span style={{color:"#F31503"}}>{searchTerm} Video</span> 
          </Typography>
          <Box display="flex">
           <Box sx={{ mr: { sm: '100px' } }}/>
           <Videos videos={videos} direction="row"/>
          </Box>
      </Box>
    
  )
}

export default SearchFeed