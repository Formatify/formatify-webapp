"use client";

import React, { useState } from "react";
import Templates from "./Templates";
 import Cards from "../../components/Cards";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { DetailsValidate } from "@/lib/validation";
import classNames from "classnames";
import {ProjectDetails} from "@/types/interfaces";
import { emailRegex } from "@/lib/validation";
import { template } from "@/constants/constants";



const Stepper = () => {
  const [open, setOpen] = useState("Template Gallery");
  

  const handleTabOpen = (tabCategory: any) => {
    setOpen(tabCategory);
  };

  // Next/Back Buttons
  const handleback = () => {
    if (open === "Project Details") {
      setOpen("Template Gallery");
    } else if (open === "Confirmation") {
      setOpen("Project Details");
    }
  };

  const handlenext = () => {
    if (open === "Template Gallery") {
      setOpen("Project Details");
    } else if (open === "Project Details") {
      setOpen("Confirmation");
    }
  };

  //Tab 02
  const [email, setEmail] = useState("");
  const [members, setMembers] = useState<string[]>([]); // Specify the type of members as an array of strings

  const addMember = () => {
    if (email && !members.includes(email) && emailRegex.test(email)) {
      setMembers([...members, email]);
      setEmail("");
    } else {
      alert("Invalid Email");
    }
  };

  const removeMember = (emailToRemove: String) => {
    setMembers(members.filter((member) => member !== emailToRemove));
  };

  const initialValues: ProjectDetails = {
    template: "",
    title: "",
    members: members,
  };

  const SubmitForm = (
    values: ProjectDetails,
    actions: FormikHelpers<ProjectDetails>
  ) => {
    const { template, title, members } = values;
    console.log(values.template, values.title, values.members);
    actions.resetForm();
    setMembers([]);
  };

  const stepperLine01 = classNames("h-1 w-32",{ "bg-green-200": open === "Template Gallery", "bg-green-400": open === "Project Details" || open === "Confirmation"})
  const stepperLine02 = classNames("h-1 w-32 bg-green-200",{"bg-green-400": open === "Confirmation"})
  const StepperStep02= classNames("cursor-pointer   border  rounded-full  size-12 text-xl font-medium flex items-center justify-center text-body-color bg-green-200 border-green-200 text-gray-400",{"bg-primary text-white bg-green-400 border-green-400": open === "Project Details" || open === "Confirmation"})
  const StepperStep03 = classNames("cursor-pointer border rounded-full  size-12 text-xl font-medium flex items-center justify-center text-body-color bg-green-200 border-green-200 text-gray-400",{"bg-primary text-white bg-green-400 border-green-400": open === "Confirmation"})
  const backButtonClass= classNames("bg-white text-green-400 border border-green-400 px-10 py-2 rounded-md", {"hidden": open === "Template Gallery"})
  const nextButtonClass= classNames("bg-green-400 text-white px-10 py-2 rounded-md mr-4",{"hidden": open === "Confirmation"})
  const submitButtonClass= classNames("bg-green-400 text-white px-10 py-2 rounded-md mr-4",{"hidden": open !== "Confirmation"})

  return (
    <>
      <section >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mb-14  w-full flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center rounded-lg px-4 sm:flex-row">
                  <a
                    onClick={() => handleTabOpen("Template Gallery")}
                    className={`cursor-pointer text-white bg-green-400 border border-green-400 rounded-full size-12 text-xl font-medium flex items-center justify-center `}
                  >
                    <span> 1 </span>
                  </a>
                  <div
                    className={stepperLine01}
                  >
                    {" "}
                  </div>
                  <a
                    onClick={() => handleTabOpen("Project Details")}
                    className={StepperStep02}
                  >
                    <span>2</span>
                  </a>
                  <div
                    className={stepperLine02}
                  >
                    {" "}
                  </div>
                  <a
                    onClick={() => handleTabOpen("Confirmation")}
                    className={StepperStep03}
                  >
                    <span>3</span>
                  </a>
                </div>

                <Formik
                  initialValues={initialValues}
                  validate={DetailsValidate}
                  onSubmit={SubmitForm}
                >
                  {() => (
                    <Form className="bg-white mt-4 w-full border  border-gray-400 rounded-md">
                      <div className="ml-7 w-fit mt-3  text-green-400 border-b-2 border-b-green-400 text-lg ">
                        {" "}
                        {open}{" "}
                      </div>

                      {/* Tab 01 Templates */}
                      <TabContent
                        details=<div className=" flex flex-row flex-wrap gap-5 justify-center ">
                          {" "}
                          {template.map((items) => (
                            <Cards Name={items} />
                          ))}
                        </div>
                        tabCategory="Template Gallery"
                        open={open}
                      />

                      {/* Tab 02 PROJECT DETAILS */}
                      <TabContent
                        details=<div className="w-full bg-white p-3 flex flex-row gap-1 rounded-md border">
                          <div className="flex flex-row justify-between w-1/2 ">
                            <div className="flex flex-col gap-5">
                              <span className="text-sm text-gray-500 pb-1">
                                Fill up the details below to let us know what
                                you need and we will give or help you with a
                                solution.{" "}
                              </span>

                              <div className="flex flex-col ">
                                <label className="font-bold mb-1">
                                  {" "}
                                  Enter Title*
                                </label>
                                <Field
                                  type="title"
                                  name="title"
                                  id="title"
                                  placeholder="Title"
                                  className="italic py-1.5 block px-3 bg-slate-200 rounded-md border border-black focus:border-black focus:ring-0 focus:outline-none"
                                />
                                <ErrorMessage
                                  name="title"
                                  component="div"
                                  className="text-sm text-red-900 pl-2 pt-2"
                                />
                              </div>

                              <div className="flex flex-col ">
                                <label className="font-bold mb-1 ">
                                  {" "}
                                  Add Members*
                                </label>
                                <div className=" flex items-center bg-slate-200 border border-black rounded-md ">
                                  <Field
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter their email"
                                    className="italic w-3/4 bg-slate-200 rounded-md border-none focus:border-none focus:ring-0 focus:outline-none "
                                    onChange={(e: any) =>
                                      setEmail(e.target.value)
                                    }
                                  />
                                  <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-sm text-red-900 pl-2 pt-2"
                                  />
                                  <button
                                    className="bg-black text-white w-1/6 rounded-md text-xs py-1.5 ml-8"
                                    onClick={addMember}
                                    type="button"
                                  >
                                    Add Member
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="w-1/2 space-y-2 flex-wrap ml-4 ">
                            {members.map((member, index) => (
                              <div
                                className=" w-full h-8 bg-white rounded-md pl-4 border border-dashed border-green-400 "
                                key={index}
                              >
                                {" "}
                                {member}{" "}
                                <button
                                  className="bg-gray-200 text-black text-lg "
                                  onClick={() => removeMember(member)}
                                  type="button"
                                >
                                  {" "}
                                  x{" "}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                        tabCategory="Project Details"
                        open={open}
                      />

                      {/* Tab 03 CONFIRMATION */}
                      <TabContent
                        details=<div className="w-full bg-white p-3 flex flex-row gap-1 rounded-md border">
                          <div className="w-1/2">
                            <div className="flex flex-row justify-between full ">
                              <div className="flex flex-col gap-5">
                                <span className="text-sm text-gray-500 pb-1">
                                  Fill up the details below to let us know what
                                  you need and we will give or help you with a
                                  solution.{" "}
                                </span>

                                <div className="flex flex-col ">
                                  <label className="font-bold mb-1">
                                    {" "}
                                    Title*
                                  </label>
                                  <Field
                                    type="title"
                                    name="title"
                                    id="title"
                                    placeholder="Title"
                                    className="italic py-1.5 block px-3 bg-slate-200 rounded-md border border-black focus:border-black focus:ring-0 focus:outline-none"
                                    disabled={true}
                                  />
                                <ErrorMessage
                                  name="title"
                                  component="div"
                                  className="text-sm text-red-900 pl-2 pt-2"
                                />
                                </div>

                                <div className="flex flex-col ">
                                  <label className="font-bold mb-1 ">
                                    {" "}
                                    Add Members*
                                  </label>
                                  <div className=" flex items-center bg-slate-200 border border-black rounded-md ">
                                    <input
                                      className="italic w-3/4 bg-slate-200 rounded-md border-none focus:border-none focus:ring-0 focus:outline-none"
                                      placeholder="Enter their email"
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <button
                                      className="bg-black text-white w-1/6 rounded-md text-xs py-1.5 ml-8"
                                      onClick={addMember}
                                      type="button"
                                    >
                                      Add Member
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-row flex-wrap  gap-4 mt-4">
                              {members.map((member, index) => (
                                <div
                                  className=" w-2/5 h-8 bg-white rounded-md pl-4 border border-dashed border-green-400 "
                                  key={index}
                                >
                                  {" "}
                                  {member}{" "}
                                  <button
                                    className="bg-gray-200 text-black text-lg "
                                    onClick={() => removeMember(member)}
                                    type="button"
                                  >
                                    {" "}
                                    x{" "}
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="bg-white ml-4 w-1/2">
                            <div className="flex flex-col gap-5">
                              <div className="flex flex-col ">
                                <label className="font-bold mt-16 mb-1">
                                  {" "}
                                  Template*
                                </label>
                                <Field
                                  type="template"
                                  name="template"
                                  id="template"
                                  placeholder="template"
                                  className="italic py-1.5 block px-3 bg-slate-200 rounded-md border border-black focus:border-black focus:ring-0 focus:outline-none"
                                />
                                <ErrorMessage
                                  name="template"
                                  component="div"
                                  className="text-sm text-red-900 pl-2 pt-2"
                                />
                              </div>
                              <Templates Name="fdfdf" />
                            </div>
                          </div>
                        </div>
                        tabCategory="Confirmation"
                        open={open}
                      />

                      <div className=" mb-3 flex flex-row gap-4 flex-wrap justify-end">
                        <button
                          className={backButtonClass}
                          onClick={handleback}
                          type="button"
                        >
                          Back
                        </button>
                        
                        <button
                          className={nextButtonClass}
                          onClick={handlenext}
                          type="button"
                        >
                          Next
                        </button>


                        <button
                          className={submitButtonClass}
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Stepper;

const TabContent = ({ open, tabCategory, details }: any) => {
  return (
    <div>
      <div
        className={`p-6 text-base leading-relaxed text-body-color dark:text-dark-6 ${
          open === tabCategory ? "block" : "hidden"
        } `}
      >
        {details}
      </div>
    </div>
  );
};
