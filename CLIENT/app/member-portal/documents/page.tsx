"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, type File } from "lucide-react"

// Sample data for documents
const documents = [
  {
    id: "DOC001",
    name: "National ID Card.pdf",
    type: "Identification",
    uploadDate: "2023-01-15",
    size: "1.2 MB",
  },
  {
    id: "DOC002",
    name: "Carpentry Certificate.pdf",
    type: "Certification",
    uploadDate: "2023-02-10",
    size: "2.5 MB",
  },
  {
    id: "DOC003",
    name: "Medical Receipt - May 2023.pdf",
    type: "Insurance",
    uploadDate: "2023-05-05",
    size: "0.8 MB",
  },
  {
    id: "DOC004",
    name: "Employment Contract - ABC Construction.pdf",
    type: "Employment",
    uploadDate: "2023-03-20",
    size: "1.5 MB",
  },
]

export default function MemberDocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [documentType, setDocumentType] = useState("")
  const [uploadingFile, setUploadingFile] = useState<File | null>(null)

  // Filter documents based on search term and type
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = documentType === "" || doc.type === documentType
    return matchesSearch && matchesType
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadingFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (!uploadingFile) {
      alert("Please select a file to upload")
      return
    }

    // Simulate upload
    alert(`File "${uploadingFile.name}" uploaded successfully!`)
    setUploadingFile(null)
  }

  const handleViewDocument = (docId: string) => {
    alert(`Viewing document ${docId}`)
  }

  const handleDownloadDocument = (docId: string) => {
    alert(`Downloading document ${docId}`)
  }

  const handleDeleteDocument = (docId: string) => {
    alert(`Document ${docId} deleted successfully`)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Documents</CardTitle>
          <CardDescription>View and manage your uploaded documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search documents..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="Identification">Identification</option>
                <option value="Certification">Certification</option>
                <option value="Insurance">Insurance</option>
                <option value="Employment">Employment</option>
              </select>
            </div\
