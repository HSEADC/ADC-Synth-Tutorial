import React from 'react'
import ReactDOM from 'react-dom'

import TriggerContainer from '../containers/TriggerContainer.jsx'
import KeyboardContainer from '../containers/KeyboardContainer.jsx'
import SequencerContainer from '../containers/SequencerContainer.jsx'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <TriggerContainer />,
    document.getElementById('interactiveModule_1')
  )

  ReactDOM.render(
    <KeyboardContainer />,
    document.getElementById('interactiveModule_2')
  )

  ReactDOM.render(
    <SequencerContainer />,
    document.getElementById('interactiveModule_3')
  )
})
