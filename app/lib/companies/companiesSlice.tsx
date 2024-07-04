import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { TCompanyState } from "@/types/companyType";

export const companiesSlice = createSlice({
   name: "companies",
   initialState: [] as TCompanyState[],
   reducers: {
      addCompany: {
         reducer: (state, action: PayloadAction<TCompanyState>) => {
            state.push(action.payload);
         },
         prepare: (nameCompany: string, address: string) => {
            const id = nanoid();
            return {
               payload: {
                  id,
                  nameCompany,
                  address,
               },
            };
         },
      },
      deleteCompany: (state, action) => {
         const index = state.findIndex(
            (company) => company.id === action.payload
         );
         if (index !== -1) {
            state.splice(index, 1);
         }
      },
      toggleSelect: (state, action) => {
         const item = state.find((item) => item.id === action.payload);
         if (item) {
            item.selectedSingleCompany = !item.selectedSingleCompany;
         }
      },
      toggleSelectAll: (state) => {
         state.forEach((company) => {
            company.selectedSingleCompany = !company.selectedSingleCompany;
         });
      },
      startEditing: (state, action) => {
         const item = state.find((company) => company.id === action.payload);

         if (item) {
            item.isEditing = true;
         }
      },
      stopEditing: (state, action) => {
         const item = state.find((company) => company.id === action.payload);
         if (item) {
            item.isEditing = false;
         }
      },
      updateCompany: (
         state,
         action: PayloadAction<{
            id: string;
            field: keyof TCompanyState;
            value: TCompanyState[keyof TCompanyState];
         }>
      ) => {
         const { id, field, value } = action.payload;

         const item = state.find((company) => company.id === id);

         if (item) {
            if (field === "nameCompany" && typeof value === "string") {
               item.nameCompany = value;
            } else if (field === "address" && typeof value === "string") {
               item.address = value;
            }
         }
      },
   },
});

export const {
   addCompany,
   deleteCompany,
   toggleSelect,
   toggleSelectAll,
   startEditing,
   stopEditing,
   updateCompany,
} = companiesSlice.actions;

export default companiesSlice.reducer;
