export interface Book {
    id: number;
    name: string;
    description: string;
    category: string;
    createdAt?: Date;
}

export type ViewMode = 'table' | 'grid';
export type SortField = 'id' | 'name' | 'category';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
    field: SortField;
    direction: SortDirection;
}
