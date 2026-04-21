"use client"

import { useState } from 'react'
import { useMemoVida } from '@/lib/memovida-context'
import { TabletFrame } from '../tablet-frame'
import { MapPin, Clock, Users, Plus, X, ChevronRight, CalendarDays } from 'lucide-react'

interface Evento {
  id: string
  titulo: string
  descripcion: string
  lugar: string
  fecha: string
  hora: string
  asistentes: { nombre: string; color: string; inicial: string }[]
  organizador: string
}

const eventosData: Evento[] = [
  {
    id: '1',
    titulo: 'Tarde de Bingo en el Club',
    descripcion: 'Traiga sus cartones y ganas de divertirse. Habrá premios para los ganadores y refrigerio para todos.',
    lugar: 'Salón Comunal El Retiro, Bogotá',
    fecha: 'Sábado, 19 de Abril',
    hora: '3:00 PM',
    organizador: 'Carlos (Hijo)',
    asistentes: [
      { nombre: 'Carlos', color: 'bg-blue-500', inicial: 'C' },
      { nombre: 'Ana María', color: 'bg-red-400', inicial: 'A' },
      { nombre: 'Rosa', color: 'bg-orange-400', inicial: 'R' },
      { nombre: 'Pedro', color: 'bg-emerald-500', inicial: 'P' },
    ],
  },
  {
    id: '2',
    titulo: 'Paseo al Jardín Botánico',
    descripcion: 'Caminata suave por los senderos del jardín. Lleve ropa cómoda y protector solar.',
    lugar: 'Jardín Botánico José Celestino Mutis, Bogotá',
    fecha: 'Domingo, 20 de Abril',
    hora: '9:00 AM',
    organizador: 'Sofía (Nieta)',
    asistentes: [
      { nombre: 'Sofía', color: 'bg-purple-500', inicial: 'S' },
      { nombre: 'Dr. García', color: 'bg-teal-500', inicial: 'D' },
    ],
  },
  {
    id: '3',
    titulo: 'Clase de Yoga para Adultos',
    descripcion: 'Ejercicios suaves de respiración y estiramiento. Traiga su tapete y ropa cómoda.',
    lugar: 'Parque El Virrey, Bogotá',
    fecha: 'Miércoles, 23 de Abril',
    hora: '10:00 AM',
    organizador: 'Ana María (Hija)',
    asistentes: [
      { nombre: 'Ana María', color: 'bg-red-400', inicial: 'A' },
      { nombre: 'Rosa', color: 'bg-orange-400', inicial: 'R' },
    ],
  },
]

const amigosDisponibles = [
  { nombre: 'Carlos', color: 'bg-blue-500', inicial: 'C' },
  { nombre: 'Ana María', color: 'bg-red-400', inicial: 'A' },
  { nombre: 'Pedro', color: 'bg-emerald-500', inicial: 'P' },
  { nombre: 'Sofía', color: 'bg-purple-500', inicial: 'S' },
  { nombre: 'Rosa', color: 'bg-orange-400', inicial: 'R' },
  { nombre: 'Dr. García', color: 'bg-teal-500', inicial: 'D' },
]

type Vista = 'lista' | 'detalle' | 'crear'

