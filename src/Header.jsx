import React from 'react';
import Alert from 'react-s-alert';


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date().toDateInputValue(),
        };
    }
    render() {
        return (
            <div className="header">
                    <span>e-wydatki</span>

            </div>
        )
    }
}

export default Header;