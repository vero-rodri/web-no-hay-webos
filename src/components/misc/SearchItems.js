import React, { Component, Fragment } from 'react';
import Footer from './FooterBar';
import Service from '../../services/challengesService';
import ChallengeItem from '../challenges/ChallengeItem';
import SearchBar from './SearchBar';
import FooterBar from './FooterBar';


class SearchItems extends Component {

  state = {
    challenges: [],
    search:''
  }

  challengesSubscription = undefined;

  componentDidMount() {

    //ESTA NOS LA CARGAREMOS, PERO DE MOMENTO LA DEJO PARA PODER TRABAJAR MEJOR AL MAQUETAR...
    Service.getChallenges()
      .then(challenges => this.setState({
        challenges: challenges 
      }))
    ///////////////////////


    this.challengesSubscription = Service
      .onChallengesChange()
      .subscribe(challenges => {
        console.log("LOS RETOS SON", challenges)
        this.setState({challenges: challenges});
      })
  }

  componentWillUnmount() {
    this.challengesSubscription.unsubscribe();
  }

  handleSearch = (keyword) => 
  this.setState({...this.state,
                search: keyword});

  challengeList = () => 
    this.state.challenges
      .filter(challenge => challenge.title.toLowerCase().includes(this.state.search.toLowerCase()))
      .map(challenge => <ChallengeItem key={challenge.id} {...challenge} />)

  render() {
    const { search } = this.state;
    return (
      <Fragment>
        <SearchBar search={search} setSearch={this.handleSearch} />
        {(search !== '') ? this.challengeList() : <p>PONER IMAGEN DE "ESPERANDO QUE PONGAS ALGOO" </p>}
        <FooterBar />
      </Fragment>
    )
  }
}

export default SearchItems;
