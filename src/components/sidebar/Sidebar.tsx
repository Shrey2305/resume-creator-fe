import { NavLink } from 'react-router-dom';
import { BookOpen, SlidersHorizontal } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="flex flex-col justify-between w-64 h-screen p-4 border-r bg-white">
      {/* Top Logo */}
      <div>
        <h1 className="text-2xl font-bold text-center mb-4">R<span className="text-black">x</span></h1>
        <hr className="mb-4" />

        {/* Menu */}
        <nav className="flex flex-col gap-1">
          <NavLink
            to="/dashboard/resumes"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded transition ${
                isActive ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-100'
              }`
            }
          >
            <BookOpen className="w-5 h-5" />
            <span className="flex-1 text-left">Resumes</span>
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          </NavLink>

          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded transition ${
                isActive ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-100'
              }`
            }
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>

      {/* Bottom Info */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-indigo-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-semibold">
            T
          </div>
          <span className="font-medium">The Messenger</span>
        </div>
        <p className="text-xs text-gray-500 mb-1">
          Licensed under <a href="#" className="underline">MIT</a>
        </p>
        <p className="text-xs text-gray-500">By the community, for the community.</p>
        <p className="text-xs text-gray-500">
          A passion project by <a href="https://amruthpillai.com" className="underline">Amruth Pillai</a>
        </p>
        <p className="text-xs text-gray-400 mt-2">Reactive Resume v4.4.5</p>
      </div>
    </aside>
  );
}
