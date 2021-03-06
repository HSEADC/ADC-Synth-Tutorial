import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import Triger from '../module_components/Triger'

export default class TrigerModule extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Triger
        togglePlay={this.props.togglePlay}
        handlePlayNote={this.props.handlePlayNote}
      />
    )
  }
}

TrigerModule.propTypes = {
  handlePlayNote: PropTypes.func.isRequired
}
