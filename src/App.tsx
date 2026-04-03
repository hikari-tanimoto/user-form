import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "./App.css";

const formSchema = z.object({
  name: z.string().min(1, { message: "名前は必須です" }),
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

        <button type="submit" style={{ padding: "0.5rem 1.5rem" }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
