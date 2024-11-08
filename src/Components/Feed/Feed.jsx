import React, { useEffect, useState } from 'react'
import './Feed.css'
import { Link } from 'react-router-dom'
import data, { value_converter } from '../../YoutubeApi/data'
import moment from 'moment'

const Feed = ({category}) => {

  const [apiData, setApiData] = useState([])  

  const fetchData = async () => {
    await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${data.apiKey}`)
    .then(res => res.json())
    .then(res => setApiData(res.items))
  }

  useEffect(()=>{
    fetchData();
  },[category])

  return (
    <div className='feed'>
        {apiData.map((item) => (
            <Link 
             to={`/video/${item.snippet.categoryId}/${item.id}`} 
             key={item.id}
             className="card">
                <img src={item.snippet.thumbnails.medium.url}/>
                <h2>{item.snippet.title}</h2>
                <h3>{item.snippet.channelTitle}</h3>
                <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
            </Link>
        ))}    
    </div>
  )
}

export default Feed