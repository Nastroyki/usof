import React from 'react'
import "../css/floatingaddbutton.css"

const FloatingAddButton = () => {
    return (
        <a href="/new" className="float text-decoration-none" >
            <span className='my-float'>+</span>
        </a>
    )
}

export default FloatingAddButton