import React from "react";
import type {
  ActionFunction,
  LoaderArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { verifyLogin } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { validateEmail } from "~/utils";
import HEADERBEFORELOGIN from "./headerBeforeLogin";


export const meta: MetaFunction = () => {
  return {
    title: "Login",
  };
};

interface ActionData {
  errors: {
    email?: string;
    password?: string;
  };
}

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/Home");
  return json({});
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = formData.get("redirectTo");
  const remember = formData.get("remember");

  if (!validateEmail(email)) {
    return json({ errors: { email: "Email is invalid." } }, { status: 400 });
  }

  if (typeof password !== "string") {
    return json(
      { errors: { password: "Valid password is required." } },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return json(
      { errors: { password: "Password is too short" } },
      { status: 400 }
    );
  }

  const user = await verifyLogin(email, password);

  console.log(user)

  if (typeof user === "string") {
    return json(
      { errors: { email: user } },
      { status: 400 }
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on" ? true : false,
    redirectTo: typeof redirectTo === "string" ? redirectTo : "/Home",
  });
};

export default function Login() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/Home";

  const actionData = useActionData() as ActionData;
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef?.current?.focus();
    }

    if (actionData?.errors?.password) {
      passwordRef?.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex flex-col justify-center min-h-full bg-white">
      <div className="mx-auto w-full max-w-md px-8">
        <Form method="post" className="space-y-6" noValidate>
          <div>
            <label className="text-sm font-medium" htmlFor="email">
              <span className="block text-gray-900">Email Address</span>
              {actionData?.errors?.email && (
                <span className="block pt-1 text-gray-600" id="email-error">
                  {actionData?.errors?.email}
                </span>
              )}
            </label>
            <input
              className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              autoComplete="email"
              type="email"
              name="email"
              id="email"
              aria-invalid={actionData?.errors?.email ? true : undefined}
              aria-describedby="email-error"
              ref={emailRef}
            />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="password">
              <span className="block text-gray-900">Password</span>
              <span className="block font-light text-gray-600">
                Must have at least 6 characters.
              </span>
              {actionData?.errors?.password && (
                <span className="pt-1 text-gray-600" id="password-error">
                  {actionData?.errors?.password}
                </span>
              )}
            </label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete=""
              className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              aria-invalid={actionData?.errors?.password ? true : undefined}
              aria-describedby="password-error"
              ref={passwordRef}
            />
          </div>
          <button
            className="w-full rounded bg-indigo-500 text-lg py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
            type="submit"
          >
            Log in
          </button>
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                id="remember"
                name="remember"
                type="checkbox"
              />
              <label
                className="ml-2 block text-sm text-gray-600"
                htmlFor="remember"
              >
                Remember me
              </label>
            </div>
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                className="text-blue-500 underline"
                to={{ pathname: "/join" }}
              >
                Sign up
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>

  );
}
