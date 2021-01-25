import PropTypes from 'prop-types';
import { Component } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { toast } from 'react-toastify';
import 'react-popupbox/dist/react-popupbox.css';
import { Example } from '../Modal/Modal';

import pixabayApi from '../../services';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';

// 'idle' "pending" "resolved" "rejected"
// console.log(Example);

export default class ImageGallery extends Component {
    state = {
        search: '',
        page: 1,
        gallery: null,
        status: 'idle',
        modal: false,
        largeImg: '',
    };

    async componentDidUpdate(prevProps, prevState) {
        // console.log('компонент обновился');
        const prev = prevProps.search;
        const next = this.props.search;
        // console.log(prev);
        if (prev !== next) {
            this.setState({ status: 'pending' });
            // console.log('пропсы не равны идем к запросу');
            try {
                const data = await pixabayApi(next, this.state.page);
                this.setState({
                    gallery: data.data.hits,
                });
            } catch (error) {
                this.setState({ status: 'rejected' });
            }

            // console.log(this.state.gallery);
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
            // console.log(prevState.gallery.length);
            // console.log();
            this.chekingGalleryLength(
                prevState.gallery.length,
                this.state.gallery.length,
            );
            // console.log(this.state.gallery);
        }
    }
    handleOnImageClick = e => {
        console.log('click on img');
        // console.dir(e.target.parentElement.id);
        this.state.gallery.forEach(gal => {
            // console.log(gal.id);
            // console.log(gal.largeImageURL);
            // console.log(e.target.parentElement.id);
            // console.log(largeImageURL);
            if (gal.id === Number(e.target.parentElement.id)) {
                console.log(gal.largeImageURL);
                console.log(gal);
                this.setState({ largeImg: gal.largeImageURL });
            }
        });
        this.setState({ modal: true });
        console.log(this.state.largeImg);
    };
    reset = () => {
        this.setState({
            search: '',
            page: 1,
            gallery: null,
            status: 'idle',
            modal: 'false',
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

        // console.log('был клик на добовление');
        // console.log(this.state.page);
        this.setState({ page: this.state.page + 1 });
        // console.log(this.state.page);
    };
    componentWillUnmount() {
        console.log('компонент галлерея размонтирован');
        this.reset();
    }

    render() {
        const { gallery, status, largeImg, modal } = this.state;
        // if (modal === 'open') {
        //     console.log('условие выполниется');
        //     return <Example />;
        // }
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
                    <ul className="ImageGallery">
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
                        // className={button}
                    ></Button>
                    {modal && <Example modal={modal} largeImg={largeImg} />}
                </>
            );
        }
        if (status === 'rejected') {
            toast.error('Оппаньки Приплыли! Попробуйте позже!', {
                autoClose: false,
                position: 'top-center',
            });
            return null;
        }

        // return(
        //     <>
        //     <Example />
        //     </>
        // )
    }
}

ImageGallery.propTypes = {
    search: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};

ImageGallery.defaultProps = {
    id: 0,
};
