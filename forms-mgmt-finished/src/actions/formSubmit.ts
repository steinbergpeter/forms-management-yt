"use server";

import { userSchema } from "@/validation/formSchema";
import { prisma } from "@/lib/db";

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function onSubmitAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawData = Object.fromEntries(formData);
  const parsed = userSchema.safeParse(rawData);

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(rawData)) {
      fields[key] = rawData[key].toString();
    }
    return {
      message: "Invalid form data",
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  try {
    const returnedUser = await prisma.user.create({
      data: {
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        email: parsed.data.email,
      },
    });

    if (!returnedUser || returnedUser.email !== parsed.data.email) {
      return { message: "Database error" };
    }

    return { message: "User registered" };
  } catch (error) {
    console.error("Error creating user:", error);
    return { message: "An error occurred while registering the user" };
  }
}
