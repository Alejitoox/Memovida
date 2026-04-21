"use client"

import { type ReactNode } from 'react'
import { useMemoVida } from '@/lib/memovida-context'
import { Mic, Settings, ChevronLeft, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TabletFrameProps {
  children: ReactNode
  title?: string
  showBackButton?: boolean
  showHomeButton?: boolean
  showSettingsButton?: boolean
  headerColor?: string
}

export function TabletFrame({ 
  children, 
  title,
  showBackButton = false,
  showHomeButton = false,
  showSettingsButton = true,
  headerColor = 'bg-primary'
}: TabletFrameProps) {
  const { goBack, navigateTo, setIsVoiceAssistantOpen } = useMemoVida()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className={`${headerColor} text-primary-foreground px-6 py-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={goBack}
              className="text-primary-foreground hover:bg-white/20 h-12 w-12"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
          )}
          {showHomeButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateTo('home')}
              className="text-primary-foreground hover:bg-white/20 h-12 w-12"
            >
              <Home className="h-7 w-7" />
            </Button>
          )}
          {title && (
            <h1 className="text-2xl font-bold">{title}</h1>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {showSettingsButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateTo('configuracion')}
              className="text-primary-foreground hover:bg-white/20 h-12 w-12"
            >
              <Settings className="h-7 w-7" />
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>

      {/* Voice Assistant Button - Fixed */}
      <Button
        onClick={() => setIsVoiceAssistantOpen(true)}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg z-50"
        size="icon"
      >
        <Mic className="h-8 w-8" />
      </Button>
    </div>
  )
}
