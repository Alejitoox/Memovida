"use client"

import { useMemoVida } from '@/lib/memovida-context'
import { TabletFrame } from '../tablet-frame'
import { Puzzle, Grid3X3, Music, ListOrdered, Trophy } from 'lucide-react'

interface ExerciseOption {
  id: string
  label: string
  description: string
  icon: React.ReactNode
  color: string
  action: () => void
  difficulty?: string
}

export function EjercitarMenteScreen() {
  const { navigateTo } = useMemoVida()

  const exercises: ExerciseOption[] = [
    {
      id: 'parejas',
      label: 'Juego de Parejas',
      description: 'Encuentra las cartas iguales',
      icon: <Grid3X3 className="h-10 w-10" />,
      color: 'bg-purple-100 border-purple-300 text-purple-700',
      action: () => navigateTo('juego-parejas'),
      difficulty: 'Fácil'
    },
    {
      id: 'secuencias',
      label: 'Secuencias',
      description: 'Repite los patrones de colores',
      icon: <ListOrdered className="h-10 w-10" />,
      color: 'bg-blue-100 border-blue-300 text-blue-700',
      action: () => {},
      difficulty: 'Medio'
    },
    {
      id: 'musica',
      label: 'Adivina la Canción',
      description: 'Identifica las melodías',
      icon: <Music className="h-10 w-10" />,
      color: 'bg-rose-100 border-rose-300 text-rose-700',
      action: () => {},
      difficulty: 'Fácil'
    },
    {
      id: 'asociaciones',
      label: 'Asociaciones',
      description: 'Conecta palabras relacionadas',
      icon: <Puzzle className="h-10 w-10" />,
      color: 'bg-emerald-100 border-emerald-300 text-emerald-700',
      action: () => {},
      difficulty: 'Medio'
    },
    {
      id: 'quiz',
      label: 'Recordar Mi Día',
      description: 'Ejercita tu memoria diaria',
      icon: <Trophy className="h-10 w-10" />,
      color: 'bg-amber-100 border-amber-300 text-amber-700',
      action: () => navigateTo('quiz'),
      difficulty: 'Fácil'
    },
  ]

  // Estadísticas simuladas
  const stats = {
    streak: 5,
    totalGames: 23,
    bestScore: 12
  }

  return (
    <TabletFrame 
      title="Ejercitar Mente" 
      showBackButton 
      showHomeButton
      headerColor="bg-rose-500"
    >
      <div className="p-6">
        {/* Estadísticas */}
        <div className="bg-card rounded-2xl p-5 border border-border mb-6">
          <h3 className="text-lg font-medium text-muted-foreground mb-3">Tu progreso</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{stats.streak}</p>
              <p className="text-sm text-muted-foreground">Días seguidos</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{stats.totalGames}</p>
              <p className="text-sm text-muted-foreground">Juegos totales</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{stats.bestScore}</p>
              <p className="text-sm text-muted-foreground">Mejor puntaje</p>
            </div>
          </div>
        </div>

        {/* Lista de ejercicios */}
        <h2 className="text-xl font-bold text-foreground mb-4">
          Elige un ejercicio
        </h2>
        
        <div className="space-y-3">
          {exercises.map((exercise) => (
            <button
              key={exercise.id}
              onClick={exercise.action}
              className={`w-full ${exercise.color} border-2 rounded-2xl p-5 flex items-center gap-5 transition-all duration-200 active:scale-98`}
            >
              <div className="flex-shrink-0">
                {exercise.icon}
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl font-bold">{exercise.label}</span>
                  {exercise.difficulty && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/50">
                      {exercise.difficulty}
                    </span>
                  )}
                </div>
                <span className="text-base opacity-80">{exercise.description}</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>

        {/* Recomendación */}
        <div className="mt-6 bg-primary/10 rounded-2xl p-5 border border-primary/20">
          <p className="text-lg text-foreground">
            <span className="font-bold">Recomendación:</span> Intenta ejercitar tu mente 15-20 minutos al día para mantener tu memoria activa.
          </p>
        </div>
      </div>
    </TabletFrame>
  )
}
