// homeCon.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
`;

const StyledTextField = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
`;

const StyledButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const HomeCon = () => {
  const [meetingID, setMeetingID] = useState("");
  const navigate = useNavigate();

  const submitCode = (e) => {
    e.preventDefault();

    const isValidMeetingID = /^[A-Z0-9]{8}$/.test(meetingID);

    if (isValidMeetingID) {
      toast.success("Meeting ID is valid. Redirecting...");
      setTimeout(() => {
        navigate(`/room/${meetingID}`);
      }, 2000);
    } else {
      toast.error("Invalid Meeting ID. Please enter a valid meeting ID.");
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Welcome To Pre-Trial Conference</Title>
        <Subtitle>By E-Courts Services</Subtitle>

        <form onSubmit={submitCode}>
          <StyledTextField
            type="text"
            required
            placeholder="Enter Meeting ID"
            value={meetingID}
            onChange={(e) => setMeetingID(e.target.value)}
            pattern="^[A-Z0-9]{8}$"
            title="Meeting ID should be 8 characters of only capital alphabets and numbers."
          />
          <StyledButton type="submit">Go</StyledButton>
        </form>
      </FormContainer>

      <ToastContainer />
    </Container>
  );
};

export default HomeCon;
