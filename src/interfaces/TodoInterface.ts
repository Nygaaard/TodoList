//Interface Todo
  export interface TodoSchema {
    id: string;
    title: string;
    description: string;
    status: string;
}
  

export interface ErrorsData {
  title?: string;
  description?: string;
  status?: string;
}