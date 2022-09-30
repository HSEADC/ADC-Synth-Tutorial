import * as Tone from 'tone'

import React from 'react'
import { createRoot } from 'react-dom/client'

import T_OscillatorFrequency from './javascript/templates/T_OscillatorFrequency.jsx'
import T_ToneSynthTriggerNote from './javascript/templates/T_ToneSynthTriggerNote.jsx'
import T_PianoKeyboardWithSynth from './javascript/templates/T_PianoKeyboardWithSynth.jsx'
import T_SampleSequencer from './javascript/templates/T_SampleSequencer.jsx'

document.addEventListener('DOMContentLoaded', () => {
  const container1 = document.getElementById('interactiveModule_1')
  const root1 = createRoot(container1)
  root1.render(<T_OscillatorFrequency />)

  const container2 = document.getElementById('interactiveModule_2')
  const root2 = createRoot(container2)
  root2.render(<T_ToneSynthTriggerNote />)

  const container3 = document.getElementById('interactiveModule_3')
  const root3 = createRoot(container3)
  root3.render(<T_PianoKeyboardWithSynth />)

  // 4 container

  const container5 = document.getElementById('interactiveModule_5')
  const root5 = createRoot(container5)
  root5.render(<T_SampleSequencer />)
})
