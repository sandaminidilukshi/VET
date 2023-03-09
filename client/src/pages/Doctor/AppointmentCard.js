import React from 'react';

function AppointmentCard(props) {
  const { doctorName, appointmentDate, appointmentTime, patientName } = props;

  return (
    <div className="appointment-card">
      <h3>{doctorName}</h3>
      <p>Date: {appointmentDate}</p>
      <p>Time: {appointmentTime}</p>
      <p>Patient: {patientName}</p>
    </div>
  );
}

export default AppointmentCard;
