import React, { useEffect, useState } from "react";
import NewDataTable from "./components/NewDataTable";
import OldDataTable from "./components/OldDataTable";
import style from "./App.module.css";

interface NvidiaSmiData {
  gpuName: string;
  powereUsage: string;
  temperature: string;
  memoryUsage: string;
  cudaVersion: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<NvidiaSmiData | null>(null);
  const [oldData, setOldData] = useState<string>("");
  const [newData, setNewData] = useState<boolean>(true);

  useEffect(() => {
    const fetchNvidiaSmi = async () => {
      try {
        const result = await window.api.runNvidiaSmi();
        setOldData(result);
        const parsedData = parseNvidiaSmiOutput(result);
        setData(parsedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNvidiaSmi();

    const interval = setInterval(fetchNvidiaSmi, 500);

    return () => clearInterval(interval);
  }, []);

  const parseNvidiaSmiOutput = (input: string): NvidiaSmiData => {
    const regex =
      /NVIDIA\s+\w+\s+\w+\s+\w+|(\d+W\s*\/\s*\d+W)|(\d+MiB\s*\/\s*\d+MiB)/g;

    const regexVersion = /CUDA Version: ([\d.]+)/;

    const temperatureRegex = /(\d+)C/;

    const matchVersion = input.match(regexVersion);

    const matches = input.match(regex);

    const tempMatch = input.match(temperatureRegex);

    const gpu: NvidiaSmiData = {
      gpuName: matches![0],
      powereUsage: matches![1],
      temperature: tempMatch![1],
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
      {newData ? <NewDataTable data={data} /> : <OldDataTable data={oldData} />}
      <button className={style["button"]} onClick={() => setNewData(!newData)}>
        Change format
      </button>
    </div>
  );
};

export default App;
