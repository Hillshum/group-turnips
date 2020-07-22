import React from 'react';

export default ({ children }: { children: number }) => (
  <>{(children * 100).toFixed(2)}%</>
);
