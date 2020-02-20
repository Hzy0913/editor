import React, { Component } from 'react';
import EditorFactory from './js';
import { isType } from './js/util/helper';

export default class Editor extends Component {
  editorInstance = null;

  rendered = false;

  contentState;

  componentDidMount() {
    const { content } = this.props;

    this.editorInstance = new EditorFactory(this.editorRef);
    this.setConfiguration(this.props);


    this.editorInstance.customConfig.onchange = this.contentOnChange;

    this.editorInstance.create();

    if (content) this.contentTriggerChange(content);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { onChange } = this.props || {};
    const { content: nextContent } = nextProps;

    if (onChange && this.contentState !== nextContent) {
      this.contentTriggerChange(nextContent);
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.rendered) return false;
    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.rendered = true;
  }

  contentOnChange = (editorContent) => {
    const { onChange } = this.props;

    this.contentState = editorContent;
    onChange && onChange(editorContent);
  }

  setConfiguration = (props) => {
    const { children, content, onChange, ...rest } = props;
    const config = this.editorInstance.customConfig;

    Object.keys(rest || {}).forEach(prop => {
      const value = props[prop];
      value && (config[prop] = value);
    });
  }

  contentTriggerChange = (content) => {
    this.contentState = content;
    this.editorInstance.txt.html(content);
  }

  clear = () => this.editorInstance.txt.clear()

  append = (content = '') => this.editorInstance.txt.append(content)

  getContent = (type = 'html') => this.editorInstance.txt[type]() // type: html | text

  render() {
    const { children } = this.props;
    return (
      <div ref={ref => this.editorRef = ref}>
        {children}
      </div>
    );
  }
}
