import React from "react";
import "./App.css";

function App() {
  const [names, setNames] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [currentName, setCurrentName] = React.useState("");
  const [shuffled, setShuffled] = React.useState(false);
  let [count, setCount] = React.useState(0);

  const addNames = e => {
    e.preventDefault();
    setNames(value.split("\n"));

    setTimeout(500);

    // nextStudent(e, names);

    console.log("names", names);
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

  const nextStudent = (e, arr) => {
    // e.preventDefault();
    console.log("next fired");

    if (count < arr.length) {
      setCurrentName(arr[count]);
      setCount(count + 1);
      console.log("current name", currentName);
    } else if (count >= arr.length && count !== 0) {
      setCurrentName("finished");
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Build Sprint Draft <span role="img">🎉</span>
        </h1>
      </header>
      {!names.length ? (
        <form>
          <p>Paste your students' names, one per line</p>
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
          <button onClick={e => nextStudent(e, names)}>Next Student</button>
          <p>Remaining students: {names.length - count}</p>
        </>
      ) : null}

      {/* {currentName !== "finished" && shuffled ? <p>Next up: {currentName}</p> : null} */}
      {currentName === "finished" ? <p>finished</p> : <p>Next up: {currentName}</p>}
      {names.map(name => {
        return <p key={name}>{name}</p>;
      })}
    </div>
  );
}

export default App;
