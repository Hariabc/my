import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EventForm.css';

const ClientEventForm = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [updateMode, setUpdateMode] = useState(false);
  const [updateEventId, setUpdateEventId] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/client/my-events', {
          withCredentials: true,
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error.message);
      }
    };

    fetchEvents();
  }, []);

  const showCustomToast = (message, type = 'info') => {
    toast[type](message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (updateMode) {
        // If in update mode, handle the update logic
        await handleUpdate();
      } else {
        // If not in update mode, handle the create event logic
        const response = await axios.post('http://localhost:5000/client/create', {
          title,
          description,
          date,
        },{
          withCredentials: true, // Ensure credentials are sent
        });

        console.log('Event created:', response.data);

        // Update the events list after scheduling a new event
        setEvents([...events, response.data]);

        // Reset form fields
        setTitle('');
        setDescription('');
        setDate('');

        // Show a custom-styled pop-up for event creation
        showCustomToast('Event created successfully!', 'success');
      }
    } catch (error) {
      console.error('Error handling event:', error.message);
      // Add logic to handle errors
    }
  };

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/client/delete/${eventId}`, { withCredentials: true });
      setEvents(events.filter((event) => event._id !== eventId));
       // Show a custom-styled pop-up for event deletion
       showCustomToast('Event deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting event:', error.message);
    }
  };

  const handleUpdateClick = (eventId) => {
    // If not already in update mode, set the form fields and update mode
    if (!updateMode) {
      const eventToUpdate = events.find((event) => event._id === eventId);

      setTitle(eventToUpdate.title);
      setDescription(eventToUpdate.description);
      setDate(eventToUpdate.date);

      setUpdateMode(true);
      setUpdateEventId(eventId);
    }
  };

  const handleCancelUpdate = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setUpdateMode(false);
    setUpdateEventId('');
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/client/update/${updateEventId}`, {
        title,
        description,
        date,
      },{
        withCredentials: true, // Ensure credentials are sent
      });

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === updateEventId
            ? { ...event, title, description, date }
            : event
        )
      );

      setTitle('');
      setDescription('');
      setDate('');
      setUpdateMode(false);
      setUpdateEventId('');

      // Show a custom-styled pop-up for event update
      showCustomToast('Event updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating event:', error.message);
      // Add logic to handle errors
    }
  };

  return (
    <div className="event-scheduler">
      <ToastContainer
        position="top-center" // Set the position to top-center
        autoClose={2000} // Adjust duration
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h2 className="event-scheduler-title">Event Scheduler</h2>

      <div className="event-container">
        {/* Event Form */}
        <form onSubmit={handleSubmit} className="event-form">
          <div className="input-box">
            <label className="event-form-label">
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="event-form-input"
              />
            </label>
            <br />

            <label className="event-form-label">
              Description:
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="event-form-textarea"
              />
            </label>
            <br />

            <label className="event-form-label">
              Date:
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="event-form-input"
              />
            </label>
            <br />
          </div>
          <br />

          <button type="submit" className="event-form-submit-button">
            {updateMode ? 'Update Event' : 'Schedule Event'}
          </button>
          {updateMode && (
            <button
              type="button"
              className="event-form-cancel-update-button"
              onClick={handleCancelUpdate}
            >
              Cancel Update
            </button>
          )}
        </form>

        {/* Event List */}
        <div className="event-list-container">
          <h2 className="event-list-title">Events Scheduled!!</h2>
          {events.length === 0 ? (
            <p>No events are available.</p>
          ) : (
            <ul className="event-list">
              {events.map((event) => (
                <li key={event._id} className="event-list-item">
                  <div className="event-details">
                    <strong className="event-list-item-title">{event.title}</strong> -{' '}
                    <span className="event-list-item-description">{event.description}</span> -{' '}
                    <span className="event-list-item-date">{event.date}</span>
                  </div>
                  <div className="event-buttons">
                    <button
                      type="button"
                      onClick={() => handleUpdateClick(event._id)}
                      className="event-list-update-button"
                      disabled={updateMode}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(event._id)}
                      className="event-list-delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientEventForm;
