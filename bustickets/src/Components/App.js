import React from 'react';
import '../Styles/App.css';
import '../Styles/bootstrap.min.css'

import Form from './Form'


class App extends React.Component{

  render(){
    return(
      <div className="main-container">
        <Form />        
      </div>
    )
  }
}

export default App;
