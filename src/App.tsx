import { RouterProvider } from 'react-router-dom';

// project imports

import ScrollTop from './components/ScrollTop';

import ThemeCustomization from './themes';
import {BrowserRouter, Route, Routes} from "react-router";
import MavenConnectivityPage from "./pages/connectivity/maven.tsx";
import DashboardLayout from "./layout/Dashboard";
import GitConnectivityPage from "./pages/connectivity/git.tsx";
import UploadsConnectivityPage from "./pages/connectivity/uploads.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import LoginPage from "./pages/auth/Login.tsx";
import Typography from "@mui/material/Typography";
import {useAuth} from "react-oidc-context";

const queryClient = new QueryClient()

export default function App() {
  const auth = useAuth();
  return (
      <QueryClientProvider client={queryClient}>
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
                  <Route path="jwt" element={<Typography>{auth.user?.access_token ?? auth.user?.id_token}</Typography>} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ScrollTop>
        </ThemeCustomization>
      </QueryClientProvider>
  );
}
