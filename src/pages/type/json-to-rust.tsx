import React from "react";
import { FileFormat, TypeLanguage } from "../../constants/enumData";
import { TypegenWrapper } from "../../layout/TypeLayout/TypegenWrapper";

const TypePage = () => {
  return <TypegenWrapper from={FileFormat.JSON} to={TypeLanguage.Rust} />;
};

export default TypePage;
