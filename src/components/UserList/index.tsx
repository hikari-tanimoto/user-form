import { useQuery } from "@tanstack/react-query";

export type UserData = {
  id: number;
  name: string;
  email: string;
};

const getUsers = async (): Promise<UserData[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
};

export const UserList = () => {
  const { data, isLoading, isError } = useQuery<UserData[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data)
    return <div>Error: {isError && "データを取得できませんでした"}</div>;
  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
