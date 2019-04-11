import React, { Component } from 'react';
import Select from 'react-select';


class SelectUsers extends Component {

  state = {
    isOpen: false,
  }

  handleMenuToggle = () => {
  //console.log("mnajejador TOGGLLEEEEE ", this.state.isOpen)
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handleChange = (event) => {
    //console.log("ONCHANGEE ", this.state.isOpen)
    this.props.handleChangeUsers(event);
  }



  render() {
    return (
      <Select
      options={this.props.options}
      menuIsOpen={this.state.isOpen}
      isMulti
      isSearchable
      onMenuClose={this.handleMenuToggle}
      onMenuOpen={this.handleMenuToggle}
      //value={this.props.value}
      onChange={this.props.handleChange}
      placeholder={this.props.placeholder}
    />
    )
  }
}

export default SelectUsers;
