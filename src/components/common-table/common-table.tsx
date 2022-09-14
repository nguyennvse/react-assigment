import { useState } from "react";

interface CommonTableProp {
  config: Config;
  data: any[];
}

interface Config {
  column: Column[];
}

interface Column {
  title: string;
  colSpan: Number;
}

const CommonTable = ({ config, data }: CommonTableProp) => {
  const [searchValue, setSearchValue] = useState("");
  const search = () => {};
  return (
    <div>
      <input
        type={"text"}
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
      />
      <table>
        <thead>
          {config.column.map((col, index) => (
            <th>{col.title}</th>
          ))}
        </thead>
        <tbody>
          {config.column.map((col, index) => (
            <th>{col.title}</th>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommonTable;
