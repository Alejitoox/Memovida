"use client"

import { useMemoVida } from '@/lib/memovida-context'
import { HomeScreen } from './screens/home-screen'
import { AudiotextoScreen } from './screens/audiotexto-screen'
import { AudiotextoReproduccionScreen } from './screens/audiotexto-reproduccion-screen'
import { MiDiaScreen } from './screens/mi-dia-screen'
import { QuizScreen } from './screens/quiz-screen'
import { MisPersonasScreen } from './screens/mis-personas-screen'
import { VideollamadaScreen } from './screens/videollamada-screen'
import { ChatScreen } from './screens/chat-screen'
import { EjercitarMenteScreen } from './screens/ejercitar-mente-screen'
import { JuegoParejas } from './screens/juego-parejas-screen'
import { GaleriaScreen } from './screens/galeria-screen'
import { ConfiguracionScreen } from './screens/configuracion-screen'
import { EventosScreen } from './screens/eventos-screen'
import { VoiceAssistantOverlay } from './voice-assistant-overlay'

export function MemoVidaApp() {
  const { currentScreen } = useMemoVida()

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />
      case 'audiotexto':
        return <AudiotextoScreen />
      case 'audiotexto-reproduccion':
        return <AudiotextoReproduccionScreen />
      case 'mi-dia':
        return <MiDiaScreen />
      case 'quiz':
        return <QuizScreen />
      case 'mis-personas':
        return <MisPersonasScreen />
      case 'videollamada':
        return <VideollamadaScreen />
      case 'chat':
        return <ChatScreen />
      case 'ejercitar-mente':
        return <EjercitarMenteScreen />
      case 'juego-parejas':
        return <JuegoParejas />
      case 'galeria':
        return <GaleriaScreen />
      case 'configuracion':
        return <ConfiguracionScreen />
      case 'eventos':
        return <EventosScreen />
      default:
        return <HomeScreen />
    }
  }

  return (
    <>
      {renderScreen()}
      <VoiceAssistantOverlay />
    </>
  )
}
