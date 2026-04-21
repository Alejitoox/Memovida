"use client"

import { useState, useRef, useEffect } from 'react'
import { useMemoVida } from '@/lib/memovida-context'
import { TabletFrame } from '../tablet-frame'
import { Send, Mic } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'rosita'
  timestamp: Date
}

const rositaResponses = [
  "¡Qué bonito lo que me cuentas! Cuéntame más sobre eso.",
  "Me alegra mucho escucharte. ¿Cómo te sientes hoy?",
  "Eso me recuerda a mis tiempos de juventud. ¡Qué bellos recuerdos!",
  "Tienes toda la razón. A veces las cosas simples son las más importantes.",
  "¡Qué interesante! Nunca había pensado en eso de esa manera.",
  "Me encanta platicar contigo. Siempre me alegras el día.",
  "Cuéntame más, tengo todo el tiempo del mundo para escucharte.",
  "Eso es muy sabio de tu parte. La experiencia nos enseña mucho.",
]

const quickReplies = [
  "¿Cómo estás hoy?",
  "Cuéntame un recuerdo",
  "¿Qué me recomiendas?",
  "Háblame de tu familia",
]

export function ChatScreen() {
  const { userName } = useMemoVida()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `¡Hola ${userName}! Soy Doña Rosita, tu amiga de siempre. ¿Cómo amaneciste hoy? Estoy aquí para platicar contigo.`,
      sender: 'rosita',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    // Agregar mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInputText('')

    // Simular respuesta de Rosita
    setIsTyping(true)
    setTimeout(() => {
      const rositaMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: rositaResponses[Math.floor(Math.random() * rositaResponses.length)],
        sender: 'rosita',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, rositaMessage])
      setIsTyping(false)
    }, 1500 + Math.random() * 1000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputText)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <TabletFrame 
      title="Doña Rosita" 
      showBackButton 
      showHomeButton
      headerColor="bg-blue-600"
    >
      <div className="flex flex-col h-[calc(100vh-80px)]">
        {/* Área de mensajes */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`h-12 w-12 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold ${
                  message.sender === 'rosita' ? 'bg-rose-400' : 'bg-blue-500'
                }`}>
                  {message.sender === 'rosita' ? 'R' : userName[0]}
                </div>
                
                {/* Burbuja de mensaje */}
                <div className={`rounded-2xl px-5 py-3 ${
                  message.sender === 'user' 
                    ? 'bg-blue-500 text-white rounded-br-sm' 
                    : 'bg-card border border-border text-card-foreground rounded-bl-sm'
                }`}>
                  <p className="text-lg">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-muted-foreground'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Indicador de escritura */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[85%]">
                <div className="h-12 w-12 rounded-full bg-rose-400 flex items-center justify-center text-white font-bold">
                  R
                </div>
                <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-5 py-4">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Respuestas rápidas */}
        <div className="px-4 py-2 border-t border-border bg-secondary/50">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => sendMessage(reply)}
                className="flex-shrink-0 bg-card border border-border rounded-full px-4 py-2 text-base text-card-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>

        {/* Input de mensaje */}
        <form onSubmit={handleSubmit} className="p-4 bg-card border-t border-border">
          <div className="flex gap-3">
            <button
              type="button"
              className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-secondary/80 transition-colors flex-shrink-0"
            >
              <Mic className="h-6 w-6" />
            </button>
            
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-1 h-14 px-5 rounded-full bg-secondary text-lg text-secondary-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="h-14 w-14 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:hover:bg-blue-500 flex-shrink-0"
            >
              <Send className="h-6 w-6" />
            </button>
          </div>
        </form>
      </div>
    </TabletFrame>
  )
}
