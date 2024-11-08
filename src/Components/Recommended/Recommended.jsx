import React, { useEffect, useState } from 'react'
import './Recommended.css'
import data, { value_converter } from '../../YoutubeApi/data'
import { Link } from 'react-router-dom'

const Recommended = ({categoryId}) => {

  const [apiData, setApiData] = useState([])

  const fetchData = async () => {
    fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&key=${data.apiKey}`)
    .then(res => res.json())
    .then(res => setApiData(res.items))
  }

  useEffect(()=>{
    fetchData();
  },[])

  return (
    <div className='recommended'>
     
     {apiData.map((item) => (
        <Link 
         to={`/video/${item.snippet.categoryId}/${item.id}`}
         key={item.id}
         className="video-list">
          <img src={item.snippet.thumbnails.medium.url} alt="" />
          <div className="video-info">
           <h4>{item.snippet.title}</h4>
           <p>{item.snippet.channelTitle}</p>
           <p>{value_converter(item.statistics.viewCount)} views</p>
          </div>
        </Link>
     ))}
    </div>
  )
}

export default Recommended