import './O_SampleSequencerGrid.scss'

import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import M_SampleSequencerRow from '../../molecules/M_SampleSequencerRow/M_SampleSequencerRow.jsx'

export default class O_SampleSequencerGrid extends PureComponent {
  constructor(props) {
    super(props)
  }

  renderSampleSequencerRows = () => {
    const { samples, sequence, handleClick } = this.props
    const elements = []

    Object.keys(samples).forEach((key, i) => {
      elements.push(
        <M_SampleSequencerRow
          note={key}
          name={samples[key]}
          sequence={sequence[key]}
          handleClick={handleClick}
          key={i}
        />
      )
    })

    return elements
  }

  render() {
    return (
      <div className="O_SampleSequencerGrid">
        {this.renderSampleSequencerRows()}
      </div>
    )
  }
}
