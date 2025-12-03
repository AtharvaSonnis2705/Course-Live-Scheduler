
export interface User {
  _id: string;
  username: string;
  role: 'admin' | 'instructor';
}

export interface Course {
  _id: string;
  name: string;
  level: string;
  description: string;
  image: string;
}

export interface Lecture {
  _id: string;
  course: Course;
  instructor: User;
  date: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  msg: string;
}