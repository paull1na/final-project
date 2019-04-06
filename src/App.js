import React from 'react';
import Header from './Header';
import Contener from './Contener';
import Footer from './Footer';
import background from './backgr.png';

import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render(){
        return (
            <div className="App">
                <Header/>
                <Contener/>
                <Footer/>

            </div>
            
    );
    }
}

export default App;