import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { SnackbarProvider } from "notistack";
import AppRoutes from "./pages/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider maxSnack={3}>
        <div className="App">
          <AppRoutes />
        </div>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
