import { useState } from "react";
import { X, Download } from "lucide-react";

interface ImportResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ImportResumeModal({ isOpen, onClose }: ImportResumeModalProps) {
  const [fileType, setFileType] = useState("Reactive Resume (.json)");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative shadow-lg">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-4">
          <Download className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Import an existing resume</h2>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4">
          Upload a file from one of the accepted sources to parse existing data and import it into Reactive Resume for easier editing.
        </p>

        {/* Filetype Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Filetype</label>
          <select
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option>Reactive Resume (.json)</option>
            <option>Reactive Resume v3 (.json)</option>
            <option>JSON Resume (.json)</option>
            <option>LinkedIn Data Export (.zip)</option>
          </select>
        </div>

        {/* File Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">File</label>
          <input
            type="file"
            accept={fileType.includes(".zip") ? ".zip" : ".json"}
            className="w-full border rounded px-3 py-2 text-sm file:mr-4 file:py-1 file:px-2"
          />
          <p className="text-xs text-gray-500 mt-1">Accepts only {fileType.includes(".zip") ? ".zip" : ".json"} files</p>
        </div>

        {/* Validate Button */}
        <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-sm">
          Validate
        </button>
      </div>
    </div>
  );
}
