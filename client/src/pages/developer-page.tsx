import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { SiGithub, SiLinkedin } from "react-icons/si";

export default function DeveloperPage() {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <img
              src="https://avatars.githubusercontent.com/artemko-ua"
              alt="Розробник"
              className="w-32 h-32 rounded-full mx-auto mb-6"
            />
            <h1 className="text-4xl font-bold mb-4">Про розробника</h1>
            <p className="text-xl text-muted-foreground">
              Привіт! Я Артем, розробник Nexus OS
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Історія проекту</h2>
              <p className="text-muted-foreground mb-4">
                Nexus OS почався як освітній проект для глибшого розуміння роботи операційних
                систем. З часом він перетворився на повноцінну систему, яка може допомогти
                іншим вивчати та експериментувати з ОС.
              </p>
              <p className="text-muted-foreground">
                Мета проекту - створити прозору та зрозумілу систему, яка допоможе людям
                краще розуміти, як працюють операційні системи зсередини.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Чому я створив Nexus OS?</h2>
              <ul className="space-y-4 text-muted-foreground">
                <li>• Бажання створити освітню платформу для вивчення ОС</li>
                <li>• Прагнення зробити системне програмування доступнішим</li>
                <li>• Експеримент з новими підходами до архітектури ОС</li>
                <li>• Створення спільноти ентузіастів системного програмування</li>
              </ul>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4">
            <Button asChild variant="outline" size="lg">
              <a
                href="https://github.com/artemko-ua"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <SiGithub className="h-5 w-5" />
                GitHub
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a
                href="https://linkedin.com/in/artemko-ua"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <SiLinkedin className="h-5 w-5" />
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}