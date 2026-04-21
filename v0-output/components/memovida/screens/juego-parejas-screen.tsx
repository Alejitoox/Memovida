"use client"

import { useState, useEffect, useCallback } from 'react'
import { useMemoVida } from '@/lib/memovida-context'
import { TabletFrame } from '../tablet-frame'
import { RotateCcw, Trophy, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Card {
  id: number
  symbol: string
  isFlipped: boolean
  isMatched: boolean
}

// Símbolos grandes y claros para adultos mayores
const symbols = ['🌸', '🌻', '🍎', '🌙', '⭐', '🏠', '❤️', '🌈']

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

function createCards(): Card[] {
  // Usar solo 6 pares para un juego más fácil
  const gameSymbols = symbols.slice(0, 6)
  const pairs = [...gameSymbols, ...gameSymbols]
  const shuffled = shuffleArray(pairs)
  
  return shuffled.map((symbol, index) => ({
    id: index,
    symbol,
    isFlipped: false,
    isMatched: false
  }))
}

export function JuegoParejas() {
  const { navigateTo } = useMemoVida()
  const [cards, setCards] = useState<Card[]>(createCards)
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [gameTime, setGameTime] = useState(0)
  const [isGameComplete, setIsGameComplete] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const totalPairs = 6

  // Timer
  useEffect(() => {
    if (isGameComplete) return
    
    const interval = setInterval(() => {
      setGameTime(prev => prev + 1)
    }, 1000)
    
    return () => clearInterval(interval)
  }, [isGameComplete])

  // Check for matches
  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsProcessing(true)
      const [first, second] = flippedCards
      const firstCard = cards.find(c => c.id === first)
      const secondCard = cards.find(c => c.id === second)

      if (firstCard && secondCard && firstCard.symbol === secondCard.symbol) {
        // Match found!
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second
              ? { ...card, isMatched: true }
              : card
          ))
          setMatchedPairs(prev => prev + 1)
          setFlippedCards([])
          setIsProcessing(false)
        }, 500)
      } else {
        // No match - flip back
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second
              ? { ...card, isFlipped: false }
              : card
          ))
          setFlippedCards([])
          setIsProcessing(false)
        }, 1000)
      }
    }
  }, [flippedCards, cards])

  // Check for game completion
  useEffect(() => {
    if (matchedPairs === totalPairs) {
      setIsGameComplete(true)
    }
  }, [matchedPairs])

  const handleCardClick = useCallback((cardId: number) => {
    if (isProcessing) return
    if (flippedCards.length >= 2) return
    
    const card = cards.find(c => c.id === cardId)
    if (!card || card.isFlipped || card.isMatched) return

    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ))
    setFlippedCards(prev => [...prev, cardId])
    setMoves(prev => prev + 1)
  }, [cards, flippedCards, isProcessing])

  const resetGame = () => {
    setCards(createCards())
    setFlippedCards([])
    setMoves(0)
    setMatchedPairs(0)
    setGameTime(0)
    setIsGameComplete(false)
    setIsProcessing(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${String(secs).padStart(2, '0')}`
  }

  const getScoreMessage = () => {
    if (moves <= 15) return '¡Increíble memoria!'
    if (moves <= 20) return '¡Muy bien!'
    if (moves <= 25) return '¡Buen trabajo!'
    return '¡Lo lograste!'
  }

  if (isGameComplete) {
    return (
      <TabletFrame 
        title="Juego de Parejas" 
        showBackButton 
        showHomeButton
        headerColor="bg-purple-600"
      >
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-8">
          <div className="bg-card rounded-3xl p-8 max-w-md w-full text-center border border-border">
            <div className="h-24 w-24 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-6">
              <Trophy className="h-12 w-12 text-purple-600" />
            </div>
            
            <h2 className="text-3xl font-bold text-card-foreground mb-2">
              {getScoreMessage()}
            </h2>
            
            <p className="text-xl text-muted-foreground mb-6">
              Encontraste todas las parejas
            </p>

            {/* Estadísticas */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-secondary rounded-xl p-4">
                <p className="text-3xl font-bold text-primary">{moves}</p>
                <p className="text-sm text-muted-foreground">Movimientos</p>
              </div>
              <div className="bg-secondary rounded-xl p-4">
                <p className="text-3xl font-bold text-primary">{formatTime(gameTime)}</p>
                <p className="text-sm text-muted-foreground">Tiempo</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                onClick={resetGame}
                className="w-full h-14 text-lg bg-purple-600 hover:bg-purple-700"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Jugar de nuevo
              </Button>
              <Button
                onClick={() => navigateTo('ejercitar-mente')}
                variant="outline"
                className="w-full h-14 text-lg"
              >
                Volver al menú
              </Button>
            </div>
          </div>
        </div>
      </TabletFrame>
    )
  }

  return (
    <TabletFrame 
      title="Juego de Parejas" 
      showBackButton 
      showHomeButton
      headerColor="bg-purple-600"
    >
      <div className="p-4">
        {/* Estadísticas del juego */}
        <div className="flex justify-between items-center mb-4 px-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-5 w-5" />
            <span className="text-lg font-medium">{formatTime(gameTime)}</span>
          </div>
          <div className="text-lg font-medium text-foreground">
            Parejas: {matchedPairs}/{totalPairs}
          </div>
          <div className="text-lg font-medium text-muted-foreground">
            Movimientos: {moves}
          </div>
        </div>

        {/* Grid de cartas - 4x3 */}
        <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={card.isFlipped || card.isMatched || isProcessing}
              className={`aspect-square rounded-2xl text-5xl flex items-center justify-center transition-all duration-300 transform ${
                card.isFlipped || card.isMatched
                  ? 'bg-white border-2 border-purple-300 rotate-0'
                  : 'bg-purple-600 border-2 border-purple-700 hover:bg-purple-500'
              } ${
                card.isMatched ? 'opacity-70 scale-95' : ''
              }`}
              style={{
                perspective: '1000px',
              }}
            >
              {card.isFlipped || card.isMatched ? (
                <span style={{ fontSize: '2.5rem' }}>{card.symbol}</span>
              ) : (
                <span className="text-white text-3xl font-bold">?</span>
              )}
            </button>
          ))}
        </div>

        {/* Instrucciones */}
        <div className="mt-6 text-center">
          <p className="text-lg text-muted-foreground">
            Toca las cartas para encontrar las parejas iguales
          </p>
        </div>

        {/* Botón reiniciar */}
        <div className="mt-4 text-center">
          <Button
            onClick={resetGame}
            variant="outline"
            className="h-12 px-6"
          >
            <RotateCcw className="h-5 w-5 mr-2" />
            Reiniciar juego
          </Button>
        </div>
      </div>
    </TabletFrame>
  )
}
