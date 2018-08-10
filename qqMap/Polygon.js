import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {qqMapComponentName} from './qqMapConstant'

//http://lbs.qq.com/javascript_v2/doc/polygon.html
class Polygon extends Component {
    componentDidMount(){
        this.props.add(qqMapComponentName.Polygon,this.props)
    }
    componentWillReceiveProps(nextProps) {
        this.props.update(qqMapComponentName.Polygon,nextProps)
    }
    componentWillUnmount() {
        this.props.remove(qqMapComponentName.Polygon,this.props.mapkey)
    }
    
    render() {
        return false;
    }
}
Polygon.propTypes = {
    path: PropTypes.array.isRequired,
    mapkey: PropTypes.string.isRequired
}

export default Polygon;