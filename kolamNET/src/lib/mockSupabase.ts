// Mock authentication service for development
export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Session {
  user: User;
  access_token: string;
}

class MockAuthService {
  private currentUser: User | null = null;
  private listeners: ((user: User | null) => void)[] = [];

  async getSession(): Promise<{ data: { session: Session | null } }> {
    const savedUser = localStorage.getItem('mock-user');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
      return {
        data: {
          session: this.currentUser ? {
            user: this.currentUser,
            access_token: 'mock-token'
          } : null
        }
      };
    }
    return { data: { session: null } };
  }

  async signInWithPassword({ email, password }: { email: string; password: string }) {
    // Mock login - any email/password works in development
    if (email && password) {
      const user: User = {
        id: 'mock-user-id',
        email: email,
        created_at: new Date().toISOString()
      };
      
      this.currentUser = user;
      localStorage.setItem('mock-user', JSON.stringify(user));
      
      // Notify listeners
      this.listeners.forEach(listener => listener(user));
      
      return { data: { user }, error: null };
    }
    
    return { data: null, error: { message: 'Invalid credentials' } };
  }

  async signUp({ email, password }: { email: string; password: string }) {
    // Mock signup - any email/password works in development
    if (email && password) {
      const user: User = {
        id: 'mock-user-id-' + Date.now(),
        email: email,
        created_at: new Date().toISOString()
      };
      
      this.currentUser = user;
      localStorage.setItem('mock-user', JSON.stringify(user));
      
      // Notify listeners
      this.listeners.forEach(listener => listener(user));
      
      return { data: { user }, error: null };
    }
    
    return { data: null, error: { message: 'Invalid email or password' } };
  }

  async signOut() {
    this.currentUser = null;
    localStorage.removeItem('mock-user');
    
    // Notify listeners
    this.listeners.forEach(listener => listener(null));
    
    return { error: null };
  }

  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    const listener = (user: User | null) => {
      callback(user ? 'SIGNED_IN' : 'SIGNED_OUT', user ? {
        user,
        access_token: 'mock-token'
      } : null);
    };
    
    this.listeners.push(listener);
    
    return {
      data: {
        subscription: {
          unsubscribe: () => {
            const index = this.listeners.indexOf(listener);
            if (index > -1) {
              this.listeners.splice(index, 1);
            }
          }
        }
      }
    };
  }
}

// Mock Supabase client for development
export const mockSupabase = {
  auth: new MockAuthService(),
  functions: {
    invoke: async (functionName: string, options: any) => {
      // Mock function responses for development
      console.log(`Mock function call: ${functionName}`, options);
      
      if (functionName === 'analyze-kolam') {
        return {
          data: {
            analysis: `Mock Analysis Results:

Geometric Properties:
- Pattern Type: Traditional kolam design
- Symmetry: Radial symmetry detected (8-fold)
- Complexity Level: Medium-High
- Grid Base: 9x9 dot matrix

Mathematical Elements:
- Sacred geometry principles observed
- Fractal-like repetitive patterns
- Golden ratio proportions in key segments
- Tessellation patterns present

Color Analysis:
- Primary colors: White, red, yellow
- High contrast ratio for visibility
- Traditional color palette maintained

Cultural Significance:
- Classic South Indian kolam design
- Suitable for festival celebrations
- Represents prosperity and good fortune

Confidence Score: 92%`
          },
          error: null
        };
      }
      
      return { data: null, error: { message: 'Function not implemented in mock mode' } };
    }
  }
};

export const supabase = mockSupabase;