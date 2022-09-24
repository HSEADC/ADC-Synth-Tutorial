import React, { PureComponent } from 'react'

export default class Button extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { text, handleClick } = this.props

    return (
      <div className="Button" onClick={handleClick}>
        {text}
      </div>
    )
  }
}
