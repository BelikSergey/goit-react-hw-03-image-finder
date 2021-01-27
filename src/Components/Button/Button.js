import PropTypes from 'prop-types';
import styles from './Button.module.css';

export default function Button({ loadMore, buttonName }) {
    // console.log(loadMore);
    return (
        <button className={styles.Button} type="button" onClick={loadMore}>
            {buttonName}
        </button>
    );
}

Button.propsTypes = {
    loadMore: PropTypes.func,
    buttonName: PropTypes.string,
};
