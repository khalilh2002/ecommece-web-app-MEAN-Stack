export interface Environment {
    production: boolean;
    apiUrl: string;
  }
  

export const environment : Environment = {
    production: false, // Set to true in environment.prod.ts
    apiUrl : 'http://localhost:8080', // Your API URL here
};
