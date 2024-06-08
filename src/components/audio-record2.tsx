/**
 * v0 by Vercel.
 * @see https://v0.dev/t/eFZ4DiJTq83
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Component() {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)
  const [audioUrl, setAudioUrl] = useState(null)
  const [intervalId, setIntervalId] = useState(null)
  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream)
        let chunks = [] as any
        mediaRecorder.addEventListener("dataavailable", (event) => {
          chunks.push(event.data)
        })
        mediaRecorder.addEventListener("stop", () => {
          const blob = new Blob(chunks, { type: "audio/mp3" }) as any
          setAudioBlob(blob)
          setAudioUrl(URL.createObjectURL(blob) as any)
          chunks = []
        })
        mediaRecorder.start()
        setIsRecording(true)
        const id = setInterval(() => {
          mediaRecorder.stop()
          mediaRecorder.start()
        }, 5000) as any
        setIntervalId(id)
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error)
      })
  }
  const stopRecording = () => {
    intervalId && clearInterval(intervalId)
    setIsRecording(false)
  }
  const sendAudio = async () => {
    if (audioBlob) {
      const formData = new FormData()
      formData.append("audio", audioBlob, "recorded-audio.mp3")
      try {
        await fetch("YOUR_API_URL", {
          method: "POST",
          body: formData,
        })
        console.log("Audio sent successfully")
      } catch (error) {
        console.error("Error sending audio:", error)
      }
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-4">
          {isRecording ? (
            <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 animate-pulse" />
            </div>
          ) : (
            <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full" />
          )}
        </div>
        <div className="flex justify-center space-x-4">
          {isRecording ? (
            <Button onClick={stopRecording}>Stop</Button>
          ) : (
            <Button onClick={startRecording}>Record</Button>
          )}
          {audioUrl && (
            <Button
              onClick={() => {
                const audio = new Audio(audioUrl)
                audio.play()
              }}
            >
              Play
            </Button>
          )}
          {audioUrl && <Button onClick={sendAudio}>Send</Button>}
        </div>
      </div>
    </div>
  )
}