export interface Filters {
  level: string;
  skill: string;
  search: string;
}

export interface Question {
  id: number;
  created_at: string;
  level: string;
  skill: string;
  code: string;
  title: string;
  meta?: {
    paragraphs: number;
    questions: number;
  };
  status: string;
}

export interface StudentStat {
  student_id: number;
  country: string;
  field_of_study: string;
  platform_used: string;
  device_used: string;
  learning_mode: string;
  enrollment_date: string;
  daily_learning_hours: string;
  quizzes_attempted: number;
  assignments_submitted: number;
  course_completion_rate: string;
  satisfaction_score: number;
}

export interface Student {
  student_id: number;
  first_name: string;
  last_name: string;
  country: string;
  age: number;
  gender: string;
  education_level: string;
  field_of_study?: string;
}
