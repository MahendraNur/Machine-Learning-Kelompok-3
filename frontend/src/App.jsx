import { Route, Routes } from "react-router-dom";
import Home from "./page/home";
import Prediction from "./page/prediction";
import Result from "./page/result";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home />} />
      <Route path="/prediction" element={ <Prediction />} />
      <Route path="/result" element={ <Result />} />
    </Routes>
  )
}