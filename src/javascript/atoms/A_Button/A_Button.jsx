import './A_Button.scss'

import classnames from 'classnames'
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

export default class A_Button extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { type, text, handleClick } = this.props

    const classes = classnames({
      A_Button: true,
      [`${type}`]: true
    })

    return (
      <div className={classes} onClick={handleClick}>
        {text}
      </div>
    )
  }
}
