import React from 'react';

const ProgressBar = (props) =>  {
  return (
  <div className="progress-bar-content">
    <div className="progress-bar-second"></div>
    <div className="progress-bar-progress" style={{backgroundImage: `linear-gradient(to left, white ${props.gradient}%, transparent 0%)`}}></div>
  </div>
  );
}

export default ProgressBar;