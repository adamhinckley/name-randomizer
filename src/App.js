import React, { useEffect, useState } from "react";
import "./App.css";
import { Helmet } from "react-helmet";

function App() {
  const [names, setNames] = useState([]);
  const [value, setValue] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [shuffled, setShuffled] = useState(false);
  let [count, setCount] = useState(0);

  const addNames = e => {
    e.preventDefault();
    setNames(value.split("\n"));
  };

  const handleChange = e => {
    setValue(e.target.value);
  };

  const removeEmptyStringFromEnd = arr => {
    const lastIndex = arr.length - 1;

    if (arr[lastIndex] === "") {
      arr.pop();
      removeEmptyStringFromEnd(arr);
    }
  };

  const shuffle = arr => {
    if (!shuffled) {
      arr.sort(() => Math.random() - 0.5);
      setShuffled(true);
    } else if (shuffled && !currentName) {
      setCurrentName(arr[0]);
    }
  };

  const nextStudent = e => {
    e.preventDefault();
    if (names.length && count <= names.length - 1) {
      setCount(prevCount => prevCount + 1);
    }
  };

  const prevStudent = e => {
    e.preventDefault();
    if (count >= 1) {
      setCount(prevCount => prevCount - 1);
    }
  };

  useEffect(() => {
    if (names.length && count === names.length) {
      setCurrentName("🎉Finished🎉");
    } else if (names.length) {
      setCurrentName(names[count]);
    }
  }, [names, count]);

  return (
    <div className="App">
      <div className="container">
        <Helmet>{currentName !== "" ? <title> next: {currentName}</title> : null}</Helmet>
        <header className="App-header">
          <h1>
            Build Sprint Draft{" "}
            <span role="img" alt="party">
              🎉
            </span>
          </h1>
        </header>
        {!names.length ? (
          <form>
            <p className="instructions">
              Paste your students' names, one per line. The order of the names will be
              randomized and served up one at a time after they are submitted.
            </p>
            <textarea
              name="names"
              value={value}
              cols="30"
              rows="10"
              onChange={handleChange}
            />
            <button onClick={e => addNames(e, names)}>Submit Names</button>
          </form>
        ) : null}
        {names.length ? (
          <>
            {removeEmptyStringFromEnd(names)}
            {shuffle(names)}
            <div className="button-container">
              <button onClick={e => prevStudent(e, names)}>previous Student</button>
              <button onClick={e => nextStudent(e, names)}>Next Student</button>
            </div>
            <p>
              Remaining Students:{" "}
              <strong>
                {names.length > 0 && currentName !== "finished"
                  ? names.length - count
                  : 0}
              </strong>
            </p>
          </>
        ) : null}

        {currentName === "finished" ? (
          <>
            <p>
              {" "}
              <span role="img" alt="party">
                🎉
              </span>
              Finished{" "}
              <span role="img" alt="party">
                🎉
              </span>
            </p>
          </>
        ) : null}
        {names.length && currentName !== "finished" ? (
          <div className="student">
            <strong> {currentName}</strong>
          </div>
        ) : null}

        {/* {names.map(name => {
          return <p key={name}>{name}</p>;
        })} */}
      </div>
    </div>
  );
}

export default App;
