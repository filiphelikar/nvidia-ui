import style from "./NewDataTable.module.css";
type Data = {
  gpuName: string;
  powereUsage: string;
  memoryUsage: string;
  cudaVersion: string;
};

type NewDataTableProps = {
  data: Data;
};

const NewDataTable: React.FC<NewDataTableProps> = ({ data }) => {
  return (
    <div className={style["main"]}>
      <h2>{data.gpuName}</h2>
      <p>Power Usage: {data.powereUsage}</p>
      <p>Memory Usage: {data.memoryUsage}</p>
      <p>CUDA Version: {data.cudaVersion}</p>
    </div>
  );
};

export default NewDataTable;
