import * as Tone from 'tone'

import React from 'react'
import { createRoot } from 'react-dom/client'

// import MOD_OscillatorFrequency from './javascript/modules/MOD_OscillatorFrequency.jsx'
import MOD_OscillatorFrequency from './MOD_OscillatorFrequency.jsx'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('interactiveModule_1')
  const root = createRoot(container)
  root.render(<MOD_OscillatorFrequency />)
})
