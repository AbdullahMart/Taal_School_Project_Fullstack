import Navbar from './components/Navbar';
import FilterBar from './components/FilterBar';
import QuestionTable from './components/QuestionTable';
import { useState } from 'react';

export default function App() {
  const [filters, setFilters] = useState({
    level: 'All',
    skill: 'All',
    search: ''
  });

  return (
    < div className="min-h-screen bg-gray-200 font-sans text-xl text-gray-800" >
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6 mt-6 space-y-6">
        
      <FilterBar filters={filters} setFilters={setFilters} />
       

        <QuestionTable filters={filters} />
      </main>
    </div >

  );
}
