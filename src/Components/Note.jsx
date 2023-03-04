import React, { useContext } from 'react'
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import NoteContext from '../Contexts/notes/noteContext';

function Note(props) {
    const { note, updateTheNote } = props;
    const context = useContext(NoteContext);
    const { deleteNote } = context;


    return (
        <>
            <div className='col-md-3'>
                <Card className=' mt-4 my-3 p-0'>
                    <Card.Header>{note.title}</Card.Header>
                    <Card.Body>
                        <Card.Title>{note.description}</Card.Title>
                        <Card.Text>
                            {new Date(note.date).toGMTString()}
                        </Card.Text>

                        <div className='note-icons'>
                            {/* Update the Note */}
                            <Button variant="outline-warning" onClick={() => { updateTheNote(note) }} style={{ color: 'black', border: '2px solid #FFC107' }}> Update <i className="fa-solid fa-file-pen"></i></Button>

                            {/* Delete the Note */}
                            <Button variant="outline-warning" onClick={() => { deleteNote(note._id) }} style={{ border: '2px solid #FFC107' }}> <i style={{ color: 'black' }} className="fa-solid fa-trash"></i></Button>
                        </div>

                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default Note