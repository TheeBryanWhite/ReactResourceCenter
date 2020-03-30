import React from 'react';
import { Provider } from "react-redux";
import store from "./redux/store/store";
import ResourceList from './components/ResourceList';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ResourceList />
      </div>
    </ Provider>
  );
}

export default App;
