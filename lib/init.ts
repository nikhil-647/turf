import { supabase } from './supabase';
import { useAuthStore } from './stores/auth';

export const initializeApp = async () => {
  // Get initial session
  const { data: { session }, error } = await supabase.auth.getSession();
  if (session) {
    useAuthStore.getState().setSession(session);
    useAuthStore.getState().setUser(session.user);
  }

  // Listen for auth state changes
  supabase.auth.onAuthStateChange((event, session) => {
    useAuthStore.getState().setSession(session);
    useAuthStore.getState().setUser(session?.user ?? null);
  });
};
