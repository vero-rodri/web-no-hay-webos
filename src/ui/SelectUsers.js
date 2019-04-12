import React, { Component } from 'react';
import Select from 'react-select';

const customStyles = {
  option: (provided) => ({
    ...provided,
    color: '#818181',
  })};

// const customStyles = {
//   option: (provided, state) => ({
//     ...provided,
//     color: state.isSelected ? 'red' : 'blue',
//   }),
//   control: () => ({
//     // none of react-select's styles are passed to <Control />
//     width: 200,
//   }),
//   singleValue: (provided, state) => {
//     const opacity = state.isDisabled ? 0.5 : 1;
//     const transition = 'opacity 300ms';

//     return { ...provided, opacity, transition };
//   }
// }


class SelectUsers extends Component {

  state = {
    isOpen: false,
  }

  handleMenuToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handleChange = (event) => {
    this.props.handleChangeUsers(event);
  }



  render() {
    return (
      <Select
      styles={customStyles}
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
