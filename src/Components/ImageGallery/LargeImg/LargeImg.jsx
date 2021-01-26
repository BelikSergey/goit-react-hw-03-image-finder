import PropTypes from 'prop-types';

function LargeImg({ LargeImg, tag }) {
    return (
        <>
            <img src={LargeImg} alt={tag} />
        </>
    );
}

LargeImg.propTypes = {
    LargeImg: PropTypes.string.isRequired,
    tag: PropTypes.string,
};

export default LargeImg;
