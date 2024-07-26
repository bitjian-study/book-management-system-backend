import { Inject, Injectable } from '@nestjs/common';
import { DbModuleOptions } from './db.module';
import { access, readFile, writeFile } from 'fs/promises';

@Injectable()
export class DbService {
  @Inject('OPTIONS')
  private options: DbModuleOptions;

  async read() {
    // 判断文件是否存在
    const filepath = this.options.path;
    try {
      await access(filepath);
    } catch (err) {
      return [];
    }
    // 读取文件内容
    const data = await readFile(filepath, 'utf-8');
    if (!data) return [];
    return JSON.parse(data);
  }
  async write(obj: Record<string, any>) {
    await writeFile(this.options.path, JSON.stringify(obj), {
      encoding: 'utf-8',
    });
  }
}
