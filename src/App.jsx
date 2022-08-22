import React from 'react'
import questions from './Questions.js'
import { useState, useEffect } from 'react'

function App() {
  const [preguntaActual,  setPreguntaActual] = useState(0)
  const [puntuacion, setPuntuacion] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [tiempoRestante, setTiempoRestante] = useState(10)
  const [areDisabled, setAreDisabled] = useState(false)
  const [answerShow, setAnswerShow] = useState(false)

  function handleAnswerSubmit(isCorrect, e){
    if(isCorrect) setPuntuacion(puntuacion + 1);
    e.target.classList.add(isCorrect ? "correct" : "incorrect");
    
    setTimeout(() => {
      if(preguntaActual === questions.length - 1){
        setIsFinished(true)
      } else {
        setPreguntaActual(preguntaActual + 1);
      }
    }, 1000)
  }

  useEffect(() => {
    const intervalo = setInterval(() => {
      if(tiempoRestante > 0) setTiempoRestante((prev) => prev - 1);
      if(tiempoRestante === 0) setAreDisabled(true)
    }, 1000)
    return () => clearInterval(intervalo)
  }, [tiempoRestante])
  
  if(answerShow) return (
    <main className='app'>
      <div className='left-side'>
        <div className='question-number'>
          <span>Pregunta {preguntaActual + 1} de {questions.length}</span>
        </div>
        <div className='question-tittle'>
          {questions[preguntaActual].titulo}
        </div>
        <div>
          {questions[preguntaActual].opciones.filter((opcion) => opcion.isCorrect)[0].textoRespuesta}
        </div>
        <button onClick={() => {
          if(preguntaActual === questions.length - 1){
            window.location.href="/";
          } else {
            setPreguntaActual(preguntaActual + 1);
          }
        }}>
          {preguntaActual === questions.length - 1 ? "Volver a jugar" : "Continuar"}
        </button>
      </div>
    </main>
  )

  if(isFinished) return (
    <main className='app'>
      <div className='game-over'>
        <span> Obtuviste {puntuacion} puntos de {questions.length} </span>
        <button onClick={() => (window.location.href="/")}>Volver a Jugar</button>
        <button onClick={() => {
          setIsFinished(false)
          setAnswerShow(true)
          setPreguntaActual(0)
        }}>Ver Respuestas</button>
      </div>
    </main>
  )

  return (
    <main className='app'>
      <div className='left-side'>
        <div className='question-number'>
          <span>Pregunta {preguntaActual + 1} de {questions.length}</span>
        </div>
        <div className='question-tittle'>
          {questions[preguntaActual].titulo}
        </div>
        <div>
          {!areDisabled ? (
            <span className='time-left'>Tiempo restante: {tiempoRestante}</span>
          ) : (
            <button onClick={() => {
              setTiempoRestante(10);
              setAreDisabled(false);
              setPreguntaActual(preguntaActual + 1);
            }}>Continuar... </button>
          )}
        </div>
      </div>
      <div className='right-side'>
        {questions[preguntaActual].opciones.map((answer) => (
          <button 
          disabled={areDisabled}
          key={answer.textoRespuesta} onClick={(e) => handleAnswerSubmit(answer.isCorrect, e)}> {answer.textoRespuesta} </button>
        ))}
      </div> 
    </main>
  )
}

export default App
