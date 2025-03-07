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
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    //remove everything before the hash
    const targetId = e.currentTarget.href.replace(/.*\#/, "");
    const elem = document.getElementById(targetId);
    const topPos = elem?.getBoundingClientRect().top
    topPos &&
        window.scrollTo({
            top: topPos + window.scrollY,
            behavior: "smooth",
        });
};
  return (
    <Link {...props} onClick={props.onClick ? props.onClick : handleScroll}>
      {children}
    </Link>
  );
};
export default SmoothLink