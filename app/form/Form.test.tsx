import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Form from "./page";

const mockStore = configureStore([]);

test("handleSubmit dispatches addCompany action with valid inputs", () => {
   const store = mockStore({});
   const { getByLabelText, getByText } = render(
      <Provider store={store}>
         <Form />
      </Provider>
   );

   const nameInput = getByLabelText(/name*/i);
   const addressInput = getByLabelText(/address*/i);
   const submitButton = getByText(/Create/i);

   fireEvent.change(nameInput, { target: { value: "Test Company" } });
   fireEvent.change(addressInput, { target: { value: "123 Test Street" } });
   fireEvent.click(submitButton);

   expect(store.getActions()).toEqual([
      {
         type: "companies/addCompany",
         payload: { name: "Test Company", address: "123 Test Street" },
      },
   ]);
});
