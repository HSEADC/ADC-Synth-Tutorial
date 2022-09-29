import './M_SampleSequencerRow.scss'

import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import A_ToggleButton from '../../atoms/A_ToggleButton/A_ToggleButton.jsx'

export default class M_SampleSequencerRow extends PureComponent {
  constructor(props) {
    super(props)
  }

  renderSampleSequencerBlocks = () => {
    const { note, sequence, handleClick } = this.props
    const elements = []

    console.log(sequence)

    ;(16).times((i) => {
      elements.push(
        <A_ToggleButton
          type="sampleSequencerBlock"
          isOn={sequence.includes(i)}
          handleClick={() => {
            handleClick(note, i)
          }}
          key={i}
        />
      )
    })

    return elements
  }

  render() {
    return (
      <div className="M_SampleSequencerRow">
        {this.renderSampleSequencerBlocks()}
      </div>
    )
  }
}
