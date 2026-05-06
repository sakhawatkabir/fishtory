import { Suspense } from "react";
import LoginForm from "../_components/LoginForm";

const LoginPage = () => {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
};

export default LoginForm;
