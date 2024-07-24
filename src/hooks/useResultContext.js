import { ResultContextProvider } from "../contexts/ResultContextProvider";
import { useContext } from "react";

export const useResultContext = () => useContext(ResultContext)