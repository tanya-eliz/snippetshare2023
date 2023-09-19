/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/await-async-query */
import {render, screen, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom";
import View from "../components/ViewSnippet/View";

afterEach(() => {
    cleanup();
});

test("should render View component", () => {
    render(<View />);
    const viewElem = screen.getByTestId("view");
    expect(viewElem).toBeInTheDocument();
});

test("View component matches snapshot", () => {
    const { asFragment } = render(<View />);
    expect(asFragment()).toMatchSnapshot();
});
