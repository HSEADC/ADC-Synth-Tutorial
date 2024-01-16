import React from 'react'
import { createRoot } from 'react-dom/client'

import MOD_OscillatorFrequency from './MOD_OscillatorFrequency.jsx'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('MOD_OscillatorFrequency')
  const root = createRoot(container)
  root.render(<MOD_OscillatorFrequency />)
})
