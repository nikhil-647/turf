import { User as SupabaseUser, Session as SupabaseSession } from '@supabase/supabase-js';

export type User = SupabaseUser | null;
export type Session = SupabaseSession | null;

export type AuthState = {
  user: User;
  session: Session;
  isLoading: boolean;
  isAuthenticated: boolean;
};

export type UserProfile = {
  display_name: string;
};

export type AuthStore = AuthState & {
  setUser: (user: User) => void;
  setSession: (session: Session) => void;
  setLoading: (isLoading: boolean) => void;
  updateProfile: (profile: UserProfile) => Promise<void>;
  signOut: () => void;
};
