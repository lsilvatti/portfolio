import React from "react";

const Image = ({
  src,
  alt,
  width,
  height,
  priority: _priority,
  className,
  style,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={className}
    style={style}
  />
);

export default Image;
