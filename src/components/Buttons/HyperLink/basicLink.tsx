export const BasicLink = ({
  text,
  className = '',
  title,
  href,
}: {
  href: string;
  text: string;
  className?: string;
  title: string;
}) => {
  return (
    <a className={className} href={href} title={title}>
      {text}
    </a>
  );
};
