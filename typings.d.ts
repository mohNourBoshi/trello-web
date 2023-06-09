interface Board {
    columns: Map<TypedColumn, Column>;
}
type TypedColumn = "todo" | "inprogress" | "done"


interface Column {
    id: TypedColumn,
    todos: Todo[]

}
interface Todo {
    $id: string;
    $createdAt: string;
    title: TypedColumn;
    status: string;
    image?: Image;
}

interface Image {
    BucketId: string;
    fileId: string;

}