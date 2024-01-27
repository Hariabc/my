import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Typography,
  Button,
  TextField,
  TextareaAutosize,
  Grid,
  Paper,
} from '@mui/material';
import { Add, Delete, Update } from '@mui/icons-material';
import { styled } from '@mui/system';

const Container = styled('div')({
  marginTop: '2rem',
});

const FormContainer = styled(Paper)({
  padding: '2rem',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  maxWidth: '400px',
  margin: 'auto',
});

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.5rem',
});

const Input = styled(TextField)({
  marginBottom: '1rem',
  width: '100%',
});

const TextArea = styled(TextareaAutosize)({
  marginBottom: '1rem',
  width: '100%',
  padding: '0.75rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
  resize: 'vertical',
});

const ButtonGroup = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: '1rem',
  marginTop: '1rem',
});

const EventListContainer = styled('div')({
  marginTop: '2rem',
});

const EventListItem = styled('li')({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  padding: '1.5rem',
  border: '2px solid #e0e0e0',
  borderRadius: '8px',
  marginBottom: '1rem',
  backgroundColor: '#f9f9f9',
});

const EventDetails = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Align content in the center horizontally
  justifyContent: 'center', // Align content in the center vertically
});


const EventButtons = styled('div')({
  display: 'flex',
  gap: '0.5rem',
  marginTop: '1rem',
  justifyContent: 'flex-end',
});


const AddEventButton = styled(Button)({
  position: 'fixed',
  top: '2rem',
  right: '1rem',
  zIndex: 1000,
});

const NoEventsMessage = styled('p')({
  textAlign: 'center',
  marginTop: '2rem',
});

const EventText = styled(Typography)({
  marginBottom: '0.5rem',
  wordBreak: 'break-word',
  fontWeight: 'bold', // Make the text bold
  textAlign: 'center', // Center the text horizontally
});

const ClientEventForm = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [updateMode, setUpdateMode] = useState(false);
  const [updateEventId, setUpdateEventId] = useState('');
  const [showForm, setShowForm] = useState(false);

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

  
  const handleAddEventClick = () => {
    setShowForm(true);
    setUpdateMode(false);
    setUpdateEventId('');
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setUpdateMode(false);
    setUpdateEventId('');
    setTitle('');
    setDescription('');
    setDate('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (updateMode) {
        await handleUpdate();
      } else {
        const response = await axios.post('http://localhost:5000/client/create', {
          title,
          description,
          date,
        },{
          withCredentials: true,
        });

        setEvents([...events, response.data]);

        setTitle('');
        setDescription('');
        setDate('');

        showCustomToast('Event created successfully!', 'success');
      }
      setShowForm(false);
    } catch (error) {
      console.error('Error handling event:', error.message);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/client/delete/${eventId}`, { withCredentials: true });
      setEvents(events.filter((event) => event._id !== eventId));
      showCustomToast('Event deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting event:', error.message);
    }
  };


  const handleUpdateClick = (eventId) => {
    if (!updateMode) {
      const eventToUpdate = events.find((event) => event._id === eventId);

      setTitle(eventToUpdate.title);
      setDescription(eventToUpdate.description);
      setDate(eventToUpdate.date);

      setUpdateMode(true);
      setUpdateEventId(eventId);
      setShowForm(true);
    }
  };



  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/client/update/${updateEventId}`, {
        title,
        description,
        date,
      },{
        withCredentials: true,
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

      showCustomToast('Event updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating event:', error.message);
    }
    setShowForm(false);
  };

  return (
    <Container>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <AddEventButton
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleAddEventClick}
      >
        Add Event
      </AddEventButton>

      <EventListContainer style={{ display: showForm ? 'none' : 'block' , paddingTop: '10px'  }}>
        <Typography variant="h5" align="center" gutterBottom>
          Events Scheduled
        </Typography>
        {events.length === 0 ? (
            <NoEventsMessage>No events are available.</NoEventsMessage>
        ) : (
          <ul className="event-list">
            {events.map((event) => (
              <EventListItem key={event._id}>
                 <EventDetails>
                  <EventText variant="subtitle1">{event.title}</EventText>
                  <EventText variant="body2">{event.description}</EventText>
                  <EventText variant="body2">{event.date}</EventText>
                </EventDetails>
                <EventButtons>
                  <Button
                    type="button"
                    onClick={() => handleUpdateClick(event._id)}
                    variant="outlined"
                    color="primary"
                    startIcon={<Update />}
                    disabled={updateMode}
                  >
                    Update
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handleDelete(event._id)}
                    variant="outlined"
                    color="secondary"
                    startIcon={<Delete />}
                  >
                    Delete
                  </Button>
                </EventButtons>
              </EventListItem>
            ))}
          </ul>
        )}
      </EventListContainer>

      <FormContainer style={{ display: showForm ? 'block' : 'none' }}>
        <Form onSubmit={handleSubmit}>
          <Input
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextArea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Input
            label="Date"
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <ButtonGroup>
            <Button type="submit" variant="contained" color="primary">
              {updateMode ? 'Update Event' : 'Schedule Event'}
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={handleCancelForm}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default ClientEventForm;