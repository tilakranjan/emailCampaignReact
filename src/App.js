import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Landing from './screens/landing/Landing'
import CheckCampaign from './screens/CheckCampaign/CheckCampaign'

function App() {
  return (
    <div className="App">
     <Switch>
       <Route exact path="/check/campaign" component={CheckCampaign} /> 
       <Route exact path="/" component={Landing} />
     </Switch>
    </div>
  );
}

export default App;
