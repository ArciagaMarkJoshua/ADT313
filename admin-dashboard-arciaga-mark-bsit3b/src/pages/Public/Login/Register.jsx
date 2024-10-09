import { useState, useRef, useCallback } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [role, setRole] = useState('');
  const [isFieldsDirty, setIsFieldsDirty] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const contactNoRef = useRef();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleShowPassword = useCallback(() => {
    setIsShowPassword((value) => !value);
  }, []);

  const handleOnChange = (event, type) => {
    setIsFieldsDirty(true);
    switch (type) {
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      case 'firstName':
        setFirstName(event.target.value);
        break;
      case 'middleName':
        setMiddleName(event.target.value);
        break;
      case 'lastName':
        setLastName(event.target.value);
        break;
      case 'contactNo':
        setContactNo(event.target.value);
        break;
      case 'role':
        setRole(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleRegister = async () => {
    const data = { email, password, firstName, middleName, lastName, contactNo, role };
    setStatus('loading');
    setErrorMessage(''); // Clear any previous error messages

    try {
      const res = await axios.post('/admin/register', data);
      console.log(res);
      navigate('/main/dashboard');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response ? error.response.data.message : 'Registration failed');
    } finally {
      setStatus('idle');
    }
  };

  return (
    <div className='Register'>
      <div className='main-container'>
        <h3>Register</h3>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form>
          <div className='form-container'>
            <div className='form-group'>
              <label>E-mail:</label>
              <input
                type='text'
                ref={emailRef}
                onChange={(e) => handleOnChange(e, 'email')}
              />
              {isFieldsDirty && email === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div className='form-group'>
              <label>Password:</label>
              <input
                type={isShowPassword ? 'text' : 'password'}
                ref={passwordRef}
                onChange={(e) => handleOnChange(e, 'password')}
              />
              {isFieldsDirty && password === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div className='form-group'>
              <label>First Name:</label>
              <input
                type='text'
                ref={firstNameRef}
                onChange={(e) => handleOnChange(e, 'firstName')}
              />
              {isFieldsDirty && firstName === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div className='form-group'>
              <label>Middle Name:</label>
              <input
                type='text'
                onChange={(e) => handleOnChange(e, 'middleName')}
              />
            </div>
            <div className='form-group'>
              <label>Last Name:</label>
              <input
                type='text'
                ref={lastNameRef}
                onChange={(e) => handleOnChange(e, 'lastName')}
              />
              {isFieldsDirty && lastName === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div className='form-group'>
              <label>Contact No:</label>
              <input
                type='text'
                ref={contactNoRef}
                onChange={(e) => handleOnChange(e, 'contactNo')}
              />
              {isFieldsDirty && contactNo === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div className='form-group'>
              <label>Role:</label>
              <select onChange={(e) => handleOnChange(e, 'role')}>
                <option value=''>Select Role</option>
                <option value='admin'>Admin</option>
                <option value='user'>User</option>
                {/* Add more roles as needed */}
              </select>
              {isFieldsDirty && role === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div className='show-password' onClick={handleShowPassword}>
              {isShowPassword ? 'Hide' : 'Show'} Password
            </div>
            <div className='submit-container'>
              <button
                type='button'
                disabled={status === 'loading'}
                onClick={() => {
                  if (status === 'loading') {
                    return;
                  }
                  if (email && password && firstName && lastName && contactNo && role) {
                    handleRegister();
                  } else {
                    setIsFieldsDirty(true);
                    if (email === '') {
                      emailRef.current.focus();
                    } else if (password === '') {
                      passwordRef.current.focus();
                    } else if (firstName === '') {
                      firstNameRef.current.focus();
                    } else if (lastName === '') {
                      lastNameRef.current.focus();
                    } else if (contactNo === '') {
                      contactNoRef.current.focus();
                    } else if (role === '') {
                      document.querySelector('select').focus();
                    }
                  }
                }}
              >
                {status === 'idle' ? 'Register' : 'Loading'}
              </button>
            </div>
            <div className='login-container'>
              <a href='/login'>
                <small>Already have an account? Login</small>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