export function EventosScreen() {
  const { goBack } = useMemoVida()
  const [vista, setVista] = useState<Vista>('lista')
  const [eventoSeleccionado, setEventoSeleccionado] = useState<Evento | null>(null)
  const [eventos, setEventos] = useState<Evento[]>(eventosData)

  // Estado del formulario
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    lugar: '',
    fecha: '',
    hora: '',
    amigosInvitados: [] as string[],
  })
  const [creado, setCreado] = useState(false)

  const verDetalle = (evento: Evento) => {
    setEventoSeleccionado(evento)
    setVista('detalle')
  }

  const toggleAmigo = (nombre: string) => {
    setForm(prev => ({
      ...prev,
      amigosInvitados: prev.amigosInvitados.includes(nombre)
        ? prev.amigosInvitados.filter(a => a !== nombre)
        : [...prev.amigosInvitados, nombre],
    }))
  }

  const crearEvento = () => {
    if (!form.titulo) return
    const nuevo: Evento = {
      id: String(Date.now()),
      titulo: form.titulo || 'Nuevo Evento',
      descripcion: form.descripcion || 'Sin descripción.',
      lugar: form.lugar || 'Por definir',
      fecha: form.fecha || 'Fecha por confirmar',
      hora: form.hora || '--:--',
      organizador: 'Usted',
      asistentes: amigosDisponibles.filter(a => form.amigosInvitados.includes(a.nombre)),
    }
    setEventos(prev => [nuevo, ...prev])
    setCreado(true)
    setTimeout(() => {
      setCreado(false)
      setForm({ titulo: '', descripcion: '', lugar: '', fecha: '', hora: '', amigosInvitados: [] })
      setVista('lista')
    }, 2000)
  }

  // ── VISTA LISTA ──────────────────────────────────────────────
  if (vista === 'lista') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="bg-violet-600 text-white px-6 py-4 flex items-center gap-3 flex-shrink-0">
          <button onClick={goBack} className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center active:scale-95">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6"/></svg>
          </button>
          <h1 className="text-2xl font-bold flex-1">Eventos</h1>
          <button
            onClick={() => setVista('crear')}
            className="h-12 w-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center active:scale-95 transition-all"
            title="Crear evento"
          >
            <Plus className="h-7 w-7" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
          <p className="text-lg text-muted-foreground font-medium">Eventos de sus amigos</p>

          {eventos.map(evento => (
            <button
              key={evento.id}
              onClick={() => verDetalle(evento)}
              className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-left hover:border-violet-300 hover:shadow-md active:scale-[0.98] transition-all"
            >
              {/* Título */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <h2 className="text-xl font-bold text-gray-800 leading-tight">{evento.titulo}</h2>
                <ChevronRight className="h-6 w-6 text-violet-400 flex-shrink-0 mt-0.5" />
              </div>

              {/* Fecha y hora */}
              <div className="flex items-center gap-2 text-base text-gray-500 mb-1.5">
                <Clock className="h-5 w-5 text-violet-500 flex-shrink-0" />
                <span>{evento.fecha} — {evento.hora}</span>
              </div>

              {/* Lugar */}
              <div className="flex items-center gap-2 text-base text-gray-500 mb-3">
                <MapPin className="h-5 w-5 text-violet-500 flex-shrink-0" />
                <span className="line-clamp-1">{evento.lugar}</span>
              </div>

              {/* Asistentes */}
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-violet-400 flex-shrink-0" />
                <div className="flex -space-x-2">
                  {evento.asistentes.map((a, i) => (
                    <div key={i} className={`h-8 w-8 rounded-full ${a.color} border-2 border-white flex items-center justify-center text-white text-sm font-bold`}>
                      {a.inicial}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-400 ml-1">{evento.asistentes.length} {evento.asistentes.length === 1 ? 'asistente' : 'asistentes'}</span>
              </div>
            </button>
          ))}
        </main>

        {/* Botón flotante crear */}
        <div className="px-5 py-4 flex-shrink-0">
          <button
            onClick={() => setVista('crear')}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-2xl py-4 flex items-center justify-center gap-3 text-xl font-bold active:scale-95 transition-all shadow-lg"
          >
            <Plus className="h-7 w-7" />
            Crear nuevo evento
          </button>
        </div>
      </div>
    )
  }

  // ── VISTA DETALLE ─────────────────────────────────────────────
  if (vista === 'detalle' && eventoSeleccionado) {
    const ev = eventoSeleccionado
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="bg-violet-600 text-white px-6 py-4 flex items-center gap-3 flex-shrink-0">
          <button onClick={() => setVista('lista')} className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center active:scale-95">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6"/></svg>
          </button>
          <h1 className="text-2xl font-bold flex-1 line-clamp-1">{ev.titulo}</h1>
        </header>

        <main className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5">
          {/* Banner */}
          <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5 flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-violet-600 flex items-center justify-center flex-shrink-0">
              <CalendarDays className="h-9 w-9 text-white" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-800">{ev.fecha}</p>
              <p className="text-2xl font-extrabold text-violet-600">{ev.hora}</p>
            </div>
          </div>

          {/* Lugar */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-3 mb-1">
              <MapPin className="h-6 w-6 text-violet-500" />
              <p className="text-base font-bold text-gray-500 uppercase tracking-wide">Lugar</p>
            </div>
            <p className="text-xl font-semibold text-gray-800 ml-9">{ev.lugar}</p>
          </div>

          {/* Descripción */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <p className="text-base font-bold text-gray-500 uppercase tracking-wide mb-2">Descripción</p>
            <p className="text-xl text-gray-700 leading-relaxed">{ev.descripcion}</p>
          </div>

          {/* Organizador */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <p className="text-base font-bold text-gray-500 uppercase tracking-wide mb-2">Organiza</p>
            <p className="text-xl font-semibold text-gray-800">{ev.organizador}</p>
          </div>

          {/* Asistentes */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-6 w-6 text-violet-500" />
              <p className="text-base font-bold text-gray-500 uppercase tracking-wide">
                Asistentes ({ev.asistentes.length})
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {ev.asistentes.map((a, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`h-11 w-11 rounded-full ${a.color} flex items-center justify-center text-white text-lg font-bold flex-shrink-0`}>
                    {a.inicial}
                  </div>
                  <p className="text-xl font-semibold text-gray-800">{a.nombre}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Botón asistir */}
          <button className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-2xl py-4 text-xl font-bold active:scale-95 transition-all shadow-lg">
            ✅ Voy a este evento
          </button>
        </main>
      </div>
    )
  }

  // ── VISTA CREAR ───────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-violet-600 text-white px-6 py-4 flex items-center gap-3 flex-shrink-0">
        <button onClick={() => setVista('lista')} className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center active:scale-95">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6"/></svg>
        </button>
        <h1 className="text-2xl font-bold">Crear nuevo evento</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4">

        {/* Éxito */}
        {creado && (
          <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-5 text-center">
            <p className="text-2xl font-bold text-emerald-700">🎉 ¡Evento creado!</p>
            <p className="text-base text-emerald-600 mt-1">Sus amigos serán notificados</p>
          </div>
        )}

        {/* Nombre */}
        <div>
          <label className="text-lg font-bold text-gray-700 block mb-2">Nombre del evento *</label>
          <input
            type="text"
            placeholder="Ej: Tarde de bingo"
            value={form.titulo}
            onChange={e => setForm(p => ({ ...p, titulo: e.target.value }))}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-xl focus:border-violet-400 focus:outline-none transition-colors"
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="text-lg font-bold text-gray-700 block mb-2">Descripción</label>
          <textarea
            placeholder="Cuénteles de qué trata el evento..."
            value={form.descripcion}
            onChange={e => setForm(p => ({ ...p, descripcion: e.target.value }))}
            rows={3}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-xl focus:border-violet-400 focus:outline-none transition-colors resize-none"
          />
        </div>

        {/* Lugar */}
        <div>
          <label className="text-lg font-bold text-gray-700 block mb-2">
            <MapPin className="inline h-5 w-5 text-violet-500 mr-1" />
            Lugar
          </label>
          <input
            type="text"
            placeholder="Ej: Parque El Virrey"
            value={form.lugar}
            onChange={e => setForm(p => ({ ...p, lugar: e.target.value }))}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-xl focus:border-violet-400 focus:outline-none transition-colors"
          />
        </div>

        {/* Fecha y hora */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-lg font-bold text-gray-700 block mb-2">Fecha</label>
            <input
              type="date"
              value={form.fecha}
              onChange={e => setForm(p => ({ ...p, fecha: e.target.value }))}
              className="w-full border-2 border-gray-200 rounded-xl px-3 py-3 text-lg focus:border-violet-400 focus:outline-none transition-colors"
            />
          </div>
          <div className="flex-1">
            <label className="text-lg font-bold text-gray-700 block mb-2">
              <Clock className="inline h-5 w-5 text-violet-500 mr-1" />
              Hora
            </label>
            <input
              type="time"
              value={form.hora}
              onChange={e => setForm(p => ({ ...p, hora: e.target.value }))}
              className="w-full border-2 border-gray-200 rounded-xl px-3 py-3 text-lg focus:border-violet-400 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Invitar amigos */}
        <div>
          <label className="text-lg font-bold text-gray-700 block mb-3">
            <Users className="inline h-5 w-5 text-violet-500 mr-1" />
            Invitar amigos
          </label>
          <div className="flex flex-col gap-2">
            {amigosDisponibles.map(amigo => {
              const seleccionado = form.amigosInvitados.includes(amigo.nombre)
              return (
                <button
                  key={amigo.nombre}
                  type="button"
                  onClick={() => toggleAmigo(amigo.nombre)}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all active:scale-[0.98] ${
                    seleccionado
                      ? 'border-violet-400 bg-violet-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className={`h-11 w-11 rounded-full ${amigo.color} flex items-center justify-center text-white text-lg font-bold flex-shrink-0`}>
                    {amigo.inicial}
                  </div>
                  <span className="text-xl font-semibold text-gray-800 flex-1 text-left">{amigo.nombre}</span>
                  <div className={`h-7 w-7 rounded-full border-2 flex items-center justify-center transition-all ${
                    seleccionado ? 'bg-violet-600 border-violet-600' : 'border-gray-300'
                  }`}>
                    {seleccionado && <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Botón crear */}
        <button
          onClick={crearEvento}
          disabled={!form.titulo || creado}
          className={`w-full rounded-2xl py-4 text-xl font-bold transition-all shadow-lg active:scale-95 mt-2 mb-4 ${
            form.titulo && !creado
              ? 'bg-violet-600 hover:bg-violet-700 text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {creado ? '¡Evento creado! ✅' : '+ Crear evento'}
        </button>
      </main>
    </div>
  )
}
