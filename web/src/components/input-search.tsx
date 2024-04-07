import { ComponentProps } from 'react';
import { Search } from 'lucide-react';

interface InputSearchProps extends ComponentProps<'input'> {}

export function InputSearch(props: InputSearchProps) {
  return (
    <div className="px-3 w-72 py-1.5 border border-white/10  rounded-lg text-sm flex items-center gap-3">
      <Search className="size-4 text-emerald-300" />
      <input
        type="text"
        className="bg-transparent flex-1 outline-none border-0 p-0 text-sm"
        placeholder="Buscar participante..."
        {...props}
      />
    </div>
  );
}
