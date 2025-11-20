import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('supabase.url');
    const supabaseKey = this.configService.get<string>('supabase.anonKey');
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL and Anon Key must be provided');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  async signIn(email: string, password: string) {
    return await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
  }

  async signUp(email: string, password: string) {
    return await this.supabase.auth.signUp({
      email,
      password,
    });
  }

  async signOut() {
    return await this.supabase.auth.signOut();
  }

  async getUser(accessToken: string) {
    return await this.supabase.auth.getUser(accessToken);
  }
}