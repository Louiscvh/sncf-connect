import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Landing} from "./pages/landing.tsx";


export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  )
}