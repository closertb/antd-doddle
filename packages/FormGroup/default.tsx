import React from 'react';
import { Col } from 'antd';

export const WrapperDefault = props => <Col span={props.span || 12}>{props.children}</Col>;

export const extendSymbol = Symbol('extend');