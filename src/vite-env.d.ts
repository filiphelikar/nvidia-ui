/// <reference types="vite/client" />

interface Window {
  api: {
    runNvidiaSmi: () => Promise<string>;
  };
}
