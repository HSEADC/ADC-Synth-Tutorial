// Lesson_3

import React from 'react'
import ReactDOM from 'react-dom'
import ToneSynthContainer from '../containers/ToneSynthContainer'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ToneSynthContainer disabled={0} synth={'AMSynth'} />,
    document.body.getElementsByClassName('interactive_module_20')[0]
  )
})
