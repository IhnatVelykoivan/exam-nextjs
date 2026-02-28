import { ReactNode } from 'react';

type Props = {
    href: string;
    children: ReactNode;
    className?: string;
    [key: string]: unknown;
};

const Link = ({ href, children, className }: Props) => (
    <a href={href} className={className}>{children}</a>
);

export default Link;
