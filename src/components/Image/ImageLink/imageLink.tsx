export const ImageLink = ({
  href,
  src,
  alt,
  title,
}: {
  href: string;
  src: string;
  alt: string;
  title: string;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      title={title}
      style={{ width: '4rem', height: '4rem' }}
    >
      <img src={src} alt={alt} />
    </a>
  );
};
