/**
 * v0 by Vercel.
 * @see https://v0.dev/t/XMqmZ3abHQw
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Component() {
  const [isRecording, setIsRecording] = useState(false)
  const [audioStream, setAudioStream] = useState(null) as any
  const [audioContext, setAudioContext] = useState(null) as any
  const [audioAnalyser, setAudioAnalyser] = useState(null) as any
  const [recordingInterval, setRecordingInterval] = useState(null) as any
  const [audioData, setAudioData] = useState([]) as any
  useEffect(() => {
    async function initAudioRecording() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        setAudioStream(stream)
        const context = new AudioContext()
        const analyser = context.createAnalyser()
        analyser.fftSize = 256
        const source = context.createMediaStreamSource(stream)
        source.connect(analyser)
        setAudioContext(context)
        setAudioAnalyser(analyser)
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
    const bufferLength = audioAnalyser.fftSize
    const dataArray = new Uint8Array(bufferLength)
    const currentRecordingInterval = setInterval(() => {
      audioAnalyser.getByteTimeDomainData(dataArray)
      setAudioData((prevData: any) => [...prevData, dataArray.slice()])
    }, 50)
    setRecordingInterval(currentRecordingInterval)
  }
  const stopRecording = () => {
    clearInterval(recordingInterval)
    setIsRecording(false)
  }
  const sendRecording = async () => {
    try {
      const blob = new Blob(
        audioData.map((data: any) => new Uint8Array(data)),
        {
          type: "audio/wav",
        },
      )
      const formData = new FormData()
      formData.append("audio", blob, "recording.wav")
      await fetch("YOUR_API_URL", {
        method: "POST",
        body: formData,
      })
      console.log("Recording sent successfully")
    } catch (error) {
      console.error("Error sending recording:", error)
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 dark:bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden relative dark:bg-gray-800">
            <canvas
              className={`w-full h-full ${isRecording ? "animate-waveform" : ""}`}
              ref={(canvas) => {
                if (canvas) {
                  const ctx = canvas.getContext("2d") as any
                  const bufferLength = audioAnalyser?.frequencyBinCount || 0
                  const dataArray = new Uint8Array(bufferLength)
                  const drawWaveform = () => {
                    requestAnimationFrame(drawWaveform)
                    audioAnalyser?.getByteTimeDomainData(dataArray)
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
                  if (isRecording) {
                    drawWaveform()
                  }
                }
              }}
            />
          </div>
          <div className="flex space-x-4">
            <Button onClick={isRecording ? stopRecording : startRecording} className="px-4 py-2 rounded-md">
              {isRecording ? "Stop Recording" : "Start Recording"}
            </Button>
            <Button onClick={sendRecording} className="px-4 py-2 rounded-md" disabled={!isRecording}>
              Send Recording
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}