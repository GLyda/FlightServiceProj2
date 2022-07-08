import * as api from '../api';


export const getFlights = () => async (dispatch) => {
    try {
        const { data } = await api.fetchFlights();
        
        dispatch({ type: 'FETCH_ALL', payload: data });

    } catch (error) {
        console.log(error);
    }


}

export const createFlight = (flight) => async (dispatch) => {
    try {
        const { data } = await api.createFlight(flight);

        dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updateFlight = (id, flight) => async (dispatch) => {
    try {
        const { data } = await api.updateFlight(id, flight);
        dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
       console.log(error); 
    }
}

export const deleteFlight = (id) => async (dispatch) => {
  try {
    await api.deleteFlight(id);

    dispatch({ type: 'DELETE', payload: id });
  } catch (error) {
    console.log(error);
  }
};