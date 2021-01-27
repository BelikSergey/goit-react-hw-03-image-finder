import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

function ImageGallery({ id, webformatURL, alt, onImageClick }) {
    return (
        <li id={id} className={styles.ImageGalleryItem}>
            <img
                src={webformatURL}
                alt={alt}
                className={styles.ImageGalleryItemImage}
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
