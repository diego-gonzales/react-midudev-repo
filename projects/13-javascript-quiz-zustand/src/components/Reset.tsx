import { Button } from '@mui/material'
import { useQuestionsStore } from '../store/questions'

export const Reset = () => {
  const reset = useQuestionsStore((state) => state.reset)

  return (
    <Button variant="outlined" onClick={reset}>
      Reset game
    </Button>
  )
}
