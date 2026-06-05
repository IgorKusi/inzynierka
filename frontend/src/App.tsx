import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import AdvertiserPortal
  from "./pages/AdvertiserPortal";

import PlayPage
  from "./pages/PlayPage";

function App() {

  return (
      <BrowserRouter>

        <Routes>

          <Route
              path="/"
              element={<AdvertiserPortal />}
          />

          <Route
              path="/play"
              element={<PlayPage />}
          />

        </Routes>

      </BrowserRouter>
  );
}

export default App;