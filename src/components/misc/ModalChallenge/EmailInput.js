import React, { Component } from 'react';
import { EMAIL_PATTERN } from '../../../utils/formValidators';


class EmailInput extends Component {

  state = {
    email: '',  
    error: false,
  }

  handleBlur = (event) => {
    this.setState({touch: true})
  }

  handleChange = (event) => {
    this.setState({
      email: event.target.value,
      error: !EMAIL_PATTERN.test(event.target.value)
    })
  }

  handleAddEmail = (event) => {
    this.props.addEmail(this.state.email)
    this.setState({
      email: '',
      error: false
    })
  }
  
  render() {
    return (
      <div className=" p-0 row d-flex align-items-center justify-content-center">
          <div className="input-group m-0 mx-3">
            <input  className={`form-control ${(this.state.error) && 'is-invalid'}`} /* id="validationTextarea" */ 
                    placeholder="ironhacker@gmail.com" 
                    aria-describedby="button-addon2"
                    value={this.state.email}
                    onBlur={this.handleBlur}
                    onChange={this.handleChange} />
            <div className="input-group-append">
              <button className="email-btn rounded" type="button" disabled={this.state.error || (!this.state.email)} id="button-addon2" onClick={this.handleAddEmail}>Añadir</button>
            </div>
            <div className="invalid-feedback">
              Formato de email no válido
            </div>
          </div>
      </div>
    )
  }
}

export default EmailInput;

