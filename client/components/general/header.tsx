import NextJSLink from "next/link";
import React, { ReactElement } from "react";

function Header(props: {
  authorized: boolean;
  pathname: string;
  menuItems: Array<{ title: string; url: string }>;
}): ReactElement {
  const { menuItems = [], authorized } = props;

  return (
    <>
      <div>
        <div>
          <NextJSLink href="/">
            <a>
              VideoHosting
            </a>
          </NextJSLink>
        </div>
        {!authorized && (
          <a href="/api/user/oauth/google">
            Войти
          </a>
        )}
      </div>
      <div>
        {menuItems.map((section) => (
          <NextJSLink href={section.url} key={section.title} passHref>
            <div>
              {section.title}
            </div>
          </NextJSLink>
        ))}
      </div>
    </>
  );
}

export default Header;
