import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import data, { value_converter } from '../../YoutubeApi/data';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const PlayVideo = () => {

  const {videoId} = useParams()

  const [apiData, setApiData] = useState(null)
  const [channelData, setChannelData] = useState(null)
  const [commentData, setCommentData] = useState([])

  const fetchVideoData = async () => {
    const videoData_url =`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${data.apiKey}`;
    await fetch(videoData_url)
    .then(res => res.json())
    .then(res => setApiData(res.items[0]))
  }

  const fetchOtherData = async () => {
    //fetching channel data
    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${data.apiKey}`;
    await fetch(channelData_url)
    .then(res => res.json())
    .then(res => setChannelData(res.items[0]))
    //fetching comments data
    const commentData_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${data.apiKey}`
    await fetch(commentData_url)
    .then(res => res.json())
    .then(res => setCommentData(res.items))
  }

  useEffect(()=>{
    
    fetchVideoData();
  },[videoId])

  useEffect(()=>{
    fetchOtherData();
  },[apiData])

  return (
    <div className='play-video'>
     
      <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} allowFullScreen></iframe>
      
      <h3>{apiData ? apiData.snippet.title : 'Title'}</h3>
      
      <div className="play-video-info">
        <p>{apiData ? value_converter(apiData.statistics.viewCount) : '8.9K views'} views &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : '2 day ago'}</p>
        <div>
          <span><img src={like} alt="" />{apiData ? value_converter(apiData.statistics.likeCount) : '4.7K'}</span>
          <span><img src={dislike} alt="" /></span>
          <span><img src={share} alt="" />Share</span>
          <span><img src={save} alt="" />Save</span>
        </div>
      </div>
      
      <hr />
      
      <div className="publisher">
        <img src={channelData ? channelData.snippet.thumbnails.default.url : ''} alt="" />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : 'Channel Title'}</p>
          <span>{channelData ? value_converter(channelData.statistics.subscriberCount) : "74.6K"} Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      
      <div className="video-description">
        
        <p>{apiData ? apiData.snippet.description : "Description"}</p>
        <hr />
        <h4>{apiData ? value_converter(apiData.statistics.commentCount) : '149'} comments</h4>
        
        {commentData.map((item) => (
          <div className="comment" key={item.id}>
            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
            <div>
              <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}
                <span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span>
              </h3>
              <p>{item.snippet.topLevelComment.snippet.textOriginal}</p>
              <div className="comment-action">
                <img src={like} alt="" />
                <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                <img src={dislike} alt="" />
              </div>
            </div>
          </div>
        ))}
        
      </div>
    </div>
  )
}

export default PlayVideo