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
  describe("TYPE_NAME", () => {
    it("should contain a new value on the newName key", () => {
      const newName = "Jon";
      const newState = reducer(initialState, {
        type: TYPE_NAME,
        value: newName,
      });
      expect(newState).toEqual({ ...initialState, newName });
    });
  });
  describe("TOGGLE_ACTIVE_ROW", () => {
    it("should return active on appropriate row", () => {
      const id = "1";
      const newState = reducer(initialState, {
        type: TOGGLE_ACTIVE_ROW,
        id,
      });
      expect(newState.names.filter((item) => item.id === id)[0].active).toEqual(
        true
      );
    });
    it("should toggle active on appropriate row", () => {
      const id = "2";
      const newState = reducer(initialState, {
        type: TOGGLE_ACTIVE_ROW,
        id,
      });
      expect(newState.names.filter((item) => item.id === id)[0].active).toEqual(
        false
      );
    });
  });
  describe("ADD_NAME", () => {
    it("should contain a new item in name array with name value", () => {
      const newName = "Joe";

      const newNameState = reducer(initialState, {
        type: TYPE_NAME,
        value: newName,
      });

      const newState = reducer(newNameState, {
        type: ADD_NAME,
      });

      expect(newState.names.length).toEqual(5);
      expect(
        newState.names.filter((item) => item.name === newName).length
      ).toEqual(1);
    });
  });
  describe("REMOVE_NAME", () => {
    it("should contain a new value on the newName key", () => {
      const id = "2";

      const newState = reducer(initialState, {
        type: REMOVE_NAME,
        id,
      });

      expect(newState.names.length).toEqual(3);
      expect(newState.names.filter((item) => item.id === id)).toEqual([]);
    });
  });
  describe("SORT_NAME", () => {
    it("should sort names by state ascending", () => {
      const newState = reducer(
        { ...initialState, sort: "ascending" },
        {
          type: SORT_NAME,
        }
      );

      expect(newState.names).toEqual([
        { id: "3", active: false, name: "Sarah" },
        { id: "4", active: false, name: "Ray" },
        { id: "1", active: false, name: "Jon" },
        { id: "2", active: true, name: "Abby" },
      ]);
    });
    it("should sort names by state descending", () => {
      const newState = reducer(
        { ...initialState, sort: "descending" },
        {
          type: SORT_NAME,
        }
      );

      expect(newState.names).toEqual([
        { id: "2", active: true, name: "Abby" },
        { id: "1", active: false, name: "Jon" },
        { id: "4", active: false, name: "Ray" },
        { id: "3", active: false, name: "Sarah" },
      ]);
    });
  });
});
