import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';
import Modal from './Components/Modal';
import LargeImg from './Components/ImageGallery/LargeImg';

// import PropTypes from 'prop-types'
// import './App.css';

export default class App extends Component {
    state = {
        search: '',
        showModal: false,
        largeImageURL: '',
    };
    componentDidUpdate(prevProps, prevState) {
        if (prevState.largeImageURL !== this.state.largeImageURL) {
            this.setState({ showModal: true });
        }
        if (prevState.showModal === true) {
            // this.setstate
        }
    }

    handleSearchFormSubmit = search => {
        // console.log(search);
        this.setState({ search });
    };

    toggleModal = () => {
        this.setState(({ showModal }) => ({
            showModal: !showModal,
        }));
    };
    handleLargeImageURL = url => {
        this.setState({ largeImageURL: url });
        console.log(this.state.largeImageURL);
    };
    // componentDidUpdate(prevProps,prevState){
    //   if (prevState.search !== this.state.search){
    //   pixabayApi('dog', '1').then(({data}) => {console.log(data)})
    // }

    render() {
        const { showModal, search, largeImageURL } = this.state;
        return (
            <div>
                <Searchbar onSubmitForm={this.handleSearchFormSubmit} />
                <ToastContainer position="top-left" autoClose={2000} />
                <ImageGallery
                    search={search}
                    largeImageURL={this.handleLargeImageURL}
                />
                {showModal && (
                    <Modal onClose={this.toggleModal}>
                        <LargeImg LargeImg={largeImageURL} />
                    </Modal>
                )}
            </div>
        );
    }
}
