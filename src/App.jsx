import "./App.css";
import store from "./Redux/store";
import { Provider } from "react-redux";
import { Main } from "./components/Main/main";

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
