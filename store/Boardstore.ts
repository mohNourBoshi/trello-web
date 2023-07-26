import { databases } from '@/appwrite';
import { getTodosGroupedByColumns } from '@/lib/getTodosGroupedByColumns';
import { create as createe } from 'zustand'

interface BoardState {
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void;
    updatTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
    searchString: string;
    setSearchString: (searchString: string) => void;

}

export const useBearStore = createe<BoardState>((set) => ({
    board: {
        columns: new Map<TypedColumn, Column>()
    },
    searchString: '',
    setSearchString: (searchString) => set({ searchString }),

    getBoard: async () => {
        const board = await getTodosGroupedByColumns();
        set({ board });

    },
    setBoardState: (board) => set({ board }),
    updatTodoInDB: async (todo, columnId) => (
        await databases.updateDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODO_COLLECTION_ID!,
            todo.$id,
            {
                'title-text': todo.title,
                states: columnId
            },
        ))

}))