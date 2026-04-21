"use client"

import { useState } from 'react'
import { useMemoVida } from '@/lib/memovida-context'
import { TabletFrame } from '../tablet-frame'
import { ChevronLeft, ChevronRight, Calendar, Activity, Pill, Utensils, Brain } from 'lucide-react'

// Tipos de actividad con colores
const activityTypes = {
  medicamento: { color: 'bg-rose-500', icon: <Pill className="h-3 w-3" />, label: 'Medicamento' },
  comida: { color: 'bg-amber-500', icon: <Utensils className="h-3 w-3" />, label: 'Comida' },
  ejercicio: { color: 'bg-emerald-500', icon: <Activity className="h-3 w-3" />, label: 'Ejercicio' },
  juego: { color: 'bg-purple-500', icon: <Brain className="h-3 w-3" />, label: 'Juego mental' },
}

type ActivityType = keyof typeof activityTypes

interface DayActivity {
  date: number
  activities: ActivityType[]
  progress: number // 0-100
}

// Generar datos de ejemplo para el mes actual
function generateMonthData(): DayActivity[] {
  const today = new Date()
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
  const currentDay = today.getDate()
  
  return Array.from({ length: daysInMonth }, (_, i) => {
    const date = i + 1
    if (date > currentDay) {
      return { date, activities: [], progress: 0 }
    }
    
    // Generar actividades aleatorias para días pasados
    const possibleActivities: ActivityType[] = ['medicamento', 'comida', 'ejercicio', 'juego']
    const numActivities = Math.floor(Math.random() * 4) + 1
    const activities = possibleActivities.slice(0, numActivities)
    const progress = Math.floor(Math.random() * 40) + 60
    
    return { date, activities, progress }
  })
}

export function GaleriaScreen() {
  const { userName } = useMemoVida()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [monthData] = useState(generateMonthData)
  const [selectedDay, setSelectedDay] = useState<DayActivity | null>(null)

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()
  const today = new Date()
  const isCurrentMonth = currentMonth.getMonth() === today.getMonth() && 
                         currentMonth.getFullYear() === today.getFullYear()

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
    setSelectedDay(null)
  }

  const goToNextMonth = () => {
    if (!isCurrentMonth) {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
      setSelectedDay(null)
    }
  }

  // Calcular estadísticas del mes
  const monthStats = {
    daysActive: monthData.filter(d => d.activities.length > 0).length,
    avgProgress: Math.round(
      monthData.filter(d => d.progress > 0).reduce((sum, d) => sum + d.progress, 0) / 
      Math.max(monthData.filter(d => d.progress > 0).length, 1)
    ),
    totalActivities: monthData.reduce((sum, d) => sum + d.activities.length, 0)
  }

  return (
    <TabletFrame 
      title="Mis Recuerdos" 
      showBackButton 
      showHomeButton
      headerColor="bg-purple-600"
    >
      <div className="p-4">
        {/* Navegación del mes */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goToPreviousMonth}
            className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-secondary/80"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
          </div>
          
          <button
            onClick={goToNextMonth}
            disabled={isCurrentMonth}
            className={`h-12 w-12 rounded-full bg-secondary flex items-center justify-center ${
              isCurrentMonth ? 'opacity-30' : 'text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Estadísticas del mes */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-card rounded-xl p-3 border border-border text-center">
            <p className="text-2xl font-bold text-primary">{monthStats.daysActive}</p>
            <p className="text-xs text-muted-foreground">Días activos</p>
          </div>
          <div className="bg-card rounded-xl p-3 border border-border text-center">
            <p className="text-2xl font-bold text-primary">{monthStats.avgProgress}%</p>
            <p className="text-xs text-muted-foreground">Promedio</p>
          </div>
          <div className="bg-card rounded-xl p-3 border border-border text-center">
            <p className="text-2xl font-bold text-primary">{monthStats.totalActivities}</p>
            <p className="text-xs text-muted-foreground">Actividades</p>
          </div>
        </div>

        {/* Leyenda de colores */}
        <div className="flex flex-wrap gap-3 mb-4 justify-center">
          {Object.entries(activityTypes).map(([key, value]) => (
            <div key={key} className="flex items-center gap-1">
              <div className={`h-3 w-3 rounded-full ${value.color}`} />
              <span className="text-xs text-muted-foreground">{value.label}</span>
            </div>
          ))}
        </div>

        {/* Calendario */}
        <div className="bg-card rounded-2xl p-4 border border-border">
          {/* Días de la semana */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Días del mes */}
          <div className="grid grid-cols-7 gap-1">
            {/* Espacios vacíos antes del primer día */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            
            {/* Días del mes */}
            {monthData.map((day) => {
              const isToday = isCurrentMonth && day.date === today.getDate()
              const hasActivities = day.activities.length > 0
              const isFuture = isCurrentMonth && day.date > today.getDate()
              
              return (
                <button
                  key={day.date}
                  onClick={() => !isFuture && setSelectedDay(day)}
                  disabled={isFuture}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all ${
                    isToday 
                      ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2' 
                      : hasActivities 
                        ? 'bg-secondary hover:bg-secondary/80' 
                        : 'hover:bg-secondary/50'
                  } ${isFuture ? 'opacity-30' : ''} ${
                    selectedDay?.date === day.date ? 'ring-2 ring-purple-500' : ''
                  }`}
                >
                  <span className={`text-base font-medium ${isToday ? '' : 'text-foreground'}`}>
                    {day.date}
                  </span>
                  
                  {/* Indicadores de actividad */}
                  {hasActivities && (
                    <div className="flex gap-0.5 mt-1">
                      {day.activities.slice(0, 3).map((activity, i) => (
                        <div
                          key={i}
                          className={`h-1.5 w-1.5 rounded-full ${activityTypes[activity].color}`}
                        />
                      ))}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Detalle del día seleccionado */}
        {selectedDay && selectedDay.activities.length > 0 && (
          <div className="mt-4 bg-card rounded-2xl p-4 border border-border">
            <h3 className="text-lg font-bold text-card-foreground mb-3">
              Día {selectedDay.date} - Progreso: {selectedDay.progress}%
            </h3>
            <div className="h-2 bg-secondary rounded-full overflow-hidden mb-4">
              <div 
                className="h-full bg-purple-500 rounded-full"
                style={{ width: `${selectedDay.progress}%` }}
              />
            </div>
            <div className="space-y-2">
              {selectedDay.activities.map((activity, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-full ${activityTypes[activity].color} flex items-center justify-center text-white`}>
                    {activityTypes[activity].icon}
                  </div>
                  <span className="text-base text-card-foreground">{activityTypes[activity].label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </TabletFrame>
  )
}
