import './A_Text.scss'

import classnames from 'classnames'
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

export default class A_Text extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { type, text } = this.props

    const classes = classnames({
      A_Text: true,
      [`${type}`]: true
    })

    return <div className={classes}>{text}</div>
  }
}
