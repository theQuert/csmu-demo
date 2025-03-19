'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = '搜尋文章...' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      startTransition(() => {
        router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      });
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-2 pl-10 pr-4 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg 
            className="w-5 h-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        <button
          type="submit"
          disabled={isPending || !searchTerm.trim()}
          className={`absolute inset-y-0 right-0 px-4 py-2 text-sm font-medium rounded-r-lg focus:outline-none
            ${isPending ? 'bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400' : 
                        searchTerm.trim() ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600' : 
                                           'bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}
        >
          {isPending ? '搜尋中...' : '搜尋'}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;