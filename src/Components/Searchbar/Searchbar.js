import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImSearch } from 'react-icons/im';
import styles from './Searchbar.module.css';

export default class Searchbar extends Component {
    state = {
        search: '',
    };
    handleSearchChange = evt => {
        const event = evt.currentTarget;
        this.setState({ search: event.value.toLowerCase() });
    };
    handleSubmit = event => {
        event.preventDefault();
        const { search } = this.state;
        if (search.trim() === '') {
            return toast.error('Поле поиска пустое!');
        }
        this.props.onSubmitForm(search);
        this.setState({ search: '' });
    };

    render() {
        return (
            <header className={styles.Searchbar}>
                <form
                    onSubmit={this.handleSubmit}
                    className={styles.SearchForm}
                >
                    <button type="submit" className={styles.SearchFormButton}>
                        <span
                            type="submit"
                            className={styles.SearchFormButtonLabel}
                        >
                            <ImSearch />
                        </span>
                    </button>

                    <input
                        className={styles.SearchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        value={this.state.search}
                        onChange={this.handleSearchChange}
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        );
    }
}

Searchbar.propsTypes = {
    search: PropTypes.string,
};
