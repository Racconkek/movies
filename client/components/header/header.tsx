import NextJSLink from "next/link";
import React, { ReactElement } from "react";
import styles from './header.module.css';

function Header(props: {
  authorized: boolean;
  pathname: string;
  menuItems: Array<{ title: string; url: string }>;
}): ReactElement {
  const { menuItems = [], authorized } = props;

  return (
    <div className={styles.root}>
      <NextJSLink href={'/'} key={'main'} passHref>
        Главная
      </NextJSLink>
      {!authorized && (
        <a href="/api/user/oauth/google">
          Войти
        </a>
      )}
      {menuItems.map((section) => (
        <NextJSLink href={section.url} key={section.title} passHref>
          {section.title}
        </NextJSLink>
      ))}
    </div>
  );
}

export default Header;
