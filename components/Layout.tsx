import React from 'react';
import { Briefcase, BarChart3, User, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: { callsign: string | null; isAuthenticated: boolean };
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-primary-600 mr-3" />
              <div>
                <h1 className="text-lg font-bold text-neutral-900 leading-tight">Exit Ready</h1>
                <p className="text-xs text-neutral-500">Diagnostic Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {user.isAuthenticated && (
                <>
                  <div className="hidden md:flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-100">
                    <User className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">{user.callsign}</span>
                  </div>
                  <button 
                    onClick={onLogout}
                    className="p-2 rounded-md text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
        {children}
      </main>

      <footer className="bg-white border-t border-neutral-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} Exit Readiness Diagnostic. Privacy First. Zero PII.
          </p>
        </div>
      </footer>
    </div>
  );
};
