"use client";

import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import {
   deleteCompany,
   toggleSelect,
   toggleSelectAll,
   startEditing,
   stopEditing,
   updateCompany,
} from "@/app/lib/companies/companiesSlice";

import { AppDispatch, RootState } from "@/app/lib/store";
import { TCompanyState } from "@/types/companyType";

export function SidebarTable() {
   const dispatch = useDispatch<AppDispatch>();
   const companyList = useSelector((state: RootState) => state);

   const handleDeleteCompany = (id: string) => {
      dispatch(deleteCompany(id));
   };

   const handleSelectElementById = (id: string) => {
      dispatch(toggleSelect(id));
   };

   const handleSelectAllElement = () => {
      dispatch(toggleSelectAll());
   };

   const handleStartEditing = (id: string) => {
      dispatch(startEditing(id));
   };

   const handleStopEditing = (id: string) => {
      dispatch(stopEditing(id));
   };

   const handleChangeInput = (
      id: string,
      field: keyof TCompanyState,
      value: string
   ) => {
      dispatch(updateCompany({ id, field, value }));
   };

   return (
      <div className="flex flex-col  bg-white h-[100dvh] w-1/2">
         <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
               <div className="overflow-hidden">
                  <h2 className="text-center font-bold text-xl">Company</h2>
                  <table className="min-w-full text-left text-sm font-light">
                     <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                           <th scope="col" className="px-6 py-4">
                              Name
                           </th>
                           <th scope="col" className="px-6 py-4">
                              Address
                           </th>
                           <th
                              scope="col"
                              className="px-6 py-4 flex items-center gap-x-1"
                           >
                              <label htmlFor="select">Select all </label>
                              <input
                                 type="checkbox"
                                 name="select"
                                 onChange={handleSelectAllElement}
                              />
                           </th>
                           <th scope="col" className="px-6 py-4">
                              <Link
                                 className="bg-gray-700 hover:bg-gray-900  text-white font-bold py-2 px-1 rounded transition-all duration-300"
                                 href="/form"
                              >
                                 Create
                              </Link>
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {companyList.companies.map((company) => (
                           <>
                              <tr
                                 key={company.id}
                                 className={`border-b transition duration-300 ease-in-out  accent-gray-700 ${
                                    company.selectedSingleCompany
                                       ? "bg-green-400"
                                       : "bg-white"
                                 }`}
                              >
                                 <td
                                    className="whitespace-nowrap px-6 py-4"
                                    onClick={() =>
                                       handleStartEditing(company.id)
                                    }
                                 >
                                    {company.isEditing ? (
                                       <input
                                          type="text"
                                          value={company.nameCompany}
                                          onChange={(e) =>
                                             handleChangeInput(
                                                company.id,
                                                "nameCompany",
                                                e.target.value
                                             )
                                          }
                                          onBlur={() =>
                                             handleStopEditing(company.id)
                                          }
                                          autoFocus
                                       />
                                    ) : (
                                       company.nameCompany
                                    )}
                                 </td>
                                 <td
                                    className="whitespace-nowrap px-6 py-4"
                                    onClick={() =>
                                       handleStartEditing(company.id)
                                    }
                                 >
                                    {company.isEditing ? (
                                       <input
                                          type="text"
                                          value={company.address}
                                          onChange={(e) =>
                                             handleChangeInput(
                                                company.id,
                                                "address",
                                                e.target.value
                                             )
                                          }
                                          onBlur={() =>
                                             handleStopEditing(company.id)
                                          }
                                          autoFocus
                                       />
                                    ) : (
                                       company.address
                                    )}
                                 </td>

                                 <td className="whitespace-nowrap px-6 py-4">
                                    <input
                                       type="checkbox"
                                       onChange={() =>
                                          handleSelectElementById(company.id)
                                       }
                                    />
                                 </td>
                                 <div
                                    onClick={() =>
                                       handleDeleteCompany(company.id)
                                    }
                                    className="bg-gray-700 hover:bg-gray-900 text-white py-2 mt-2 mr-2 font-bold cursor-pointer text-center rounded transition-all duration-300"
                                 >
                                    Delete
                                 </div>
                              </tr>
                           </>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
   );
}
