export default class OperationModel {
    _id: string;
    accountNumber: string;
    type: OperationType;
    amount: number;
    interest: number;
    paymentsAmount: number;
    dateTime: Date;
}

export enum OperationType {
    'Deposit' = 'Deposit',
    'withdraw' = 'Withdraw',
    'Loan'  = 'Loan'
}