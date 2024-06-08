/**
 * v0 by Vercel.
 * @see https://v0.dev/t/tLq0ELlaH6a
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState, useEffect } from "react"

export default function Component() {
  const [isRecording, setIsRecording] = useState(false)
  const [audioStream, setAudioStream] = useState(null) as any
  const [audioContext, setAudioContext] = useState(null) as any
  const [audioAnalyser, setAudioAnalyser] = useState(null) as any
  const [audioData, setAudioData] = useState(null)
  useEffect(() => {
    const initAudioRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true }) as any
        setAudioStream(stream)
        const context = new AudioContext() as any
        setAudioContext(context)
        const analyser = context.createAnalyser()
        analyser.fftSize = 256
        setAudioAnalyser(analyser)
        const source = context.createMediaStreamSource(stream)
        source.connect(analyser)
      } catch (error) {
        console.error("Error initializing audio recording:", error)
      }
    }
    initAudioRecording()
    return () => {
      if (audioStream) {
        audioStream.getTracks().forEach((track: any) => track.stop())
      }
      if (audioContext) {
        audioContext.close()
      }
    }
  }, [])
  const startRecording = () => {
    setIsRecording(true)
  }
  const stopRecording = async () => {
    setIsRecording(false)
    const audioBuffer = await new Promise((resolve) => {
      const bufferArray = new Float32Array(audioAnalyser.fftSize)
      const intervalId = setInterval(() => {
        audioAnalyser.getFloatTimeDomainData(bufferArray)
        if (isRecording === false) {
          clearInterval(intervalId)
          resolve(bufferArray)
        }
      }, 100)
    }) as any
    const audioBlob = new Blob([audioBuffer], { type: "audio/wav" }) as any
    setAudioData(audioBlob)
    const formData = new FormData()
    formData.append("audio", audioBlob, "recording.wav")
    try {
      await fetch("YOUR_API_URL", {
        method: "POST",
        body: formData,
      })
      console.log("Audio sent to the API successfully")
    } catch (error) {
      console.error("Error sending audio to the API:", error)
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg dark:bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden relative dark:bg-gray-800">
            {isRecording && (
              <canvas
                className="w-full h-full"
                ref={(canvas) => {
                  if (canvas) {
                    const ctx = canvas.getContext("2d") as any
                    const bufferLength = audioAnalyser.frequencyBinCount
                    const dataArray = new Uint8Array(bufferLength)
                    const draw = () => {
                      requestAnimationFrame(draw)
                      audioAnalyser.getByteTimeDomainData(dataArray)
                      ctx.clearRect(0, 0, canvas.width, canvas.height)
                      ctx.beginPath()
                      const sliceWidth = (canvas.width * 1) / bufferLength
                      let x = 0
                      for (let i = 0; i < bufferLength; i++) {
                        const v = dataArray[i] / 128
                        const y = (v * canvas.height) / 2
                        if (i === 0) {
                          ctx.moveTo(x, y)
                        } else {
                          ctx.lineTo(x, y)
                        }
                        x += sliceWidth
                      }
                      ctx.lineTo(canvas.width, canvas.height / 2)
                      ctx.stroke()
                    }
                    draw()
                  }
                }}
              />
            )}
          </div>
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-md transition-colors ${
                isRecording
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200"
              }`}
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}