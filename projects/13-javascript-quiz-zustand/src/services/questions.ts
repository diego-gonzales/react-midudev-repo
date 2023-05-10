export const getAllQuestions = async () => {
  const response = await fetch('http://localhost:5173/data.json')
  const data = await response.json()
  return data
}
