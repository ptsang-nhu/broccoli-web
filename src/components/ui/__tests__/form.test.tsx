import { useForm } from "react-hook-form";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import {
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormItem,
  Form,
} from "../form";
import { Input } from "../input";

function FormTest() {
  const form = useForm();

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
}

test("Form should be rendered", () => {
  render(<FormTest />);
  const label = screen.getByText("Username");
  expect(label).toBeInTheDocument();
});
