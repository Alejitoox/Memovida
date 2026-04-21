"use client"

import { useState } from 'react'
import { useMemoVida } from '@/lib/memovida-context'
import { TabletFrame } from '../tablet-frame'
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  hint?: string
}

const questions: Question[] = [
  {
    id: 1,
    question: '¿A qué hora desayunaste hoy?',
    options: ['7:00', '8:00', '9:00', '10:00'],
    correctAnswer: 1,
    hint: 'Fue después de tomar tu medicamento'
  },
  {
    id: 2,
    question: '¿Qué medicamento tomaste en la mañana?',
    options: ['Vitaminas', 'Pastilla para la presión', 'Pastilla para dormir', 'Ninguno'],
    correctAnswer: 1,
    hint: 'Es un medicamento que tomas todos los días'
  },
  {
    id: 3,
    question: '¿Qué actividad física tienes programada?',
    options: ['Yoga', 'Caminata de 15 minutos', 'Natación', 'Bicicleta'],
    correctAnswer: 1,
    hint: 'Es una actividad que puedes hacer cerca de casa'
  },
  {
    id: 4,
    question: '¿Qué comiste en el desayuno?',
    options: ['Huevos con tocino', 'Pan con café y fruta', 'Cereal con leche', 'Solo café'],
    correctAnswer: 1,
    hint: 'Incluía una bebida caliente'
  },
  {
    id: 5,
    question: '¿A qué hora está programada tu siesta?',
    options: ['13:00', '14:00', '15:00', '16:00'],
    correctAnswer: 2,
    hint: 'Es después del almuerzo'
  },
]

export function QuizScreen() {
  const { navigateTo } = useMemoVida()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [isQuizComplete, setIsQuizComplete] = useState(false)

  const question = questions[currentQuestion]
  const isCorrect = selectedAnswer === question.correctAnswer

  const handleSelectAnswer = (index: number) => {
    if (showResult) return
    setSelectedAnswer(index)
    setShowResult(true)
    if (index === question.correctAnswer) {
      setScore(prev => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setShowHint(false)
    } else {
      setIsQuizComplete(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setShowHint(false)
    setIsQuizComplete(false)
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage === 100) return '¡Excelente memoria!'
    if (percentage >= 80) return '¡Muy bien!'
    if (percentage >= 60) return '¡Buen trabajo!'
    return '¡Sigue practicando!'
  }

  if (isQuizComplete) {
    return (
      <TabletFrame 
        title="Recordar Mi Día" 
        showBackButton 
        showHomeButton
        headerColor="bg-amber-500"
      >
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-8">
          <div className="bg-card rounded-3xl p-8 max-w-md w-full text-center border border-border">
            <div className="h-24 w-24 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
              <Trophy className="h-12 w-12 text-amber-600" />
            </div>
            
            <h2 className="text-3xl font-bold text-card-foreground mb-2">
              {getScoreMessage()}
            </h2>
            
            <p className="text-xl text-muted-foreground mb-6">
              Recordaste {score} de {questions.length} actividades
            </p>

            {/* Barra de progreso visual */}
            <div className="h-4 bg-secondary rounded-full overflow-hidden mb-8">
              <div 
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${(score / questions.length) * 100}%` }}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Button
                onClick={handleRestart}
                className="w-full h-14 text-lg bg-amber-500 hover:bg-amber-600"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Intentar de nuevo
              </Button>
              <Button
                onClick={() => navigateTo('mi-dia')}
                variant="outline"
                className="w-full h-14 text-lg"
              >
                Volver a Mi Día
              </Button>
            </div>
          </div>
        </div>
      </TabletFrame>
    )
  }

  return (
    <TabletFrame 
      title="Recordar Mi Día" 
      showBackButton 
      showHomeButton
      headerColor="bg-amber-500"
    >
      <div className="p-6 max-w-2xl mx-auto">
        {/* Progreso */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-lg text-muted-foreground">
            Pregunta {currentQuestion + 1} de {questions.length}
          </span>
          <span className="text-lg font-bold text-primary">
            {score} correctas
          </span>
        </div>

        <div className="h-2 bg-secondary rounded-full overflow-hidden mb-8">
          <div 
            className="h-full bg-amber-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Pregunta */}
        <div className="bg-card rounded-2xl p-6 border border-border mb-6">
          <h2 className="text-2xl font-bold text-card-foreground mb-6 text-balance">
            {question.question}
          </h2>

          {/* Opciones */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              let buttonClass = 'w-full p-5 rounded-xl border-2 text-left text-lg font-medium transition-all '
              
              if (showResult) {
                if (index === question.correctAnswer) {
                  buttonClass += 'bg-emerald-100 border-emerald-500 text-emerald-700'
                } else if (index === selectedAnswer && !isCorrect) {
                  buttonClass += 'bg-rose-100 border-rose-500 text-rose-700'
                } else {
                  buttonClass += 'bg-secondary/50 border-border text-muted-foreground'
                }
              } else {
                buttonClass += 'bg-card border-border text-card-foreground hover:border-primary hover:bg-primary/5'
              }

              return (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={showResult}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && index === question.correctAnswer && (
                      <CheckCircle className="h-6 w-6 text-emerald-600" />
                    )}
                    {showResult && index === selectedAnswer && !isCorrect && (
                      <XCircle className="h-6 w-6 text-rose-600" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Pista */}
        {!showResult && question.hint && (
          <div className="text-center mb-6">
            {showHint ? (
              <p className="text-lg text-amber-600 bg-amber-50 p-4 rounded-xl">
                Pista: {question.hint}
              </p>
            ) : (
              <button
                onClick={() => setShowHint(true)}
                className="text-lg text-primary underline"
              >
                Necesito una pista
              </button>
            )}
          </div>
        )}

        {/* Resultado y siguiente */}
        {showResult && (
          <div className="text-center">
            <p className={`text-xl font-bold mb-4 ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
              {isCorrect ? '¡Correcto! Muy bien recordado.' : 'No te preocupes, la próxima lo lograrás.'}
            </p>
            <Button
              onClick={handleNext}
              className="h-14 px-8 text-lg bg-amber-500 hover:bg-amber-600"
            >
              {currentQuestion < questions.length - 1 ? (
                <>
                  Siguiente pregunta
                  <ArrowRight className="h-5 w-5 ml-2" />
                </>
              ) : (
                'Ver resultados'
              )}
            </Button>
          </div>
        )}
      </div>
    </TabletFrame>
  )
}
