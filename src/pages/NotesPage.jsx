import { useState } from 'react'
import { loadNotes, saveNotes } from '../notes.js'
import { useConfig } from '../useConfig.js'

export default function NotesPage() {
    const [notes, setNotes] = useState(() => loadNotes())
    const [text, setText] = useState('')
    const [editingId, setEditingId] = useState(null)
    const [message, setMessage] = useState('')
    const { config, error } = useConfig()
    const maxNoteLength = config.maxNoteLength

    function updateNotes(next) {
        setNotes(next)
        saveNotes(next)
    }
    function handleSubmit(event) {
        event.preventDefault()
        const trimmed = text.trim()
        if (!trimmed) {
            setMessage('Skriv en anteckning först.')
            return
        }
        if (editingId) {
            updateNotes(
                notes.map((note) =>
                    note.id === editingId
                        ? {
                              ...note,
                              text: trimmed,
                              updatedAt: new Date().toISOString()
                          }
                        : note
                )
            )
            setMessage('Anteckningen är uppdaterad.')
        } else {
            updateNotes([
                {
                    id: crypto.randomUUID(),
                    text: trimmed,
                    updatedAt: new Date().toISOString()
                },
                ...notes
            ])
            setMessage('Anteckningen är sparad.')
        }
        setText('')
        setEditingId(null)
    }
    function handleEdit(note) {
        setEditingId(note.id)
        setText(note.text)
        setMessage('')
    }
    function handleDelete(id) {
        updateNotes(notes.filter((note) => note.id !== id))
        if (editingId === id) {
            setEditingId(null)
            setText('')
        }
        setMessage('Anteckningen är borttagen.')
    }
    return (
        <section>
            <h1>Anteckningar</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="note">
                    {editingId ? 'Redigera anteckning' : 'Ny anteckning'}
                </label>
                <textarea
                    id="note"
                    value={text}
                    maxLength={maxNoteLength}
                    onChange={(event) => setText(event.target.value)}
                />
                <p>
                    {text.length}/{maxNoteLength}
                </p>
                {error && <p>{error}</p>}
                <button type="submit">
                    {editingId ? 'Uppdatera' : 'Spara'}
                </button>
                {editingId && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditingId(null)
                            setText('')
                            setMessage('')
                        }}
                    >
                        Avbryt
                    </button>
                )}
            </form>
            {message && <p>{message}</p>}
            {notes.length === 0 ? (
                <p>Inga anteckningar ännu.</p>
            ) : (
                <ul className="notes">
                    {notes.map((note) => (
                        <li key={note.id} className="note">
                            <p>{note.text}</p>
                            <button
                                type="button"
                                onClick={() => handleEdit(note)}
                            >
                                Redigera
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDelete(note.id)}
                            >
                                Ta bort
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}
