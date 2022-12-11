import './M_InstrumentHeader.scss'

import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import A_Text from '../../atoms/A_Text/A_Text.jsx'

export default class M_InstrumentHeaderWithButton extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { text } = this.props

    return (
      <div className="M_InstrumentHeader">
        <A_Text type="instrumentHeader" text={text} />
      </div>
    )
  }
}
