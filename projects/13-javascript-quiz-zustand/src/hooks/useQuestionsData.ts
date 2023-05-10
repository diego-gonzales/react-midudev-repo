import { useQuestionsStore } from '../store/questions'

export function useQuestionsData() {
  const questions = useQuestionsStore((state) => state.questions)
  let correctAnswers = 0
  let incorrectAnswers = 0
  let unansweredQuestions = 0

  questions.forEach((question) => {
    if (question.userSelectedAnswerIndex === undefined) unansweredQuestions++
    else if (question.isCorrectUserAnswer === true) correctAnswers++
    else incorrectAnswers++
  })

  return { correctAnswers, incorrectAnswers, unansweredQuestions }
}
