import './M_CodeExample.scss'

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import React, { PureComponent } from 'react'
import A_Text from '../../atoms/A_Text/A_Text.jsx'

SyntaxHighlighter.registerLanguage('javascript', js)

export default class M_CodeExample extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { code } = this.props

    return (
      <div className="M_CodeExample">
        <A_Text type="codeExampleLabel" text="Пример кода" />
        <SyntaxHighlighter language="javascript">{code}</SyntaxHighlighter>
      </div>
    )
  }
}
