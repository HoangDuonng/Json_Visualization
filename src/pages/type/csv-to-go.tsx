import React from "react";
import { FileFormat, TypeLanguage } from "../../constants/enumData";
import { TypegenWrapper } from "../../layout/TypeLayout/TypegenWrapper";

const TypePage = () => {
  return <TypegenWrapper from={FileFormat.CSV} to={TypeLanguage.Go} />;
};

export default TypePage;
