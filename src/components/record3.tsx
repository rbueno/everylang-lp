/**
 * v0 by Vercel.
 * @see https://v0.dev/t/0DLUj2rKKNy
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState, useEffect } from "react"

export default function Component() {
  const [isRecording, setIsRecording] = useState(false)
  const [audioStream, setAudioStream] = useState(null) as any
  const [audioContext, setAudioContext] = useState(null) as any
  const [audioAnalyser, setAudioAnalyser] = useState(null) as any
  const [audioData, setAudioData] = useState([]) as any
  useEffect(() => {
    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        setAudioStream(stream)
        const context = new AudioContext()
        setAudioContext(context)
        const analyser = context.createAnalyser()
        analyser.fftSize = 2048
        setAudioAnalyser(analyser)
        const source = context.createMediaStreamSource(stream)
        source.connect(analyser)
      } catch (error) {
        console.error("Error accessing microphone:", error)
      }
    }
    if (isRecording) {
      startRecording()
    } else {
      if (audioStream) {
        audioStream.getTracks().forEach((track: any) => track.stop())
        setAudioStream(null)
      }
      if (audioContext) {
        audioContext.close()
        setAudioContext(null)
      }
      setAudioAnalyser(null)
      setAudioData([])
    }
  }, [isRecording])
  useEffect(() => {
    let animationFrameId: any
    const visualizeAudio = () => {
      if (audioAnalyser) {
        const bufferLength = audioAnalyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)
        audioAnalyser.getByteTimeDomainData(dataArray)
        setAudioData(dataArray)
      }
      animationFrameId = requestAnimationFrame(visualizeAudio)
    }
    if (isRecording) {
      visualizeAudio()
    } else {
      cancelAnimationFrame(animationFrameId)
    }
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isRecording, audioAnalyser])
  const handleStartRecording = () => {
    setIsRecording(true)
  }
  const handleStopRecording = async () => {
    setIsRecording(false)
    if (audioStream) {
      const audioBlob = await new Promise((resolve) => {
        const chunks = []  as any
        audioStream.getTracks().forEach((track: any) => track.stop())
        audioStream.getAudioTracks().forEach((track: any) => {
          track.addEventListener("ended", () => {
            const blob = new Blob(chunks, { type: "audio/webm" })
            resolve(blob)
          })
          track.addEventListener("data", (event: any) => {
            chunks.push(event.data)
          })
        })
      })
      try {
        // await fetch("YOUR_API_URL", {
        //   method: "POST",
        //   body: audioBlob,
        // })
        console.log("Audio sent to API successfully")
      } catch (error) {
        console.error("Error sending audio to API:", error)
      }
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="relative w-full max-w-md">
        <canvas className="w-full h-32 rounded-lg bg-gray-100 dark:bg-gray-800" width="400" height="128" />
        <div className="absolute inset-0 flex items-center justify-center">
          {isRecording ? (
            <button
              onClick={handleStopRecording}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Stop
            </button>
          ) : (
            <button
              onClick={handleStartRecording}
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-300"
            >
              Record
            </button>
          )}
        </div>
      </div>
    </div>
  )
}