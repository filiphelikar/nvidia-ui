import React from "react";
import style from "./OldDataTable.module.css";

type OldDataTableProps = {
  data: string;
};

const NewDataTable: React.FC<OldDataTableProps> = ({ data }) => {
  function formatString(input: string) {
    const lines = input.split("\n");
    const formattedLines = lines.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
    return formattedLines;
  }

  return (
    <div className={style["main"]}>
      <p className={style["data"]}>{formatString(data)}</p>
    </div>
  );
};

export default NewDataTable;
