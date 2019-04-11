import React, { Component } from 'react';
import SearchFilters from './SearchFilters';
import { MIRROR_SELECT_TYPES, MIRROR_SELECT_SORTS } from '../../constants';
import SearchItemsList from './SearchItemsList';


class Search extends Component {

  state = {
    type: (this.props.location.type) || 'challenge',
    sort: (this.props.location.sort) || 'likes'
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
      <div className="container">
        <SearchFilters 
          onChangeType={this.handleChangeType}
          onChangeSort={this.handleChangeSort}
          type={type}
          sort={sort}
        />
        <SearchItemsList {...this.state} />
      </div>
    )
  }
}

export default Search;
