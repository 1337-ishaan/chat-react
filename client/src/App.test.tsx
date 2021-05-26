import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  expect(<App />).toBe(<div className="text-red-500">Hello</div>);
});
