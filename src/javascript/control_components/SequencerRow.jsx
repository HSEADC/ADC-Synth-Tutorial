import React, { PureComponent } from 'react'

import SequencerToggleButton from './SequencerToggleButton.jsx'

export default class SequencerRow extends PureComponent {
  constructor(props) {
    super(props)
  }

  checkToggleState = (option, events) => {
    const { name } = this.props
    let toggleState = false

    events.forEach((event, i) => {
      if (event.time === option && event.noteName === name) {
        toggleState = true
      }
    })

    return toggleState
  }

  handleChange = (value) => {
    const { property, handleChange } = this.props
    handleChange(property, value)
  }

  render() {
    const { name, options, value } = this.props
    const buttonElements = []

    options.forEach((option, i) => {
      buttonElements.push(
        <SequencerToggleButton
          text={option.position}
          sectionStyle={option.style}
          isOn={this.checkToggleState(option.position, value)}
          handleClick={() => this.handleChange(option.position)}
          key={i}
        />
      )
    })

    return <div className="SequencerRow">{buttonElements}</div>
  }
}
