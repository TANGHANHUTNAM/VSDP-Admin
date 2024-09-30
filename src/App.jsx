import { RouterProvider } from "react-router-dom";
import "./reset.css";
import router from "./routes/AdminRoute";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
