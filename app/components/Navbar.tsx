'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';

const Navbar = () => {
  const pathname = usePathname();
  
  const navLinks = [
    { name: '首頁', href: '/' },
    { name: '標籤', href: '/tags' },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="font-bold text-xl text-gray-900 dark:text-white"
          >
            技術部落格
          </Link>
          
          <div className="hidden md:flex md:w-1/3 lg:w-1/4 mx-4">
            <SearchBar />
          </div>
          
          <div className="flex items-center space-x-6">
            <nav className="flex space-x-6">
              {navLinks.map((link) => {
                const isActive = 
                  pathname === link.href || 
                  (link.href !== '/' && pathname?.startsWith(link.href));
                
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`${
                      isActive 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                    } transition-colors font-medium`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
            
            <ThemeToggle />
          </div>
        </div>
        
        {/* 在移動設備上顯示搜索欄 */}
        <div className="md:hidden pb-4">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Navbar;