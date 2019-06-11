import React from 'react';
import { Link } from 'bisheng/router';

export default function Header(props) {
  const { name } = props;
  return (
    <ul className="header">
      <li style={{ display: 'flex', alignItems: 'center' }}>
        <Link>
          <img
            style={{ width: 50 }}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          />
        </Link>
        <span style={{ paddingLeft: '20px', fontSize: '24px' }}>{name}</span>
      </li>
    </ul>
  );
}
