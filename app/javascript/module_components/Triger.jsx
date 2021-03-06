import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import PlayButton from '../control_components/PlayButton'

export default class Triger extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="mainContainer">
        <div className="trigerContainer">
          <div className="trigerHeaderContainer">
            <PlayButton
              on={this.props.togglePlay}
              handleClick={() => {
                this.props.handlePlayNote('C4', '1')
              }}
            />
            <div>Триггер</div>
            <div></div>
          </div>
          <div className="trigerBodyContainer">
            <div className="wrapper">
              <div>Нота:</div>
              <h4>C4</h4>
            </div>
            <div className="wrapper">
              <div>Длитиельность:</div>
              <h4>1 секунда</h4>
            </div>
          </div>
        </div>

        <div className="Arrow"></div>
        <div className="oscilatorContainer">Осцилятор</div>
      </div>
    )
  }
}

Triger.propTypes = {
  handlePlayNote: PropTypes.func.isRequired
}
