import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("http://localhost:8080/todos")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((e) => console.warn(e));
  }, []);

  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}

export default App;
