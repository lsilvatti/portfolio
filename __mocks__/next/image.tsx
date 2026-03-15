// Mock for next/image — returns a plain <img> so RTL can assert alt, src, etc.
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
  // eslint-disable-next-line @next/next/no-img-element
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
