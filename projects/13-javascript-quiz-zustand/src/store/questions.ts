import { create } from 'zustand'
import { type Question } from '../types'
import confetti from 'canvas-confetti'
import { persist, devtools } from 'zustand/middleware'
import { getAllQuestions } from '../services/questions'

interface State {
  questions: Question[]
  currentQuestionNumber: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionID: number, userAnswerIndex: number) => void
  goToNextQuestionNumber: () => void
  goToPreviousQuestionNumber: () => void
  reset: () => void
}

export const useQuestionsStore = create<State>()(
  // add the devtools middleware to log state changes in the browser console (with Redux DevTools extension installed)
  devtools(
    // persist the store to localStorage using the `persist` middleware
    persist(
      (set, get) => ({
        questions: [],
        currentQuestionNumber: 0,
        fetchQuestions: async (limit: number) => {
          const data = await getAllQuestions()
          const questions = data.sort(() => Math.random() - 0.5).slice(0, limit) // <-- shuffle and slice the array
          set({ questions }, false, 'FETCH_QUESTIONS') // <-- second and third were added to name the action in the devtools, and avoid 'anonymous' name
        },
        selectAnswer: (questionID: number, userAnswerIndex: number) => {
          const { questions } = get()

          const newQuestions: Question[] = structuredClone(questions)
          const questionIndex = newQuestions.findIndex(
            (q) => q.id === questionID
          )
          const questionInfo = newQuestions[questionIndex]
          const isCorrectUserAnswer =
            questionInfo.correctAnswer === userAnswerIndex

          if (isCorrectUserAnswer) confetti()

          questionInfo.userSelectedAnswerIndex = userAnswerIndex
          questionInfo.isCorrectUserAnswer = isCorrectUserAnswer

          set({ questions: newQuestions }, false, 'SELECT_ANSWER') // <--
        },
        goToNextQuestionNumber: () => {
          const { currentQuestionNumber, questions } = get()

          if (currentQuestionNumber === questions.length - 1) return

          set(
            { currentQuestionNumber: currentQuestionNumber + 1 },
            false,
            'GO_TO_NEXT_QUESTION_NUMBER'
          )
        },
        goToPreviousQuestionNumber: () => {
          const { currentQuestionNumber } = get()

          if (currentQuestionNumber === 0) return

          set(
            { currentQuestionNumber: currentQuestionNumber - 1 },
            false,
            'GO_TO_PREVIOUS_QUESTION_NUMBER'
          )
        },
        reset: () => {
          set({ questions: [], currentQuestionNumber: 0 }, false, 'RESET')
        },
      }),
      { name: 'questions' }
    )
  )
)
