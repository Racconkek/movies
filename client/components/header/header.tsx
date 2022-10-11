import React, { ReactElement, useState } from 'react';
import { Navbar } from 'react-bulma-components';
import styles from './header.module.css';
import { cx } from '@emotion/css';
import { CreationButton } from '../creation/CreationButton';
import LogoIcon from './popcorn.svg';

function Header(props: {
  authorized: boolean;
  pathname: string;
  menuItems: Array<{ title: string; url: string }>;
}): ReactElement {
  const { menuItems = [], authorized, pathname } = props;
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <Navbar transparent size={'large'} fixed={'top'} active={isActive} style={{ backgroundColor: '#F6F6F6' }}>
      <Navbar.Brand>
        <Navbar.Item href={'/'} key={'main'}>
          <LogoIcon style={{ width: '40px', height: '40px' }} />
        </Navbar.Item>
        <Navbar.Burger onClick={() => setIsActive(!isActive)} />
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container align={'left'}>
          {menuItems.map((section) => (
            <Navbar.Item
              href={section.url}
              key={section.title}
              className={cx(section.url === pathname && styles.activeItem)}
            >
              {section.title}
            </Navbar.Item>
          ))}
        </Navbar.Container>
        <Navbar.Container align={'right'}>
          {authorized && <CreationButton />}
          {authorized && <Navbar.Item href="/api/user/logout">Выйти</Navbar.Item>}
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
}

export default Header;
