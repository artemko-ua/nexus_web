import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout";
import { Terminal, Settings, Shield, Cpu, Code, Zap } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: <Terminal className="w-8 h-8" />,
      title: "Повний контроль через термінал",
      description: "Керуйте всією системою через потужний командний інтерфейс"
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Гнучка конфігурація",
      description: "Налаштовуйте кожен аспект системи під свої потреби"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Безпека",
      description: "Повний контроль над безпекою системи завдяки прозорості коду"
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Оптимізована продуктивність",
      description: "Мінімальне споживання ресурсів завдяки відсутності зайвих компонентів"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Навчальна платформа",
      description: "Ідеальне середовище для вивчення внутрішньої роботи ОС"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Швидке завантаження",
      description: "Мінімальний час завантаження завдяки оптимізованому завантажувачу"
    }
  ];

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-16"
      >
        <h1 className="text-4xl font-bold mb-8">Чому обрати Nexus OS?</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-primary">{feature.icon}</div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="mt-12">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Для кого підходить Nexus OS?</h2>
            <ul className="space-y-4 text-muted-foreground">
              <li>• Розробників, які хочуть глибше розуміти роботу операційних систем</li>
              <li>• Студентів та викладачів комп'ютерних наук</li>
              <li>• Ентузіастів, які люблять повний контроль над своєю системою</li>
              <li>• Дослідників у сфері операційних систем</li>
              <li>• Користувачів, які цінують мінімалізм та ефективність</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </Layout>
  );
}
