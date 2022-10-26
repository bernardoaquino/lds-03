import { css } from 'styled-components';

type SpacingProps = {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  padding?: string;
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  px?: string;
  py?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  margin?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  mx?: string;
  my?: string;
}

export default css<SpacingProps>`
  top: ${({ top }) => top};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};

  padding-left: ${({ paddingLeft, pl, px, padding }) =>
    paddingLeft ||
    pl ||
    px ||
    (!!padding && padding.includes(' ') ? padding.split(' ')[1] : padding) ||
    'unset'};
  padding-right: ${({ paddingRight, pr, px, padding }) =>
    paddingRight ||
    pr ||
    px ||
    (!!padding && padding.includes(' ') ? padding.split(' ')[1] : padding) ||
    'unset'};
  padding-top: ${({ paddingTop, pt, py, padding }) =>
    paddingTop ||
    pt ||
    py ||
    (!!padding && padding.includes(' ') ? padding.split(' ')[0] : padding) ||
    'unset'};
  padding-bottom: ${({ paddingBottom, pb, py, padding }) =>
    paddingBottom ||
    pb ||
    py ||
    (!!padding && padding.includes(' ') ? padding.split(' ')[0] : padding) ||
    'unset'};

  margin-left: ${({ marginLeft, ml, mx, margin }) =>
    marginLeft || ml || mx || margin || 'unset'};
  margin-right: ${({ marginRight, mr, mx, margin }) =>
    marginRight || mr || mx || margin || 'unset'};
  margin-top: ${({ marginTop, mt, my, margin }) =>
    marginTop || mt || my || margin || 'unset'};
  margin-bottom: ${({ marginBottom, mb, my, margin }) =>
    marginBottom || mb || my || margin || 'unset'};
`;
