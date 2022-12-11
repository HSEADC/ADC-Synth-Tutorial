import './M_Slider.scss'

import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import A_Text from '../../atoms/A_Text/A_Text.jsx'
import A_SliderInput from '../../atoms/A_SliderInput/A_SliderInput.jsx'

export default class A_Slider extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      label,
      description,
      min,
      max,
      step,
      value,
      handleInput
    } = this.props

    return (
      <div className="M_Slider">
        <div className="W_SliderHeader">
          <A_Text type="sliderLabel" text={label} />
          <A_Text type="sliderDescription" text={description} />
        </div>

        <A_SliderInput
          min={min}
          max={max}
          step={step}
          value={value}
          handleInput={handleInput}
        />
      </div>
    )
  }
}
