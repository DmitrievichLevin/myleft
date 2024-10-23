export type FileIconProps = {
  // Three Letter Max
  type: string;
  color?: string;
  className?: string;
};

export const FileTypeIcon = ({
  type,
  color,
  className = '',
}: FileIconProps) => {
  return (
    <svg
      id="file-cn"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 859.98 951.96"
      preserveAspectRatio="xMidYMid meet"
      className={className}
    >
      <g id="file-sh">
        <path
          d="M779.5,929.46H199.52c-32.02,0-57.98-25.96-57.98-57.98V80.48c0-32.02,25.96-57.98,57.98-57.98h391.02l2.01,252.11h244.93v596.87c0,32.02-25.96,57.98-57.98,57.98Z"
          fill="none"
          stroke={color || '#555'}
          strokeLinejoin="round"
          strokeWidth="45"
        />
        <polygon
          points="590.53 22.5 592.55 274.61 837.48 274.61 590.53 22.5"
          fill="none"
          stroke={color || '#555'}
          strokeLinejoin="round"
          strokeWidth="45"
        />
      </g>
      <rect
        x="13.5"
        y="458.62"
        width="707.55"
        height="344.67"
        rx="52.98"
        ry="52.98"
        fill={color || '#555'}
        stroke="#fff"
        strokeMiterlimit="10"
        strokeWidth="27"
      />
      <text
        transform="translate(56.52 703.82)"
        fill="#fff"
        fontFamily="HiraKakuStd-W8-83pv-RKSJ-H, 'Hiragino Kaku Gothic Std'"
        fontSize="198"
        letterSpacing=".12em"
      >
        <tspan x="0" y="0">
          {type.toUpperCase()}
        </tspan>
      </text>
    </svg>
  );
};
