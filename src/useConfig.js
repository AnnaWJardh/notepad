import { useEffect, useState } from 'react'

const fallback = {
    appName: 'Notepad',
    appEnv: 'development',
    maxNoteLength: 2000
}

export function useConfig() {
    const [config, setConfig] = useState(fallback)
    const [error, setError] = useState('')

    useEffect(() => {
        fetch('/config')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Config request failed')
                }
                return response.json()
            })
            .then((data) => {
                setConfig(data)
            })
            .catch(() => {
                setError('Kunde inte hämta inställningarna från servern.')
            })
    }, [])

    return { config, error }
}
