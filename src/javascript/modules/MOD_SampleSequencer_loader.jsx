import * as Tone from 'tone'

import React from 'react'
import { createRoot } from 'react-dom/client'

import MOD_SampleSequencer from './MOD_SampleSequencer.jsx'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('MOD_SampleSequencer')
  const root = createRoot(container)
  root.render(<MOD_SampleSequencer />)
})
