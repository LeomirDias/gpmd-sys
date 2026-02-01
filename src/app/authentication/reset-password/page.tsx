import ResetPasswordForm from "./_components/reset-password-form";

interface ResetPasswordPageProps {
  searchParams: Promise<{
    token?: string;
  }>;
}

const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background">
        <div className="flex flex-col items-center justify-center mb-6 absolute bottom-0 left-1/2 -translate-x-1/2">
          <h1 className="text-lg font-bold text-center text-foreground">GPMD</h1>
          <p className="text-sm font-normal text-center text-foreground/80">Gerenciador de Produtos e Marketing Digital</p>
        </div>
        <div className="w-full max-w-lg">
          <div className="border border-border bg-card shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">Token Inválido</h2>
            <p className="text-foreground/80">O link de redefinição de senha é inválido ou expirou.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center justify-center mb-6 absolute bottom-0 left-1/2 -translate-x-1/2">
        <h1 className="text-lg font-bold text-center text-foreground">GPMD</h1>
        <p className="text-sm font-normal text-center text-foreground/80">Gerenciador de Produtos e Marketing Digital</p>
      </div>
      <div className="w-full max-w-lg">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
