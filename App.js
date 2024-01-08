import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListInventoryItemComponent from './components/ListInventoryItemComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateInventoryItemComponent from './components/CreateInventoryItemComponent';
import ViewInventoryItemComponent from './components/ViewInventoryItemComponent';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Switch>
            <Route path="/" exact component={ListInventoryItemComponent}></Route>
            <Route path="/inventory" component={ListInventoryItemComponent}></Route>
            <Route path="/add-inventory/:id" component={CreateInventoryItemComponent}></Route>
            <Route path="/view-inventory/:id" component={ViewInventoryItemComponent}></Route>
          </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
