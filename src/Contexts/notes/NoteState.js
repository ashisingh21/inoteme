import React, { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
    const HOST = 'http://localhost:5000';
    const initialState = [];
    const [notes, setNotes] = useState(initialState);

    // GET ALL NOTE
    const getNotes = async () => {
        const response = await fetch(`${HOST}/api/note/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);
    };

    // CREATE A NEW NOTE
    const createNote = async ({ title, description, tag }) => {
        const response = await fetch(`${HOST}/api/note/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    };

    // UPDATE A NEW NOTE
    const updateNote = async (id, title, description, tag) => {
        const response = await fetch(`${HOST}/api/note/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes));

        for (let index = 0; index < newNotes.length; index++) {
            let element = notes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        console.log("new notes", newNotes);
        setNotes(newNotes);
    };

    // DELETE A NOTE
    const deleteNote = async (id) => {
        const response = await fetch(`${HOST}/api/note/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
        });
        const json = await response.json();
        const newNotes = notes.filter((note) => {
            return note._id !== id;
        });
        setNotes(newNotes);
    };

    return (
        <>
            <NoteContext.Provider
                value={{ notes, getNotes, updateNote, deleteNote, createNote }}
            >
                {props.children}
            </NoteContext.Provider>
        </>
    );
};

export default NoteState;
