// EventCalendar.jsx
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import axios from 'axios';

const EventCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDateSelect = async (selectInfo) => {
    const title = prompt('Enter event title:');
    if (title) {
      const eventData = {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
      };

      try {
        await axios.post('http://localhost:3000/api/events', eventData);
        fetchEvents();
      } catch (error) {
        console.error('Error creating event:', error);
      }
    }
  };
  const handleEventClick = (clickInfo) => {
    const shouldDelete = window.confirm(`Do you want to delete the event "${clickInfo.event.title}"?`);
    if (shouldDelete) {
      deleteEvent(clickInfo.event.id);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:3000/api/events/${eventId}`);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      selectable={true}
      select={handleDateSelect}
      events={events}
      eventClick={handleEventClick}
    />
  );
};

export default EventCalendar;
