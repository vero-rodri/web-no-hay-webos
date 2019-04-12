import React from 'react';
import { Link } from 'react-router-dom';

const LabelAndButton = (props) => {

  const { items, link, type, sort, label } = props

  return (
    <div className="row align-items-center justify-content-between mt-3 pr-3 pl-1">
      <h5 className="label-titles">{label}</h5>
        <Link to={{ pathname: link,
              items, type, sort }}>
          <div className="see-more-btn">
            <p className="my-0 mx-1">ver</p>
            <i className="fas fa-plus icon-plus my-0 mx-1"></i>
          </div>
        </Link>
    </div>)
}

export default LabelAndButton;

