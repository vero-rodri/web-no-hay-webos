import React from 'react';
import { Link } from 'react-router-dom';
import TextCustom from '../../ui/TextCustom';

const LabelAndButton = (props) => {

  const { items, link, type, sort, label } = props

  return (
    <div className="row my-1 mx-2 align-items-center my-1">
      <Link to={{ pathname: link,
            items, type, sort }}>
        <i className="fas fa-plus-circle icon-plus"></i>
      </Link>
      <TextCustom>{label}</TextCustom>
    </div>)
}

export default LabelAndButton;

