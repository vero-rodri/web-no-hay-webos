import React, { Component } from 'react';
import { TextInput, Button } from 'grommet';


class EmailInput extends Component {

  state = {
    email: ''
  }

  onAddEmail = (event) => {
    console.log("le pego al ADD\n")
    //event.preventDefault();
    this.props.addEmail(event)
    this.setState({
      email: ''
    })
  }
  
  render() {
    return (
      <div>
          <TextInput
                placeholder="type here"
                value={this.state.email}
                onChange={event => this.setState({email: event.target.value})}
          />
          <Button className="py-1 px-2 m-1" type="button" primary label="ADD" onClick={this.onAddEmail} />
      </div>
    )
  }
}

export default EmailInput;
