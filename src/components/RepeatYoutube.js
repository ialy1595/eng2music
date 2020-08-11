import React, {useState} from 'react';
import './RepeatYoutube.scss';
import YouTube from 'react-youtube';

function RepeatYoutube({videoId, startTime, endTime}) {
  const [timeoutId, setTimeoutId] = useState(null);

  const opts = {
    height: '405',
    width: '720'
  }

  const onReady = (event) => {
    event.target.seekTo(startTime, true);
  }

  const onStateChange = (event) => {
   if(event.data === 1) {
      if(timeoutId) clearTimeout(timeoutId);
      let toi = setTimeout(() => {if(event.target) event.target.seekTo(startTime, true);}, (endTime - startTime) * 1000);
      setTimeoutId(toi);
    }
  }
  
  function ReadyYoutube() {
    if(videoId) return <YouTube containerClassName="youtube" videoId={videoId} opts={opts} onReady={onReady} onStateChange={onStateChange} />;
    else return null;
  }

  return (
    <div className="youtube-wrap">
      {ReadyYoutube()}
    </div>
  );
}

export default RepeatYoutube;