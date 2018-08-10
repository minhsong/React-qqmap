import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {mapEvents,qqMapComponentName,qqMapName} from './qqMapConstant'

class WindowInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    
    componentDidMount(){
        this.props.add(qqMapComponentName.WindowInfo,this.props)
    }
    componentWillReceiveProps(nextProps) {
        this.props.update(qqMapComponentName.WindowInfo,nextProps)
    }
    componentWillUnmount() {
        this.props.remove(qqMapComponentName.WindowInfo,this.props.mapkey)
    }
    
    render() {
        return false;
    }
}
WindowInfo.propTypes = {
    options: PropTypes.object.isRequired,
    mapkey: PropTypes.string.isRequired
}

export default WindowInfo;