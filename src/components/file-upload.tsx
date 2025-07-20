"use client";

import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
}

export const FileUpload = ({ onChange, value }: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const fileType = value?.split(".").pop();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    onChange(data.url);
  };

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="upload" className="rounded-3xl object-cover" />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-emerald-200 stroke-emerald-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-emerald-500 dark:text-emerald-400 hover:underline"
        >
          {value}
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <input
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
        file:rounded-full file:border-0 file:text-sm file:font-semibold 
        file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
      />
    </div>
  );
};