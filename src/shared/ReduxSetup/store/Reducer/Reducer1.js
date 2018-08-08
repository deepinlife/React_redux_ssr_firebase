import { UPDATE, SEND } from '../Constants/Constants';

const INITIAL_STATE = {
  username: 'Gurgaon',
  Email: '',
  Pass: '',
  send: false,
}
export default (states = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE:
      return ({
        ...states,
        Email: action.paylaod.Email,
        Pass: action.paylaod.Pass

      })
    case SEND:
      return ({
        ...states,
        send: action.paylaod
      })
    default:
      return states;
  }
}
