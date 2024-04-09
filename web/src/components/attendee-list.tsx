import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-react';
import { IconButton } from '@/components/icon-button';
import { InputSearch } from '@/components/input-search';
import { Table } from '@/components/table';
import { TableCell } from '@/components/table-cell';
import { TableHeader } from '@/components/table-header';
import { TableRow } from '@/components/table-row';
import { attendees } from '@/data/attendees';
import { timeAgo } from '@/utils/formatter';

export function AttendeeList() {
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);

  const totalPage = Math.ceil(attendees.length / 10);

  function onSearchInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  function goToFirstPage() {
    setPage(1);
  }

  function goToPreviousPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function goToNextPage() {
    if (page < Math.ceil(attendees.length / 10)) {
      setPage(page + 1);
    }
  }

  function goToLastPage() {
    setPage(Math.ceil(attendees.length / 10));
  }

  return (
    <>
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <InputSearch value={search} onChange={onSearchInputChanged} />
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
          {attendees.slice((page - 1) * 10, page * 10).map((attendee) => (
            <TableRow key={attendee.id} className="hover:bg-white/5">
              <TableCell>
                <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
              </TableCell>
              <TableCell>{attendee.id}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-white">{attendee.name}</span>
                  <span className="">{attendee.email}</span>
                </div>
              </TableCell>
              <TableCell>{timeAgo(attendee.createdAt)}</TableCell>
              <TableCell>{timeAgo(attendee.checkedInAt)}</TableCell>
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
            <TableCell colSpan={3}>Mostrando 10 de {attendees.length} items</TableCell>
            <TableCell colSpan={3} className="text-right">
              <div className="inline-flex items-center gap-8">
                <span>
                  Página {page} de {Math.ceil(attendees.length / 10)}
                </span>
                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToNextPage} disabled={page === totalPage}>
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToLastPage} disabled={page === totalPage}>
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
