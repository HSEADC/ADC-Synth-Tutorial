import './M_InstrumentHeaderWithButton.scss'

import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import A_Text from '../../atoms/A_Text/A_Text.jsx'
import A_ToggleButton from '../../atoms/A_ToggleButton/A_ToggleButton.jsx'

export default class M_InstrumentHeaderWithButton extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { isOn, handleClick } = this.props

    return (
      <div className="M_InstrumentHeaderWithButton">
        <A_ToggleButton type="play" isOn={isOn} handleClick={handleClick} />

        <A_Text type="instrumentHeader" text="Oscillator" />
      </div>
    )
  }
}
