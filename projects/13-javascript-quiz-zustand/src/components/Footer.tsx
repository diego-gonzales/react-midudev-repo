import { useQuestionsData } from '../hooks/useQuestionsData'
import { Reset } from './Reset'

export const Footer = () => {
  const { correctAnswers, incorrectAnswers, unansweredQuestions } =
    useQuestionsData()

  return (
    <footer style={{ margin: '15px 0' }}>
      <strong>
        ✅Correctas: {correctAnswers} | 🛑Incorrectas: {incorrectAnswers} |
        🕐Sin responder: {unansweredQuestions}
      </strong>
      <div style={{ margin: '15px 0' }}>
        <Reset />
      </div>
    </footer>
  )
}
