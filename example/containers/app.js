import React, { Component } from 'react';

import Editor from '../../src';



class App extends Component {
  state = {
    editorContent: '<h1>hello wold~</h1>'
  }

  clickHandle() {
    alert(this.state.editorContent)
  }

  componentDidMount() {

  }

  changeContent = () => {
    this.setState({ editorContent: '<h1>hello~</h1>' });
  }

  onChange = (content) => {
    console.log(content, 11112)
    this.setState({ editorContent: content });
  }

  render() {
    const { editorContent } = this.state;
    return (
      <div>
        <Editor
          onChange={this.onChange}
          content={editorContent}
        >
          <p>啦啦啦</p>
        </Editor>
        <button onClick={this.changeContent}>change</button>
      </div>
    );
  }
}

export default App;
