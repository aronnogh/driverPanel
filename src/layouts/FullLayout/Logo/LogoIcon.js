import React from "react";
import logoicn from "../../../assets/images/logo-dark.png";

const LogoIcon = (props) => {
  return <img style={{ width: "100%" }} alt="Logo" src={logoicn} {...props} />;
};

export default LogoIcon;
