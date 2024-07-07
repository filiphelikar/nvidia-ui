import style from "./NewDataTable.module.css";
type Data = {
  gpuName: string;
  powereUsage: string;
  temperature: string;
  memoryUsage: string;
  cudaVersion: string;
};

type NewDataTableProps = {
  data: Data;
};

const NewDataTable: React.FC<NewDataTableProps> = ({ data }) => {
  return (
    <>
      <h1 className={style["heading"]}>Nvidia-Desktop-By-Filip</h1>
      <img className={style["img"]} src="/rtx_card.jpg" alt="" />
      <div className={style["main"]}>
        <h2>{data.gpuName}</h2>
        <p>Power Usage: {data.powereUsage}</p>
        <p>Temperature: {data.temperature}°C</p>
        <p>Memory Usage: {data.memoryUsage}</p>
        <p>CUDA Version: {data.cudaVersion}</p>
      </div>
    </>
  );
};

export default NewDataTable;
