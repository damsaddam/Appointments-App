export interface IScheduler {
    id: any;
    description: string;
    status: 'list' | 'in-progress' | 'done';
}