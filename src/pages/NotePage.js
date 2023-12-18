import React, {useState, useEffect} from 'react'
//import notes from '../assets/data'
import { useParams } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  //const note = notes.find((note) => note.id === Number(id));
  const [note, setNote] = useState(null)

  useEffect(() => { 
    getNote()
  }, [id])

  let getNote = async async =>{
    let response = await fetch(`http://localhost:8000/notes/${id}`)
    let data = await response.json()
    setNote(data)
  }

  let updateNote = async () => {
    await fetch(`http://localhost:8000/notes/${id}`, {
      method:'PUT',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...note, 'updated': new Date()})
    })
  }

  let deleteNote = async () =>{
    await fetch(`http://localhost:8000/notes/${id}`, {
      method:'DELETE',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
    navigate('/')
  }

  let handleSubmit = () => {

    if(id !== 'new' && !note.body){
      deleteNote()
    }else if(id === 'new'){
      updateNote
    }

    updateNote()
    navigate('/')
  }

  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit}></ArrowLeft>
          </Link>
        </h3>

        <butto onClick={deleteNote}>Delete</butto>
      </div>
        <textarea onChange={(e)=> {setNote({...note, 'body':e.target.value})}} value={note?.body}>

        </textarea>
    </div>
  )
}

export default NotePage
