import { Logo } from '@/components/logo';
import { NavBar } from '@/components/nav-bar';

export function Header() {
  return (
    <header className="flex items-center gap-5">
      <Logo />
      <NavBar />
    </header>
  );
}
