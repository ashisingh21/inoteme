import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../Contexts/notes/noteContext'
import CreateNote from './CreateNote';
import Note from './Note';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function Notes() {

    const context = useContext(NoteContext);
    const { notes, getNotes, updateNote } = context;
    const navigate = useNavigate();
    const ref = useRef(null);


    useEffect(() => {
        // getNotes()
        if (localStorage.getItem('token')) {
            getNotes()
            // eslint-disable-next-line
        } else {
            navigate('/login')
        }

    }, [])

    // MODAL HIDDEN SHOW 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [note, setNote] = useState({ id: '', etitle: '', edescription: '', etag: '' })


    // CLICK ON UPDATE
    const updateTheNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }


    // HANDLE CHANGE
    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }



    // SEND THE CONTENT FOR UPDATE
    const handleClick = (e) => {
        updateNote(note.id, note.etitle, note.edescription, note.etag);
        setShow(false)

    }


    return (
        <>

            <CreateNote></CreateNote>

            {/* Node Update Modal Start*/}
            <Button variant="primary" className='d-none' ref={ref} onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="my-3">
                        <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" onChange={handleChange} value={note.etitle} name='etitle' placeholder="Enter Title" autoFocus />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" onChange={handleChange} value={note.edescription} name='edescription' placeholder="Enter Description" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicTag">
                            <Form.Label>Tag</Form.Label>
                            <Form.Control type="text" onChange={handleChange} value={note.etag} name='etag' placeholder="Enter Tags" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button disabled={note.etitle.length < 5 || note.edescription.length < 5} variant="warning" onClick={handleClick}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Node Update Modal End*/}

            <h2>Your Notes</h2>
            <div className="row">
                <div className='text-gray mt-2'>
                    {notes.length === 0 && 'No Notes to display'}</div>
                {notes.map((note) => {
                    return (<Note key={note._id} note={note} updateTheNote={updateTheNote}></Note>)
                })}
            </div>

        </>
    )
}

export default Notes