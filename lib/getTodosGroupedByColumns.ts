import { databases } from "@/appwrite";

export const getTodosGroupedByColumns = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODO_COLLECTION_ID!
  );
  const todos = data.documents;
  // console.log(todos);

  const columns = todos.reduce((accumlater, todo) => {
    if (!accumlater.get(todo.states)) {
      accumlater.set(todo.states, {
        id: todo.states,
        todos: [],
      });
    }

    accumlater.get(todo.states)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo["title-text"],
      status: todo.states
    });

    // ...{(todo.image) &&{image: JSON.parse(todo.image)}}
    return accumlater;
  }, new Map<TypedColumn, Column>());
  //  if the respoding donot have a inprogress or done ortodo so this way how we handle it
  const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"];
  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }
  // console.log(columns);
  // console.log(todos);
  const sortedColumns = new Map(Array.from(columns.entries())
    .sort(
      (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )
  );

  const board: Board = {
    columns: sortedColumns
  };
  return board;
};
