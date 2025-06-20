import React, { useState, useRef, useEffect } from 'react';

interface CommandProps {
  className?: string;
  children: React.ReactNode;
}

interface CommandInputProps {
  placeholder?: string;
  className?: string;
}

interface CommandListProps {
  className?: string;
  children: React.ReactNode;
}

interface CommandEmptyProps {
  className?: string;
  children: React.ReactNode;
}

interface CommandGroupProps {
  children: React.ReactNode;
}

interface CommandItemProps {
  value: string;
  onSelect: () => void;
  className?: string;
  children: React.ReactNode;
}

const CommandContext = React.createContext<{
  search: string;
  setSearch: (search: string) => void;
}>({
  search: '',
  setSearch: () => {}
});

export const Command: React.FC<CommandProps> = ({ className = '', children }) => {
  const [search, setSearch] = useState('');

  return (
    <CommandContext.Provider value={{ search, setSearch }}>
      <div className={`${className}`}>
        {children}
      </div>
    </CommandContext.Provider>
  );
};

export const CommandInput: React.FC<CommandInputProps> = ({ placeholder, className = '' }) => {
  const { search, setSearch } = React.useContext(CommandContext);

  return (
    <div className="p-2">
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`w-full px-3 py-2 text-sm rounded-md focus:outline-none ${className}`}
      />
    </div>
  );
};

export const CommandList: React.FC<CommandListProps> = ({ className = '', children }) => {
  return (
    <div className={`max-h-60 overflow-y-auto ${className}`}>
      {children}
    </div>
  );
};

export const CommandEmpty: React.FC<CommandEmptyProps> = ({ className = '', children }) => {
  const { search } = React.useContext(CommandContext);
  
  // Only show empty state when there's a search and no results
  if (!search) return null;
  
  return (
    <div className={`text-center py-4 text-sm ${className}`}>
      {children}
    </div>
  );
};

export const CommandGroup: React.FC<CommandGroupProps> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};

export const CommandItem: React.FC<CommandItemProps> = ({ value, onSelect, className = '', children }) => {
  const { search } = React.useContext(CommandContext);
  
  // Filter items based on search
  const isVisible = !search || value.toLowerCase().includes(search.toLowerCase());
  
  if (!isVisible) return null;

  return (
    <div
      onClick={onSelect}
      className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${className}`}
    >
      {children}
    </div>
  );
};