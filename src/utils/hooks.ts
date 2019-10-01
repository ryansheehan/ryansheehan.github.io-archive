import {useLayoutEffect, useRef, useState, MutableRefObject} from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { ISize } from './types';

export function useResizeObserver<T extends HTMLElement>({defaultWidth = 1, defaultHeight = 1} = {}) : [MutableRefObject<T|null>, ISize] {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({width: defaultWidth, height: defaultHeight});

  useLayoutEffect(() => {
    const element = ref.current;
    if (element) {
      const resizeObserver = new ResizeObserver(entries => {
        if (!Array.isArray(entries) || !entries.length) {
          return;
        }

        const entry = entries[0];

        const {width, height} = entry.contentRect;
        console.log(`updating size [${width}, ${height}]`);
        setSize({width, height});
      });

      resizeObserver.observe(element);

      return () => resizeObserver.unobserve(element);
    }
  }, []);

  return [ref, size];
}
