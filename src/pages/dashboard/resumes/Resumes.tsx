import { useState } from "react";
import { Plus, Download, LayoutGrid, List } from "lucide-react";
import { Variants,motion } from "framer-motion";
import ImportResumeModal from "../_components/ImportResumeModal";

export default function ResumesPage() {
  const [isImportModalOpen, setImportModalOpen] = useState(false);

  const fadeInLeft : Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.01, duration: 1, ease: "easeOut" },
    }),
  };

  return (
    <div className="flex flex-col gap-6">
      <ImportResumeModal isOpen={isImportModalOpen} onClose={() => setImportModalOpen(false)} />

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Resumes</h1>
        <div className="flex gap-2 bg-white border rounded-md p-1 shadow-sm">
          <button className="flex items-center gap-1 px-2 py-1 text-sm rounded hover:bg-gray-100">
            <LayoutGrid className="w-4 h-4" />
            Grid
          </button>
          <button className="flex items-center gap-1 px-2 py-1 text-sm rounded hover:bg-gray-100">
            <List className="w-4 h-4" />
            List
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Create Resume Card */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeInLeft}
          className="flex flex-col items-center justify-center p-6 border rounded-xl bg-gradient-to-b from-white to-gray-50 hover:shadow-md cursor-pointer transition"
        >
          <Plus className="w-8 h-8 mb-4" />
          <h2 className="font-semibold">Create a new resume</h2>
          <p className="text-sm text-gray-500">Start building from scratch</p>
        </motion.div>

        {/* Import Resume Card */}
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeInLeft}
          className="flex flex-col items-center justify-center p-6 border rounded-xl bg-gradient-to-b from-white to-gray-50 hover:shadow-md cursor-pointer transition"
          onClick={() => setImportModalOpen(true)}
        >
          <Download className="w-8 h-8 mb-4" />
          <h2 className="font-semibold">Import an existing...</h2>
          <p className="text-sm text-gray-500">LinkedIn, JSON Resume, etc.</p>
        </motion.div>
      </div>
    </div>
  );
}
