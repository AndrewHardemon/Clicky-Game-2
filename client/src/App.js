import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Game from "./pages/Game";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Images from "./components/Images";

class App extends React.Component{

  render(){
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Game} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }

}

export default App;