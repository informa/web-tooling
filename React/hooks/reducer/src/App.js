import React from "react";

const initialState = {
  newName: "",
  names: [
    { id: "1", active: false, name: "Jon" },
    { id: "2", active: true, name: "Abby" },
    { id: "3", active: false, name: "Sarah" },
    { id: "4", active: false, name: "Ray" },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case "TYPE_NAME":
      console.log("TYPE_NAME");

      return state;

    case "TOGGLE_ACTIVE_ROW":
      console.log("TOGGLE_ACTIVE_ROW");

      return state;

    case "ADD_NAME":
      console.log("ADD_NAME");

      return state;

    case "REMOVE_NAME":
      console.log("REMOVE_NAME");

      return state;

    case "SORT_NAME":
      console.log("SORT_NAME");

      return state;

    default:
      throw new Error();
  }
}

function App() {
  const [data, setData] = React.useState(initialState);

  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <div className="App">
      <table>
        <tr>
          <th>&nbsp;</th>
          <th>ID</th>
          <th>
            Name
            <button onClick={() => dispatch({ type: "SORT_NAME" })}>
              sort
            </button>
          </th>
          <th>Action</th>
        </tr>
        {data.names.map((name) => (
          <tr key={name.id}>
            <td>
              <div>
                <input
                  type="checkbox"
                  id={`${name.id}_active`}
                  name="active"
                  checked={name.active}
                  onChange={() => dispatch({ type: "TOGGLE_ACTIVE_ROW" })}
                />
              </div>
            </td>
            <td>{name.id}</td>
            <td>{name.name}</td>
            <td>
              <button onClick={() => dispatch({ type: "REMOVE_NAME" })}>
                Remove
              </button>
            </td>
          </tr>
        ))}
      </table>

      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="name">Name:</label>

        <input
          type="text"
          id="name"
          name="name"
          value={state.newName}
          // onChange={handleOnChange}
          onChange={() => dispatch({ type: "TYPE_NAME" })}
        />
        <button type="submit" onClick={() => dispatch({ type: "ADD_NAME" })}>
          Add name
        </button>
      </form>
    </div>
  );
}

export default App;
