import React from 'react'
import { createRoot } from 'react-dom/client'

import T_OscillatorFrequency from './javascript/templates/T_OscillatorFrequency.jsx'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('interactiveModule_1')
  const root = createRoot(container)
  root.render(<T_OscillatorFrequency />)
})
