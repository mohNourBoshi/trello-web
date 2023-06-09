import { getTodosGroupedByColumns } from '@/lib/getTodosGroupedByColumns';
import { create as createe } from 'zustand'

interface BoardState {
    board :Board; 
    getBoard : ()=> void ;
}

export const useBearStore = createe<BoardState>((set) => ({
    board: {
        columns: new Map<TypedColumn, Column>()
    },
    getBoard :async()=> {
        const board= await getTodosGroupedByColumns() ;
        set({ board}); 

    }

}))