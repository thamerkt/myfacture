export class User {
    id?: number; // Optional: ID of the user
    email: string | undefined; // User's email address
    password: string | undefined; // User's password
    confirmPassword: string | undefined; // Optional: For registration validation
    name?: string; // Optional: User's name
    role?: string; // Optional: User's role (e.g., ADMIN, USER)
    
  }
  