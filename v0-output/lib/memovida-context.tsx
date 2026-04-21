"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type Screen = 
  | 'home'
  | 'audiotexto'
  | 'audiotexto-reproduccion'
  | 'mi-dia'
  | 'quiz'
  | 'mis-personas'
  | 'videollamada'
  | 'chat'
  | 'ejercitar-mente'
  | 'juego-parejas'
  | 'galeria'
  | 'configuracion'
  | 'eventos'

export type AudioCategory = 'oraciones' | 'cuentos' | 'noticias' | 'musica' | 'poemas'

export interface Contact {
  id: string
  name: string
  relation: string
  avatar: string
  phone?: string
}

export interface Activity {
  id: string
  time: string
  title: string
  description: string
  icon: string
  completed: boolean
}

export interface Settings {
  volume: number
  brightness: number
  speechRate: number
  textSize: 'normal' | 'grande' | 'muy-grande'
}

interface MemoVidaContextType {
  currentScreen: Screen
  navigateTo: (screen: Screen) => void
  goBack: () => void
  screenHistory: Screen[]
  
  // Audio
  currentAudioCategory: AudioCategory | null
  setCurrentAudioCategory: (category: AudioCategory | null) => void
  currentAudioTitle: string
  setCurrentAudioTitle: (title: string) => void
  
  // Contact for videollamada
  selectedContact: Contact | null
  setSelectedContact: (contact: Contact | null) => void
  
  // Configuración
  settings: Settings
  updateSettings: (settings: Partial<Settings>) => void
  
  // Asistente de voz
  isVoiceAssistantOpen: boolean
  setIsVoiceAssistantOpen: (open: boolean) => void
  
  // Usuario
  userName: string
}

const MemoVidaContext = createContext<MemoVidaContextType | undefined>(undefined)

export function MemoVidaProvider({ children }: { children: ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home')
  const [screenHistory, setScreenHistory] = useState<Screen[]>(['home'])
  const [currentAudioCategory, setCurrentAudioCategory] = useState<AudioCategory | null>(null)
  const [currentAudioTitle, setCurrentAudioTitle] = useState('')
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState(false)
  const [settings, setSettings] = useState<Settings>({
    volume: 80,
    brightness: 70,
    speechRate: 50,
    textSize: 'grande'
  })
  
  const userName = "María"

  const navigateTo = useCallback((screen: Screen) => {
    setScreenHistory(prev => [...prev, screen])
    setCurrentScreen(screen)
  }, [])

  const goBack = useCallback(() => {
    setScreenHistory(prev => {
      if (prev.length <= 1) return prev
      const newHistory = prev.slice(0, -1)
      setCurrentScreen(newHistory[newHistory.length - 1])
      return newHistory
    })
  }, [])

  const updateSettings = useCallback((newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }, [])

  return (
    <MemoVidaContext.Provider
      value={{
        currentScreen,
        navigateTo,
        goBack,
        screenHistory,
        currentAudioCategory,
        setCurrentAudioCategory,
        currentAudioTitle,
        setCurrentAudioTitle,
        selectedContact,
        setSelectedContact,
        settings,
        updateSettings,
        isVoiceAssistantOpen,
        setIsVoiceAssistantOpen,
        userName,
      }}
    >
      {children}
    </MemoVidaContext.Provider>
  )
}

export function useMemoVida() {
  const context = useContext(MemoVidaContext)
  if (context === undefined) {
    throw new Error('useMemoVida must be used within a MemoVidaProvider')
  }
  return context
}
