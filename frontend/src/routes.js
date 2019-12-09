import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Alert from './pages/Alert';
import AlertList from './pages/AlertList';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Alert} />
      <Route path="/alerts" component={AlertList} />
    </Switch>
  );
}
