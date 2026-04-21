"use client"

import { useState } from 'react'
import { useMemoVida } from '@/lib/memovida-context'
import { TabletFrame } from '../tablet-frame'
import { Check, Clock, Pill, Utensils, Moon, Sun, Coffee, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Activity {
  id: string
  time: string
  title: string
  description: string
  icon: React.ReactNode
  iconBg: string
  completed: boolean
}

const initialActivities: Activity[] = [
  {
    id: '1',
    time: '7:00',
    title: 'Despertar',
    description: 'Buenos días, nuevo día',
    icon: <Sun className="h-6 w-6" />,
    iconBg: 'bg-amber-500',
    completed: true
  },
  {
    id: '2',
    time: '7:30',
    title: 'Medicamento',
    description: 'Pastilla para la presión',
    icon: <Pill className="h-6 w-6" />,
    iconBg: 'bg-rose-500',
    completed: true
  },
  {
    id: '3',
    time: '8:00',
    title: 'Desayuno',
    description: 'Pan con café y fruta',
    icon: <Coffee className="h-6 w-6" />,
    iconBg: 'bg-amber-600',
    completed: true
  },
  {
    id: '4',
    time: '10:00',
    title: 'Ejercicio',
    description: '15 minutos de caminata',
    icon: <Activity className="h-6 w-6" />,
    iconBg: 'bg-emerald-500',
    completed: false
  },
  {
    id: '5',
    time: '12:30',
    title: 'Almuerzo',
    description: 'Sopa y ensalada',
    icon: <Utensils className="h-6 w-6" />,
    iconBg: 'bg-orange-500',
    completed: false
  },
  {
    id: '6',
    time: '15:00',
    title: 'Siesta',
    description: 'Descanso de la tarde',
    icon: <Moon className="h-6 w-6" />,
    iconBg: 'bg-indigo-500',
    completed: false
  },
  {
    id: '7',
    time: '18:00',
    title: 'Medicamento',
    description: 'Vitaminas de la tarde',
    icon: <Pill className="h-6 w-6" />,
    iconBg: 'bg-rose-500',
    completed: false
  },
  {
    id: '8',
    time: '19:00',
    title: 'Cena',
    description: 'Cena ligera',
    icon: <Utensils className="h-6 w-6" />,
    iconBg: 'bg-orange-500',
    completed: false
  },
]

export function MiDiaScreen() {
  const { navigateTo, userName } = useMemoVida()
  const [activities, setActivities] = useState(initialActivities)

  const toggleActivity = (id: string) => {
    setActivities(prev => 
      prev.map(act => 
        act.id === id ? { ...act, completed: !act.completed } : act
      )
    )
  }

  const completedCount = activities.filter(a => a.completed).length
  const progressPercent = (completedCount / activities.length) * 100

  // Formatear fecha actual
  const today = new Date()
  const dateString = today.toLocaleDateString('es-ES', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  })

  return (
    <TabletFrame 
      title="Mi Día" 
      showBackButton 
      showHomeButton
      headerColor="bg-amber-500"
    >
      <div className="p-6">
        {/* Fecha y progreso */}
        <div className="mb-6">
          <h2 className="text-xl text-muted-foreground capitalize mb-2">{dateString}</h2>
          <div className="bg-card rounded-2xl p-4 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-medium text-card-foreground">Progreso del día</span>
              <span className="text-lg font-bold text-primary">{completedCount}/{activities.length}</span>
            </div>
            <div className="h-3 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Timeline de actividades */}
        <div className="space-y-1">
          {activities.map((activity, index) => (
            <div 
              key={activity.id}
              className="flex gap-4"
            >
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div className={`${activity.iconBg} h-12 w-12 rounded-full flex items-center justify-center text-white shrink-0`}>
                  {activity.icon}
                </div>
                {index < activities.length - 1 && (
                  <div className={`w-0.5 flex-1 min-h-[40px] ${activity.completed ? 'bg-primary' : 'bg-border'}`} />
                )}
              </div>

              {/* Content */}
              <button
                onClick={() => toggleActivity(activity.id)}
                className={`flex-1 bg-card border rounded-xl p-4 mb-3 text-left transition-all ${
                  activity.completed 
                    ? 'border-primary/50 bg-primary/5' 
                    : 'border-border hover:border-primary/30'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-base text-muted-foreground">{activity.time}</span>
                    </div>
                    <h3 className={`text-lg font-bold ${activity.completed ? 'text-primary' : 'text-card-foreground'}`}>
                      {activity.title}
                    </h3>
                    <p className="text-base text-muted-foreground">{activity.description}</p>
                  </div>
                  <div className={`h-8 w-8 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    activity.completed 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : 'border-border'
                  }`}>
                    {activity.completed && <Check className="h-5 w-5" />}
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Botón de Quiz */}
        <div className="mt-6">
          <Button
            onClick={() => navigateTo('quiz')}
            className="w-full h-16 text-xl bg-amber-500 hover:bg-amber-600 text-white rounded-xl"
          >
            Recordar Mi Día
          </Button>
        </div>
      </div>
    </TabletFrame>
  )
}
