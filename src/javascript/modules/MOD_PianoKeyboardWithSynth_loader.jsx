import React from 'react'
import { createRoot } from 'react-dom/client'

import MOD_PianoKeyboardWithSynth from './MOD_PianoKeyboardWithSynth.jsx'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('MOD_PianoKeyboardWithSynth')
  const root = createRoot(container)
  root.render(<MOD_PianoKeyboardWithSynth />)
})
