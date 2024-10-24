import "./RegisterForm.css";
import { useState } from "react";
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../../api/api';
import { Button } from "../ui/Button";

export const RegisterForm = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorName, setErrorName] = useState();
  const [errorPassword, setErrorPassword] = useState();

  const [errorMessage, setErrorMessage] = useState('');


  const registerMutation = useMutation({
    mutationFn: () => registerUser(username, password),
    onSuccess() {
        setUsername('');
        setPassword('')
    },
    onError(error) {
      setErrorMessage('Ошибка сервера', error);
      console.error(errorMessage);
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    let errors = false;

    if (username.length < 3) {
      errors = true;
      setErrorName('username must be at least 3 symbols');
    }

    if (password.length < 6) {
      errors = true;
      setErrorPassword('password must be at least 6 symbols');
    }

    if (!errors) { 
      console.log('register user');
      registerMutation.mutate();      
    }
  };

  return (
    <form 
      className="register-form"
      onSubmit={handleSubmit}
    >
      
      <input 
        type="text"
        name="username"
        placeholder="username"
        onChange={(event) => {
          setUsername(event.target.value)
          setErrorName(undefined)
          setErrorMessage()
        }}
        value={username}
      />
      
      {errorName && <span style={{color: "tomato"}}>{errorName}</span>}
      
      <input 
        type="password" 
        name="password"
        placeholder="password"
        onChange={(event) => {
          setPassword(event.target.value)
          setErrorPassword(undefined)
          setErrorMessage()
        }}
        value={password}
      />
      
      {errorPassword && <span style={{color: "tomato"}}>{errorPassword}</span>}

      {errorMessage && <span style={{color: "tomato"}}>{errorMessage}</span>}

      <Button
        type="submit"
        isLoading={registerMutation.isPending}
      >Зарегистрироваться</Button>
    </form>
  );
};
