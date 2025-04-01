import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout";

export default function AboutPage() {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-16"
      >
        <h1 className="text-4xl font-bold mb-8">Про Nexus OS</h1>
        
        <div className="grid gap-8">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Що таке Nexus OS?</h2>
              <p className="text-muted-foreground mb-4">
                Nexus OS – це модульна Unix-подібна операційна система, створена з нуля, 
                що дає користувачу повний контроль над її компонуванням. Вона дотримується 
                філософії Arch Linux, дозволяючи налаштовувати все – від початкового 
                завантаження до графічного середовища.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Основні принципи</h2>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="font-semibold">Мінімалістичність:</span>
                  Система містить лише найнеобхідніші компоненти для роботи
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold">Модульність:</span>
                  Кожен компонент системи можна замінити або налаштувати
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold">Прозорість:</span>
                  Усі процеси та компоненти системи відкриті для вивчення та модифікації
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold">Освітня цінність:</span>
                  Система створена для глибокого розуміння роботи ОС
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Технічні особливості</h2>
              <ul className="space-y-4 text-muted-foreground">
                <li>• Власний завантажувач, написаний на асемблері</li>
                <li>• Базовий Bash-подібний інтерпретатор команд</li>
                <li>• Модульна система ініціалізації</li>
                <li>• Підтримка різних архітектур процесорів</li>
                <li>• Можливість додавання графічних оболонок</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </Layout>
  );
}
