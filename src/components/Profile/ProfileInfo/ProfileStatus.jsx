import React, { Component } from 'react'

export default class ProfileStatus extends Component {

    state = {
        status: this.props.status,
        editMode: false
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        });
    }
    
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
    }

    changeText = (e) => {
        let newText = e.target.value;
        this.setState({
            status: newText
        });
        this.props.updateStatus(newText);
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
            });
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onClick={this.activateEditMode}>{this.state.status || 'There are no status'}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input autoFocus={true} onChange={this.changeText} onBlur={this.deactivateEditMode} value={this.state.status}></input>
                </div>
                }
            </div>
        )
    }
}
