// DOM===>DOM stands for Document Object Model. It is a programming interface that allows us to create, change, 
// or remove elements from the document. 
// We can also add events to these elements to make our page more dynamic.
// The DOM views an HTML document as a tree of nodes. A node represents an HTML element.


// UseRef Hooks  ===>

import React, { useRef } from 'react'
import { useEffect } from 'react';


const UseRefHooks = () => {

    const inputRef = useRef()
    useEffect(() => {
        inputRef.current.focus()
        inputRef.current.style.padding = 5
    }, [])


    return (
        <>
            <input ref={inputRef} placeholder="useref hooks....." />
        </>
    )
}

export default UseRefHooks