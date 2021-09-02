import React, { Component } from 'react';
import Loadng from './Loading';

class Home extends Component {

    render() {
        document.title = "Bohubrihi Restaurant";
        return (
            <div>
                <Loadng />
            </div>
        )
    }
}

export default Home;