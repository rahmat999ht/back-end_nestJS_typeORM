import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entity/employee.entity';
import { Repository } from 'typeorm';
import { ContactInfo } from './entity/contact.info.entity';
import { Task } from './entity/task.entity';
import { Meeting } from './entity/meeting.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
    @InjectRepository(ContactInfo)
    private contactInfoRepo: Repository<ContactInfo>,
    @InjectRepository(Task) private taskRepo: Repository<Task>,
    @InjectRepository(Meeting) private meetingRepo: Repository<Meeting>,
  ) {}

  async setEmployee() {
    // employee 1 CEO
    const ceo = this.employeeRepo.create({ name: 'Mr. yayat (ceo)' });
    await this.employeeRepo.save(ceo);

    const ceoContactInfo = this.contactInfoRepo.create({
      email: 'yayat999yt@gmail.com',
    });
    ceoContactInfo.employee = ceo;
    await this.contactInfoRepo.save(ceoContactInfo);

    // employee 2 Manager
    const manager = this.employeeRepo.create({
      name: 'rahmat (manager)',
      manager: ceo,
    });

    const task1 = this.taskRepo.create({ name: 'Hire People' });
    await this.taskRepo.save(task1);

    const task2 = this.taskRepo.create({ name: 'Manajemen SDM' });
    await this.taskRepo.save(task2);

    manager.tasks = [task1, task2];

    const meeting1 = this.meetingRepo.create({ zoomUrl: 'meeting.com' });
    meeting1.attendees = [ceo];
    await this.meetingRepo.save(meeting1);

    manager.meetings = [meeting1];

    await this.employeeRepo.save(manager);
  }

  getHello(): string {
    return 'Hello World!!!';
  }
}
