import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-react';
import { IconButton } from '@/components/icon-button';
import { InputSearch } from '@/components/input-search';
import { Table } from '@/components/table';
import { TableCell } from '@/components/table-cell';
import { TableHeader } from '@/components/table-header';
import { TableRow } from '@/components/table-row';

export function AttendeeList() {
  return (
    <>
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <InputSearch />
      </div>

      <Table>
        <thead>
          <TableRow>
            <TableHeader style={{ width: 38 }}>
              <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data da inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index} className="hover:bg-white/5">
              <TableCell>
                <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
              </TableCell>
              <TableCell>123456</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-white">John Doe</span>
                  <span className="">john.doe@example</span>
                </div>
              </TableCell>
              <TableCell>7 dias atrás</TableCell>
              <TableCell>3 dias atrás</TableCell>
              <TableCell>
                <IconButton transparent>
                  <MoreHorizontal className="size-4" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>Mostrando 10 de 228 items</TableCell>
            <TableCell colSpan={3} className="text-right">
              <div className="inline-flex items-center gap-8">
                <span>Página 1 de 20</span>
                <div className="flex gap-1.5">
                  <IconButton>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton>
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton>
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </>
  );
}
