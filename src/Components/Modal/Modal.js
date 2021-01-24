import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { PopupboxManager, PopupboxContainer } from 'react-popupbox';

export class Example extends Component {
    openPopupbox() {
        const content = <img alt="" src="" />;
        PopupboxManager.open({
            content,
            config: {
                titleBar: {
                    enable: true,
                },
                fadeIn: true,
                fadeInSpeed: 500,
            },
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.openPopupbox}>Click me</button>
                <PopupboxContainer />
            </div>
        );
    }
}
