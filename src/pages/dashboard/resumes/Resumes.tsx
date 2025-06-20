import { useEffect, useState, useCallback } from "react";
import { Plus, Download, LayoutGrid, List, MoreVertical, Trash2, Pencil, Lock, Copy, FolderOpen } from "lucide-react";
import { Variants, motion } from "framer-motion";
import ImportResumeModal from "../_components/ImportResumeModal";
import ResumeTitle from "../_components/AddNewResumeModal";
import initialResumes from "./resumes.json";
import { Menu } from "@headlessui/react";

interface ResumeCard {
  title: string;
  slug: string;
}

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.01, duration: 1, ease: "easeOut" },
  }),
};

const DropdownMenu = () => (
  <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white shadow-lg border focus:outline-none z-50">
    <div className="py-1">
      {[
        { icon: FolderOpen, label: "Open" },
        { icon: Pencil, label: "Rename" },
        { icon: Copy, label: "Duplicate" },
        { icon: Lock, label: "Lock" },
        { icon: Trash2, label: "Delete", danger: true },
      ].map(({ icon: Icon, label, danger }) => (
        <Menu.Item key={label}>
          {({ active }) => (
            <button className={`w-full flex items-center px-4 py-2 text-sm ${danger ? "text-red-600" : ""} ${active ? danger ? "bg-red-50" : "bg-gray-100" : ""}`}>
              <Icon className="w-4 h-4 mr-2" /> {label}
            </button>
          )}
        </Menu.Item>
      ))}
    </div>
  </Menu.Items>
);

const ResumeCardComponent = ({
  resume,
  index,
  isGridView,
}: {
  resume: ResumeCard;
  index: number;
  isGridView: boolean;
}) => (
  <motion.div
    key={resume.slug}
    custom={index}
    initial="hidden"
    animate="visible"
    variants={fadeInLeft}
    className={`transition rounded-xl border bg-white shadow-sm hover:shadow-md ${isGridView ? "p-6" : "px-4 py-3 flex items-center justify-between gap-4"}`}
  >
    {isGridView ? (
      <div className="relative w-full h-full">
        <Menu as="div" className="absolute top-2 right-2 z-10">
          <Menu.Button className="p-1 rounded-full hover:bg-gray-100">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </Menu.Button>
          <DropdownMenu />
        </Menu>

        <div className="flex flex-col justify-between h-full p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition">
          <div>
            <h3 className="text-lg font-semibold">{resume.title}</h3>
            <p className="text-sm text-gray-500">{resume.slug}</p>
          </div>
          {/* <button className="mt-4 text-sm text-blue-600 hover:underline">Open Resume</button> */}
        </div>
      </div>
    ) : (
      <>
        <div className="flex flex-col">
          <span className="text-base font-medium text-gray-900">{resume.title}</span>
          <span className="text-sm text-gray-500">Last updated 3 hours ago</span>
        </div>
        <Menu as="div" className="relative">
          <Menu.Button className="p-1 rounded hover:bg-gray-100 transition">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </Menu.Button>
          <DropdownMenu />
        </Menu>
      </>
    )}
  </motion.div>
);

export default function ResumesPage() {
  const [isImportModalOpen, setImportModalOpen] = useState(false);
  const [isCreateResumeOpen, setIsCreateResumeOpen] = useState(false);
  const [resumes, setResumes] = useState<ResumeCard[]>([]);
  const [isGridView, setIsGridView] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("resumes");
    setResumes(stored ? JSON.parse(stored) : initialResumes);
  }, []);

  const handleCreateResume = useCallback((title: string, slug: string) => {
    const updated = [...resumes, { title, slug }];
    setResumes(updated);
    localStorage.setItem("resumes", JSON.stringify(updated));
    setIsCreateResumeOpen(false);
  }, [resumes]);

  return (
    <div className="flex flex-col gap-6">
      <ImportResumeModal isOpen={isImportModalOpen} onClose={() => setImportModalOpen(false)} />
      <ResumeTitle
        ComponentTitle="Create Resume"
        subtitle="Start creating your resume now!"
        isOpen={isCreateResumeOpen}
        isNew={true}
        onClose={() => setIsCreateResumeOpen(false)}
        onCreateResume={handleCreateResume}
      />

      {/* View Switcher */}
      <div className="flex justify-end gap-2 rounded-md p-1">
        {[{ icon: LayoutGrid, label: "Grid", value: true }, { icon: List, label: "List", value: false }].map(({ icon: Icon, label, value }) => (
          <button
            key={label}
            onClick={() => setIsGridView(value)}
            className={`flex items-center gap-1 px-2 py-1 text-sm rounded ${isGridView === value ? "bg-gray-100 font-semibold" : "hover:bg-gray-100"}`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className={`${isGridView ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col"} gap-6`}>
        {/* Create Resume */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeInLeft}
          className="flex flex-col items-center justify-center p-6 border rounded-xl bg-gradient-to-b from-white to-gray-50 hover:shadow-md cursor-pointer transition"
          onClick={() => setIsCreateResumeOpen(true)}
        >
          <Plus className="w-8 h-8 mb-4" />
          <h2 className="font-semibold">Create a new resume</h2>
          <p className="text-sm text-gray-500">Start building from scratch</p>
        </motion.div>

        {/* Import Resume */}
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

        {resumes.map((resume, i) => (
          <ResumeCardComponent key={resume.slug} resume={resume} index={i + 2} isGridView={isGridView} />
        ))}
      </div>
    </div>
  );
}
