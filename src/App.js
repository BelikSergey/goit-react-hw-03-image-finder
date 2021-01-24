import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';

// import PropTypes from 'prop-types'
// import './App.css';

export default class App extends Component {
    state = {
        search: '',
    };

    handleSearchFormSubmit = search => {
        console.log(search);
        this.setState({ search });
    };
    // componentDidUpdate(prevProps,prevState){
    //   if (prevState.search !== this.state.search){
    //   pixabayApi('dog', '1').then(({data}) => {console.log(data)})
    // }

    render() {
        return (
            <div>
                <Searchbar onSubmitForm={this.handleSearchFormSubmit} />
                <ToastContainer position="top-left" autoClose={2000} />
                <ImageGallery search={this.state.search} />
            </div>
        );
    }
}
