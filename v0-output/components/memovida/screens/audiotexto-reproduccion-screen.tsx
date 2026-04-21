"use client"

import { useState, useEffect } from 'react'
import { useMemoVida } from '@/lib/memovida-context'
import { TabletFrame } from '../tablet-frame'
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { Slider } from '@/components/ui/slider'

export function AudiotextoReproduccionScreen() {
  const { currentAudioTitle, currentAudioCategory, settings } = useMemoVida()
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isConnecting, setIsConnecting] = useState(true)

  // Simular conexión inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConnecting(false)
      setIsPlaying(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Simular progreso de reproducción
  useEffect(() => {
    if (isPlaying && !isConnecting) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false)
            return 100
          }
          return prev + 0.5
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, isConnecting])

  const getCategoryLabel = () => {
    const labels: Record<string, string> = {
      oraciones: 'Oraciones',
      cuentos: 'Cuentos',
      noticias: 'Noticias',
      musica: 'Música',
      poemas: 'Poemas'
    }
    return currentAudioCategory ? labels[currentAudioCategory] : ''
  }

  const getCategoryColor = () => {
    const colors: Record<string, string> = {
      oraciones: 'bg-amber-600',
      cuentos: 'bg-blue-600',
      noticias: 'bg-emerald-600',
      musica: 'bg-rose-600',
      poemas: 'bg-purple-600'
    }
    return currentAudioCategory ? colors[currentAudioCategory] : 'bg-emerald-600'
  }

  return (
    <TabletFrame 
      title={getCategoryLabel()} 
      showBackButton 
      showHomeButton
      headerColor={getCategoryColor()}
    >
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-8">
        {isConnecting ? (
          // Estado de conexión/marcando
          <div className="text-center">
            <div className="relative mb-8">
              <div className="w-40 h-40 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-primary/40 flex items-center justify-center animate-pulse">
                  <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center">
                    <Volume2 className="h-12 w-12 text-primary-foreground" />
                  </div>
                </div>
              </div>
              {/* Ondas de conexión */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border-4 border-primary/30 animate-ping" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Conectando...</h2>
            <p className="text-xl text-muted-foreground">Preparando tu contenido</p>
          </div>
        ) : (
          // Reproductor
          <div className="w-full max-w-lg">
            {/* Carátula / Visualización */}
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl p-8 mb-8 flex items-center justify-center">
              <div className={`w-48 h-48 rounded-full ${getCategoryColor()} flex items-center justify-center shadow-lg`}>
                <Volume2 className="h-20 w-20 text-white" />
              </div>
            </div>

            {/* Título */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2 text-balance">
                {currentAudioTitle}
              </h2>
              <p className="text-xl text-muted-foreground">{getCategoryLabel()}</p>
            </div>

            {/* Barra de progreso */}
            <div className="mb-8">
              <Slider
                value={[progress]}
                max={100}
                step={1}
                className="w-full"
                onValueChange={(value) => setProgress(value[0])}
              />
              <div className="flex justify-between mt-2 text-muted-foreground">
                <span>{Math.floor(progress / 100 * 5)}:{String(Math.floor((progress / 100 * 300) % 60)).padStart(2, '0')}</span>
                <span>5:00</span>
              </div>
            </div>

            {/* Controles */}
            <div className="flex items-center justify-center gap-6">
              <button 
                className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-secondary/80 transition-colors"
                onClick={() => setProgress(Math.max(0, progress - 10))}
              >
                <SkipBack className="h-8 w-8" />
              </button>
              
              <button 
                className={`h-20 w-20 rounded-full ${getCategoryColor()} flex items-center justify-center text-white shadow-lg hover:opacity-90 transition-opacity`}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="h-10 w-10" />
                ) : (
                  <Play className="h-10 w-10 ml-1" />
                )}
              </button>
              
              <button 
                className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-secondary/80 transition-colors"
                onClick={() => setProgress(Math.min(100, progress + 10))}
              >
                <SkipForward className="h-8 w-8" />
              </button>
            </div>

            {/* Control de volumen */}
            <div className="flex items-center gap-4 mt-8 px-4">
              <Volume2 className="h-6 w-6 text-muted-foreground" />
              <Slider
                value={[settings.volume]}
                max={100}
                step={1}
                className="flex-1"
              />
            </div>
          </div>
        )}
      </div>
    </TabletFrame>
  )
}
