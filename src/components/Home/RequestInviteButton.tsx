"use client";

import { Loader2 } from "lucide-react";
import { UseFormReturn, useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { INPUT_MAX_LENGTH, REQUEST_INVITE_API_URL } from "@/consts";
import { zodResolver } from "@hookform/resolvers/zod";

import { Text } from "../common/Typography";

const formSchema = z
  .object({
    name: z.string().min(1, "Full name is required").max(INPUT_MAX_LENGTH),
    email: z
      .string()
      .min(1, "Email is required")
      .max(INPUT_MAX_LENGTH)
      .email("This has to to a valid email"),
    confirmEmail: z
      .string()
      .min(1, "Confirm email is required")
      .max(INPUT_MAX_LENGTH)
      .email("This has to to a valid email"),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Email and confirm email must match",
    path: ["confirmEmail"],
  });
type FormSchema = z.infer<typeof formSchema>;

async function sendRequestInvite(
  url: string,
  { arg }: { arg: Pick<FormSchema, "name" | "email"> },
) {
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(arg),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body?.errorMessage || "Unknown error from server");
    }
  } catch (err) {
    throw err;
  }
}

const RequestInviteForm = ({
  form,
  onSubmit,
  isMutating,
  mutateErrorMessage,
}: {
  form: UseFormReturn<FormSchema>;
  onSubmit: (values: FormSchema) => void;
  isMutating: boolean;
  mutateErrorMessage: undefined | string;
}) => (
  <>
    {/* For accessability */}
    <DialogDescription className="hidden">
      Request an invite form
    </DialogDescription>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="my-2 flex flex-col gap-y-2 md:my-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isMutating}
                    type="text"
                    placeholder="Full name"
                    maxLength={INPUT_MAX_LENGTH}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isMutating}
                    type="text"
                    placeholder="Email"
                    maxLength={INPUT_MAX_LENGTH}
                    onChange={(e) => {
                      onChange(e);
                      // Handle change email after submitting
                      if (form.formState.isSubmitted) {
                        form.trigger();
                      }
                    }}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmEmail"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isMutating}
                    type="text"
                    placeholder="Confirm email"
                    maxLength={INPUT_MAX_LENGTH}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="w-full cursor-pointer text-base"
            disabled={isMutating}
          >
            {isMutating && <Loader2 className="animate-spin" />}
            {isMutating ? "Sending, please wait..." : "Send"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
    {mutateErrorMessage && (
      <Text className="text-center text-balance text-red-500">
        {mutateErrorMessage}
      </Text>
    )}
  </>
);

function RequestInviteButton({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"button">) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const mutate = useSWRMutation(REQUEST_INVITE_API_URL, sendRequestInvite, {
    throwOnError: false,
    onSuccess: () => setIsSuccess(true),
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      confirmEmail: "",
    },
  });

  function onSubmit(values: FormSchema) {
    mutate.reset();
    mutate.trigger({ name: values.name, email: values.email });
  }

  function dialogReset() {
    setTimeout(() => {
      form.reset();
      mutate.reset();
      setIsSuccess(false);
    }, 200);
  }

  function closeWithReset() {
    setIsOpen(false);
    dialogReset();
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(newIsOpen) => {
        // Not close or reset when submitting
        if (mutate.isMutating) return;

        setIsOpen(newIsOpen);
        dialogReset();
      }}
    >
      <DialogTrigger
        className={twMerge(
          "cursor-pointer rounded-4xl bg-blue-500 px-4 py-2 font-mono font-medium text-white shadow-lg shadow-blue-500/50 outline-blue-400 transition-all select-none hover:bg-blue-600 focus-visible:outline-4 active:outline-4 md:px-5 md:py-3 md:text-xl dark:outline-blue-300",
          className,
        )}
        {...props}
      >
        Request an invite
      </DialogTrigger>
      <DialogContent className="top-1/4 md:top-1/2 [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl md:text-3xl">
            {isSuccess ? "All done!" : "Request an invite"}
          </DialogTitle>
        </DialogHeader>
        <div className="mx-auto h-0.5 w-1/12 bg-black dark:bg-white" />
        {isSuccess ? (
          <>
            <DialogDescription className="my-6 text-center text-balance">
              You will be one of the first to experience Brocoli & Co. when we
              launch.
            </DialogDescription>
            <DialogFooter>
              <Button
                className="w-full cursor-pointer"
                onClick={closeWithReset}
              >
                OK
              </Button>
            </DialogFooter>
          </>
        ) : (
          <RequestInviteForm
            form={form}
            onSubmit={onSubmit}
            isMutating={mutate.isMutating}
            mutateErrorMessage={mutate.error?.message}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default RequestInviteButton;
