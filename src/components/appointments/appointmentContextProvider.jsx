import { useContext, useState } from "react";

import { Button } from "antd";
import Title from "antd/es/typography/Title";
import { action, makeAutoObservable } from "mobx";
import { observer } from "mobx-react";
import { useSearchParams } from "react-router-dom";

import AppointmentsTable from "../../components/appointments/appointmentsTable";
import AppoinmentModal from "../../components/appointments/appointmentsForm";

import { MyContext } from "../../context/context";

import { makePossessive } from "../../helpers/names.cjs";
import { updateLocalStorage } from "../../helpers/localStorage.cjs";

class appointmentStore {
  appointmentList = JSON.parse(localStorage.getItem("items")) || [];
  modalDisplay = false;
  editRecord = {};

  constructor() {
    makeAutoObservable(this, {
      setAppointment: action.bound,
      setEditRecord: action.bound,
      setModalDisplay: action.bound,
    });
  }

  setModalDisplay(value) {
    this.modalDisplay = value;
  }
  setEditRecord(value) {
    this.editRecord = value;
  }
  setAppointment(value) {
    this.appointmentList = value;
    updateLocalStorage(value);
  }
}

const AppoinmentContextProvider = ({ children }) => (
  <MyContext.Provider value={new appointmentStore()}>
    {children}
  </MyContext.Provider>
);

export default AppoinmentContextProvider;
