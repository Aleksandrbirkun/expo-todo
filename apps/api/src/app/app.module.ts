import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { TodosModule } from '../todos/todos.module';
import { SupabaseModule } from '../supabase/supabase.module';
import { PrismaModule } from '../prisma/prisma.module';
import supabaseConfig from '../config/supabase.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [supabaseConfig],
    }),
    PrismaModule,
    SupabaseModule,
    AuthModule,
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
