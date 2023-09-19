/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/await-async-query */
import {render, screen, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../components/Home/Home";

afterEach(() => {
    cleanup();
});

test("should render Home component", () => {
    render(<Home />);
    const homeElement = screen.getByTestId("home");
    expect(homeElement).toBeInTheDocument();
    expect(screen.getByText("Create New Snippet")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Time to Expiry:")).toBeInTheDocument();
});

