// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { useEffect, useState } from "react";
import "./App.css";

// // class component
// class classComponent extends React.Component {
//   render() {
//     return <h2>class component</h2>;
//   }
// }

// function component
// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   );
// }

// function App() {}
// or like this
// the arrow syntax
const App = () => {
  return (
    <div className="card-container">
      <Card
        title="test1"
        rating={5}
        isCool={true}
        actors={[{ name: "actors" }]}
      />
      <Card title="test2" />
      <Card title="test3" />
    </div>
  );
};

const Card = ({ title }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [count, setCount] = useState(0);
  // here it is like the watch
  useEffect(() => {
    console.log(`${title} has liked: ${hasLiked}`);
  }, [hasLiked]);
  // here it is like onMounted
  useEffect(() => {
    console.log("cart rendered");
  }, []);
  // return <h2>card component</h2>;
  return (
    // <div
    //   // inline style
    //   style={{
    //     border: "1px solid #4b5362",
    //     borderRadius: "10px",
    //     padding: "20px",
    //     margin: "10px",
    //     backgroundColor: "#31363f",
    //     minHeight: "100px",
    //   }}
    // >
    <div
      className="card"
      onClick={() => setCount((prevState) => prevState + 1)}
    >
      <h2>
        {title} <br /> {count || null}
      </h2>
      <button onClick={() => setHasLiked(!hasLiked)}>
        {hasLiked ? "💔" : "🤍"}
      </button>
    </div>
  );
};

export default App;
// rafc
