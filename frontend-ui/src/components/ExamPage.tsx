import React, { useState } from 'react';
import QuestionTable from './QuestionTable';
import FilterBar from './FilterBar';
import { Filters, Question } from '../types';

const DUMMY_QUESTIONS: Question[] = [
  {
    id: 1,
    created_at: new Date(2024, 0, 15).toISOString(),
    level: 'A1',
    skill: 'Reading',
    code: 'EX001',
    title: 'Basic Reading Comprehension',
    meta: { paragraphs: 2, questions: 5 },
    status: 'Approved'
  },
  {
    id: 2,
    created_at: new Date(2024, 1, 20).toISOString(),
    level: 'A2',
    skill: 'Writing',
    code: 'EX002',
    title: 'Elementary Writing Skills',
    meta: { paragraphs: 1, questions: 3 },
    status: 'Processing'
  },
  {
    id: 3,
    created_at: new Date(2024, 2, 10).toISOString(),
    level: 'B1',
    skill: 'Listening',
    code: 'EX003',
    title: 'Intermediate Listening Exam',
    meta: { paragraphs: 3, questions: 8 },
    status: 'Active'
  },
  {
    id: 4,
    created_at: new Date(2024, 2, 25).toISOString(),
    level: 'B2',
    skill: 'Speaking',
    code: 'EX004',
    title: 'Upper-Intermediate Speaking Test',
    meta: { paragraphs: 2, questions: 6 },
    status: 'Approved'
  },
  {
    id: 5,
    created_at: new Date(2024, 3, 5).toISOString(),
    level: 'C1',
    skill: 'Reading',
    code: 'EX005',
    title: 'Advanced Reading Comprehension',
    meta: { paragraphs: 4, questions: 10 },
    status: 'Approved'
  },
  {
    id: 6,
    created_at: new Date(2024, 3, 18).toISOString(),
    level: 'A1',
    skill: 'Grammar',
    code: 'EX006',
    title: 'Elementary Grammar Test',
    meta: { paragraphs: 1, questions: 4 },
    status: 'Active'
  },
  {
    id: 7,
    created_at: new Date(2024, 4, 2).toISOString(),
    level: 'B1',
    skill: 'Vocabulary',
    code: 'EX007',
    title: 'Intermediate Vocabulary Assessment',
    meta: { paragraphs: 2, questions: 7 },
    status: 'Processing'
  },
  {
    id: 8,
    created_at: new Date(2024, 4, 15).toISOString(),
    level: 'C2',
    skill: 'Writing',
    code: 'EX008',
    title: 'Mastery Level Writing Exam',
    meta: { paragraphs: 3, questions: 9 },
    status: 'Approved'
  },
];

const ExamPage = () => {
  const [filters, setFilters] = useState<Filters>({
    level: 'All',
    skill: 'All',
    search: ''
  });

  return (
    <div className="max-w-7xl mx-auto px-8 py-10 space-y-8 animate-in slide-in-from-bottom duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Exam Database</h1>
        <p className="text-slate-500 font-medium italic">Access and manage exam questions and materials</p>
      </div>
      <div className="bg-white p-2 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
        <FilterBar filters={filters} setFilters={setFilters} />
      </div>
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden ring-1 ring-slate-100 ring-offset-8">
        <QuestionTable filters={filters} initialData={DUMMY_QUESTIONS} />
      </div>
    </div>
  );
};

export default ExamPage;
