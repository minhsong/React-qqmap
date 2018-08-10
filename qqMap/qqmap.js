
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { mapEvents, qqMapComponentName, qqMapName } from './qqMapConstant'

//http://lbs.qq.com/javascript_v2/doc/index.html
export default class QQMap extends Component {
    constructor() {
        super();
        this.state = {
            map: null,
            Markers: {},
            Polylines: {},
            Polygons: {},
            WindowInfos: {},
            Circles: {},
            Directions: {}
        }
        this.renderMapChildren = this.renderMapChildren.bind(this);
    }

    componentWillMount() {


    }

    componentWillUnmount() {
        window[qqMapName] = null;
    }

    componentDidMount() {
        let qq = window.qq;
        if (!this.state.map) {
            if (this.refs.qqMap && qq.maps) {
                Object.keys(this.props.options).map(key => {
                    if (this.props.options[key]==null) {
                        delete this.props.options[key];
                    }
                })
                this.state.map = new qq.maps.Map(this.refs.qqMap, Object.assign({
                    zoomControl: false,
                    center: new qq.maps.LatLng(39.90340978811721, 116.40739630000007),
                    zoom: this.props.zoom || 14,
                    mapTypeControlOptions: {
                        //设置控件的地图类型ID，ROADMAP显示普通街道地图，SATELLITE显示卫星图像，HYBRID显示卫星图像上的主要街道透明层
                        mapTypeIds: [
                            qq.maps.MapTypeId.ROADMAP,
                            qq.maps.MapTypeId.SATELLITE,
                            qq.maps.MapTypeId.HYBRID
                        ],
                        //设置控件位置相对上方中间位置对齐
                        position: qq.maps.ControlPosition.BOTTOM_RIGHT
                    }             
                }, this.props.options));
                if (this.props.onLoad && typeof this.props.onLoad == 'function') {
                    this.props.onLoad(this.state.map);
                }
                if (this.props.events) {
                    mapEvents.Map.map(event => {
                        if (typeof this.props.events[event] == 'function') {
                            qq.maps.event.addListener(this.state.map, event, this.props.events[event])
                        }
                    })
                }
            }
        }
        this.renderMapChildren(this.props.children);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.map && nextProps.options) {
            if (nextProps.options.zoom) {
                this.state.map.setZoom(nextProps.options.zoom)
            }
            if (nextProps.options.center) {
                if (nextProps.options && nextProps.options.center) {
                    let pos = nextProps.options.center;
                    if (typeof nextProps.options.center.toJSON == 'function') {
                        pos = nextProps.options.center.toJSON();
                    }
                    nextProps.options.center = new window.qq.maps.LatLng(pos.lat, pos.lng);
                }
                if (nextProps.options.center.lat != this.state.map.center.lat && nextProps.options.center.lng != this.state.map.center.lng) {
                    this.state.map.setCenter(nextProps.options.center)
                }
            }

        }
    }


    updateMapNode = (type, options) => {
        switch (type) {
            case qqMapComponentName.Marker: {
                break;
            }
            case qqMapComponentName.Polyline: {
                break;
            }
            case qqMapComponentName.Polygon: {
                break
            }
            case qqMapComponentName.WindowInfo: {
                break;
            }
            case qqMapComponentName.Circle: {
                break;
            }
            case qqMapComponentName.Direction: {
                break;
            }
        }
    }

    removeMapNode = (type, key) => {
        switch (type) {
            case qqMapComponentName.Marker: {
                if (this.state.Markers[key]) {
                    this.state.Markers[key].setMap(null);
                    delete this.state.Markers[key];
                }
                break;
            }
            case qqMapComponentName.Polyline: {
                if (this.state.Polylines[key]) {
                    this.state.Polylines[key].setMap(null);
                    delete this.state.Polylines[key];
                }
                break;
            }
            case qqMapComponentName.Polygon: {
                if(this.state.Polygons[key]){
                    this.state.Polygons[key].setMap(null);
                    delete this.state.Polygons[key];
                }
                break
            }
            case qqMapComponentName.WindowInfo: {
                if(this.state.WindowInfos[key]){
                    this.state.WindowInfos[key].setMap(null);
                    delete this.state.WindowInfos[key];
                }
                break;
            }
            case qqMapComponentName.Circle: {
                break;
            }
            case qqMapComponentName.Direction: {
                break;
            }
        }
    }

    addMapNode = (type, props) => {
        this.updateMapChild(type, props)
    }
    updateMapChild = (type, props) => {
        let qq = window.qq;
        if (!qq) {
            return;
        }
        switch (type) {
            case qqMapComponentName.Marker: {
                if (this.state.map && props.mapkey && props.options) {
                    if (props.options && props.options.position) {
                        let pos = props.options.position;
                        if (typeof props.options.position.toJSON == 'function') {
                            pos = props.options.position.toJSON();
                        }
                        props.options.position = new qq.maps.LatLng(pos.lat, pos.lng);
                    }
                    if (this.state.Markers[props.mapkey]) {
                        if (props.options) {
                            if (!this.state.Markers[props.mapkey].getMap()) {
                                this.state.Markers[props.mapkey].setMap(this.state.map)
                            }
                            if (props.options.icon) {
                                this.state.Markers[props.mapkey].setIcon(props.options.icon)
                            }
                            if (props.options.position) {
                                this.state.Markers[props.mapkey].setPosition(props.options.position)
                            }
                            if (props.options.draggable) {
                                this.state.Markers[props.mapkey].setDraggable(props.options.draggable)
                            }
                        }

                    } else {
                        this.state.Markers[props.mapkey] = new qq.maps.Marker({ ...props.options, map: this.state.map });
                        if (props.events) {
                            mapEvents.Marker.map(event => {
                                if (typeof props.events[event] == 'function') {
                                    qq.maps.event.addListener(this.state.Markers[props.mapkey], event, props.events[event])
                                }
                            })
                        }
                    }

                }
                break;
            }
            case qqMapComponentName.Polyline: {
                if (this.state.map && props.mapkey && props.path) {
                    if (this.state.Polylines[props.mapkey]) {
                        this.state.Polylines[props.mapkey].setPath(props.path)
                        let options = {}
                        if (props.options) {
                            options = {
                                ...props.options
                            }
                        }
                        // if (props.editable) {
                        //     options.editable = true
                        // }
                        this.state.Polylines[props.mapkey].setOptions(options)
                    } else {
                        let defaultOptions = Object.assign({
                            strokeColor: '#1469EC',
                            strokeWeight: 5
                        }, props.options)
                        this.state.Polylines[props.mapkey] = new qq.maps.Polyline(Object.assign({
                            map: this.state.map,
                            path: props.path
                        }, defaultOptions));
                    }
                    if (!props.options || !props.options.editable) {
                        let bound = new window.qq.maps.LatLngBounds();
                        props.path.map(pos => {
                            bound.extend(pos);
                        })
                        this.state.Polylines[props.mapkey].getMap().fitBounds(bound);
                    }
                    if (props.onLoaded && typeof props.onLoaded == 'function') {
                        props.onLoaded(this.state.Polylines[props.mapkey])
                    }
                    if (props.events) {
                        mapEvents.Polyline.map(event => {
                            if (typeof props.events[event] == 'function') {
                                qq.maps.event.addListener(this.state.Polylines[props.mapkey], event, props.events[event])
                            }
                        })
                    }

                }
                break;
            }
            case qqMapComponentName.Polygon: {
                if (this.state.map && props.mapkey && props.path) {
                    if (this.state.Polygons[props.mapkey]) {
                        this.state.Polygons[props.mapkey].setPath(props.path)
                        let options = {}
                        if (props.options) {
                            options = {
                                ...props.options
                            }
                        }
                        if (props.editable) {
                            options.editable = true
                        }
                        this.state.Polygons[props.mapkey].setOptions(options)
                    } else {
                        let defaultOptions = Object.assign({
                            strokeColor: '#1469EC',
                            strokeWeight: 5
                        }, props.options)
                        this.state.Polygons[props.mapkey] = new qq.maps.Polygon(Object.assign({
                            map: this.state.map,
                            path: props.path
                        }, defaultOptions));
                        if (props.events) {
                            mapEvents.Polygon.map(event => {
                                if (typeof props.events[event] == 'function') {
                                    qq.maps.event.addListener(this.state.Polygons[props.mapkey], event, props.events[event])
                                }
                            })
                        }
                        if (props.onLoaded && typeof props.onLoaded == 'function') {
                            props.onLoaded(this.state.Polygons[props.mapkey])
                        }
                        if (props.mouseup && typeof props.mouseup == 'function') {
                            qq.maps.event.addListener(this.state.Polygons[props.mapkey], 'mouseup', props.mouseup)
                        }
                    }
                    if(props.fitBounds){
                        window.qqmapa = this.state.map;
                        this.state.map.fitBounds(this.state.Polygons[props.mapkey].getBounds());
                    }
                }
                break
            }
            case qqMapComponentName.WindowInfo: {
                if (this.state.map && props.mapkey && props.options) {
                    if (props.options && props.options.position) {
                        let pos = props.options.position;
                        if (typeof props.options.position.toJSON == 'function') {
                            pos = props.options.position.toJSON();
                        }
                        props.options.position = new qq.maps.LatLng(pos.lat, pos.lng);
                    }
                    if (this.state.WindowInfos[props.mapkey]) {
                        if (props.options) {
                            if (!this.state.WindowInfos[props.mapkey].getMap()) {
                                this.state.WindowInfos[props.mapkey].setMap(this.state.map)
                            }
                            if (props.options.position) {
                                this.state.WindowInfos[props.mapkey].setOptions(props.options)
                            }
                        }

                    } else {
                        this.state.WindowInfos[props.mapkey] = new qq.maps.InfoWindow({ ...props.options, map: this.state.map });
                        if (props.events) {
                            mapEvents.WindowInfo.map(event => {
                                if (typeof props.events[event] == 'function') {
                                    qq.maps.event.addListener(this.state.WindowInfos[props.mapkey], event, props.events[event])
                                }
                            })
                        }
                    }

                }
                break;
            }
            case qqMapComponentName.Circle: {
                break;
            }
            case qqMapComponentName.Direction: {
                if (this.state.map && props.mapkey && props.start && props.end) {
                    this.state.Directions[props.mapkey] = new qq.maps.DrivingService({
                        Map: this.state.map
                    });
                    this.state.Directions[props.mapkey].setComplete((data) => {
                        console.warn('direction complete', data)
                    })
                    this.state.Directions[props.mapkey].setError(function (data) {
                        console.warn(data)
                    });
                    let start = props.start;
                    let end = props.end;
                    if (start) {
                        start = new window.qq.maps.LatLng(props.start.lat, props.start.lng);
                    }

                    if (end) {
                        end = new window.qq.maps.LatLng(props.end.lat, props.end.lng);
                    }


                    this.state.Directions[props.mapkey].search(start, end);
                }
                break;
            }
        }
    }

    getChildContext() {
        return {
            map: this.state.map
        }
    }

    clearMapChildren() {
        if (!this.state.map) {
            return;
        }
        Object.keys(this.state.Markers).map(key => {

        });
        Object.keys(this.state.WindowInfo).map(key => {

        });
        Object.keys(this.state.Polylines).map(key => {

        });
        Object.keys(this.state.Polygons).map(key => {

        });
        Object.keys(this.state.Circle).map(key => {

        });
        Object.keys(this.state.Direction).map(key => {

        });
    }

    renderMapChildren(children) {
        React.Children.map(children, (child) => {
            if (child && child.type) {
                this.updateMapChild(child.type.name, child.props);
            }

        })
    }



    render() {
        return <div className={this.props.className} ref='qqMap'>
            {this.state.map && this.props.children && React.Children.map(this.props.children, child => (
                child && React.cloneElement(child, {
                    add: this.addMapNode,
                    remove: this.removeMapNode,
                    update: this.updateMapChild
                })
            ))}
        </div>
    }

}
QQMap.childContextTypes = {
    map: PropTypes.object
}