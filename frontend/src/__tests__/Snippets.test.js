/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/await-async-query */
import {render, screen, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom";
import Snippets from "../components/Snippets/Snippets";

afterEach(() => {
    cleanup();
});

test("should render Snippets component", () => {
    render(<Snippets />);
    const snipElem = screen.getByTestId("snippets");
    expect(snipElem).toBeInTheDocument();
    expect(screen.getByText("View All Snippets")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Uploaded Time")).toBeInTheDocument();
    expect(screen.getByText("Views")).toBeInTheDocument();
});

test("Snippets component matches snapshot", () => {
    const { asFragment } = render(<Snippets />);
    expect(asFragment()).toMatchSnapshot();
});
