import "./Account.css";
import { ContextUser } from '../../context/ContextUser';
import { useContext, useEffect, useState } from 'react';
import { getUserById } from '../../api/api';
import { Link } from 'react-router-dom';

export const Account = () => {

  const { userId: userId,  } = useContext(ContextUser);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserById(userId);
        if (user) {
          setUsername(user.name);
        }
      } catch (error) {
        console.error('Error fetching user data:', error); 
      }
    };
    
    fetchUserData();
    
  }, [userId]);
  
  return (
    <>
        
    <h2>you are logged in, here is your profile</h2>
    <p>you are {username} and your id is {userId}</p>
    <div className="accaunt-btns">
      <Link to={'/page1'}>Page woth someithng</Link>
      <Link to={'/page2'}>Another one page</Link>
    </div>

    </>
  );
};
