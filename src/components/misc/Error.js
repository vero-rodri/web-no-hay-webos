import React from 'react'


const Error = ({code, message, level}) => (
  <div className="row justify-content-center mt-3">
    <div className="col-xs-12 col-sm-6">
      <div className={`alert alert-${level} mt-5`} role="alert">
        <i className="fa fa-warning mr-1"></i> <strong>{code}</strong> {message}
      </div>
    </div>
  </div> 
)

Error.defaultProps = {
  level: 'warning',
  message: 'An error ocurred'
}

const Forbidden = () => (<Error level="warning" code="403" message="No tienes los privilegios suficientes para acceder a esta página" />)
const NotFound = () => (<Error level="dark" code="404" message="Página no encontrada" />)

export { Error, Forbidden, NotFound}