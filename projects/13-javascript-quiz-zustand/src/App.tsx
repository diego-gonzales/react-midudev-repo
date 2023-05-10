import { Container, Stack, Typography } from '@mui/material'
import './App.css'
import { JavascriptLogo } from './components/Icons'
import { Start } from './components/Start'
import { useQuestionsStore } from './store/questions'
import { Game } from './components/Game'

function App() {
  const questions = useQuestionsStore((state) => state.questions)

  return (
    <>
      <header>
        <Container maxWidth="sm" sx={{ marginY: 4 }}>
          <Stack
            direction="row"
            gap={2}
            alignItems="center"
            justifyContent="center"
          >
            <JavascriptLogo />
            <Typography variant="h2" component="h1">
              Javascript Quiz
            </Typography>
          </Stack>
        </Container>
        <main>
          {questions.length === 0 && <Start />}
          {questions.length > 0 && <Game />}
        </main>
      </header>
    </>
  )
}

export default App
