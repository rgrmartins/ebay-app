import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Alert from './pages/Alerts';
import AlertList from './pages/AlertsList';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Alert} />
      <Route path="/alerts" component={AlertList} />
    </Switch>
  );
}
