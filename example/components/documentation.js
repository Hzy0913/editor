import React, { Component } from 'react';

class Documentation extends Component {
  state = {
    documentations: [
      {
        title: 'React',
        url: 'https://doc.react-china.org'
      }, {
        title: 'React-router',
        url: 'https://react-guide.github.io/react-router-cn'
      }, {
        title: 'Redux',
        url: 'http://cn.redux.js.org'
      }, {
        title: 'Redux-order',
        url: 'https://github.com/Hzy0913/redux-order'
      }, {
        title: 'webpack',
        url: 'https://webpack.docschina.org/concepts'
      }
    ]
  };

  render() {
    const { documentations } = this.state;
    return (
      documentations.map(item => (
        <div key={item.title} className="documentation-item">
          <a href={item.url} target="_blank">
            <span style={{ width: 120, display: 'inline-block', color: '#fff' }}>{item.title}</span>
            <span style={{ marginLeft: 30, color: '#fff' }}>{item.url}</span>
          </a>
        </div>
      ))
    );
  }
}


export default Documentation;
