import { LoginButton } from '@/components/auth/login-button';
import {Button} from '@/components/ui/button';

export default function Home() {
  return (
    <>
      <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-600 to bg-gray-800">
        <div className="space-y-6 text-center">
          <h1 className="text-3xl font-semibold text-white drop-shadow-md">
            Secure Crypto Exchange
          </h1>
          <p className="text-white text-lg">
            Trading crypto made easier
          </p>
          <div>
            <LoginButton>
              <Button variant="secondary" size="lg">
                Sign in
              </Button>
            </LoginButton>
          </div>
        </div>
      </main>
    </>
  );
}
