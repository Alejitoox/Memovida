"use client"

import { useState } from 'react'
import { Heart, Phone, User, ArrowRight, ChevronLeft } from 'lucide-react'

type Vista = 'bienvenida' | 'registro' | 'login'

interface LoginScreenProps {
  onSuccess: (nombre: string) => void
}

export function LoginScreen({ onSuccess }: LoginScreenProps) {
  const [vista, setVista] = useState<Vista>('bienvenida')
  const [nombre, setNombre] = useState('')
  const [celular, setCelular] = useState('')

  const handleContinuar = () => {
    if (!nombre.trim() || !celular.trim()) return
    onSuccess(nombre.trim())
  }

  const puedeAvanzar = nombre.trim().length > 0 && celular.trim().length >= 7

  // ── BIENVENIDA ──────────────────────────────────────────────
  if (vista === 'bienvenida') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-600 to-violet-800 flex flex-col items-center justify-between px-8 py-16">

        {/* Logo y titulo */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
          <div className="h-24 w-24 rounded-3xl bg-white/20 flex items-center justify-center shadow-xl">
            <Heart className="h-12 w-12 text-white" fill="white" />
          </div>

          <div>
            <h1 className="text-4xl font-extrabold text-white leading-tight">
              Bienvenido a
            </h1>
            <h1 className="text-4xl font-extrabold text-white leading-tight">
              MemoVida
            </h1>
            <p className="text-lg text-violet-200 mt-4 leading-relaxed max-w-xs mx-auto">
              Recuerda, conecta y vive cada día con alegría y compañía
            </p>
          </div>
        </div>

        {/* Botones */}
        <div className="w-full flex flex-col gap-4">
          <button
            onClick={() => setVista('registro')}
            className="w-full bg-white text-violet-700 rounded-2xl py-5 text-xl font-bold active:scale-95 transition-all shadow-lg"
          >
            Registrarse
          </button>
          <button
            onClick={() => setVista('login')}
            className="w-full bg-white/20 hover:bg-white/30 border-2 border-white/50 text-white rounded-2xl py-5 text-xl font-bold active:scale-95 transition-all"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    )
  }

  // ── FORMULARIO (registro y login comparten el mismo layout) ──
  const esRegistro = vista === 'registro'

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-violet-600 text-white px-6 py-4 flex items-center gap-3">
        <button
          onClick={() => setVista('bienvenida')}
          className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center active:scale-95"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold">
            {esRegistro ? 'Registrarse' : 'Iniciar Sesión'}
          </h1>
          <p className="text-sm text-violet-100">
            {esRegistro
              ? 'Cree su cuenta para comenzar'
              : 'Ingrese sus datos para continuar'}
          </p>
        </div>
      </header>

      <main className="flex-1 px-6 py-8 flex flex-col gap-6">
        {/* Icono decorativo */}
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-3xl bg-violet-100 flex items-center justify-center">
            <Heart className="h-10 w-10 text-violet-600" fill="currentColor" />
          </div>
        </div>

        <p className="text-center text-lg text-gray-600">
          {esRegistro
            ? 'Solo necesitamos dos datos suyos para comenzar'
            : 'Ingrese su nombre y número para entrar'}
        </p>

        {/* Campo nombre */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold text-gray-700 flex items-center gap-2">
            <User className="h-5 w-5 text-violet-500" />
            Nombre completo
          </label>
          <input
            type="text"
            placeholder="Ej: María Fernández"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border-2 border-gray-200 focus:border-violet-400 rounded-xl px-4 py-4 text-xl outline-none transition-colors"
          />
        </div>

        {/* Campo celular */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold text-gray-700 flex items-center gap-2">
            <Phone className="h-5 w-5 text-violet-500" />
            Número de celular
          </label>
          <input
            type="tel"
            placeholder="Ej: 300 123 4567"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            className="w-full border-2 border-gray-200 focus:border-violet-400 rounded-xl px-4 py-4 text-xl outline-none transition-colors"
          />
        </div>

        {/* Botón continuar */}
        <button
          onClick={handleContinuar}
          disabled={!puedeAvanzar}
          className={`w-full rounded-2xl py-5 text-xl font-bold transition-all shadow-lg flex items-center justify-center gap-3 mt-2 ${
            puedeAvanzar
              ? 'bg-violet-600 hover:bg-violet-700 text-white active:scale-95'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continuar
          <ArrowRight className="h-6 w-6" />
        </button>

        {/* Cambiar entre registro y login */}
        <p className="text-center text-base text-gray-500 mt-2">
          {esRegistro ? '¿Ya tiene cuenta?' : '¿No tiene cuenta?'}{' '}
          <button
            onClick={() => {
              setNombre('')
              setCelular('')
              setVista(esRegistro ? 'login' : 'registro')
            }}
            className="text-violet-600 font-bold underline"
          >
            {esRegistro ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </p>
      </main>
    </div>
  )
}
