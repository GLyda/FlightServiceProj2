export default (flights = [], action) => {
    switch (action.type) {
        case 'DELETE':
            return flights.filter((flight) => flight._id !== action.payload);
        case 'UPDATE':
            return flights.map((flight) => flight._id === action.payload._id ? action.payload : flight); 
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...flights, action.payload];
        default:
            return flights;
    }
}