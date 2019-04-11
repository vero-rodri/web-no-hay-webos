import React from 'react';

const EmailList = (props) => {
  
  const listEmails = (emails) => {
    return props.emails.map((email, index) => {
      return <li key={index}>email</li>
    })
  }
  console.log("propuedades emails =>", props)

  return (
    <h4>listaMails</h4>
   /*  <ul>
      {listEmails(props.emailsList)}
    </ul> */

  )
}

export default EmailList;