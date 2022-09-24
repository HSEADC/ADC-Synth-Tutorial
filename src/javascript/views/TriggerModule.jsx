import React, { PureComponent } from 'react'

import Trigger from '../module_components/Trigger.jsx'

export default class TriggerModule extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Trigger
        togglePlay={this.props.togglePlay}
        handlePlayNote={this.props.handlePlayNote}
      />
    )
  }
}
