import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-react';
import { InputSearch } from '@/components/input-search';

export function AttendeeList() {
  return (
    <>
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <InputSearch />
      </div>

      <div className="border border-white/10 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <td className="py-3 px-4 text-sm font-semibold text-left" style={{ width: 38 }}>
                <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
              </td>
              <td className="py-3 px-4 text-sm font-semibold text-left">Código</td>
              <td className="py-3 px-4 text-sm font-semibold text-left">Participante</td>
              <td className="py-3 px-4 text-sm font-semibold text-left">Data da inscrição</td>
              <td className="py-3 px-4 text-sm font-semibold text-left">Data do check-in</td>
              <td className="py-3 px-4 text-sm font-semibold text-left" style={{ width: 64 }}></td>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, index) => (
              <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                <td className="py-3 px-4 text-sm text-zinc-300">
                  <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                </td>
                <td className="py-3 px-4 text-sm text-zinc-300">123456</td>
                <td className="py-3 px-4 text-sm text-zinc-300">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">John Doe</span>
                    <span className="">john.doe@example</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-zinc-300">7 dias atrás</td>
                <td className="py-3 px-4 text-sm text-zinc-300">3 dias atrás</td>
                <td className="py-3 px-4 text-sm text-zinc-300">
                  <button className="bg-black/20 border border-white/10 rounded-md p-1.5">
                    <MoreHorizontal className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="py-3 px-4 text-sm text-zinc-300">
                Mostrando 10 de 228 items
              </td>
              <td colSpan={3} className="py-3 px-4 text-sm text-zinc-300 text-right">
                <div className="inline-flex items-center gap-8">
                  <span>Página 1 de 20</span>
                  <div className="flex gap-1.5">
                    <button className="bg-black/20 border border-white/10 rounded-md p-1.5">
                      <ChevronsLeft className="size-4" />
                    </button>
                    <button className="bg-black/20 border border-white/10 rounded-md p-1.5">
                      <ChevronLeft className="size-4" />
                    </button>
                    <button className="bg-black/20 border border-white/10 rounded-md p-1.5">
                      <ChevronRight className="size-4" />
                    </button>
                    <button className="bg-black/20 border border-white/10 rounded-md p-1.5">
                      <ChevronsRight className="size-4" />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
