import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { SiGithub } from "react-icons/si";

export default function DashboardPage() {
  const { user, logoutMutation } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Nexus OS</h1>
        <Button
          variant="ghost"
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
        >
          Вийти
        </Button>
      </nav>

      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <Card>
            <CardHeader>
              <CardTitle>Вітаємо, {user?.username}!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Дякуємо за реєстрацію для отримання оновлень Nexus OS. Операційна система
                наразі знаходиться в розробці.
              </p>

              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Наступні кроки</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Слідкуйте за GitHub репозиторієм для оновлень розробки</li>
                  <li>• Очікуйте повідомлень на email про нові релізи</li>
                  <li>• Приєднуйтесь до обговорень спільноти, коли вони стануть доступні</li>
                </ul>
              </div>

              <div className="flex justify-center">
                <Button asChild size="lg">
                  <a
                    href="https://github.com/artemko-ua/Nexus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <SiGithub className="h-5 w-5" />
                    Переглянути проект на GitHub
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}