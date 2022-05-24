import React from "react";

import { render, fireEvent, screen } from "../component-types/test-utils";
import Login from "../page-components/login";

test("integration tests the app component", async () => {
  render(<Login />);

  // how does the component load initially?
  expect(screen.getByPlaceholderText("login")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("password")).toBeInTheDocument();

  // while a certain action is executed (i.e. typing something), how does the component look now?

  // after a certain action was executed (i.e. typing something), how does the component look now?
});
