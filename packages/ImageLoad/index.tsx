import React, { useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import Loading from './Loading';
import './index.less';

interface ImageProps {
  alt: string, // 图片alt属性
  src: string, // 图片地址
  [propName: string]: any // 其他图片支持的属性
}
interface ImageLoadProps {
  imgProps: ImageProps,
  children?: any, // 自定义渲染树
  waiting?: boolean, // 图片加载完是否等待再显示
  callback?: Function, // 图片加载完的回调
  wrapClassName?: string, // ImageLoad组件包裹样式名
  transtionTime?: number, // 图片加载动画过度时间
  transtionClassName?: string // 图片加载动画react-transition-group样式名 
}

export default function ImageLoad(props: ImageLoadProps) {
  const { imgProps = { src: '', width: '100%' }, waiting = false, wrapClassName = '', callback,
  transtionTime = 1000, children, transtionClassName = 'loadImg' } = props;
  const imgSrc = imgProps.src;
  const loadRef = useRef(false);
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      loadRef.current = true;
      callback && callback();
      if (!waiting) {
        setReady(true);
      }
    };
    img.src = imgSrc;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgSrc, waiting]);

  useEffect(() => {
    if (!waiting && loadRef.current) {
      setReady(true);
    }
  }, [waiting, loadRef]);
  return (
    <div className={`loadingWrap ${wrapClassName}`}>
      <div className={`loading-animate ${isReady ? 'exit-active' : 'enter-active'}`}>
        {/* add waiting status to avoid multi loading in one page */}
        {!waiting && <Loading />}
      </div>
      <CSSTransition
        in={isReady}
        timeout={transtionTime}
        classNames={transtionClassName}
        unmountOnExit
      >
        {children || <img {...imgProps} />}
      </CSSTransition>
    </div>

  );
}
