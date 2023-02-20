import {useState,useEffect} from 'react'
import {useParams} from "react-router-dom"
import {Box} from "@mui/material";


import {Videos,ChannelCard,VideoCard} from "./";
import { fetchFromAPI } from '../utils/fetchFromAPI';

function ChannelDetail() {
  const {id}=useParams();
  const [channelDetail,setChannelDetail]=useState(null)
  const[videos,setVideoes]=useState([])


  useEffect(()=>{
      fetchFromAPI(`channels?part="snippet&id=${id}`)
      .then((data)=>setChannelDetail(data?.items[0]))
      fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
      .then((data)=>setVideoes(data?.items))
  },[id]);

  console.log(channelDetail)
  return (
   <Box minHeight="95vh" >
    <Box>
      <div
      
      style={{background: "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
              zIndex:"10",
              height:"300px"
              }}
      />
      <ChannelCard 
      marginTop="-110px"
      channelDetail={channelDetail}/>
    </Box>
    <Box display="flex" p="2" >
         <Box sx={{mr: {sm:"100px"} }}/>
          <Videos direction="row" videos={videos}/>
        
    </Box>

   </Box>
  )
}

export default ChannelDetail