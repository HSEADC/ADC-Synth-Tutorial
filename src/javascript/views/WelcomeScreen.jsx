import React, { PureComponent } from 'react'

import Button from '../control_components/Button.jsx'

export default class WelcomeScreen extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { handleStartWebAudio } = this.props

    return (
      <div className="WelcomeScreen">
        <Button text="Start" handleClick={handleStartWebAudio} />
      </div>
    )
  }
}
