"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { signUpUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";

import { Undo2 } from "lucide-react";

import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
  passwordConfirmed: z.string().min(2).max(50),
});

type SignUpForValues = z.infer<typeof formSchema>;

const Login = () => {
  const { toast } = useToast();
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmed: "",
    },
  });

  const handleSubmitLoginForm = async ({
    email,
    password,
  }: SignUpForValues) => {
    try {
      setIsLoading(true);
      await signUpUser(email, password);
      toast({
        title: "Success",
        description: "You have successfully signed up. Check your email inbox",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center h-screen gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitLoginForm)}>
          <Card>
            <CardHeader>
              <CardTitle>Sign up</CardTitle>
              <CardDescription>Sign up to create an account</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-8">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email address." {...field} />
                    </FormControl>
                    <FormDescription>Your email address.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-8">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" {...field} />
                    </FormControl>
                    <FormDescription>Your password.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirmed"
                render={({ field }) => (
                  <FormItem className="mb-8">
                    <FormLabel>Password Confirmed</FormLabel>
                    <FormControl>
                      <Input placeholder="Confirm your password." {...field} />
                    </FormControl>
                    <FormDescription>Confirm your password.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button type="submit">Submit</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <Undo2
            className="cursor-pointer text-white mb-5"
            onClick={() => router.push("/")}
          />
    </main>
  );
};

export default Login;
