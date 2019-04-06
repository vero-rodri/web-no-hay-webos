import React, { Component } from 'react';

const SearchContext = React.createContext();

class SearchStore extends Component {
  state = {
    search: ''
  }

  handleSearchChange = (keyword) => {
    this.setState({
      ...this.state,
      search: keyword
    })
  }

  render() {
    return (
      <SearchContext.Provider value={{
        search: this.state.search,
        onSearchChange: this.handleSearchChange 
      }}>
        {this.props.children}
      </SearchContext.Provider>
    )
  }
}

const withSearchConsumer = (Component) => {
  return (props) => (
    <SearchContext.Consumer>
      {(storeProps) => <Component {...props} {...storeProps} />}
    </SearchContext.Consumer>
  )
}


export { SearchStore, SearchContext, withSearchConsumer }