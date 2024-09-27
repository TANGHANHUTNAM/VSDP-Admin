import { RouterProvider } from "react-router-dom";
import "./reset.css";
import router from "./routes/AdminRoute";
import { Suspense } from "react";
import LoadingPage from "./pages/LoadingPage";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
