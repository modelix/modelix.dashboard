import { BrowserRouter, Route, Routes } from "react-router";

export default function mainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="connectivity">
          <Route path="maven"></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
