import React from "react";

export const initialState = {
  newName: "",
  sort: "unsorted",
  names: [
    { id: "1", active: false, name: "Jon" },
    { id: "2", active: true, name: "Abby" },
    { id: "3", active: false, name: "Sarah" },
    { id: "4", active: false, name: "Ray" },
  ],
};

export const TYPE_NAME = "TYPE_NAME";
export const TOGGLE_ACTIVE_ROW = "TOGGLE_ACTIVE_ROW";
export const ADD_NAME = "ADD_NAME";
export const REMOVE_NAME = "REMOVE_NAME";
export const SORT_NAME = "SORT_NAME";

export function reducer(state, action) {
  switch (action.type) {
    case TYPE_NAME:
      console.log(TYPE_NAME);

      return { ...state, newName: action.value };

    case TOGGLE_ACTIVE_ROW:
      console.log(TOGGLE_ACTIVE_ROW, action.id);

      const newActiveRowState = state.names.map((name) => {
        if (name.id === action.id) {
          return {
            ...name,
            active: !name.active,
          };
        }

        return name;
      });

      return { ...state, names: newActiveRowState };

    case ADD_NAME:
      const newID = Array(4)
        .fill()
        .map((_) => String.fromCharCode(33 + Math.random() * (127 - 33)))
        .join("");

      const newAddNameState = [
        ...state.names,
        { id: newID, active: false, name: state.newName },
      ];

      return { ...state, newName: "", names: newAddNameState };

    case REMOVE_NAME:
      console.log(REMOVE_NAME, action.id);

      const newRemoveRowState = state.names.filter(
        (name) => name.id !== action.id
      );

      return { ...state, names: newRemoveRowState };

    case SORT_NAME:
      console.log(SORT_NAME);

      const nextSort = {
        unsorted: "ascending",
        ascending: "descending",
        descending: "ascending",
      };

      const newSort = nextSort[state.sort];

      let sortedNames = state.names.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

      const newSortedState =
        newSort === "descending" ? sortedNames.reverse() : sortedNames;

      return { ...state, sort: newSort, names: newSortedState };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>ID</th>
            <th>
              Name
              <button onClick={() => dispatch({ type: "SORT_NAME" })}>
                sort {state.sort}
              </button>
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.names.map(({ active, id, name }) => (
            <tr key={id}>
              <td>
                <div>
                  <input
                    type="checkbox"
                    id={`${id}_active`}
                    name="active"
                    checked={active}
                    onChange={() => dispatch({ type: "TOGGLE_ACTIVE_ROW", id })}
                  />
                </div>
              </td>
              <td>{id}</td>
              <td>{name}</td>
              <td>
                <button onClick={() => dispatch({ type: "REMOVE_NAME", id })}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="name">Name:</label>

        <input
          type="text"
          id="name"
          name="name"
          value={state.newName}
          onChange={({ target }) =>
            dispatch({ type: "TYPE_NAME", value: target.value })
          }
        />
        <button
          type="submit"
          disabled={state.newName === ""}
          onClick={() => dispatch({ type: "ADD_NAME" })}
        >
          Add name
        </button>
      </form>
    </div>
  );
}

export default App;
