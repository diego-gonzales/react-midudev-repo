import { Button } from '@mui/material'
import { useQuestionsStore } from '../store/questions'
import { LIMIT_QUESTIONS } from '../consts'

export const Start = () => {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions)

  return (
    <Button
      variant="contained"
      onClick={() => {
        fetchQuestions(LIMIT_QUESTIONS)
      }}
    >
      Start!
    </Button>
  )
}
