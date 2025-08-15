import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthStore, User, Session, UserProfile } from './types';
import { supabase } from '../supabase';

const initialState = {
  user: null,
  session: null,
  isLoading: false,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,

      setUser: (user: User) =>
        set((state) => ({
          user,
          isAuthenticated: !!user,
        })),

      setSession: (session: Session) =>
        set((state) => ({
          session,
          isAuthenticated: !!session,
        })),

      setLoading: (isLoading: boolean) =>
        set((state) => ({
          isLoading,
        })),

      updateProfile: async (profile: UserProfile) => {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          throw new Error('User not authenticated');
        }

        const { data, error } = await supabase.auth.updateUser({
          data: {
            display_name: profile.display_name,
            email: profile.email // Store email in metadata since we don't need verification
          }
        });

        if (error) {
          throw new Error(error.message);
        }

        // Update local state with new user data
        if (data?.user) {
          useAuthStore.getState().setUser(data.user);
        }
      },

      signOut: async () => {
        await supabase.auth.signOut();
        set(initialState);
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
