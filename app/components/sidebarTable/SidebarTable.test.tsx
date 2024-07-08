import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { SidebarTable } from "./SidebarTable";
import { toggleSelect } from "@/app/lib/companies/companiesSlice";
import "@testing-library/jest-dom";

const mockStore = configureStore([]);

describe("SidebarTable", () => {
   let store: any;

   beforeEach(() => {
      store = mockStore({
         companies: [
            {
               id: "1",
               nameCompany: "Test Company",
               address: "Test Address",
               selectedSingleCompany: false,
               isEditing: false,
            },
         ],
      });
   });

   it("should dispatch deleteCompany action when delete button is clicked", () => {
      const { getByText } = render(
         <Provider store={store}>
            <SidebarTable />
         </Provider>
      );

      const deleteButton = getByText("Delete");
      fireEvent.click(deleteButton);

      const expectedActions = [
         { type: "companies/deleteCompany", payload: "1" },
      ];
      expect(store.getActions()).toEqual(expectedActions);
   });
});

describe("companiesSlice", () => {
   let store: any;

   beforeEach(() => {
      store = mockStore({});
   });

   test("toggleSelect dispatches correctly with a valid ID", () => {
      const expectedActions = [
         { type: "companies/toggleSelect", payload: "validId" },
      ];

      store.dispatch(toggleSelect("validId"));
      expect(store.getActions()).toEqual(expectedActions);
   });
});
