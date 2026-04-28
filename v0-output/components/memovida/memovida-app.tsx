"use client"

import { useState } from 'react'
import { MemoVidaProvider } from '@/lib/memovida-context'
import { TabletFrame } from './tablet-frame'
import { LoginScreen } from './screens/login-screen'
import { HomeScreen } from './screens/home-screen'
import { MiDiaScreen } from './screens/mi-dia-screen'
import { AudiotextoScreen } from './screens/audiotexto-screen'
import { AudiotextoReproduccionScreen } from './screens/audiotexto-reproduccion-screen'
import { MisPersonasScreen } from './screens/mis-personas-screen'
import { EjercitarMenteScreen } from './screens/ejercitar-mente-screen'
import { QuizScreen } from './screens/quiz-screen'
import { JuegoParejasScreen } from './screens/juego-parejas-screen'
import { EventosScreen } from './screens/eventos-screen'
import { GaleriaScreen } from './screens/galeria-screen'
import { ChatScreen } from './screens/chat-screen'
import { VideollamadaScreen } from './screens/videollamada-screen'
import { ConfiguracionScreen } from './screens/configuracion-screen'

export function MemoVidaApp() {
  const [logueado, setLogueado] = useState(false)
  const [userName, setUserName] = useState('María')

  const handleLogin = (nombre: string) => {
    setUserName(nombre)
    setLogueado(true)
  }

  if (!logueado) {
    return (
      <TabletFrame>
        <LoginScreen onSuccess={handleLogin} />
      </TabletFrame>
    )
  }

  return (
    <MemoVidaProvider userName={userName}>
      <TabletFrame>
        <ScreenRouter />
      </TabletFrame>
    </MemoVidaProvider>
  )
}

function ScreenRouter() {
  // Este componente usa el contexto para saber qué pantalla mostrar
  const { currentScreen } = require('@/lib/memovida-context').useMemoVida()

  const screens: Record<string, React.ReactNode> = {
    'home': <HomeScreen />,
    'mi-dia': <MiDiaScreen />,
    'audiotexto': <AudiotextoScreen />,
    'audiotexto-reproduccion': <AudiotextoReproduccionScreen />,
    'mis-personas': <MisPersonasScreen />,
    'ejercitar-mente': <EjercitarMenteScreen />,
    'quiz': <QuizScreen />,
    'juego-parejas': <JuegoParejasScreen />,
    'eventos': <EventosScreen />,
    'galeria': <GaleriaScreen />,
    'chat': <ChatScreen />,
    'videollamada': <VideollamadaScreen />,
    'configuracion': <ConfiguracionScreen />,
  }

  return <>{screens[currentScreen] ?? <HomeScreen />}</>
}
