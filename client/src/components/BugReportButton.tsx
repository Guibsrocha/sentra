import { useState } from "react";
import { Bug, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export function BugReportButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createBugReport = trpc.bugReports.create.useMutation({
    onSuccess: () => {
      toast.success("Bug reportado com sucesso! Obrigado pelo feedback.");
      setDescription("");
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(`Erro ao reportar bug: ${error.message}`);
    },
  });

  const handleSubmit = async () => {
    if (description.trim().length < 10) {
      toast.error("Por favor, descreva o bug com mais detalhes (mínimo 10 caracteres)");
      return;
    }

    setIsSubmitting(true);
    try {
      await createBugReport.mutateAsync({
        description: description.trim(),
        page: window.location.href,
        userAgent: navigator.userAgent,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Botão flutuante */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all z-40 !bg-red-600 hover:!bg-red-700 !text-white"
        size="icon"
        title="Reportar Bug"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
          <path d="m8 2 1.88 1.88"></path>
          <path d="M14.12 3.88 16 2"></path>
          <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"></path>
          <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"></path>
          <path d="M12 20v-9"></path>
          <path d="M6.53 9C4.6 8.8 3 7.1 3 5"></path>
          <path d="M6 13H2"></path>
          <path d="M3 21c0-2.1 1.7-3.9 3.8-4"></path>
          <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"></path>
          <path d="M22 13h-4"></path>
          <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"></path>
        </svg>
      </Button>

      {/* Dialog para reportar bug */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bug className="h-5 w-5 text-destructive" />
              Reportar Bug
            </DialogTitle>
            <DialogDescription>
              Encontrou algum problema? Descreva o bug abaixo e nossa equipe irá investigar.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Descrição do Bug *
              </label>
              <Textarea
                id="description"
                placeholder="Descreva o problema que você encontrou..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Mínimo 10 caracteres. Seja específico sobre o que aconteceu.
              </p>
            </div>

            <div className="bg-muted p-3 rounded-md text-xs space-y-1">
              <p><strong>Página:</strong> {window.location.pathname}</p>
              <p><strong>Navegador:</strong> {navigator.userAgent.split(' ').slice(-2).join(' ')}</p>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || description.trim().length < 10}
            >
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? "Enviando..." : "Enviar Bug"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
