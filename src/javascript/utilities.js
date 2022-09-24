function generateUniqId() {
  return Math.floor(Math.random() * Date.now())
}

export { generateUniqId }
