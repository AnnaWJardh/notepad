import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const port = Number(process.env.PORT) || 3000

function readConfig() {
    const maxNoteLength = Number(process.env.MAX_NOTE_LENGTH)
    if (!Number.isInteger(maxNoteLength) || maxNoteLength <= 0) {
        console.error('ERROR: MAX_NOTE_LENGTH must be a positive integer')
        return {
            appName: process.env.APP_NAME || 'Notepad',
            appEnv: process.env.APP_ENV || 'development',
            maxNoteLength: 2000
        }
    }
    return {
        appName: process.env.APP_NAME || 'Notepad',
        appEnv: process.env.APP_ENV || 'development',
        maxNoteLength
    }
}

const app = express()

app.get('/health', (req, res) => {
    console.info('INFO: Health check ok')
    res.status(200).json({ status: 'ok' })
})

app.get('/config', (req, res) => {
    console.info('INFO: Config requested')
    res.status(200).json(readConfig())
})

app.use('/api', (req, res) => {
    console.error(`ERROR: Unknown API route ${req.method} ${req.originalUrl}`)
    res.status(404).json({ error: 'Not found' })
})

if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(__dirname, 'dist')
    app.use(express.static(distPath))
    app.use((req, res) => {
        res.sendFile(path.join(distPath, 'index.html'))
    })
}

app.listen(port, '0.0.0.0', () => {
    console.info(`INFO: Server started on port ${port}`)
})
