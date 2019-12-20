import { useMemo } from 'react';
import useSWR, { ConfigInterface, keyInterface } from 'swr';

const createFetcher = (init: RequestInit) => (url: string) =>
  fetch(url, init).then(r => r.json());

export const useCancellableSWR = <D = any, E = any>(
  key: keyInterface,
  config?: ConfigInterface<D, E>
) => {
  const controller = useMemo(() => new AbortController(), []);
  const fetcher = useMemo(() => createFetcher({ signal: controller.signal }), [
    controller
  ]);

  return {
    ...useSWR<D, E>(key, fetcher, config),
    controller
  };
};
