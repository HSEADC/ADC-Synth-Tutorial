import * as Tone from 'tone'

import React from 'react'
import { createRoot } from 'react-dom/client'

import MOD_ToneSynthTriggerNote from './MOD_ToneSynthTriggerNote.jsx'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('MOD_ToneSynthTriggerNote')
  const root = createRoot(container)
  root.render(<MOD_ToneSynthTriggerNote />)
})
