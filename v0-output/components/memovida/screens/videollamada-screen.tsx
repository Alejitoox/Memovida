"use client"

import { useState, useEffect } from 'react'
import { useMemoVida } from '@/lib/memovida-context'
import { Phone, PhoneOff, Video, VideoOff, Mic, MicOff } from 'lucide-react'

type CallStatus = 'calling' | 'connected' | 'ended'

export function VideollamadaScreen() {
  const { selectedContact, goBack } = useMemoVida()
  const [callStatus, setCallStatus] = useState<CallStatus>('calling')
  const [callDuration, setCallDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)

  // Simular conexión de llamada
  useEffect(() => {
    if (callStatus === 'calling') {
      const timer = setTimeout(() => {
        setCallStatus('connected')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [callStatus])

  // Contador de duración de llamada
  useEffect(() => {
    if (callStatus === 'connected') {
      const interval = setInterval(() => {
        setCallDuration(prev => prev + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [callStatus])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${String(secs).padStart(2, '0')}`
  }

  const handleEndCall = () => {
    setCallStatus('ended')
    setTimeout(() => {
      goBack()
    }, 1500)
  }

  const avatarColors = ['bg-blue-500', 'bg-rose-500', 'bg-emerald-500', 'bg-purple-500', 'bg-amber-500', 'bg-teal-500']
  const contactColor = avatarColors[parseInt(selectedContact?.id || '1') % avatarColors.length]

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Video area */}
      <div className="flex-1 relative flex items-center justify-center">
        {callStatus === 'calling' && (
          <div className="text-center">
            {/* Avatar animado */}
            <div className="relative mb-8">
              <div className={`w-40 h-40 rounded-full ${contactColor} flex items-center justify-center text-white text-5xl font-bold mx-auto`}>
                {selectedContact?.avatar || '?'}
              </div>
              {/* Ondas de llamada */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border-4 border-white/30 animate-ping" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-56 h-56 rounded-full border-4 border-white/20 animate-ping" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-2">
              {selectedContact?.name}
            </h2>
            <p className="text-xl text-gray-400 mb-4">
              {selectedContact?.relation}
            </p>
            <p className="text-2xl text-emerald-400 animate-pulse">
              Llamando...
            </p>
          </div>
        )}

        {callStatus === 'connected' && (
          <>
            {/* Simulación de video del contacto */}
            <div className="w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-center">
                <div className={`w-32 h-32 rounded-full ${contactColor} flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4`}>
                  {selectedContact?.avatar || '?'}
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {selectedContact?.name}
                </h2>
                <p className="text-lg text-gray-400">
                  {formatDuration(callDuration)}
                </p>
              </div>
            </div>

            {/* Mini preview de tu cámara */}
            {isVideoOn && (
              <div className="absolute top-4 right-4 w-32 h-44 bg-gray-700 rounded-2xl border-2 border-white/20 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Tu cámara</span>
              </div>
            )}
          </>
        )}

        {callStatus === 'ended' && (
          <div className="text-center">
            <div className={`w-32 h-32 rounded-full ${contactColor} flex items-center justify-center text-white text-4xl font-bold mx-auto mb-6 opacity-50`}>
              {selectedContact?.avatar || '?'}
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Llamada finalizada
            </h2>
            <p className="text-xl text-gray-400">
              Duración: {formatDuration(callDuration)}
            </p>
          </div>
        )}
      </div>

      {/* Controles */}
      {callStatus !== 'ended' && (
        <div className="bg-gray-800/90 px-6 py-8">
          <div className="flex items-center justify-center gap-6">
            {callStatus === 'connected' && (
              <>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`h-16 w-16 rounded-full flex items-center justify-center transition-colors ${
                    isMuted ? 'bg-rose-500' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                >
                  {isMuted ? (
                    <MicOff className="h-7 w-7 text-white" />
                  ) : (
                    <Mic className="h-7 w-7 text-white" />
                  )}
                </button>

                <button
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`h-16 w-16 rounded-full flex items-center justify-center transition-colors ${
                    !isVideoOn ? 'bg-rose-500' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                >
                  {isVideoOn ? (
                    <Video className="h-7 w-7 text-white" />
                  ) : (
                    <VideoOff className="h-7 w-7 text-white" />
                  )}
                </button>
              </>
            )}

            <button
              onClick={handleEndCall}
              className="h-20 w-20 rounded-full bg-rose-500 hover:bg-rose-600 flex items-center justify-center transition-colors"
            >
              <PhoneOff className="h-9 w-9 text-white" />
            </button>
          </div>

          {callStatus === 'calling' && (
            <p className="text-center text-gray-400 mt-4 text-lg">
              Toca el botón rojo para cancelar
            </p>
          )}
        </div>
      )}
    </div>
  )
}
