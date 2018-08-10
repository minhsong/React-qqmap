import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {mapEvents,qqMapComponentName,qqMapName} from './qqMapConstant'

//http://lbs.qq.com/javascript_v2/doc/markeroptions.html
//http://lbs.qq.com/javascript_v2/doc/marker.html
const qq = window.qq;
class Marker extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    
    componentDidMount(){
        this.props.add(qqMapComponentName.Marker,this.props)
    }
    componentWillReceiveProps(nextProps) {
        this.props.update(qqMapComponentName.Marker,nextProps)
    }
    componentWillUnmount() {
        this.props.remove(qqMapComponentName.Marker,this.props.mapkey)
    }
    
    render() {
        return false;
    }
}
Marker.propTypes = {
    options: PropTypes.object.isRequired,
    mapkey: PropTypes.string.isRequired
}
export default Marker;