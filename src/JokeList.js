// import React, { Component } from "react";
// import axios from "axios";
// import Joke from "./Joke";
// import "./JokeList.css";

// /** List of jokes. */

// class JokeList extends Component {
//   static defaultProps = {
//     numJokesToGet: 5
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       jokes: [],
//       isLoading: true
//     };

//     this.generateNewJokes = this.generateNewJokes.bind(this);
//     this.vote = this.vote.bind(this);
//   }

//   /* at mount, get jokes */

//   componentDidMount() {
//     this.getJokes();
//   }

//   /* retrieve jokes from API */

//   async getJokes() {
//     try {
//       // load jokes one at a time, adding not-yet-seen jokes
//       let jokes = [];
//       let seenJokes = new Set();

//       while (jokes.length < this.props.numJokesToGet) {
//         let res = await axios.get("https://icanhazdadjoke.com", {
//           headers: { Accept: "application/json" }
//         });
//         let { ...joke } = res.data;

//         if (!seenJokes.has(joke.id)) {
//           seenJokes.add(joke.id);
//           jokes.push({ ...joke, votes: 0 });
//         } else {
//           console.log("duplicate found!");
//         }
//       }

//       this.setState({ jokes, isLoading: false });
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   /* empty joke list, set to loading state, and then call getJokes */

//   generateNewJokes() {
//     this.setState({ isLoading: true});
//     this.getJokes();
//   }

//   /* change vote for this id by delta (+1 or -1) */

//   vote(id, delta) {
//     this.setState(st => ({
//       jokes: st.jokes.map(j =>
//         j.id === id ? { ...j, votes: j.votes + delta } : j
//       )
//     }));
//   }

//   /* render: either loading spinner or list of sorted jokes. */

//   render() {
//     let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);
//     if (this.state.isLoading) {
//       return (
//         <div className="loading">
//           <i className="fas fa-4x fa-spinner fa-spin" />
//         </div>
//       )
//     }

//     return (
//       <div className="JokeList">
//         <button
//           className="JokeList-getmore"
//           onClick={this.generateNewJokes}
//         >
//           Get New Jokes
//         </button>

//         {sortedJokes.map(j => (
//           <Joke
//             text={j.joke}
//             key={j.id}
//             id={j.id}
//             votes={j.votes}
//             vote={this.vote}
//           />
//         ))}
//       </div>
//     );
//   }
// }

// export default JokeList;

// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import Joke from "./Joke";
// import "./JokeList.css";

// function JokeList({ numJokesToGet }) {
//   const [jokes, setJokes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const getJokes = useCallback(async () => {
//     try {
//       const newJokes = [];

//       // Fetch new jokes and add them to newJokes
//       while (newJokes.length < numJokesToGet) {
//         const response = await axios.get("https://icanhazdadjoke.com/", {
//           headers: { Accept: "application/json" },
//         });

//         const newJoke = response.data;
//         newJokes.push({ ...newJoke, votes: 0 });
//       }

//       // Combine new jokes with locked jokes and update the state
//       setJokes((prevJokes) => {
//         const updatedJokes = [...newJokes, ...prevJokes.filter((j) => j.locked)];
//         return updatedJokes;
//       });

//       setIsLoading(false);
//     } catch (err) {
//       console.error(err);
//     }
//   }, [numJokesToGet]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         await getJokes();
//       } catch (err) {
//         console.error(err);
//       }
//     }

//     fetchData();
//   }, [getJokes]);

//   function generateNewJokes() {
//     setIsLoading(true);
//     getJokes();
//   }

//   function vote(id, delta) {
//     setJokes((prevJokes) =>
//       prevJokes.map((j) =>
//         j.id === id ? { ...j, votes: j.votes + delta } : j
//       )
//     );
//   }

//   function resetVotesAndLocalStorage() {
//     // Reset votes to 0 for all jokes
//     setJokes((prevJokes) =>
//       prevJokes.map((j) => ({ ...j, votes: 0 }))
//     );

//     // Clear local storage
//     localStorage.clear();
//   }

//   let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

//   if (isLoading) {
//     return (
//       <div className="loading">
//         <i className="fas fa-4x fa-spinner fa-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="JokeList">
//       <button className="JokeList-getmore" onClick={generateNewJokes}>
//         Get New Jokes
//       </button>

//       <button className="JokeList-reset" onClick={resetVotesAndLocalStorage}>
//         Reset Votes and Clear Local Storage
//       </button>

//       {sortedJokes.map((j) => (
//         <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={vote} />
//       ))}
//     </div>
//   );
// }

// export default JokeList;


import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

function JokeList({ numJokesToGet }) {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getJokes = useCallback(async () => {
    try {
      const newJokes = [];

      // Fetch new jokes and add them to newJokes
      while (newJokes.length < numJokesToGet) {
        const response = await axios.get("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" },
        });

        const newJoke = response.data;
        newJokes.push({ ...newJoke, votes: 0, locked: false });
      }

      // Combine new jokes with locked jokes and update the state
      setJokes((prevJokes) => {
        const updatedJokes = [...newJokes, ...prevJokes.filter((j) => j.locked)];
        return updatedJokes;
      });

      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, [numJokesToGet]);

  useEffect(() => {
    async function fetchData() {
      try {
        await getJokes();
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [getJokes]);

  function generateNewJokes() {
    setIsLoading(true);
    getJokes();
  }

  function vote(id, delta) {
    setJokes((prevJokes) =>
      prevJokes.map((j) =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      )
    );
  }

  function resetVotesAndLocalStorage() {
    // Reset votes to 0 for all jokes
    setJokes((prevJokes) =>
      prevJokes.map((j) => ({ ...j, votes: 0 }))
    );

    // Clear local storage
    localStorage.clear();
  }

  function toggleLock(id) {
    setJokes((prevJokes) =>
      prevJokes.map((j) =>
        j.id === id ? { ...j, locked: !j.locked } : j
      )
    );
  }

  let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

  if (isLoading) {
    return (
      <div className="loading">
        <i className="fas fa-4x fa-spinner fa-spin" />
      </div>
    );
  }

  return (
    <div className="JokeList">
      <button className="JokeList-getmore" onClick={generateNewJokes}>
        Get New Jokes
      </button>

      <button className="JokeList-reset" onClick={resetVotesAndLocalStorage}>
        Reset Votes and Clear Local Storage
      </button>

      {sortedJokes.map((j) => (
        <Joke
          text={j.joke}
          key={j.id}
          id={j.id}
          votes={j.votes}
          vote={vote}
          locked={j.locked}
          toggleLock={() => toggleLock(j.id)}
        />
      ))}
    </div>
  );
}

export default JokeList;
