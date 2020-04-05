import { Item } from '../Item';

export type SortColumn = keyof Item | '';
export type SortDirection = 'asc' | 'desc' | '';

export interface SortEvent {
    column: SortColumn;
    direction: SortDirection;
}