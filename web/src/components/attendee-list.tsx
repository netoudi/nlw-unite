import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-react';
import { IconButton } from '@/components/icon-button';
import { InputSearch } from '@/components/input-search';
import { Table } from '@/components/table';
import { TableCell } from '@/components/table-cell';
import { TableHeader } from '@/components/table-header';
import { TableRow } from '@/components/table-row';
import { eventService } from '@/services/event-service';
import { EVENT_ID, ITEMS_PER_PAGE } from '@/utils/constants';
import { timeAgo } from '@/utils/formatter';
import { Attendee } from '@/utils/models';

export function AttendeeList() {
  const [search, setSearch] = React.useState<string>(() => {
    const url = new URL(window.location.toString());
    return url.searchParams.has('search') ? String(url.searchParams.get('search')) : '';
  });
  const [page, setPage] = React.useState<number>(() => {
    const url = new URL(window.location.toString());
    return url.searchParams.has('page') ? Number(url.searchParams.get('page')) : 1;
  });
  const [attendees, setAttendees] = React.useState<Attendee[]>([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    eventService.getAttendees({ eventId: EVENT_ID, page, search }).then((response) => {
      setAttendees(response.attendees);
      setTotal(response.total);
    });
  }, [page, search]);

  const totalPage = Math.ceil(total / ITEMS_PER_PAGE);

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString());
    url.searchParams.set('search', String(search));
    window.history.pushState({}, '', url);
    setSearch(search);
  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());
    url.searchParams.set('page', String(page));
    window.history.pushState({}, '', url);
    setPage(page);
  }

  function onSearchInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value);
    setCurrentPage(1);
  }

  function goToFirstPage() {
    setCurrentPage(1);
  }

  function goToPreviousPage() {
    if (page > 1) {
      setCurrentPage(page - 1);
    }
  }

  function goToNextPage() {
    if (page < totalPage) {
      setCurrentPage(page + 1);
    }
  }

  function goToLastPage() {
    setCurrentPage(totalPage);
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
          {attendees.map((attendee) => (
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
              <TableCell>{attendee.checkedInAt !== null ? timeAgo(attendee.checkedInAt) : '-'}</TableCell>
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
            <TableCell colSpan={3}>Mostrando 10 de {total} items</TableCell>
            <TableCell colSpan={3} className="text-right">
              <div className="inline-flex items-center gap-8">
                <span>
                  Página {page} de {totalPage}
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
