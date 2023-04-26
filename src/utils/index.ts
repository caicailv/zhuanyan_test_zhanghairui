export const randomData = () => {
  return (
    Math.random().toString(36).substr(2) + Date.parse(new Date().toString())
  )
}
