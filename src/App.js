import React from "react";
import "./App.css";

function App() {
  const [names, setNames] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [currentName, setCurrentName] = React.useState("");
  const [shuffled, setShuffled] = React.useState(false);
  let [count, setCount] = React.useState(1);

  const addNames = e => {
    e.preventDefault();
    setNames(value.split("\n"));
  };
  // console.log("names", names);

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

  const nextStudent = (e, arr) => {
    e.preventDefault();
    console.log("next fired");

    if (count < arr.length) {
      setCurrentName(arr[count]);
      setCount(count + 1);
    } else if ((count = arr.length)) {
      setCurrentName("finished");
    }
  };

  const prevStudent = (e, arr) => {
    e.preventDefault();

    // setCurrentName(arr[count]);
    if (count > 1) {
      setCurrentName(arr[count - 1]);
      setCount(count - 1);
    } else if (count === 1) {
      setCurrentName(arr[0]);
    } else if (count === arr.length) {
      setCurrentName(arr[arr.length]);
    }
  };
  console.log("count", count);
  console.log("name", currentName);
  // console.log("first name", names[0]);

  return (
    <div className="App">
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
          <p>
            Paste your students' names, one per line.
            <br />
            The order of the names will be randomized and served <br />
            up one at a time after they are submitted.
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
      {/* {!shuffled ? <button onClick={shuffle(names)}>shuffle</button> : null} */}
      {names.length ? (
        <>
          {removeEmptyStringFromEnd(names)}
          {shuffle(names)}
          {/* <button onClick={e => prevStudent(e, names)}>previous Student</button> */}
          <button onClick={e => nextStudent(e, names)}>Next Student</button>
          <p>
            Remaining students:{" "}
            <strong>
              {names.length > 0 && currentName !== "finished"
                ? names.length - count + 1
                : 0}
            </strong>
          </p>
        </>
      ) : null}

      {currentName === "finished" ? (
        <>
          <p>finished</p>
          {/* <button>Start Over</button> */}
        </>
      ) : null}
      {names.length && currentName !== "finished" ? <strong>{currentName}</strong> : null}
      {/* {names.map(name => {
        return <p key={name}>{name}</p>;
      })} */}
    </div>
  );
}

export default App;
