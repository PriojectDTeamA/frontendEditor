import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent, screen } from "../component-types/test-utils";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Login from "../page-components/login";

// you can run solely this testfile by typing in the console either:
// npm test -t 'loginComponent'
// or
// jest -t 'loginComponent'
// consequently we can replace 'loginComponent' by any given name from a test (such as 'runbutton' for example)

test("integration tests the login component", async () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  // Arrange
  const usernameToTest = "test";
  const passwordToTest = "test";
  const usernameTextBox = screen.getByPlaceholderText("login");
  const passwordTextBox = screen.getByPlaceholderText("password");
  const submitButton = screen.getByDisplayValue("Log In");

  // Act

  // Assert

  // how does the component load initially?
  expect(usernameTextBox).toBeInTheDocument();
  expect(passwordTextBox).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

  // while a certain action is executed (i.e. typing something), how does the component look now?
  userEvent.type(usernameTextBox, usernameToTest);
  expect(usernameTextBox).toHaveDisplayValue(usernameToTest);

  userEvent.type(passwordTextBox, passwordToTest);
  expect(passwordTextBox).toHaveDisplayValue(passwordToTest);

  submitButton.click(); // logging in, thus redirecting to the Home page

  // after a certain action was executed (i.e. typing or submitting something), how does the component look now?
});
