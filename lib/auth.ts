import { supabase } from './supabase';

export type AuthError = {
  message: string;
};

export const auth = {
  /**
   * Send OTP to the provided phone number
   * @param phoneNumber - Phone number in international format (e.g., +1234567890)
   */
  async sendOTP(phoneNumber: string): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: phoneNumber,
      });

      if (error) {
        return { error: { message: error.message } };
      }

      return { error: null };
    } catch (error) {
      return { error: { message: 'Failed to send OTP' } };
    }
  },

  /**
   * Verify OTP code
   * @param phoneNumber - Phone number used to send OTP
   * @param otp - The OTP code received via SMS
   */
  async verifyOTP(phoneNumber: string, otp: string): Promise<{ 
    error: AuthError | null;
    session: any | null;
  }> {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: phoneNumber,
        token: otp,
        type: 'sms'
      });

      if (error) {
        return { error: { message: error.message }, session: null };
      }

      return { error: null, session: data.session };
    } catch (error) {
      return { error: { message: 'Failed to verify OTP' }, session: null };
    }
  },

  /**
   * Sign out the current user
   */
  async signOut(): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        return { error: { message: error.message } };
      }

      return { error: null };
    } catch (error) {
      return { error: { message: 'Failed to sign out' } };
    }
  },

  /**
   * Get the current session
   */
  async getSession() {
    return await supabase.auth.getSession();
  },

  /**
   * Get the current user
   */
  async getUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }
};
