import {Stack,Box} from "@mui/material"


import {VideoCard,ChannelCard} from "./"
import Loader from "./Loader";


function Videos({videos,direction}) {
  if(!videos?.length) return <Loader />;
  return (
    <Stack direction={direction} flexWrap="wrap"
     justifyContent="start" alignItems="start" 
    gap={2}>
      {videos?.map((item,index)=>
      (
        <Box key={index}>
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Stack>
  )
}

export default Videos