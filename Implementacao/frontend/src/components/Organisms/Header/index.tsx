import React from 'react';

/** Styles */
import * as El from './Header.style';

type HeaderOption = {
  type: 'link' | 'text';
  onClick?: Function;
  link?: string;
  label: string;
}

type Options = {
  anonymous?: HeaderOption[];
  auth?: HeaderOption[];
}

const optionComponentMap = {
  link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  text: ({ children, ...props }: any) => <p {...props}>{children}</p>,
}

const Header = () => {
  const authStatus = 'auth';

  const options: Options = {
    anonymous: [
      {
        type: 'link',
        link: '/cadastro',
        label: 'Cadastre-se'
      }
    ]
  }

  const renderOption = (option: HeaderOption): JSX.Element => {
    const Component = optionComponentMap[option.type];

    return (
      <Component onClick={() => option.onClick?.()}>{option.label}</Component>
    )
  }

  return (
    <El.Header>
      <El.Title>LocadoraZ</El.Title>
      <El.OptionsContainer>
        {options?.[authStatus]?.map(renderOption)}
      </El.OptionsContainer>
    </El.Header>
  )
}

export default Header;