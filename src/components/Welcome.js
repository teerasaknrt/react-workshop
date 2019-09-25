import React, { Component } from 'react'

export default class Welcome extends Component {
    render() {
        return (
            <div>
                <div>
                    <p> สวัสดีคุณ {this.props.name}</p>
                </div>
            </div>
        )
    }
}
