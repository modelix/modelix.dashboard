import { RouterProvider } from 'react-router-dom';

// project imports

import ScrollTop from './components/ScrollTop';

import router from "./routes";
import ThemeCustomization from './themes';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <ThemeCustomization>
      <ScrollTop>
        <RouterProvider router={router} />
      </ScrollTop>
    </ThemeCustomization>
  );
}
