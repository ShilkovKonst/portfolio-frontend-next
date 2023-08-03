import Link, { LinkProps } from "next/link";
import React, { PropsWithChildren } from "react";
// mirror the props of next/link component
type AnchorProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
>;
type ScrollLinkProps = AnchorProps & LinkProps & PropsWithChildren;
// component definition
const SmoothLink = ({ children, ...props }: ScrollLinkProps) => {
  return (
    <Link {...props} onClick={props.onClick}>
      {children}
    </Link>
  );
};
export default SmoothLink