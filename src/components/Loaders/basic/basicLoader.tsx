import React from 'react';

export type LoaderProps = {
  loading: boolean;
  size: 'sm' | 'md' | 'lg';
};

const BasicLoader = ({ loading, size }: LoaderProps) => {
  return (
    <div className="loading-container">
      <div className="loading-progress"></div>
    </div>
  );
};
