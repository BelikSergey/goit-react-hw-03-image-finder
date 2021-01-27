import PropTypes from 'prop-types';

function LargeImg({ LargeImg, alt }) {
    return (
        <>
            <img src={LargeImg} alt={alt} />
        </>
    );
}

LargeImg.propTypes = {
    LargeImg: PropTypes.string.isRequired,
    alt: PropTypes.string,
};

export default LargeImg;
