import PropTypes from 'prop-types';

function ImageGallery({ id, webformatURL, alt, onImageClick }) {
    return (
        <li id={id} className="ImageGalleryItem">
            <img
                src={webformatURL}
                alt={alt}
                className="ImageGalleryItem-image"
                onClick={onImageClick}
            />
        </li>
    );
}

ImageGallery.propTypes = {
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
};

export default ImageGallery;
