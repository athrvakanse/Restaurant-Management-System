import React, { useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userAction } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import rms1 from '../assets/rms1.jpg';

const initialState = {
  email: '',
  password: '',
  message: '',
  forgotEmail: '',
  forgotMessage: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_MESSAGE':
      return { ...state, message: action.payload };
    case 'SET_FORGOT_EMAIL':
      return { ...state, forgotEmail: action.payload };
    case 'SET_FORGOT_MESSAGE':
      return { ...state, forgotMessage: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function LoginComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const storeDispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8082/api1/user/login', {
        email: state.email,
        password: state.password
      });

      const data = response.data;

      if (data) {
        storeDispatch(userAction.loadUser(data));
        dispatch({ type: 'SET_MESSAGE', payload: 'Login successful!' });

        switch (data.r_id.r_name) {
          case 'Customer':
            navigate('/customer/home');
            break;
          case 'Manager':
            navigate('/manager/dashboard');
            break;
          case 'Waiter':
            navigate('/waiter/dashboard');
            break;
          case 'Kitchen Staff':
            navigate('/kitchen/orders');
            break;
          default:
            navigate('/unauthorized');
        }
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

  const handleClear = () => {
    dispatch({ type: 'RESET' });
  };

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('http://localhost:8082/api1/user/forgot-password', {
        email: state.forgotEmail
      });

      if (response.data) {
        dispatch({ type: 'SET_FORGOT_MESSAGE', payload: 'Password reset instructions sent to your email.' });
      } else {
        dispatch({ type: 'SET_FORGOT_MESSAGE', payload: 'Email not found.' });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: 'SET_FORGOT_MESSAGE', payload: 'Error sending email.' });
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${rms1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div
        className="p-4 rounded shadow"
        style={{
          backgroundColor: 'rgba(245, 222, 179, 0.85)', // Slightly darker brown with reduced opacity
          width: '400px',
          height: 'auto',
          maxHeight: '85vh',
          overflowY: 'auto'
        }}
      >
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
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

          <div className="d-flex justify-content-between mb-3">
            <button type="submit" className="btn btn-dark w-50 me-2">Login</button>
            <button type="button" className="btn btn-secondary w-50" onClick={handleClear}>Clear</button>
          </div>

          <div className="text-end">
            <button type="button" className="btn btn-link p-0" onClick={() => setShowForgotPassword(!showForgotPassword)}>
              Forgot Password?
            </button>
          </div>

          {state.message && <p className="text-center mt-3 text-danger">{state.message}</p>}
        </form>

        {showForgotPassword && (
          <div className="mt-4 p-3 bg-light border rounded shadow-sm">
            <h5 className="mb-3">Forgot Password</h5>
            <div className="mb-3">
              <label>Enter your registered email:</label>
              <input
                type="email"
                className="form-control"
                value={state.forgotEmail}
                onChange={(e) => dispatch({ type: 'SET_FORGOT_EMAIL', payload: e.target.value })}
              />
            </div>
            <button className="btn btn-primary w-100" onClick={handleForgotPassword}>Send Reset Link</button>
            {state.forgotMessage && <p className="text-center mt-3 text-success">{state.forgotMessage}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginComponent;
