import React from 'react';
import ReactDOM from 'react-dom';

// HOC --> a "Function" recieves a component and return an enhanced component
// reuse code
// render hijacking
// prop manipulation
// abstract state

const Info = (props) => (
  <div>
    <h2>Info:</h2>
    <p>These are the info details: {props.infos}</p>
  </div>
)

const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      {
        props.isAdmin && <p>This is private info, please don't share</p> 
      }
      <WrappedComponent {...props}/>
    </div>
  )
}

const requireAuthentication = (WrappedComponent) => {
  return ({isAuthenticated, ...rest}) => (
    <div>
    {
     isAuthenticated ? <WrappedComponent {...rest}/> : <p>Please Log in to get infos</p>
    } 
    </div>
  )
}

const AdminInfo = withAdminWarning(Info)
const AuthInfos = requireAuthentication(Info)

// ReactDOM.render(<AdminInfo isAdmin={true} infos='info...'/>, document.getElementById('root'))
ReactDOM.render(<AuthInfos isAuthenticated={true} infos='info...'/>, document.getElementById('root'))