
import React, { useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../store/userSlice';
import axios from 'axios'; // <-- Import axios

const initialState = {
  email: '',
  password: '',
  message: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_MESSAGE':
      return { ...state, message: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function LoginComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const storeDispatch = useDispatch();
  const loggedInUser = useSelector((store) => store.loggedInUser);
  console.log(loggedInUser);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/user/login', {
        email: state.email,
        password: state.password
      });

      const data = response.data;

      storeDispatch(userAction.loadUser(data));

      if (data) {
        dispatch({ type: 'SET_MESSAGE', payload: 'Login successful!' });
      } else {
        dispatch({ type: 'SET_MESSAGE', payload: 'Invalid email or password.' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      dispatch({
        type: 'SET_MESSAGE',
        payload: 'Something went wrong. Try again.'
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleLogin} className="w-50 mx-auto shadow p-4 bg-light rounded">
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            required
            value={state.email}
            onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            required
            value={state.password}
            onChange={(e) => dispatch({ type: 'SET_PASSWORD', payload: e.target.value })}
          />
        </div>

        <button type="submit" className="btn btn-dark w-100">Login</button>
        {state.message && <p className="text-center mt-3">{state.message}</p>}
      </form>
    </div>
  );
}

export default LoginComponent;
