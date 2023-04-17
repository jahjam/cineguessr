import { useEffect, useRef } from 'react';

const useSVG = (imageString: string) => {
  const svgWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // if statement as typeguard
    if (svgWrapperRef.current) {
      svgWrapperRef.current.innerHTML = imageString;
    }
  }, []);

  return svgWrapperRef;
};

export default useSVG;
