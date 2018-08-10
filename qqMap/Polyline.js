import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {qqMapComponentName} from './qqMapConstant'
class Polyline extends Component {
    componentDidMount(){
        this.props.add(qqMapComponentName.Polyline,this.props)
    }
    componentWillReceiveProps(nextProps) {
        this.props.update(qqMapComponentName.Polyline,nextProps)
    }
    componentWillUnmount() {
        this.props.remove(qqMapComponentName.Polyline,this.props.mapkey)
    }
    
    render() {
        return false;
    }
}
Polyline.propTypes = {
    path: PropTypes.array.isRequired,
    mapkey: PropTypes.string.isRequired
}

export default Polyline;