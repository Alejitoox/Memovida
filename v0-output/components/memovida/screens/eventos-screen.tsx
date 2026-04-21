"use client"

import { useState } from 'react'
import { useMemoVida } from '@/lib/memovida-context'
import { TabletFrame } from '../tablet-frame'
import { MapPin, Users, Mic, Sparkles, HeartHandshake } from 'lucide-react'

type Paso = 'inicio' | 'gustos' | 'personas' | 'planes'

interface SugerenciaPersona {
  nombre: string
  ciudad: string
  interesCompartido: string
}

interface SugerenciaPlan {
  titulo: string
  descripcion: string
  lugar: string
}

const personasSugeridas: SugerenciaPersona[] = [
  { nombre: 'Don Jorge', ciudad: 'Bogotá', interesCompartido: 'Jugar billar' },
  { nombre: 'Doña Rosa', ciudad: 'Bogotá', interesCompartido: 'Caminar en el parque' },
  { nombre: 'Don Enrique', ciudad: 'Bogotá', interesCompartido: 'Tomar café y conversar' },
]

const planesSugeridos: SugerenciaPlan[] = [
  {
    titulo: 'Salida a jugar billar',
    descripcion: 'Puedo presentarles a otra persona que también disfruta el billar para que jueguen una tarde juntos.',
    lugar: 'Billares del barrio o un sitio cercano a su casa',
  },
  {
    titulo: 'Caminar y tomar café',
    descripcion: 'Una caminata suave y luego un cafecito con alguien que también quiere conversar.',
    lugar: 'Parque cercano y cafetería del sector',
  },
  {
    titulo: 'Tarde de conversación',
    descripcion: 'Una visita para conversar de historias, música y recuerdos con alguien de su edad.',
    lugar: 'En su casa o en un salón comunal',
  },
]

export function EventosScreen() {
  const { goBack } = useMemoVida()
  const [paso, setPaso] = useState<Paso>('inicio')
  const [gustoPrincipal, setGustoPrincipal] = useState<string>('')

  const avanzarAGustos = () => setPaso('gustos')
  const verPersonas = () => setPaso('personas')
  const verPlanes = () => setPaso('planes')

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-violet-600 text-white px-6 py-4 flex items-center gap-3 flex-shrink-0">
        <button
          onClick={goBack}
          className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center active:scale-95"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">El amigo de Todos</h1>
          <p className="text-base text-violet-100">
            Un acompañante para escucharle y ayudarle a encontrar compañía
          </p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5">
        {/* Paso 1: Inicio / explicación */}
        {paso === 'inicio' && (
          <div className="flex flex-col gap-5">
            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5 flex gap-4 items-center">
              <div className="h-16 w-16 rounded-2xl bg-violet-600 flex items-center justify-center flex-shrink-0">
                <Mic className="h-9 w-9 text-white" />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-800">
                  Aquí puede hablar con su amigo de siempre
                </p>
                <p className="text-base text-gray-700 mt-1">
                  Cuéntele qué le gusta hacer y él le ayudará a encontrar personas con gustos parecidos.
                </p>
              </div>
            </div>

            <button
              onClick={avanzarAGustos}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-2xl py-4 flex items-center justify-center gap-3 text-xl font-bold active:scale-95 transition-all shadow-lg"
            >
              <Mic className="h-7 w-7" />
              Quiero contarle algo
            </button>

            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4">
              <p className="text-base font-bold text-gray-500 uppercase tracking-wide">
                ¿Qué puede hacer aquí?
              </p>
              <div className="flex flex-col gap-3 text-lg text-gray-700">
                <p>• Decirle qué cosas le gustan (por ejemplo, jugar billar o caminar).</p>
                <p>• Ver personas que viven en su ciudad y comparten esos gustos.</p>
                <p>• Recibir ideas de salidas simples para no estar solo.</p>
              </div>
            </div>
          </div>
        )}

        {/* Paso 2: Gustos */}
        {paso === 'gustos' && (
          <div className="flex flex-col gap-5">
            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
              <p className="text-lg font-bold text-gray-800 mb-2">
                Cuéntele a su amigo qué le gusta hacer
              </p>
              <p className="text-base text-gray-700">
                Puede escribirlo con ayuda de alguien o simplemente usar esto como guía
                para la conversación. Por ejemplo: <strong>“Me gusta jugar billar y tomar café”.</strong>
              </p>
            </div>

            <div>
              <label className="text-lg font-bold text-gray-700 block mb-2">
                ¿Qué le gusta hacer?
              </label>
              <textarea
                value={gustoPrincipal}
                onChange={(e) => setGustoPrincipal(e.target.value)}
                placeholder="Ej: Jugar billar, caminar en el parque, tomar café y conversar..."
                rows={3}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-xl focus:border-violet-400 focus:outline-none transition-colors resize-none"
              />
            </div>

            <button
              onClick={verPersonas}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-2xl py-4 flex items-center justify-center gap-3 text-xl font-bold active:scale-95 transition-all shadow-lg"
            >
              <Users className="h-7 w-7" />
              Ver personas con gustos parecidos
            </button>
          </div>
        )}

        {/* Paso 3: Personas sugeridas */}
        {paso === 'personas' && (
          <div className="flex flex-col gap-5">
            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5 flex gap-4 items-start">
              <div className="h-12 w-12 rounded-2xl bg-violet-600 flex items-center justify-center flex-shrink-0">
                <Users className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-800">
                  Personas que podrían llevarse bien con usted
                </p>
                <p className="text-base text-gray-700 mt-1">
                  El amigo de todos le muestra ejemplos de personas con gustos parecidos
                  para que no se sienta solo.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {personasSugeridas.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4"
                >
                  <div className="h-12 w-12 rounded-full bg-violet-500 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                    {p.nombre.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-gray-800">{p.nombre}</p>
                    <p className="text-base text-gray-600 flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-violet-500" />
                      {p.ciudad}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Le gusta: <strong>{p.interesCompartido}</strong>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={verPlanes}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-2xl py-4 flex items-center justify-center gap-3 text-xl font-bold active:scale-95 transition-all shadow-lg"
            >
              <Sparkles className="h-7 w-7" />
              Ver ideas para una salida
            </button>
          </div>
        )}

        {/* Paso 4: Planes sugeridos */}
        {paso === 'planes' && (
          <div className="flex flex-col gap-5">
            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5 flex gap-4 items-start">
              <div className="h-12 w-12 rounded-2xl bg-violet-600 flex items-center justify-center flex-shrink-0">
                <HeartHandshake className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-800">
                  Ideas simples para compartir con otros
                </p>
                <p className="text-base text-gray-700 mt-1">
                  El amigo de todos le puede ayudar a armar algo sencillo: una salida corta,
                  un juego o una visita.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {planesSugeridos.map((plan, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-2"
                >
                  <p className="text-lg font-semibold text-gray-800">{plan.titulo}</p>
                  <p className="text-base text-gray-700">{plan.descripcion}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin className="h-4 w-4 text-violet-500" />
                    Sugerido en: {plan.lugar}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setPaso('inicio')}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-2xl py-3 text-lg font-semibold active:scale-95 transition-all"
            >
              Volver al inicio de El amigo de Todos
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
