export interface Environment {
    production: boolean;
    apiUrl: string;
    defaultImage:string,
    baseUrl : string

  }
  

export const environment : Environment = {
    production: false, // Set to true in environment.prod.ts
    apiUrl : 'http://localhost:8080', // Your API URL here
    defaultImage : 'http://localhost:8080/image/default/image.png',
    baseUrl : 'http://localhost:8080'

};
