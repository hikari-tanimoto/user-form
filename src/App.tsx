import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "./App.css";

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

  const onSubmit = (data: FormValues) => {
    console.log(data);
    alert(`Name: ${data.name}`);
  };

  return (
    <div style={{ maxWidth: 480, margin: "2rem auto", padding: "0 1rem" }}>
      <h1>User Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            {...register("name")}
            style={{ display: "block", width: "100%", padding: "0.5rem" }}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            {...register("email")}
            type="email"
            style={{ display: "block", width: "100%", padding: "0.5rem" }}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            {...register("password")}
            type="password"
            style={{ display: "block", width: "100%", padding: "0.5rem" }}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            {...register("confirmPassword")}
            type="password"
            style={{ display: "block", width: "100%", padding: "0.5rem" }}
          />
          {errors.confirmPassword && (
            <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
          )}
        </div>

        <button type="submit" style={{ padding: "0.5rem 1.5rem" }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
