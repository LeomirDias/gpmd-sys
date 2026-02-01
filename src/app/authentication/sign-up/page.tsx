import SignUpForm from "./_components/sign-up-form";

const SignUpPage = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center justify-center mb-6 absolute bottom-0 left-1/2 -translate-x-1/2">
        <h1 className="text-lg font-bold text-center text-foreground">GPMD</h1>
        <p className="text-sm font-normal text-center text-foreground/80">Gerenciador de Produtos e Marketing Digital</p>
      </div>
      <div className="w-full max-w-lg">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
