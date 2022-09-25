import './A_ToggleButton.scss'

import classnames from 'classnames'
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

export default class A_ToggleButton extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { type, text, isOn, handleClick } = this.props

    const classes = classnames({
      A_ToggleButton: true,
      [`${type}`]: true,
      isOn: isOn
    })

    return (
      <div className={classes} onClick={handleClick}>
        {text}
      </div>
    )
  }
}
