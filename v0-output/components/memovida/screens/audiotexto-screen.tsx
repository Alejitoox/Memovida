"use client"

import { useMemoVida, type AudioCategory } from '@/lib/memovida-context'
import { TabletFrame } from '../tablet-frame'
import { BookOpen, Newspaper, Music, Heart, BookMarked } from 'lucide-react'

interface AudioOption {
  id: AudioCategory
  label: string
  icon: React.ReactNode
  color: string
  description: string
}

const audioOptions: AudioOption[] = [
  {
    id: 'oraciones',
    label: 'Oraciones',
    icon: <Heart className="h-10 w-10" />,
    color: 'bg-amber-100 border-amber-300 text-amber-700',
    description: 'Reflexiones espirituales'
  },
  {
    id: 'cuentos',
    label: 'Cuentos',
    icon: <BookOpen className="h-10 w-10" />,
    color: 'bg-blue-100 border-blue-300 text-blue-700',
    description: 'Historias para escuchar'
  },
  {
    id: 'noticias',
    label: 'Noticias',
    icon: <Newspaper className="h-10 w-10" />,
    color: 'bg-emerald-100 border-emerald-300 text-emerald-700',
    description: 'Lo más importante del día'
  },
  {
    id: 'musica',
    label: 'Música',
    icon: <Music className="h-10 w-10" />,
    color: 'bg-rose-100 border-rose-300 text-rose-700',
    description: 'Canciones de tu época'
  },
  {
    id: 'poemas',
    label: 'Poemas',
    icon: <BookMarked className="h-10 w-10" />,
    color: 'bg-purple-100 border-purple-300 text-purple-700',
    description: 'Versos y poesía'
  },
]

// Contenido de ejemplo para cada categoría
const audioContent: Record<AudioCategory, { title: string; duration: string }[]> = {
  oraciones: [
    { title: 'Oración de la Mañana', duration: '3:45' },
    { title: 'Padre Nuestro', duration: '2:30' },
    { title: 'Ave María', duration: '2:15' },
    { title: 'Oración de Agradecimiento', duration: '4:00' },
  ],
  cuentos: [
    { title: 'El Principito (Cap. 1)', duration: '8:30' },
    { title: 'La Cenicienta', duration: '12:00' },
    { title: 'Don Quijote para todos', duration: '15:00' },
    { title: 'Cuentos de la Abuela', duration: '10:00' },
  ],
  noticias: [
    { title: 'Resumen del Día', duration: '5:00' },
    { title: 'Noticias Locales', duration: '4:30' },
    { title: 'El Tiempo de Hoy', duration: '2:00' },
    { title: 'Deportes', duration: '3:30' },
  ],
  musica: [
    { title: 'Boleros de Siempre', duration: '25:00' },
    { title: 'Valses Clásicos', duration: '20:00' },
    { title: 'Música de los 60s', duration: '30:00' },
    { title: 'Serenatas Mexicanas', duration: '22:00' },
  ],
  poemas: [
    { title: 'Veinte Poemas de Amor', duration: '15:00' },
    { title: 'Poesía de Gabriela Mistral', duration: '12:00' },
    { title: 'Rimas de Bécquer', duration: '10:00' },
    { title: 'Poemas Cortos', duration: '8:00' },
  ],
}

export function AudiotextoScreen() {
  const { navigateTo, setCurrentAudioCategory, setCurrentAudioTitle, currentAudioCategory } = useMemoVida()

  const handleSelectCategory = (category: AudioCategory) => {
    setCurrentAudioCategory(category)
  }

  const handleSelectContent = (title: string) => {
    setCurrentAudioTitle(title)
    navigateTo('audiotexto-reproduccion')
  }

  return (
    <TabletFrame 
      title="Escuchar" 
      showBackButton 
      showHomeButton
      headerColor="bg-emerald-600"
    >
      <div className="p-6">
        {!currentAudioCategory ? (
          // Mostrar categorías
          <>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Elige qué quieres escuchar
            </h2>
            <div className="space-y-4">
              {audioOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelectCategory(option.id)}
                  className={`w-full ${option.color} border-2 rounded-2xl p-5 flex items-center gap-5 transition-all duration-200 active:scale-98`}
                >
                  <div className="flex-shrink-0">
                    {option.icon}
                  </div>
                  <div className="text-left">
                    <span className="text-xl font-bold block">{option.label}</span>
                    <span className="text-base opacity-80">{option.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          // Mostrar contenido de la categoría seleccionada
          <>
            <button
              onClick={() => setCurrentAudioCategory(null)}
              className="text-primary font-medium text-lg mb-4 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver a categorías
            </button>
            
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {audioOptions.find(o => o.id === currentAudioCategory)?.label}
            </h2>
            
            <div className="space-y-3">
              {audioContent[currentAudioCategory].map((content, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectContent(content.title)}
                  className="w-full bg-card border border-border rounded-xl p-5 flex items-center justify-between hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-lg font-medium text-card-foreground">{content.title}</span>
                  </div>
                  <span className="text-muted-foreground">{content.duration}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </TabletFrame>
  )
}
