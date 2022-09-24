import React, { PureComponent } from 'react'

import SequencerRow from '../control_components/SequencerRow.jsx'

export default class Sequencer extends PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { node } = this.props
    node.start()
  }

  updateNodeParams = () => {
    // const { node, settings } = this.props
    // const { sequence } = settings
    //
    // node.clear()
    //
    // sequence.forEach((event, i) => {
    //   node.add(event)
    // })
  }

  handlePropertyValueChange = (property, value) => {
    const { id, handlePropertyValueChange } = this.props

    property.push(value)
    property.push('velocity')

    handlePropertyValueChange(id, property, value)
  }

  renderGrid = () => {
    const { scale } = this.props.settings

    // const eights = [
    //   '0:0:0',
    //   '0:0:2',
    //   '0:1:0',
    //   '0:1:2',
    //   '0:2:0',
    //   '0:2:2',
    //   '0:3:0',
    //   '0:3:2',
    //   '1:0:0',
    //   '1:0:2',
    //   '1:1:0',
    //   '1:1:2',
    //   '1:2:0',
    //   '1:2:2',
    //   '1:3:0',
    //   '1:3:2'
    // ]

    const eights = [
      {
        position: '0:0:0',
        style: 'white'
      },
      {
        position: '0:0:2',
        style: 'white'
      },
      {
        position: '0:1:0',
        style: 'white'
      },
      {
        position: '0:1:2',
        style: 'white'
      },
      {
        position: '0:2:0',
        style: 'grey'
      },
      {
        position: '0:2:2',
        style: 'grey'
      },
      {
        position: '0:3:0',
        style: 'grey'
      },
      {
        position: '0:3:2',
        style: 'grey'
      },
      {
        position: '1:0:0',
        style: 'white'
      },
      {
        position: '1:0:2',
        style: 'white'
      },
      {
        position: '1:1:0',
        style: 'white'
      },
      {
        position: '1:1:2',
        style: 'white'
      },
      {
        position: '1:2:0',
        style: 'grey'
      },
      {
        position: '1:2:2',
        style: 'grey'
      },
      {
        position: '1:3:0',
        style: 'grey'
      },
      {
        position: '1:3:2',
        style: 'grey'
      }
    ]

    const rows = []

    scale.forEach((note, i) => {
      rows.push(
        <SequencerRow
          name={note}
          property={[note]}
          options={eights}
          handleChange={this.handlePropertyValueChange}
          key={i}
        />
      )
    })

    return rows
  }

  render() {
    const { name, settings } = this.props

    this.updateNodeParams()

    return <div className="Sequencer">{this.renderGrid()}</div>
  }
}
