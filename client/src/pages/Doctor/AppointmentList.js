import React from 'react';
import AppointmentCard from './AppointmentCard';

function AppointmentsList(props) {
  const { appointments } = props;

  return (
    <div>
      {appointments.map(appointment => (
        <AppointmentCard
          key={appointment.id}
          doctorName={appointment.doctorName}
          appointmentDate={appointment.appointmentDate}
          appointmentTime={appointment.appointmentTime}
          patientName={appointment.patientName}
        />
      ))}
    </div>
  );
}

export default AppointmentsList;
