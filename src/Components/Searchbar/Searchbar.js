import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImSearch } from "react-icons/im";



export default class Searchbar extends Component {
    state={
        search:'',
    }
    handleSearchChange=(event)=>{
        // console.log('событие формы');
        this.setState({search: event.currentTarget.value.toLowerCase()})

    }
    handleSubmit=(event)=>{
        event.preventDefault();
        if(this.state.search.trim()===''){
            return toast.error('Поле поиска пустое!');
        }
        this.props.onSubmitForm(this.state.search)
        this.setState({search:''});
    }

    render() {
        return (
            <header className="Searchbar">
            <form onSubmit={this.handleSubmit} className="SearchForm">
                <button type="submit" className="SearchForm-button">
                <span type="submit" className="SearchForm-button-label"><ImSearch /></span>
                </button>
               
                <input
                className="SearchForm-input"
                type="text"
                autoComplete="off"
                autoFocus
                value={this.state.search}
                onChange={this.handleSearchChange}
                placeholder="Search images and photos"
                />
            </form>
            </header>
        )
    }
}

Searchbar.propsTypes ={
    search:PropTypes.string,
}
