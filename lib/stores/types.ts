import { User as SupabaseUser, Session as SupabaseSession } from '@supabase/supabase-js';

export type User = SupabaseUser | null;
export type Session = SupabaseSession | null;

export type AuthState = {
  user: User;
  session: Session;
  isLoading: boolean;
  isAuthenticated: boolean;
  isOTPVerified: boolean;
  phoneNumber: string | null;
};

export type UserProfile = {
  display_name: string;
  email?: string;
};

export type AuthStore = AuthState & {
  setUser: (user: User) => void;
  setSession: (session: Session) => void;
  setLoading: (isLoading: boolean) => void;
  updateProfile: (profile: UserProfile) => Promise<void>;
  setPhoneNumber: (phoneNumber: string) => void;
  setOTPVerified: (isVerified: boolean) => void;
  signOut: () => void;
};
