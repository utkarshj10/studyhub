export type Priority = "low" | "medium" | "high";

export type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

export type AuthResponse = {
  access_token: string;
  token_type: string;
  user: User;
};

export type Task = {
  id: string;
  title: string;
  subject: string;
  description: string;
  priority: Priority;
  due_date: string | null;
  completed: boolean;
  created_at: string;
  completed_at: string | null;
};

export type DashboardStats = {
  total: number;
  completed: number;
  pending: number;
  high_priority: number;
  completion_rate: number;
};
