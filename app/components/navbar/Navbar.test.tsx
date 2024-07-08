import { render, screen } from "@testing-library/react";
import { Navbar } from "./Navbar";
import "@testing-library/jest-dom";

test("renders search input field", () => {
   render(<Navbar />);
   const searchInput = screen.getByPlaceholderText(/Type to search/i);
   expect(searchInput).toBeInTheDocument();
});
