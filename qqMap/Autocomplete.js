import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {QQUltis} from './ultis'

class Autocomplete extends Component {
    constructor(prop){
        super();
        this.state = {
            Autocomplete:null
        }
    }
    componentDidMount() {
        if(this.refs.autocomplete_control && window.qq){
            this.state.Autocomplete = new window.qq.maps.place.Autocomplete(this.refs.autocomplete_control);
            window.qq.maps.event.addListener(this.state.Autocomplete,'confirm',this.confirmListener)
            if(this.props.autoFocus){
                setTimeout(()=>{
                    this.refs.autocomplete_control.focus();                    
                },50)
            }
            if(this.props.inputRef && typeof this.props.inputRef =='function'){
                this.props.inputRef(this.state.Autocomplete)
            }
        }
    }
    confirmListener=(e)=>{
        if(this.props.onConfirm && typeof this.props.onConfirm == 'function'){
            if(this.state.Autocomplete.place){
                this.props.onConfirm(e.value,QQUltis.fullAddressGeocode(this.state.Autocomplete.place))
            }else{
                this.props.onConfirm(e.value);                            
            }
        }
    }
    onChangeHandle=(e)=>{
        if(this.props.onChange && typeof this.props.onChange =='function'){
            this.props.onChange(e.target.value)            
        }
    }
    onConfirmHandle=(e)=>{

    }
    handleAddressRemoved=(e)=>{
        this.refs.autocomplete_control.value ='';
        if(this.props.onChange && typeof this.props.onChange =='function'){
            this.props.onChange('')            
        }
        if(this.props.handleAddressRemoved && typeof  this.props.handleAddressRemoved){
            this.props.handleAddressRemoved(e);
        }
    }
    render() {
        const props = {...this.props,onChange:this.onChangeHandle}
        delete props.classNames;
        delete props.autoFocus;
        return (
            <div className={"input-group " + this.props.classNames}>
                <input className='form-control' type='text' {...props} ref='autocomplete_control'/>
                <span className="input-group-addon action" disabled={this.props.disabled||false}  onClick={this.props.disabled? ()=>{}:this.handleAddressRemoved}>
                    <i disabled={this.props.disabled||false} className="fa fa-remove"></i>
                </span>
            </div>
        )
    }
}

Autocomplete.propTypes = {
    onConfirm: PropTypes.func.isRequired
}

export default Autocomplete;