import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router , Route } from 'react-router-dom';
import Header from './common/header';
import Home from './pages/home';
import detail from './pages/detail';
import store from './store';

class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <div>
           <Header />
           <Router>
             <div>
                 <Route path='/' exact component={Home} /> 
                <Route path='/detail' exact component={detail} /> 
             </div>  
           </Router>
                
           {/* 4.0之前 */}
           {/* <BrowserRouter>
              <div>
                <Route path='/' exact component={Home} /> 
                <Route path='/detail' exact component={detail} /> 
              </div>
           </BrowserRouter> */}
        </div>
      </Provider>

    );
  }
  
}

export default App;
