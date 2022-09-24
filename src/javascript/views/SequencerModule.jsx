import React, { PureComponent } from 'react'

import Button from '../control_components/Button.jsx'
import PlayButton from '../control_components/PlayButton.jsx'

import Sequencer from '../module_components/Sequencer.jsx'

export default class SequencerModule extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { instrument, handlePropertyValueChange } = this.props
    const { id, name, type, node, settings } = instrument

    return (
      <div className="mainSequencerContainer">
        <div className="moduleHeaderButton">
          <div className="headerButton">
            <PlayButton
              on={this.props.togglePlay}
              handleClick={this.props.handlePlaySequence}
            />
          </div>
          <span>Мелодия</span>
        </div>

        <div className="SequencerModule">
          <Sequencer
            id={id}
            name={name}
            node={node}
            settings={settings}
            handlePropertyValueChange={handlePropertyValueChange}
          />
        </div>

        <div className="Arrow"></div>
        <div className="moduleHeaderText">Синтезатор</div>
      </div>
    )
  }
}
