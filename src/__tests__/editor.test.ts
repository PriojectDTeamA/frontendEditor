import { Language } from "../component-types/propTypes";
import { slices } from "../component-types/stateTypes";
import {
  updateEditor,
  updateConsole,
  setUserArray,
  setLanguage,
  turnOnLoadingScreen,
  turnOffLoadingScreen,
} from "../component-types/stateTypes";

const reducer = slices.editorSlice.reducer;

// testing if undefined returns the initial state of the editor
test("should return initial state of editor", () => {
  expect(
    reducer(undefined, {
      type: undefined,
    })
  ).toEqual({
    editorText: "this is the default text value for the editor",
    consoleText: "this is the default text value for the console",
    language: "csharp",
    currentUsers: [],
    loadingScreenOn: false,
  });
});

// testing if setLanguage sets a new language
test("should set a new language for the editor", () => {
  expect(reducer(undefined, setLanguage("java"))).toEqual({
    editorText: "this is the default text value for the editor",
    consoleText: "this is the default text value for the console",
    language: "java",
    currentUsers: [],
    loadingScreenOn: false,
  });
});

// testing if setUserArray sets new users
test("should set new users for the editor", () => {
  expect(
    reducer(
      undefined,
      setUserArray([
        { id: 3, username: "jack" },
        { id: 1, username: "test" },
        { id: 2, username: "ryan" },
      ])
    )
  ).toEqual({
    editorText: "this is the default text value for the editor",
    consoleText: "this is the default text value for the console",
    language: "csharp",
    currentUsers: [
      { id: 3, username: "jack" },
      { id: 1, username: "test" },
      { id: 2, username: "ryan" },
    ],
    loadingScreenOn: false,
  });
});

// testing if setUserArray can set empty arrays
test("should set an empty user array", () => {
  const previousState = {
    editorText: "this is the default text value for the editor",
    consoleText: "this is the default text value for the console",
    language: "java" as Language,
    currentUsers: [
      { id: 3, username: "jack" },
      { id: 1, username: "test" },
      { id: 2, username: "ryan" },
    ],
    loadingScreenOn: false,
  };
  expect(reducer(previousState, setUserArray([]))).toEqual({
    ...previousState,
    currentUsers: [],
  });
});

// testing if updateEditor updates the editor
test("should update the text of the editor", () => {
  const previousState = {
    editorText: '#!/bin/python\n\nprint("hello world!")\n',
    consoleText: "this is the default text value for the console",
    language: "python" as Language,
    currentUsers: [
      { id: 3, username: "jack" },
      { id: 1, username: "test" },
      { id: 2, username: "ryan" },
    ],
    loadingScreenOn: false,
  };
  expect(
    reducer(
      previousState,
      updateEditor("#!/bin/python\n\nfor i in range(10)\nprint(i)\n")
    )
  ).toEqual({
    ...previousState,
    editorText: "#!/bin/python\n\nfor i in range(10)\nprint(i)\n",
  });
});

// testing if updateConsole updates the console
test("should update the console", () => {
  const previousState = {
    editorText: "#!/bin/python\n\nfor i in range(10)\nprint(i)\n",
    consoleText: "this is the default text value for the console",
    language: "python" as Language,
    currentUsers: [
      { id: 3, username: "jack" },
      { id: 1, username: "test" },
      { id: 2, username: "ryan" },
    ],
    loadingScreenOn: false,
  };
  expect(
    reducer(previousState, updateConsole("0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n"))
  ).toEqual({
    ...previousState,
    consoleText: "0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n",
  });
});

// test if turnOnLoadingScreen turns the loading screen on
test("should set loadingScreenOn to true", () => {
  const previousState = {
    editorText: "#!/bin/python\n\nfor i in range(10)\nprint(i)\n",
    consoleText: "0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n",
    language: "python" as Language,
    currentUsers: [
      { id: 3, username: "jack" },
      { id: 1, username: "test" },
      { id: 2, username: "ryan" },
    ],
    loadingScreenOn: false,
  };
  expect(reducer(previousState, turnOnLoadingScreen())).toEqual({
    ...previousState,
    loadingScreenOn: true,
  });
});

// test if turnOffLoadingScreen turns off the loading screen
test("should set loadingScreenOn to false", () => {
  const previousState = {
    editorText: "#!/bin/python\n\nfor i in range(10)\nprint(i)\n",
    consoleText: "0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n",
    language: "python" as Language,
    currentUsers: [
      { id: 3, username: "jack" },
      { id: 1, username: "test" },
      { id: 2, username: "ryan" },
    ],
    loadingScreenOn: true,
  };
  expect(reducer(previousState, turnOffLoadingScreen())).toEqual({
    ...previousState,
    loadingScreenOn: false,
  });
});
