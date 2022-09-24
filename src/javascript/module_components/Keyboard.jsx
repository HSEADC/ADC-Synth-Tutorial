import React, { PureComponent } from 'react'

export default class Keyboard extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="mainContainer">
        <div>
          <div className="moduleHeaderText">Клавиатура</div>
          <div className="keyboardContainer">
            {this.props.renderNoteButtons()}
          </div>
        </div>

        <div className="Arrow"></div>
        <div className="oscilatorContainer">Осцилятор</div>
      </div>
    )
  }
}
