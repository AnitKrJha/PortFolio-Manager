import { AuthModal } from "@/atoms/authModal";
import { Button, Divider, Input } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { FormEvent, useState } from "react";
import { SetterOrUpdater } from "recoil";

type Props = {
  setAuthModalState: SetterOrUpdater<AuthModal>;
};

const defaultFormValue = {
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formValue, setFormValue] = useState(defaultFormValue);
  const supabase = useSupabaseClient();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (error) setError("");
    if (success) setSuccess("");
    let email = formValue.email;
    if (formValue.password !== formValue.confirmPassword) {
      setError("passwords don't match");
      return;
    }
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email: formValue.email,
        password: formValue.password,
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
    setSuccess("Confiramtion link has been sent to " + email);
  };

  return (
    <form action="" className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1 mb-3">
        <label htmlFor="email" className="font-poppins font-medium text-md  ">
          Email
        </label>
        <Input
          placeholder="abc@em.com"
          id="email"
          name="email"
          type="email"
          value={formValue.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            let name = e.target.name;
            let value = e.target.value;
            setFormValue((prev) => ({ ...formValue, [name]: value }));
          }}
          variant={"unstyled"}
          paddingX="5px"
          className={`${
            !!error && "border-red-400"
          } border p-1 focus:outline focus:outline-blue-100 focus:border-none`}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="font-poppins font-medium text-md  "
        >
          Password
        </label>
        <Input
          placeholder="Password"
          name="password"
          id="password"
          type="password"
          value={formValue.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            let name = e.target.name;
            let value = e.target.value;
            setFormValue((prev) => ({ ...formValue, [name]: value }));
          }}
          variant={"unstyled"}
          px={"5px"}
          className={`${
            !!error && "border-red-400"
          } border p-1 focus:outline focus:outline-blue-100 focus:border-none`}
        />
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <label
          htmlFor="confirmPassword"
          className="font-poppins font-medium text-md  "
        >
          Confirm Password
        </label>
        <Input
          placeholder="abc@em.com"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formValue.confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            let name = e.target.name;
            let value = e.target.value;
            setFormValue((prev) => ({ ...formValue, [name]: value }));
          }}
          variant={"unstyled"}
          paddingX="5px"
          className={`${
            !!error && "border-red-400"
          } border p-1 focus:outline focus:outline-blue-100 focus:border-none`}
        />
      </div>
      {!!error && (
        <div className="error text-sm font-poppins text-red-500">{error}</div>
      )}
      {!!success && (
        <div className="success text-sm font-poppins text-green-600">
          {success}
        </div>
      )}
      <div className="button-grp flex w-full justify-end">
        <Button
          variant={""}
          bg="blue.600"
          type="submit"
          isLoading={loading}
          textColor={"white"}
          height={"30px"}
          px="4px"
          py="2px"
          className="bg-blue-600 flex text-white hover:bg-red-400"
        >
          SignUp
        </Button>
      </div>
      <Divider bg="black" border="1px solid" borderColor={"gray.400"} />

      <div className="text-sm font-poppins w-full text-center">
        Are You New Here?{" "}
        <Button
          variant={"link"}
          textColor={"blue.400"}
          fontSize={14}
          className="text-sm"
          onClick={() =>
            props.setAuthModalState((prev) => ({ ...prev, type: "login" }))
          }
        >
          Login
        </Button>
      </div>
    </form>
  );
};

export default SignUp;
