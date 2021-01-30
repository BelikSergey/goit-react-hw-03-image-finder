import PropTypes from 'prop-types';
import { Component } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { toast } from 'react-toastify';
import 'react-popupbox/dist/react-popupbox.css';

import pixabayApi from '../../services';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import style from './ImageGallery.module.css';

export default class ImageGallery extends Component {
    state = {
        search: '',
        page: 1,
        gallery: null,
        status: 'idle',
    };

    async componentDidUpdate(prevProps, prevState) {
        const prev = prevProps.search;
        const next = this.props.search;
        if (prev !== next) {
            this.setState({ status: 'pending' });
            try {
                const data = await pixabayApi(next, this.state.page);
                this.setState({
                    gallery: data.data.hits,
                });
            } catch (error) {
                this.setState({ status: 'rejected' });
            }
            if (this.state.gallery.length !== 0) {
                this.setState({ status: 'resolved' });
            } else {
                this.setState({ status: 'idle' });
                toast('По вашему запросу ничего не найдено');
            }
        }
        if (prevState.page !== this.state.page) {
            const data = await pixabayApi(next, this.state.page);
            this.setState(prevState => ({
                gallery: [...prevState.gallery, ...data.data.hits],
            }));
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
            });
            this.chekingGalleryLength(
                prevState.gallery.length,
                this.state.gallery.length,
            );
        }
    }
    componentWillUnmount() {
        // console.log('компонент галлерея размонтирован');
        this.reset();
    }
    handleOnImageClick = e => {
        this.state.gallery.forEach(gal => {
            // console.log(largeImageURL);
            if (gal.id === Number(e.target.parentElement.id)) {
                this.props.largeImageURL(gal.largeImageURL, gal.tags);
                // this.props.tags(gal.tags);
            }
        });
        this.setState({ modal: true });
        // console.log(this.state.largeImg);
    };

    reset = () => {
        // console.log('очистился стейт галереи');
        this.setState({
            search: '',
            page: 1,
            gallery: null,
            status: 'idle',
            showModal: 'false',
            largeImg: '',
        });
    };
    chekingGalleryLength = (prev, next) => {
        if (prev === next) {
            toast('Больше по вашему запросу картинок не найдено', {
                position: 'bottom-center',
            });
        }
    };

    handleLoadMore = event => {
        event.preventDefault();
        this.setState({ page: this.state.page + 1 });

        // console.log(this.state.page);
    };

    render() {
        const { gallery, status } = this.state;
        if (status === 'idle') {
            return null;
        }
        if (status === 'pending') {
            return (
                <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={80}
                    width={80}
                />
            );
        }
        if (status === 'resolved') {
            return (
                <>
                    <ul className={style.ImageGallery}>
                        {gallery &&
                            gallery.map(({ id, webformatURL, tags }) => (
                                <ImageGalleryItem
                                    key={id}
                                    id={id}
                                    webformatURL={webformatURL}
                                    alt={tags}
                                    onImageClick={this.handleOnImageClick}
                                />
                            ))}
                    </ul>
                    <Button
                        loadMore={this.handleLoadMore}
                        buttonName={'Load More'}
                    ></Button>
                </>
            );
        }
        if (status === 'rejected') {
            toast.error('Опаньки Приплыли! Попробуйте позже!', {
                autoClose: false,
                position: 'top-center',
            });
            return null;
        }
    }
}

ImageGallery.propTypes = {
    search: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};

ImageGallery.defaultProps = {
    id: 0,
};
