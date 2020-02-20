import React, { Component } from 'react';

import E from '../../src'



class App extends Component {
  state = {
    editorContent: ''
  }

  clickHandle() {
    alert(this.state.editorContent)
  }

  componentDidMount() {
    const elem = this.refs.editorElem;

    const editor = new E(elem);
    editor.customConfig.onchange = html => {
      this.setState({
        editorContent: html
      });
    };
    editor.create();

  }

  render() {
    return (
      <div ref="editorElem" style={{textAlign: 'left'}} />
    );
  }
}

export default App;
