import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "./App.css";
import { FormField } from "./components/FormField";
import { UserList } from "./components/UserList";

const formSchema = z
  .object({
    name: z.string().min(1, { message: "名前は必須です" }),
    email: z
      .string()
      .email({ message: "メールアドレスとして正しくありません" }),
    password: z
      .string()
      .min(8, { message: "パスワードは8文字以上である必要があります" }),
    confirmPassword: z.string().min(1, { message: "パスワードは必須です" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });


  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (user: FormValues) => {
      return fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <div style={{ maxWidth: 480, margin: "2rem auto", padding: "0 1rem" }}>
      <h1>User Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          label="Name"
          htmlFor="name"
          errorMessage={errors.name?.message}
        >
          <input
            id="name"
            {...register("name")}
            style={{ display: "block", width: "100%", padding: "0.5rem" }}
          />
        </FormField>

        <FormField
          label="Email"
          htmlFor="email"
          errorMessage={errors.email?.message}
        >
          <input
            id="email"
            {...register("email")}
            type="email"
            style={{ display: "block", width: "100%", padding: "0.5rem" }}
          />
        </FormField>

        <FormField
          label="Password"
          htmlFor="password"
          errorMessage={errors.password?.message}
        >
          <input
            id="password"
            {...register("password")}
            type="password"
            style={{ display: "block", width: "100%", padding: "0.5rem" }}
          />
        </FormField>

        <FormField
          label="Confirm Password"
          htmlFor="confirmPassword"
          errorMessage={errors.confirmPassword?.message}
        >
          <input
            id="confirmPassword"
            {...register("confirmPassword")}
            type="password"
            style={{ display: "block", width: "100%", padding: "0.5rem" }}
          />
        </FormField>

        <button type="submit" style={{ padding: "0.5rem 1.5rem" }}>
          Submit
        </button>
      </form>
      <UserList />
    </div>
  );
}

export default App;
