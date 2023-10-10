import { forwardRef, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';


type RouterLinkProps = {
  to: string;
  sx?: any;
  children: ReactNode;
} & LinkProps;

const RouterLink = forwardRef<HTMLAnchorElement, RouterLinkProps>(({ to, style, children }, ref) => (
  <Link ref={ref} to={to} style={style} >{children}</Link>
));

export default RouterLink;
