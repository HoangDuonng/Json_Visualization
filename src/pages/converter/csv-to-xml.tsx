import React from "react";
import { FileFormat } from "../../constants/enumData";
import { ToolPage } from "../../layout/ConverterLayout/ToolPage";

const Page = () => {
  return <ToolPage from={FileFormat.CSV} to={FileFormat.XML} />;
};

export default Page;
