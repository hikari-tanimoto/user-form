import type { PropsWithChildren } from "react";

type FormFieldProps = {
  label: string;
  htmlFor: string;
  errorMessage: string | undefined;
};

export const FormField = ({
  label,
  htmlFor,
  errorMessage,
  children,
}: PropsWithChildren<FormFieldProps>) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};
