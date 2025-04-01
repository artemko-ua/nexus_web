
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/hooks/use-auth";
import { insertUserSchema, type InsertUser } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { user, loginMutation, registerMutation } = useAuth();

  const registerForm = useForm<InsertUser>({
    resolver: zodResolver(
      insertUserSchema
        .pick({
          username: true,
          email: true,
          password: true,
        })
    ),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      ipAddress: "",
      registrationIp: "",
    },
  });

  const loginForm = useForm({
    resolver: zodResolver(
      insertUserSchema.pick({ username: true, password: true })
    ),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleRegister = (data: Partial<InsertUser>) => {
    registerMutation.mutate(data as InsertUser);
  };

  const handleLogin = (data: Pick<InsertUser, "username" | "password">) => {
    loginMutation.mutate(data);
  };

  if (user) {
    setLocation("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center justify-center p-8"
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Ласкаво просимо до Nexus OS</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="register">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="register">Реєстрація</TabsTrigger>
                <TabsTrigger value="login">Вхід</TabsTrigger>
              </TabsList>

              <TabsContent value="register">
                <Form {...registerForm}>
                  <form
                    onSubmit={registerForm.handleSubmit(handleRegister)}
                    className="space-y-4"
                  >
                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Нікнейм</FormLabel>
                          <FormControl>
                            <Input placeholder="Введіть нікнейм" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Електронна пошта</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="example@mail.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Пароль</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full mt-4"
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? "Реєстрація..." : "Зареєструватися"}
                    </Button>
                    {registerMutation.isError && (
                      <p className="text-red-500 text-sm mt-2">
                        {registerMutation.error?.message || "Помилка реєстрації"}
                      </p>
                    )}
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="login">
                <Form {...loginForm}>
                  <form
                    onSubmit={loginForm.handleSubmit(handleLogin)}
                    className="space-y-4"
                  >
                    <FormField
                      control={loginForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Нікнейм</FormLabel>
                          <FormControl>
                            <Input placeholder="Введіть нікнейм" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Пароль</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full mt-4"
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? "Вхід..." : "Увійти"}
                    </Button>
                    {loginMutation.isError && (
                      <p className="text-red-500 text-sm mt-2">
                        {loginMutation.error?.message || "Помилка входу"}
                      </p>
                    )}
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
      <div className="hidden md:flex items-center justify-center bg-primary p-8">
        <div className="text-white max-w-md">
          <h1 className="text-4xl font-bold mb-6">Nexus OS</h1>
          <p className="text-lg mb-4">
            Ваш надійний помічник у світі віртуальних систем.
          </p>
          <p className="mb-8">
            Reєструйтесь, щоб отримати повний доступ до всіх функцій.
          </p>
        </div>
      </div>
    </div>
  );
}
