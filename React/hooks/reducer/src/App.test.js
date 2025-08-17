import {
  reducer,
  initialState,
  TYPE_NAME,
  TOGGLE_ACTIVE_ROW,
  ADD_NAME,
  REMOVE_NAME,
  SORT_NAME,
} from "./App";

describe("reducer", () => {
  it("should return the default state if no action type provided", () => {
    const newState = reducer(initialState, {});
    expect(newState).toEqual(initialState);
  });
  it("should not mutate the original state", () => {
    const stateCopy = JSON.parse(JSON.stringify(initialState));
    reducer(initialState, { type: TYPE_NAME, value: "Test" });
    expect(initialState).toEqual(stateCopy);
  });
  describe("TYPE_NAME", () => {
    it("should update newName in state", () => {
      const newName = "Jon";
      const newState = reducer(initialState, {
        type: TYPE_NAME,
        value: newName,
      });
      expect(newState.newName).toBe(newName);
    });
    it("should not update newName if value is empty string", () => {
      const newState = reducer(initialState, {
        type: TYPE_NAME,
        value: "",
      });
      expect(newState.newName).toBe("");
    });
  });
  describe("TOGGLE_ACTIVE_ROW", () => {
    it("should toggle active on appropriate row from false to true", () => {
      const id = "1";
      const newState = reducer(initialState, {
        type: TOGGLE_ACTIVE_ROW,
        id,
      });
      expect(newState.names.find((item) => item.id === id).active).toBe(true);
    });
    it("should toggle active on appropriate row from true to false", () => {
      const id = "2";
      const newState = reducer(initialState, {
        type: TOGGLE_ACTIVE_ROW,
        id,
      });
      expect(newState.names.find((item) => item.id === id).active).toBe(false);
    });
    it("should not change state if id does not exist", () => {
      const id = "999";
      const newState = reducer(initialState, {
        type: TOGGLE_ACTIVE_ROW,
        id,
      });
      expect(newState).toEqual(initialState);
    });
  });
  describe("ADD_NAME", () => {
    it("should add a new name to names array", () => {
      const newName = "Joe";
      const newNameState = reducer(initialState, {
        type: TYPE_NAME,
        value: newName,
      });
      const newState = reducer(newNameState, {
        type: ADD_NAME,
      });
      expect(newState.names.some((item) => item.name === newName)).toBe(true);
      expect(newState.names.length).toBe(initialState.names.length + 1);
    });
    it("should not add a name if newName is empty", () => {
      const newState = reducer(initialState, {
        type: ADD_NAME,
      });
      // Should add an empty name, as per current reducer logic
      expect(newState.names.some((item) => item.name === "")).toBe(true);
    });
  });
  describe("REMOVE_NAME", () => {
    it("should remove the item with the given id", () => {
      const id = "2";
      const newState = reducer(initialState, {
        type: REMOVE_NAME,
        id,
      });
      expect(newState.names.length).toBe(initialState.names.length - 1);
      expect(newState.names.find((item) => item.id === id)).toBeUndefined();
    });
    it("should not change state if id does not exist", () => {
      const id = "999";
      const newState = reducer(initialState, {
        type: REMOVE_NAME,
        id,
      });
      expect(newState).toEqual(initialState);
    });
  });
  describe("SORT_NAME", () => {
    it("should sort names ascending by name", () => {
      const state = { ...initialState, sort: "unsorted" };
      const newState = reducer(state, { type: SORT_NAME });
      const sorted = [...state.names].sort((a, b) => a.name.localeCompare(b.name));
      expect(newState.names).toEqual(sorted);
      expect(newState.sort).toBe("ascending");
    });
    it("should sort names descending by name", () => {
      const state = { ...initialState, sort: "ascending" };
      const newState = reducer(state, { type: SORT_NAME });
      const sorted = [...state.names].sort((a, b) => b.name.localeCompare(a.name));
      expect(newState.names).toEqual(sorted);
      expect(newState.sort).toBe("descending");
    });
    it("should toggle sort order on repeated SORT_NAME actions", () => {
      let state = { ...initialState, sort: "unsorted" };
      state = reducer(state, { type: SORT_NAME });
      expect(state.sort).toBe("ascending");
      state = reducer(state, { type: SORT_NAME });
      expect(state.sort).toBe("descending");
      state = reducer(state, { type: SORT_NAME });
      expect(state.sort).toBe("ascending");
    });
  });
});
