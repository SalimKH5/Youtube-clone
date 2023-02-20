import React, { useState } from 'react'
import {Box,Stack,Typography} from "@mui/material"
import {useParams,Link} from "react-router-dom"
import ReactPlayer from 'react-player'
import { useEffect } from 'react'
import {Videos} from "./"
import {fetchFromAPI} from "../utils/fetchFromAPI"
import { CheckCircle } from '@mui/icons-material'



function VideoDetail() {

  const {id}=useParams()
  const [videos,setVideos]=useState(null)
  const [videoDetail,setVideoDetail]=useState(null)
  useEffect(()=>{
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
    .then((data) => setVideoDetail(data?.items[0]))
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
    .then((data) => setVideos(data?.items))
    },[id])

    if(!videoDetail?.snippet) return "Loading..."
  
      const {snippet:{title,channelId,channelTitle},statistics:{viewCount,likeCount}}=videoDetail;

  return (
    <Box sx={{minHeight:"95vh"}}>
      <Stack sx={{flexDirection:{sx:"column",md:"row"}}}>
                <Box sx={{flex:"1"}}> 
                  <Box sx={{width:"100%" ,position:"sticky",top:"80px"}}>
                  <ReactPlayer 
                      className="react-player "
                      controls={true}
                      url={`https://www.youtube.com/watch?v=${id}`}
                      />
                    <Typography
                    mt="15px"
                    fontWeight="bold"
                    variant="h5"
                    color="#fff"
                    p={2}
                    >
                      {title}
                    </Typography>

                    <Stack direction="row" justifyContent="space-between" 
                    sx={{color:"#fff"}}  py={1} px={2}>
                      <Link to={`/channel/${channelId}`}>
                          <Typography  
                          color="#fff"
                            variant={{sm:"subtitle1",md:"h6"}}>
                            {channelTitle}
                          </Typography>
                          <CheckCircle
                          sx={{fontSize:"12px",color:"gray",ml:"5px"}}
                          />
                      </Link>
                      <Stack direction="row" sx={{gap:"20px"}}>
                        <Typography variant="body1" sx={{opacity:"0.7"}}>
                          {parseInt(viewCount).toLocaleString()} views
                        </Typography>
                        <Typography variant="body1" sx={{opacity:"0.7"}}>
                          {parseInt(likeCount).toLocaleString()} likes
                        </Typography>
                      </Stack>
                    </Stack>

                  </Box>
                
                </Box>
                <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center">
                    <Videos
                    videos={videos}
                    direction="column"
                    />
                </Box>
    </Stack>
    </Box>
  )
}

export default VideoDetail