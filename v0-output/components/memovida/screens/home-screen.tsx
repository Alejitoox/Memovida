"use client"

import { useState, useEffect } from 'react'
import { useMemoVida, type Screen } from '@/lib/memovida-context'
import { Headphones, Users, Calendar, Brain, CalendarDays } from 'lucide-react'

interface MenuItem {
  id: Screen
  label: string
  icon: React.ReactNode
  color: string
  description: string
}

const menuItems: MenuItem[] = [
  {
    id: 'audiotexto',
    label: 'Escuchar',
    icon: <Headphones className="h-16 w-16" />,
    color: 'bg-emerald-500 hover:bg-emerald-600',
    description: 'Oraciones, cuentos y música'
  },
  {
    id: 'mis-personas',
    label: 'Mis Personas',
    icon: <Users className="h-16 w-16" />,
    color: 'bg-teal-600 hover:bg-teal-700',
    description: 'Llama a tu familia'
  },
  {
    id: 'mi-dia',
    label: 'Mi Día',
    icon: <Calendar className="h-16 w-16" />,
    color: 'bg-amber-500 hover:bg-amber-600',
    description: 'Tus actividades de hoy'
  },
  {
    id: 'ejercitar-mente',
    label: 'Ejercitar Mente',
    icon: <Brain className="h-16 w-16" />,
    color: 'bg-rose-500 hover:bg-rose-600',
    description: 'Juegos y ejercicios'
  },
]

export function HomeScreen() {
  const { navigateTo, userName } = useMemoVida()
  const [greeting, setGreeting] = useState('Hola')
  
  // Calcular saludo solo en cliente para evitar error de hidratación
  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Buenos días')
    else if (hour < 19) setGreeting('Buenas tardes')
    else setGreeting('Buenas noches')
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header con saludo */}
      <header className="bg-primary text-primary-foreground px-8 py-6">
        <h1 className="text-3xl font-bold">{greeting}, {userName}</h1>
        <p className="text-xl opacity-90 mt-1">Bienvenida a MemoVida</p>
      </header>

      {/* Grid de opciones 2x2 + botón Eventos */}
      <main className="flex-1 p-6 flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-5">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`${item.color} text-white rounded-3xl p-6 flex flex-col items-center justify-center gap-3 transition-all duration-200 active:scale-95 shadow-lg min-h-[180px]`}
            >
              {item.icon}
              <span className="text-2xl font-bold">{item.label}</span>
              <span className="text-base opacity-90 text-center">{item.description}</span>
            </button>
          ))}
        </div>

        {/* Botón Eventos — ancho completo */}
        <button
          onClick={() => navigateTo('eventos')}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-3xl px-8 py-6 flex items-center gap-6 transition-all duration-200 active:scale-95 shadow-lg"
        >
          <CalendarDays className="h-14 w-14 flex-shrink-0" />
          <div className="text-left">
            <p className="text-2xl font-bold">Eventos</p>
            <p className="text-base opacity-90">Actividades con amigos</p>
          </div>
        </button>
      </main>

      {/* Footer con accesos rápidos */}
      <footer className="bg-secondary px-6 py-4">
        <div className="flex justify-center gap-8">
          <button 
            onClick={() => navigateTo('galeria')}
            className="flex flex-col items-center gap-2 text-secondary-foreground hover:text-primary transition-colors"
          >
            <div className="h-14 w-14 rounded-full bg-purple-500 flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-lg font-medium">Mis Recuerdos</span>
          </button>
          
          <button 
            onClick={() => navigateTo('configuracion')}
            className="flex flex-col items-center gap-2 text-secondary-foreground hover:text-primary transition-colors"
          >
            <div className="h-14 w-14 rounded-full bg-gray-500 flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-lg font-medium">Ajustes</span>
          </button>
        </div>
      </footer>
    </div>
  )
}
