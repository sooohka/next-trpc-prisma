import trpc from "@/server/utils/trpc";
import SuperJSON from "superjson";

const Todos = () => {
  const { data ,status} = trpc.todos.getAll.useQuery();

  if(status==='loading'){
    return <p>loading...</p>
  }
  if(status==='error'){
    return <p>something went wrong</p>
  }

  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id.toString()}>
          <pre>{JSON.stringify(SuperJSON.serialize(todo).json, null, 2)}</pre>
        </li>
      ))}
    </ul>
  );
};

export default Todos;
