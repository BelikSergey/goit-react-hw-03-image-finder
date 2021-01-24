import PropTypes from 'prop-types';

export default function Button({ loadMore, className, buttonName }) {
    // console.log(loadMore);
    return (
        <button className={className} type="submit" onClick={loadMore}>
            {buttonName}
        </button>
    );
}

Button.propsTypes = {
    loadMore: PropTypes.func,
    className: PropTypes.string,
    buttonName: PropTypes.string,
};
