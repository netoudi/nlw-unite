import { NavLink } from '@/components/nav-link';

export function NavBar() {
  return (
    <nav className="flex items-center gap-5">
      <NavLink href="/events">Eventos</NavLink>
      <NavLink href="/attendees">Participantes</NavLink>
    </nav>
  );
}
