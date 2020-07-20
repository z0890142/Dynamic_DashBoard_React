import React, { Component } from 'react';
import './App.css';
import DesignerContainers from './containers/DesignerContainers';
import DeployContainers from './containers/DeployContainers';

import { BrowserRouter as Router, Route } from "react-router-dom";


class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={DesignerContainers} />
            <Route path="/deploy/:pageId" component={DeployContainers} />
          </div>
        </Router>
        {/* <Designer/> */}
      </div>

    );
  }
}

export default App;
