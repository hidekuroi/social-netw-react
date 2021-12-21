import React, { Component } from 'react'

export default class ProfileStatus extends Component {

    state = {
        status: 'status',
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
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onClick={this.activateEditMode}>{this.state.status}</span>
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
