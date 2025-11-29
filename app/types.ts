export interface Employee {
  id: string;
  name: string;
  age: number;
  class: string;
  subjects: string[];
  attendance: number;
}

export interface User {
  id: string;
  username: string;
  role: 'ADMIN' | 'EMPLOYEE';
}




