import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider maxSnack={3}>
        <div className="App">
          <Main />
        </div>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
