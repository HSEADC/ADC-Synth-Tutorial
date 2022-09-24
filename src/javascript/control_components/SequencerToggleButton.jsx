import classnames from 'classnames'
import React, { PureComponent } from 'react'

export default class SequencerToggleButton extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isPressed: true
    }
  }

  handleTogglePressed = () => {
    this.setState({
      isPressed: !this.state.isPressed
    })

    this.props.handleClick(this.state.isPressed)
  }

  render() {
    const { text, isOn, handleClick, sectionStyle } = this.props
    let grey = false

    if (sectionStyle === 'grey') {
      grey = true
    }

    const classes = classnames({
      SequencerToggleButton: true,
      active: isOn,
      grey: grey
    })

    return (
      <div
        className={classes}
        onClick={() => {
          this.handleTogglePressed()
        }}
      >
        {text}
      </div>
    )
  }
}
