import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Students from "./pages/Students";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>


        {/* Default page */}

        <Route
          path="/"
          element={<Navigate to="/login" />}
        />



        {/* Public Login Page */}

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />



        {/* Protected Student Page */}

        <Route
          path="/students"
          element={

            <PrivateRoute>

              <Students />

            </PrivateRoute>

          }
        />


      </Routes>

    </BrowserRouter>

  );

}


export default App;
