import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private supabaseService: SupabaseService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('supabase.jwtSecret'),
    });
  }

  async validate(payload: any) {
    try {
      const supabase = this.supabaseService.getClient();
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', payload.sub)
        .single();

      if (error) {
        throw new UnauthorizedException('Invalid token');
      }

      return {
        userId: payload.sub,
        email: payload.email,
        role: profile?.role || 'user',
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
