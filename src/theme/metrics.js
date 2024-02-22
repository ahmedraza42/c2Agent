import {Dimension } from 'react-native';

const {width,height} = Dimension.get('window');

const metrics =
{
    screenWidth : width < height ? height : height,
    screenHeight : width < height ? height :height,

}

export default metrics;