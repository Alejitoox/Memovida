"use client"

import { useState, useEffect } from 'react'
import { useMemoVida } from '@/lib/memovida-context'
import { X, Mic } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function VoiceAssistantOverlay() {
  const { isVoiceAssistantOpen, setIsVoiceAssistantOpen, navigateTo } = useMemoVida()
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')

  useEffect(() => {
    if (isVoiceAssistantOpen) {
      setIsListening(true)
      setTranscript('')
    }
  }, [isVoiceAssistantOpen])

  // Simular escucha de voz
  useEffect(() => {
    if (isListening) {
      const timer = setTimeout(() => {
        setTranscript('Escuchando...')
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isListening])

  const handleCommand = (command: string) => {
    const lowerCommand = command.toLowerCase()
    
    if (lowerCommand.includes('escuchar') || lowerCommand.includes('música') || lowerCommand.includes('oración')) {
      navigateTo('audiotexto')
    } else if (lowerCommand.includes('conversar') || lowerCommand.includes('rosita') || lowerCommand.includes('chat')) {
      navigateTo('chat')
    } else if (lowerCommand.includes('día') || lowerCommand.includes('actividades')) {
      navigateTo('mi-dia')
    } else if (lowerCommand.includes('ejercicio') || lowerCommand.includes('mente') || lowerCommand.includes('juego')) {
      navigateTo('ejercitar-mente')
    } else if (lowerCommand.includes('persona') || lowerCommand.includes('familia') || lowerCommand.includes('llamar')) {
      navigateTo('mis-personas')
    } else if (lowerCommand.includes('ajuste') || lowerCommand.includes('configuración')) {
      navigateTo('configuracion')
    } else if (lowerCommand.includes('inicio') || lowerCommand.includes('home')) {
      navigateTo('home')
    }
    
    setIsVoiceAssistantOpen(false)
  }

  if (!isVoiceAssistantOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6">
      <div className="bg-card rounded-3xl p-8 max-w-md w-full text-center relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsVoiceAssistantOpen(false)}
          className="absolute top-4 right-4 h-12 w-12"
        >
          <X className="h-6 w-6" />
        </Button>

        <h2 className="text-2xl font-bold text-card-foreground mb-6">
          Asistente de Voz
        </h2>

        {/* Círculo animado de escucha */}
        <div className="relative mx-auto mb-6">
          <div className={`w-32 h-32 rounded-full bg-primary flex items-center justify-center ${isListening ? 'animate-pulse' : ''}`}>
            <Mic className="h-16 w-16 text-primary-foreground" />
          </div>
          {isListening && (
            <>
              <div className="absolute inset-0 rounded-full border-4 border-primary animate-ping opacity-20" />
              <div className="absolute inset-0 rounded-full border-4 border-primary animate-ping opacity-10" style={{ animationDelay: '0.5s' }} />
            </>
          )}
        </div>

        <p className="text-xl text-muted-foreground mb-6">
          {transcript || 'Toca el micrófono para hablar'}
        </p>

        {/* Comandos de ejemplo */}
        <div className="space-y-3">
          <p className="text-lg font-medium text-card-foreground">Puedes decir:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['Escuchar música', 'Mi día', 'Llamar familia', 'Jugar'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-base hover:bg-secondary/80 transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
