import React, { useEffect, useState } from "react";

interface NvidiaSmiData {
  gpuName: string;
  powereUsage: string;
  memoryUsage: string;
  cudaVersion: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<NvidiaSmiData | null>(null);

  useEffect(() => {
    const fetchNvidiaSmi = async () => {
      try {
        const result = await window.api.runNvidiaSmi();
        const parsedData = parseNvidiaSmiOutput(result);
        setData(parsedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNvidiaSmi();

    const interval = setInterval(fetchNvidiaSmi, 1000);

    return () => clearInterval(interval);
  }, []);

  const parseNvidiaSmiOutput = (input: string): NvidiaSmiData => {
    const regex =
      /NVIDIA\s+\w+\s+\w+\s+\w+|(\d+W\s*\/\s*\d+W)|(\d+MiB\s*\/\s*\d+MiB)/g;

    const regexVersion = /CUDA Version: ([\d.]+)/;

    const matchVersion = input.match(regexVersion);

    const matches = input.match(regex);

    const gpu: NvidiaSmiData = {
      gpuName: matches![0],
      powereUsage: matches![1],
      memoryUsage: matches![2],
      cudaVersion: matchVersion![1],
    };

    return gpu;
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{data.gpuName}</h1>
      <p>Power usage: {data.powereUsage}</p>
      <p>Memory usage: {data.memoryUsage}</p>
      <p>CUDA version: {data.cudaVersion}</p>
    </div>
  );
};

export default App;
