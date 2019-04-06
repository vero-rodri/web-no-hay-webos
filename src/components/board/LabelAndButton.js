import React from 'react';
import { Link } from 'react-router-dom';
import TextCustom from '../../ui/TextCustom';
import { Button } from 'grommet';
import { Add } from 'grommet-icons';

const LabelAndButton = (props) => {

  const { items, link, type, sort, label, labelButton } = props

  return (
    <div className="row my-1 mx-2 justify-content-between align-items-center my-1">
      <TextCustom>{label}</TextCustom>
      {/* <Link to={{ pathname: link,
            items, type, sort }}> */}

        <Link to={{ pathname: '/search', params: { type: type, sort: sort } }}>
        <Button 
          icon={<Add />}
          label={labelButton}
        />
      </Link>
    </div>)
}

export default LabelAndButton;

