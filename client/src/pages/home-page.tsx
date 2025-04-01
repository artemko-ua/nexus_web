import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SiGithub } from "react-icons/si";
import { Layout } from "@/components/layout";
import { Link } from "wouter";

export default function HomePage() {
  return (
    <Layout>
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-5xl font-bold mb-6">
            Мінімалістична Unix-подібна операційна система
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Збудуйте свою систему з нуля з повним контролем над кожним компонентом
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <img
              src="https://images.unsplash.com/photo-1629654297299-c8506221ca97"
              alt="Консоль Linux"
              className="rounded-lg shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
              alt="Термінальний інтерфейс"
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-lg bg-card"
              >
                <h3 className="text-xl font-semibold mb-2">Мінімалізм</h3>
                <p className="text-muted-foreground">
                  Тільки необхідні компоненти для роботи
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-lg bg-card"
              >
                <h3 className="text-xl font-semibold mb-2">Кастомізація</h3>
                <p className="text-muted-foreground">
                  Виберіть свою оболонку, пакетний менеджер та середовище
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-lg bg-card"
              >
                <h3 className="text-xl font-semibold mb-2">Навчання</h3>
                <p className="text-muted-foreground">
                  Вивчайте внутрішню роботу системи через практичну збірку
                </p>
              </motion.div>
            </div>

            <div className="flex justify-center gap-4">
              <Button asChild size="lg">
                <a
                  href="https://github.com/artemko-ua/Nexus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <SiGithub className="h-5 w-5" />
                  Переглянути на GitHub
                </a>
              </Button>
              <Link href="/auth">
                <Button variant="secondary" size="lg">
                  Зареєструватися для оновлень
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    </Layout>
  );
}