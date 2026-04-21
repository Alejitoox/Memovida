"use client"

import { useMemoVida } from '@/lib/memovida-context'
import { TabletFrame } from '../tablet-frame'
import { Volume2, Sun, Mic, Type, User, HelpCircle, Info } from 'lucide-react'
import { Slider } from '@/components/ui/slider'

export function ConfiguracionScreen() {
  const { settings, updateSettings, userName } = useMemoVida()

  const textSizeOptions = [
    { value: 'normal', label: 'Normal', size: 'text-base' },
    { value: 'grande', label: 'Grande', size: 'text-lg' },
    { value: 'muy-grande', label: 'Muy Grande', size: 'text-xl' },
  ] as const

  return (
    <TabletFrame 
      title="Configuración" 
      showBackButton 
      showHomeButton
      headerColor="bg-gray-600"
    >
      <div className="p-6 space-y-6">
        {/* Perfil */}
        <section className="bg-card rounded-2xl p-5 border border-border">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
              {userName[0]}
            </div>
            <div>
              <h2 className="text-xl font-bold text-card-foreground">{userName}</h2>
              <p className="text-base text-muted-foreground">Usuario de MemoVida</p>
            </div>
          </div>
        </section>

        {/* Volumen */}
        <section className="bg-card rounded-2xl p-5 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Volume2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-card-foreground">Volumen</h3>
              <p className="text-base text-muted-foreground">Ajusta el sonido general</p>
            </div>
          </div>
          <Slider
            value={[settings.volume]}
            onValueChange={(value) => updateSettings({ volume: value[0] })}
            max={100}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Bajo</span>
            <span className="font-medium text-foreground">{settings.volume}%</span>
            <span>Alto</span>
          </div>
        </section>

        {/* Brillo */}
        <section className="bg-card rounded-2xl p-5 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <Sun className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-card-foreground">Brillo de pantalla</h3>
              <p className="text-base text-muted-foreground">Ajusta la iluminación</p>
            </div>
          </div>
          <Slider
            value={[settings.brightness]}
            onValueChange={(value) => updateSettings({ brightness: value[0] })}
            max={100}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Oscuro</span>
            <span className="font-medium text-foreground">{settings.brightness}%</span>
            <span>Brillante</span>
          </div>
        </section>

        {/* Velocidad de voz */}
        <section className="bg-card rounded-2xl p-5 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Mic className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-card-foreground">Velocidad de voz</h3>
              <p className="text-base text-muted-foreground">Qué tan rápido habla la app</p>
            </div>
          </div>
          <Slider
            value={[settings.speechRate]}
            onValueChange={(value) => updateSettings({ speechRate: value[0] })}
            max={100}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Lento</span>
            <span className="font-medium text-foreground">{settings.speechRate < 40 ? 'Lento' : settings.speechRate < 70 ? 'Normal' : 'Rápido'}</span>
            <span>Rápido</span>
          </div>
        </section>

        {/* Tamaño de texto */}
        <section className="bg-card rounded-2xl p-5 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <Type className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-card-foreground">Tamaño de texto</h3>
              <p className="text-base text-muted-foreground">Elige el tamaño de las letras</p>
            </div>
          </div>
          <div className="flex gap-3">
            {textSizeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateSettings({ textSize: option.value })}
                className={`flex-1 py-4 rounded-xl border-2 transition-all ${
                  settings.textSize === option.value
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-card-foreground hover:border-primary/50'
                }`}
              >
                <span className={`font-medium ${option.size}`}>{option.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Información y ayuda */}
        <section className="space-y-3">
          <button className="w-full bg-card rounded-2xl p-5 border border-border flex items-center gap-4 hover:bg-secondary/50 transition-colors">
            <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
              <HelpCircle className="h-6 w-6" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold text-card-foreground">Ayuda</h3>
              <p className="text-base text-muted-foreground">Cómo usar MemoVida</p>
            </div>
          </button>

          <button className="w-full bg-card rounded-2xl p-5 border border-border flex items-center gap-4 hover:bg-secondary/50 transition-colors">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
              <Info className="h-6 w-6" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold text-card-foreground">Acerca de</h3>
              <p className="text-base text-muted-foreground">Versión 1.0.0</p>
            </div>
          </button>
        </section>
      </div>
    </TabletFrame>
  )
}
