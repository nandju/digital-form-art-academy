"use client";

import * as React from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2, MailCheck, ShieldCheck } from "lucide-react";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";

function VerificationInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") ?? "student";

  const [code, setCode] = React.useState<string[]>(Array(6).fill(""));
  const [isVerifying, setIsVerifying] = React.useState(false);
  const inputsRef = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...code];
    next[index] = value.slice(-1);
    setCode(next);
    if (value && index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    if (code.some((digit) => !digit)) {
      toast.error("Veuillez saisir les 6 chiffres du code.");
      return;
    }
    setIsVerifying(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsVerifying(false);
    router.push(`/confirmation?role=${role}`);
  };

  const handleResend = () => {
    toast.success("Nouveau code envoyé", {
      description: "Un nouveau code de vérification a été envoyé à votre adresse email.",
    });
    setCode(Array(6).fill(""));
    inputsRef.current[0]?.focus();
  };

  return (
    <AuthShell
      title="Vérifiez votre adresse email"
      subtitle="Nous avons envoyé un code à 6 chiffres à votre adresse email. Saisissez-le ci-dessous."
      seed="auth-verify"
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3 rounded-xl border border-brand-light/30 bg-brand-bg p-4">
          <MailCheck className="size-5 text-brand-primary" />
          <p className="text-sm text-muted-foreground">
            Code de démonstration : saisissez n&apos;importe quels 6 chiffres.
          </p>
        </div>

        <div className="flex justify-between gap-2">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              value={digit}
              onChange={(event) => handleChange(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              inputMode="numeric"
              maxLength={1}
              className="size-12 rounded-xl border border-border bg-background text-center text-lg font-semibold text-foreground outline-none transition-colors focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 sm:size-14"
            />
          ))}
        </div>

        <Button size="lg" className="h-12" onClick={handleVerify} disabled={isVerifying}>
          {isVerifying ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <ShieldCheck className="size-4" />
          )}
          {isVerifying ? "Vérification..." : "Vérifier mon compte"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Vous n&apos;avez pas reçu le code ?{" "}
          <button onClick={handleResend} className="font-medium text-brand-secondary hover:underline">
            Renvoyer le code
          </button>
        </p>
      </div>
    </AuthShell>
  );
}

export default function VerificationPage() {
  return (
    <Suspense fallback={null}>
      <VerificationInner />
    </Suspense>
  );
}
