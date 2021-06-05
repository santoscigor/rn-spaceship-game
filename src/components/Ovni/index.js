import React, { Component } from 'react';
import { Image,  } from 'react-native';

const Ovni = ({ovniX, ovniY}) => {
    return (
        <Image
            style={{ position: 'absolute', bottom: ovniY, left: ovniX }}
            source={require('../../assets/images/ovni.png')}
        />
    );
}

export default Ovni;
