import { Subject } from "@/Types";
import { DataProvider, GetListParams, GetListResponse } from "@refinedev/core";
import {  BaseRecord } from "@refinedev/core";

export const MockData: Subject[] = [
  // ===============================
  // Course 1: BS Computer Science
  // ===============================
  {
    id: "cs-101",
    code: "BSCS",
    department: "Computer Science",
    name: "Programming Fundamentals",
    description:
      "Introduction to programming concepts including variables, control structures, and basic algorithms using a high-level language.",
        createdAt:new Date().toString()

  },
  {
    id: "cs-102",
    code: "BSCS",
    department: "Computer Science",
    name: "Data Structures",
    description:
      "Study of fundamental data structures such as arrays, linked lists, stacks, queues, trees, and graphs.",
        createdAt:new Date().toString()

  },
  {
    id: "cs-103",
    code: "BSCS",
    department: "Computer Science",
    name: "Database Systems",
    description:
      "Covers relational database concepts, SQL, normalization, and basic database design principles.",
        createdAt:new Date().toString()

  },

  // ===============================
  // Course 2: BBA (Business Administration)
  // ===============================
  {
    id: "bba-101",
    code: "BBA",
    department: "Business Administration",
    name: "Principles of Management",
    description:
      "Introduction to management theories, organizational structures, and leadership principles.",
  createdAt:new Date().toString()

  },
  {
    id: "bba-102",
    code: "BBA",
    department: "Business Administration",
    name: "Financial Accounting",
    description:
      "Basic concepts of accounting including financial statements, bookkeeping, and business transactions.",
        createdAt:new Date().toString()

  },
  {
    id: "bba-103",
    code: "BBA",
    department: "Business Administration",
    name: "Marketing Fundamentals",
    description:
      "Overview of marketing concepts such as market research, consumer behavior, and product strategy.",
        createdAt:new Date().toString()

  },
];


export const dataProvider: DataProvider = {
  getList: async<TData extends BaseRecord = BaseRecord> ({ resource }:GetListParams):Promise<GetListResponse<TData>> => {

    if (resource !== "subjects") {
      return { data: [] as TData[], total: 0 };
    }
    return { data: MockData as unknown as TData[],
       total: MockData.length };
  },

  getOne: async ({ resource, id }) => {
    if (resource === "subjects") {
      const subject = MockData.find((s) => s.id === id);
      if (!subject) throw new Error("Subject not found");
      return { data: subject };
    }
    return { data: null };
  },

  create: async ({ resource, variables }) => {
    if (resource === "subjects") {
      const newSubject: Subject = {
        id: crypto.randomUUID(),
        ...(variables as Omit<Subject, "id">),
      };
      MockData.push(newSubject);
      return { data: newSubject };
    }
    return { data: null };
  },

  update: async ({ resource, id, variables }) => {
    if (resource === "subjects") {
      const index = MockData.findIndex((s) => s.id === id);
      MockData[index] = { ...MockData[index], ...(variables as Partial<Subject>) };
      return { data: MockData[index] };
    }
    return { data: null };
  },

  deleteOne: async ({ resource, id }) => {
    if (resource === "subjects") {
      const index = MockData.findIndex((s) => s.id === id);
      const deleted = MockData.splice(index, 1)[0];
      return { data: deleted };
    }
    return { data: null };
  },

  // Optional: implement deleteMany, updateMany if needed
};
