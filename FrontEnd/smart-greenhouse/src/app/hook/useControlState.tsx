import { useContext } from "react";
import { ControlStateContext } from "../context/controlStateContext";

const useControlState = () => {
  return useContext(ControlStateContext);
};

export default useControlState;
