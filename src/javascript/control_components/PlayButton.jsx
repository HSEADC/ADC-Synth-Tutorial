import classnames from 'classnames'
import React, { PureComponent } from 'react'

export default class PlayButton extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { on, handleClick } = this.props

    const classes = classnames({
      playButton: true,
      on: on
    })

    return <div className={classes} onClick={handleClick}></div>
  }
}
