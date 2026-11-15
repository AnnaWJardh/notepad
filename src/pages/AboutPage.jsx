import { useConfig } from '../useConfig.js'

export default function AboutPage() {
    const { config, error } = useConfig()

    return (
        <section>
            <h1>Om</h1>
            <p>
                Notepad är en liten anteckningsapp. Anteckningarna sparas i den
                här webbläsaren.
            </p>
            {error ? (
                <p>{error}</p>
            ) : (
                <p>
                    Appen heter {config.appName}. Miljön är {config.appEnv}. En
                    anteckning får vara högst {config.maxNoteLength} tecken.
                </p>
            )}
        </section>
    )
}
