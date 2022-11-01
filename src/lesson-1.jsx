import * as Tone from 'tone'

import React from 'react'
import { createRoot } from 'react-dom/client'

import MOD_OscillatorFrequency from './javascript/modules/MOD_OscillatorFrequency.jsx'
import MOD_ToneSynthTriggerNote from './javascript/modules/MOD_ToneSynthTriggerNote.jsx'
import MOD_PianoKeyboardWithSynth from './javascript/modules/MOD_PianoKeyboardWithSynth.jsx'
import MOD_SampleSequencer from './javascript/modules/MOD_SampleSequencer.jsx'
import MOD_MelodySequencer from './javascript/modules/MOD_MelodySequencer.jsx'

document.addEventListener('DOMContentLoaded', () => {
  const container1 = document.getElementById('interactiveModule_1')
  const root1 = createRoot(container1)
  root1.render(<MOD_OscillatorFrequency />)

  const container2 = document.getElementById('interactiveModule_2')
  const root2 = createRoot(container2)
  root2.render(<MOD_ToneSynthTriggerNote />)

  const container3 = document.getElementById('interactiveModule_3')
  const root3 = createRoot(container3)
  root3.render(<MOD_PianoKeyboardWithSynth />)

  // 4 container

  const container5 = document.getElementById('interactiveModule_5')
  const root5 = createRoot(container5)
  root5.render(<MOD_SampleSequencer />)

  const container6 = document.getElementById('interactiveModule_6')
  const root6 = createRoot(container6)
  root6.render(<MOD_MelodySequencer />)
})
