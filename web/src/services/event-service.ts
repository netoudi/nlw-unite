import { api } from '@/utils/api';
import { Attendee } from '@/utils/models';

type Response = { attendees: Attendee[]; total: number };

class EventService {
  async getAttendees(params: { eventId: string; page?: number; search?: string }): Promise<Response> {
    const { eventId, page = 0, search = null } = params;
    const response = await api.get<Response>(`/events/${eventId}/attendees?pageIndex=${page - 1}&query=${search}`);
    return response.data;
  }
}

export const eventService = new EventService();
