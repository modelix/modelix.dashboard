import { RouterProvider } from 'react-router-dom';

// project imports

import ScrollTop from './components/ScrollTop';

import ThemeCustomization from './themes';
import {BrowserRouter, Route, Routes} from "react-router";
import MavenConnectivityPage from "./pages/connectivity/maven.tsx";
import DashboardLayout from "./layout/Dashboard";
import GitConnectivityPage from "./pages/connectivity/git.tsx";
import UploadsConnectivityPage from "./pages/connectivity/uploads.tsx";

export default function App() {
  return (
    <ThemeCustomization>
      <ScrollTop>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardLayout/>}>
              <Route index element={<div>Home</div>} />
              <Route path="connectivity">
                <Route path="maven" element={<MavenConnectivityPage />} />
                <Route path="git" element={<GitConnectivityPage />} />
                <Route path="uploads" element={<UploadsConnectivityPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ScrollTop>
    </ThemeCustomization>
  );
}
