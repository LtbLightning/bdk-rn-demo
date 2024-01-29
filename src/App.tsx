import React from 'react';
import {Provider} from 'react-redux';
import Ffi from './screens/Ffi';

import Login from './screens/Login';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Ffi />
      {/* <Login /> */}
    </Provider>
  );
};

export default App;
