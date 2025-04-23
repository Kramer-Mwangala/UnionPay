"use client"

import { useState } from "react"

// Sample data for the table
const pendingMembers = [
  {
    id: "M101",
    name: "James Kamau",
    phone: "+254712345678",
    unionCode: "NCWU2023",
    unionName: "Nairobi Construction Workers Union",
    registrationDate: "2023-05-15",
    idNumber: "12345678",
    skills: ["Carpentry", "Masonry"],
  },
  {
    id: "M102",
    name: "Mary Wanjiku",
    phone: "+254723456789",
    unionCode: "NCWU2023",
    unionName: "Nairobi Construction Workers Union",
    registrationDate: "2023-05-16",
    idNumber: "23456789",
    skills: ["Electrical", "Plumbing"],
  },
  {
    id: "M103",
    name: "Peter Ochieng",
    phone: "+254734567890",
    unionCode: "MBA2023",
    unionName: "Mombasa Builders Association",
    registrationDate: "2023-05-17",
    idNumber: "34567890",
    skills: ["Welding", "Painting"],
  },
  {
    id: "M104",
    name: "Sarah Akinyi",
    phone: "+254745678901",
    unionCode: "KCU2023",
    unionName: "Kisumu Construction Union",
    registrationDate: "2023-05-18",
    idNumber: "45678901",
    skills: ["Tiling", "Plastering"],
  },
  {
    id: "M105",
    name: "John Mwangi",
    phone: "+254756789012",
    unionCode: "NCWU2023",
    unionName: "Nairobi Construction Workers Union",
    registrationDate: "2023-05-19",
    idNumber: "56789012",
    skills: ["Heavy Equipment Operation", "Scaffolding"],
  },
]

export default function MemberVerificationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [unionFilter, setUnionFilter] = useState("")
}
