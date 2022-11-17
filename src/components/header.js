import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
//import '../index.css'


function Header(){

    const [text, setText] = useState('')
    const dispatch = useDispatch()

    const handleChange = (e) => setText(e.target.value)

    const handleKeyDown = e =>{
        const trimmedText = e.target.value.trim()
        if (e.key == 'Enter' && trimmedText){
            dispatch({ type: 'todos/todoAdded', payload: trimmedText})
        }
    }

    return(
    <div className="App">
    <nav>
      <section>
      <header className="header">
        <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
      </header>
      </section>
    </nav>
  </div>)
}

export default Header;