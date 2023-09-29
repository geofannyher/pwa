import { useEffect, useState } from 'react'

const Testing = () => {
    const [isListening, setIsListening] = useState(false);
    const [recognizedText, setRecognizedText] = useState('');
    let recognition: any;

    useEffect(() => {
        recognition = new (window as any).webkitSpeechRecognition();

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.onresult = (event: any) => {
            const result = event.results[0][0].transcript;
            setRecognizedText(result);
        };

        recognition.onerror = (event: any) => {
            console.error('Error in speech recognition: ', event.error);
        };

        return () => {
            if (recognition) {
                recognition.stop();
            }
        };
    }, []);

    const startListening = () => {
        if (!isListening) {
            recognition.start();
        }
    };

    const stopListening = () => {
        if (isListening) {
            recognition.stop();
        }
    };
    return (
        <div>
            <div>
                <button onClick={startListening} onMouseDown={startListening} onMouseUp={stopListening}>
                    {isListening ? 'Listening...' : 'Start Listening'}
                </button>
                <p>Recognized Text: {recognizedText}</p>
            </div>
        </div>
    )
}

export default Testing