import React, { Component, Fragment } from 'react';
import SearchFilters from './SearchFiters';
import { MIRROR_SELECT_TYPES, MIRROR_SELECT_SORTS } from '../../constants';
import SearchItemsList from './SearchItemsList';


class Search extends Component {

  state = {
    type: (this.props.location.params && this.props.location.params.type) || 'challenge',
    sort: (this.props.location.params && this.props.location.params.sort) || 'likes'
  }

  handleChangeType = (type) => { 
    this.setState({
      ...this.state,
      type: MIRROR_SELECT_TYPES[type]
    });
  }

  handleChangeSort = (sort) => { 
      this.setState({
        ...this.state,
        sort: MIRROR_SELECT_SORTS[sort]
      });
    }

  render() {
   
    const { type, sort } = this.state;
    return (
      <Fragment>
        <SearchFilters 
          onChangeType={this.handleChangeType}
          onChangeSort={this.handleChangeSort}
          type={type}
          sort={sort}
        />
        <SearchItemsList {...this.state} />
      </Fragment>
    )
  }
}

export default Search;
