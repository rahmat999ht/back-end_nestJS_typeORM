import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entity/employee.entity';
import { ContactInfo } from './entity/contact.info.entity';
import { Meeting } from './entity/meeting.entity';
import { Task } from './entity/task.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: '127.0.0.1',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'admin123',
    //   database: 'bio',
    //   entities: ['dist/**/*.entities.js'],
    //   synchronize: true,
    // }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cf: ConfigService) => ({
        type: 'postgres',
        host: cf.get('DB_HOST'),
        port: cf.get('DB_PORT'),
        username: cf.get('DB_USERNAME'),
        password: cf.get('DB_PASSWORD'),
        database: cf.get('DB_NAME'),
        entities: [join(process.cwd(), 'dist/**/*.entities.js')],
        //do not use synchronize: true in real project
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Employee, ContactInfo, Meeting, Task]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
