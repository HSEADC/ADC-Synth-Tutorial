import './A_SliderInput.scss'

import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

export default class A_SliderInput extends PureComponent {
  constructor(props) {
    super(props)
    this.input = React.createRef()
  }

  componentDidMount() {
    const { value } = this.props
    const input = this.input.current
    input.value = value
  }

  render() {
    const { min, max, step, handleInput } = this.props

    return (
      <input
        className="A_SliderInput"
        type="range"
        min={min}
        max={max}
        step={step}
        onInput={handleInput}
        ref={this.input}
      />
    )
  }
}
