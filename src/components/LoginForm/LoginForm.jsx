import "./LoginForm.css";
import { useMutation } from '@tanstack/react-query'; 
import { loginUser } from '../../api/api';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '<div styleName={} />
<ui />Button';
import { useContext } from 'react';
import { ContextUser } from '../../context/ContextUser';


export const LoginForm = () => {
  
  const queryClient = useQueryClient();
    
  const { userId: userId, updateUserId } = useContext(ContextUser);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorName, setErrorName] = useState();
  const [errorPassword, setErrorPassword] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  

  const loginMutation = useMutation(
    {
      mutationFn: () => loginUser(username, password),
      onSuccess(data) {
        queryClient.invalidateQueries({ queryKey: ["me"] });
        console.log(data);

        updateUserId(data);
        
        console.log('we are logged in', userId, data);
        
      },
      onError(error) {
        setErrorMessage(`Ошибка: ${error.message}`); 
        console.error(errorMessage);
      }
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage(undefined);

    let errors = false;

    if (username.length < 0) {
      errors = true;
      setErrorName('username must be not emty');
    }

    if (password.length < 0) {
      errors = true;
      setErrorPassword('password must be not emty');
    }

    if (!errors) { 
      loginMutation.mutate();
    }

    console.log('logged in', userId);
  }


  return (
    <form 
      className="login-form" 
      onSubmit={handleSubmit}> 

      <input 
        type="text"
        name="username"
        placeholder="username"
        onChange={(event) => {
          setUsername(event.target.value)
          setErrorName(undefined)
          setErrorMessage(undefined)
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
          setErrorMessage(undefined)
        }}
        value={password}
      />
      
      {errorPassword && <span style={{color: "tomato"}}>{errorPassword}</span>}

      {errorMessage && <span style={{color: "tomato"}}>{errorMessage}</span>}

      <Button type="submit" 
        isLoading={loginMutation.isPending}
      >Войти</Button>

      {/* {loginMutation.isSuccess && <Account />} */}
    </form>
  );
};

