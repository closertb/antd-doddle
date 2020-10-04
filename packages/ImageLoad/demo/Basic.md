---
title: 基本用法
order: 0
---

默认示例

```jsx
import React from 'react';
import ImageLoad from "../index";

const [homeTop, homeBtm] = [
  'https://f10.baidu.com/it/u=3835805109,3701301442&fm=173&app=49&f=JPEG?w=640&h=436&s=44925C9B7F516FE30A50D6E403005036&access=215967316',
  'https://f10.baidu.com/it/u=877180986,2039010370&fm=173&app=49&f=JPEG?w=640&h=426&s=7EF30AD29232FA6D40A35B9103008088&access=215967316',
];

class Root extends React.PureComponent {
  state = { waiting: true }

  handleState = () => {
    console.log('over')
    this.setState({ waiting: false });
  }

  render() {
    const { waiting } = this.state;

    return (
      <div>
        <ImageLoad imgProps={{ src: homeTop, alt: '主页第一张', width: '60%' }} callback={this.handleState} />
        <ImageLoad waiting={waiting} imgProps={{ src: homeBtm }} >
          <div>
            <h3 style={{ margin: '30px 0', textAlign: 'center' }}>标题会一起延迟加载</h3>
            <img src={homeBtm} alt="主页第二张"  width="100%" /> 
          </div>
        </ImageLoad>
      </div>
    );
  }
}

ReactDOM.render(<Root />, mountNode);
```