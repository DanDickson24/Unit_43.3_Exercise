// import React, { Component } from "react";
// import JokeList from "./JokeList";

// /** App component. Renders list of jokes. */

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <JokeList />
//       </div>
//     );
//   }
// }

// export default App;

import React from "react";
import JokeList from "./JokeList";

function App() {
  const numJokesToGet = 5; 

  return (
    <div className="App">
      <JokeList numJokesToGet={numJokesToGet} />
    </div>
  );
}

export default App;

