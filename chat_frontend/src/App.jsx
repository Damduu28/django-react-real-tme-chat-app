import { useState } from "react";
import { Provider } from "react-redux";
import "./assets/css/styles.css";
import "./assets/css/all.css";
import Routers from "./routes/Routers";
import store from "./features/store";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Provider store={store}>
      <Routers />
    </Provider>
  );
}

export default App;
