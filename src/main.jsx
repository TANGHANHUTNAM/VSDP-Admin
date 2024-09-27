import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { persistor, store } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import LoadingPage from "./pages/LoadingPage.jsx";
import LayoutApp from "./layouts/LayoutApp.jsx";
import { setStore } from "./utils/axiosCustomize.js";
import LoadingBar from "react-top-loading-bar";
import { loadingBarRef } from "./utils/axiosCustomize.js";

setStore(store);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<LoadingPage />} persistor={persistor}>
      <LayoutApp>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          limit={3}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <LoadingBar color="#00BDD4" ref={loadingBarRef} />
      </LayoutApp>
    </PersistGate>
  </Provider>
);
