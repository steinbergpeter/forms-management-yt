"use client";

import { onSubmitAction } from "@/actions/formSubmit";
import { Field } from "@/components/Field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { userSchema, type User } from "@/validation/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { FormEvent, useRef } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";

export const MailForm = () => {
  const [state, formAction] = useFormState(onSubmitAction, {
    message: "",
  });

  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      ...(state?.fields ?? {}),
    },
    mode: "onBlur",
  });

  const formRef = useRef<HTMLFormElement>(null);

  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const refAsFormData = new FormData(formRef.current!);
    const formActionAsFormSubmit = () => formAction(refAsFormData);
    const handleFormSubmit = form.handleSubmit(formActionAsFormSubmit);
    handleFormSubmit(e);
  };

  return (
    <Form {...form}>
      {state?.message !== "" && !state.issues && (
        <div className="text-red-500">{state.message}</div>
      )}
      {state?.issues && (
        <div className="text-red-500">
          <ul>
            {state.issues.map((issue) => (
              <li key={issue} className="flex gap-1">
                <X fill="red" />
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form
        ref={formRef}
        className="space-y-8"
        action={formAction}
        onSubmit={formSubmit}
      >
        <div className="flex gap-2">
          <Field
            control={form.control}
            name="firstName"
            label="First Name"
            desc="Your first name."
            className="w-full"
          />
          <Field
            control={form.control}
            name="lastName"
            label="Last Name"
            desc="Your last name."
            className="w-full"
          />
        </div>
        <Field
          control={form.control}
          name="email"
          label="Email"
          desc="Your email."
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
