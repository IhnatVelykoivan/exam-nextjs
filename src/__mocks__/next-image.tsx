type Props = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
};

const Image = ({ src, alt, width, height, className }: Props) => (
    <img src={src} alt={alt} width={width} height={height} className={className} />
);

export default Image;
