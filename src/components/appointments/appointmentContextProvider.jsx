import { action, makeAutoObservable } from 'mobx';

import { MyContext } from '../../context/context';

import { updateLocalStorage } from '../../helpers/localStorage.cjs';

class appointmentStore {
  appointmentList = JSON.parse(localStorage.getItem('items')) || [];
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
  <MyContext.Provider value={new appointmentStore()}>{children}</MyContext.Provider>
);

export default AppoinmentContextProvider;
