import PropTypes from 'prop-types'


export default function Button(onclick, className) {
    return (
        <button className={className} type="submit" onClick={onclick}></button>
    )
}

Button.propsTypes ={
    onclick:PropTypes.func,
    className:PropTypes.string,
   
}

