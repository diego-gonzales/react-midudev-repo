import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { type Question } from '../types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useQuestionsStore } from '../store/questions'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { Footer } from './Footer'

// solo se crea una vez y es más fácil de testear
const getBackgroundColor = (questionInfo: Question, index: number) => {
  const { userSelectedAnswerIndex, correctAnswer } = questionInfo

  if (userSelectedAnswerIndex == null) return 'transparent'
  if (index !== correctAnswer && index !== userSelectedAnswerIndex)
    return 'transparent'
  if (index === correctAnswer) return 'green'
  // if (index === userSelectedAnswerIndex) return 'red'
  return 'red'
}

const QuestionJS = ({ questionInfo }: { questionInfo: Question }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer)

  // 👀 Esta función retorna otra función que es la que se ejecuta cuando se hace click en una respuesta
  const handleClick = (userAnswerIndex: number) => () => {
    selectAnswer(questionInfo.id, userAnswerIndex)
  }

  return (
    <Card sx={{ bgcolor: '#222', p: 2, textAlign: 'left' }}>
      <Typography variant="h5">{questionInfo.question}</Typography>

      <SyntaxHighlighter language="javascript" style={dark}>
        {questionInfo.code}
      </SyntaxHighlighter>

      <List
        sx={{
          bgcolor: '#333',
          cursor:
            questionInfo.userSelectedAnswerIndex == null
              ? 'default'
              : 'not-allowed',
        }}
        disablePadding
      >
        {questionInfo.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={questionInfo.userSelectedAnswerIndex != null}
              sx={{
                textAlign: 'center',
                backgroundColor: getBackgroundColor(questionInfo, index),
              }}
              onClick={handleClick(index)}
            >
              {' '}
              {/* ☝ Aquí se ejecuta la función que retorna una función */}
              <ListItemText primary={answer} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions)
  const currentQuestionNumber = useQuestionsStore(
    (state) => state.currentQuestionNumber
  )
  const goToNextQuestionNumber = useQuestionsStore(
    (state) => state.goToNextQuestionNumber
  )
  const goToPreviousQuestionNumber = useQuestionsStore(
    (state) => state.goToPreviousQuestionNumber
  )

  const currentQuestion = questions[currentQuestionNumber]

  return (
    <>
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
        justifyContent="center"
        marginY={2}
      >
        <IconButton
          disabled={currentQuestionNumber === 0}
          onClick={goToPreviousQuestionNumber}
        >
          <ArrowBackIosNew />
        </IconButton>
        {currentQuestionNumber + 1} / {questions.length}
        <IconButton
          disabled={currentQuestionNumber === questions.length - 1}
          onClick={goToNextQuestionNumber}
        >
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <QuestionJS questionInfo={currentQuestion} />
      <Footer />
    </>
  )
}
