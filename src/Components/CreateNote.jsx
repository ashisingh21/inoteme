import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NoteContext from '../Contexts/notes/noteContext';


function CreateNote() {
    // GET THE CREATE NOTE FUNCTION FROM NOTE STATE
    const context = useContext(NoteContext);
    const { createNote } = context;

    const [note, setNote] = useState({ title: '', description: '', tag: '' })

    const handleChange = (e) => {
        e.preventDefault()
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick = () => {
        createNote(note);
    }



    return (
        <>
            <h2 className='my-4'>Add a Note</h2>
            <Form className="my-3">
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" onChange={handleChange} value={note.title} name='title' placeholder="Enter Title" autoFocus />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" onChange={handleChange} value={note.description} name='description' placeholder="Enter Description" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicTag">
                    <Form.Label>Tag</Form.Label>
                    <Form.Control type="text" onChange={handleChange} value={note.tag} name='tag' placeholder="Enter Tags" />
                </Form.Group>

                <Button disabled={note.title.length < 5 || note.description.length < 5} variant='warning' onClick={handleClick}>
                    Add a Note
                </Button>
            </Form>
        </>
    )
}

export default CreateNote