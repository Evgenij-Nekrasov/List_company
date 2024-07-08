"use client";

import { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@/app/lib/store";
import { addCompany } from "@/app/lib/companies/companiesSlice";
import { TCompanyState } from "@/types/companyType";

export default function Form() {
   const dispatch = useDispatch<AppDispatch>();

   const [companyData, setCompanyData] = useState<TCompanyState>({
      nameCompany: "",
      address: "",
      id: "",
   });

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (
         companyData.address.length === 0 ||
         companyData.nameCompany.length === 0
      ) {
         alert("Please fill in all fields");
         return;
      } else {
         dispatch(addCompany(companyData.nameCompany, companyData.address));
         setCompanyData({ nameCompany: "", address: "", id: "" });
      }
   };

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCompanyData({ ...companyData, [e.target.name]: e.target.value });
   };

   return (
      <>
         <div className="flex justify-center items-start mt-5 h-screen w-1/2 bg-gray-400">
            <form
               onSubmit={handleSubmit}
               className="[&>*]:mb-3 w-full max-w-xs bg-white p-8 rounded shadow-md"
            >
               <h2 className="mb-5 mt-10 text-center text-xl">New company</h2>
               <label htmlFor="nameCompany">name*</label>
               <input
                  type="text"
                  onChange={handleChange}
                  value={companyData.nameCompany}
                  name="nameCompany"
                  id="nameCompany"
                  placeholder="Enter company name"
               />
               <label htmlFor="address">address*</label>
               <input
                  placeholder="Enter company address"
                  type="text"
                  onChange={handleChange}
                  value={companyData.address}
                  name="address"
                  id="address"
               />
               <button type="submit">Create</button>
               <Link href="https://list-company.vercel.app/">
                  <button type="button">Back</button>
               </Link>
            </form>
         </div>
      </>
   );
}
