import React from 'react'
import { createRoot } from 'react-dom/client'

import MOD_MelodySequencer from './MOD_MelodySequencer.jsx'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('MOD_MelodySequencer')
  const root = createRoot(container)
  root.render(<MOD_MelodySequencer />)
})
