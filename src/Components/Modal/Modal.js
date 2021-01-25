import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { PopupboxManager, PopupboxContainer } from 'react-popupbox';

export class Example extends Component {
    state = {
        largeImg: '',
        modal: false,
    };
    componentDidMount() {
        this.setState({ largeImg: this.props.largeImg });
        console.log('модалка смонтрвана');
        console.log(this.props.largeImg);
        this.openPopupbox();
    }
    openPopupbox() {
        const content = <img alt="" src={this.state.largeImg} />;
        PopupboxManager.open({
            content,

            config: {
                // titleBar: {
                //     enable: true,
                // },
                fadeIn: true,
                fadeInSpeed: 500,
            },
        });
    }
    handleClick = () => {
        console.log(' изменения в модалке');
    };
    componentWillUpdate(nextProps, nextState) {
        if (nextProps.largeImg !== this.props.largeImg) {
            this.props.modal = false;
            // this.setState({largeImg: this.props.largeImg})
            // this.openPopupbox()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.largeImg !== this.props.largeImg) {
            //   this.setState({largeImg:''})
            this.setState({ largeImg: this.props.largeImg });
            this.openPopupbox();
        }
        // this.props.modal=(false);

        console.log('модалка обновилась');
    }
    componentWillUnmount() {
        console.log('модалка размонтировалась');
    }

    render() {
        if (this.props.modal) {
            // this.openPopupbox()
            return (
                <div>
                    <PopupboxContainer onChange={this.handleClick} />
                </div>
            );
        }
    }
}
