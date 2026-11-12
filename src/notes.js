const STORAGE_KEY = 'notepad.notes'
export function loadNotes() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        const parsed = raw ? JSON.parse(raw) : []
        return Array.isArray(parsed) ? parsed : []
    } catch {
        return []
    }
}
export function saveNotes(notes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}
