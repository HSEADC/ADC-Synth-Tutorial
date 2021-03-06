import PropTypes from 'prop-types'
import React, { Component } from 'react'

import Slider from '../../control_components/Slider'
import ButtonSet from '../../control_components/ButtonSet'
import Knob from '../../control_components/Knob'

export default class AutoFilterEffect extends Component {
  constructor(props) {
    super(props)
  }

  updateNodeParams = () => {
    const { node, settings } = this.props

    const {
      wet,
      type,
      frequency,
      depth,
      baseFrequency,
      octaves,
      filter
    } = settings

    node.wet.value = wet
    node.type = type
    node.frequency.value = frequency
    node.depth.value = depth
    node.baseFrequency = baseFrequency
    node.octaves = octaves
    node.filter.type = filter.type
    node.filter.frequency.value = filter.frequency
    node.filter.rolloff = filter.rolloff
    node.filter.Q.value = filter.Q
  }

  handlePropertyValueChange = (property, value) => {
    const { id, handlePropertyValueChange } = this.props
    handlePropertyValueChange(id, property, value)
  }

  render() {
    const { name, settings } = this.props

    const {
      wet,
      type,
      frequency,
      depth,
      baseFrequency,
      octaves,
      filter
    } = settings

    const oscillatorTypes = ['sine', 'square', 'triangle', 'sawtooth']

    const filterTypes = [
      'lowpass',
      'highpass',
      'bandpass',
      'lowshelf',
      'highshelf',
      'notch',
      'allpass',
      'peaking'
    ]

    const rolloffTypes = [-12, -24, -48, -96]

    this.updateNodeParams()

    return (
      <div className="AutoFilterEffect">
        <h1 className="moduleHeaderText">{name}</h1>
        <div className="sliderLargeContainer">
          <Slider
            name="Wet"
            property={['wet']}
            min={0}
            max={1}
            step={0.01}
            value={wet}
            handleChange={this.handlePropertyValueChange}
          />
        </div>
        <div className="knobSliderContainer">
          <div className="knobContainer">
            <Knob
              name="Base Frequency"
              property={['baseFrequency']}
              min={0}
              max={1000}
              value={baseFrequency}
              handleChange={this.handlePropertyValueChange}
            />
          </div>

          <div>
            <div className="sliderMediumContainer">
              <Slider
                name="Frequency"
                property={['frequency']}
                min={0}
                max={100}
                step={0.01}
                value={frequency}
                handleChange={this.handlePropertyValueChange}
              />
            </div>
            <div className="sliderMediumContainer">
              <Slider
                name="Depth"
                property={['depth']}
                min={0}
                max={1}
                step={0.01}
                value={depth}
                handleChange={this.handlePropertyValueChange}
              />
            </div>
            <div className="sliderMediumContainer">
              <Slider
                name="Octaves"
                property={['octaves']}
                min={0}
                max={6}
                step={0.1}
                value={octaves}
                handleChange={this.handlePropertyValueChange}
              />
            </div>
          </div>
        </div>
        <div className="buttonSetLineContainer">
          <ButtonSet
            name="Type"
            property={['type']}
            value={type}
            options={oscillatorTypes}
            handleChange={this.handlePropertyValueChange}
          />
        </div>
        <div className="Filter">
          <h2>Filter</h2>
          <div className="sliderLargeContainer">
            <Slider
              name="Frequency"
              property={['filter', 'frequency']}
              min={0}
              max={1000}
              step={1}
              value={filter.frequency}
              handleChange={this.handlePropertyValueChange}
            />
          </div>
          <div className="buttonSetLineContainer">
            <ButtonSet
              name="Rolloff"
              property={['filter', 'rolloff']}
              value={filter.rolloff}
              options={rolloffTypes}
              handleChange={this.handlePropertyValueChange}
            />
          </div>
          <div className="sliderLargeContainer">
            <Slider
              name="Q"
              property={['filter', 'Q']}
              min={0}
              max={10}
              step={0.01}
              value={filter.Q}
              handleChange={this.handlePropertyValueChange}
            />
          </div>
          <div className="largeButtonSetLineContainer">
            <ButtonSet
              name="Type"
              property={['filter', 'type']}
              value={filter.type}
              options={filterTypes}
              handleChange={this.handlePropertyValueChange}
            />
          </div>
        </div>
      </div>
    )
  }
}

AutoFilterEffect.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  node: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  handlePropertyValueChange: PropTypes.func.isRequired
}
