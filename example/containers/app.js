import React, { Component } from 'react';
import Editor from '../../src';


class App extends Component {
  state = {
    editorContent: '<h1>hello wold~</h1>'
  }

  changeContent = () => {
    this.setState({ editorContent: '<h1>hello~</h1>' });
  }

  onChange = (content) => {
    this.setState({ editorContent: content });
  }

  render() {
    const { editorContent } = this.state;
    return (
      <div>
        <Editor
          uploadImgShowBase64
          onChange={this.onChange}
          content={editorContent}
        >
          <p>test</p>
        </Editor>
        <button onClick={this.changeContent}>change</button>
      </div>
    );
  }
}

export default App;
