import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Footer from '../misc/FooterBar';
import challengeService from '../../services/challengesService';
import ChallengeItem from './item';
import SearchBar from './SearchBar';
import FooterBar from '../misc/FooterBar';
import SearchFilters from './SearchFiters';
import { SELECT_TYPES, MIRROR_SELECT_TYPES, SELECT_SORTS, MIRROR_SELECT_SORTS } from '../../constants';
import SearchBarr from '../../ui/SearchBarr';
import { withSearchConsumer } from '../../context/SearchStore';
import InputSearch from '../../ui/InputSearch';
import SearchItemsList from './SearchItemsList';


class Search extends Component {

  state = {
    type: this.props.location.params && this.props.location.params.type || 'challenge',
    sort: this.props.location.params && this.props.location.params.sort || 'likes'
  }

  // componentDidMount() {
  //   const { pathname } = this.props.location;
  //   this.setInitialState(pathname);
  // }

  handleChangeType = (type) => { 
   // console.log("entro en el changetype..", type, " y ", SELECT_TYPES[type])
    this.setState({
      ...this.state,
      type: MIRROR_SELECT_TYPES[type]
    });
   /*  if (type === 'challenge') {
      this.props.location.pathname = '/challenges/eoo'
      //this.props.history.push('/challenges/views')
    } else {
      this.props.location.pathname = '/user-challenges/eoo'
      //this.props.history.push('/user-challenges/views')
    } */
  }

  handleChangeSort = (sort) => { 
  //  console.log("entro en el changesort..", sort)
      this.setState({
        ...this.state,
        sort: MIRROR_SELECT_SORTS[sort]
      });
    }

  render() {
    console.log("!!SEARCH_RENDER")
    const { pathname } = this.props.location;
   
    //console.log("BUSCANDO EL PATH ", this.props.location.pathname)
    const { type, sort } = this.state;
    return (
      <Fragment>
        <div className="save"></div>
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