import React, { Component } from 'react';
import { Image } from 'react-native';

class Spaceship extends Component {
    constructor(props) {
        super(props);
        this.state = {
            left: props.left,
        }
    }
    render() {
        return (
            <Image
                style={{ position: 'absolute', bottom: 100, left: this.props.left }}
                source={require('../../assets/images/nave.png')}
            />
        );
    }
}

export default Spaceship;
