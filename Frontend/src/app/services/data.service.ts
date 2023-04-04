import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config.service';
import { firstValueFrom } from 'rxjs';
import OperationModel from '../models/operation.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public constructor( private http:HttpClient, private config: ConfigService) { }

  public async getAllOperations ( ): Promise<OperationModel[]> {
    const observable = this.http.get<OperationModel[]>(this.config.operations)
    const operations = await firstValueFrom(observable);
    return operations;
  }

  public async getAllOperationsById(type: string): Promise<OperationModel[]> {
    const observable = this.http.get<OperationModel[]>(this.config.operations + type)
    const operations = await firstValueFrom(observable);
    return operations;
  }

  public async addOperation(operation: OperationModel):Promise<void>{
    const observable = this.http.post(this.config.operations, operation);
    await firstValueFrom(observable);
  }

  public async deleteOperation(_id: string):Promise<void>{
    const observable = this.http.delete(this.config.operations + _id);
    await firstValueFrom(observable);
  }

}
