const API_URL = 'http://localhost:3000';


export const getUserById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 3000));
  const response = await fetch(`${API_URL}/users`);
  const data = await response.json();

  const userArray = data.filter(user => user.id == id);
  const user = userArray[0];

  // console.log(user);
  
  return user;
}

export const getUserByName = async (name) => {
  const response = await fetch(`${API_URL}/users`);
  const users = await response.json();

  const user = users.filter(user => user.name == name);
  console.log(user);
  
  return user;
}


export const loginUser = async (name, password) => {
  // await new Promise(resolve => setTimeout(resolve, 3000));

  const response = await fetch(`${API_URL}/users`);
  const users = await response.json();
  if (!users) {
    throw new Error('no users');
  }

  const userArray = users.filter(user => user.name == name); 
  const user = userArray[0];
  if (!user) {
    throw new Error('Неверное имя пользователя');
  }

  if (user.password == password) {
    return user.id;
  } else throw new Error('Неверный пароль');
}


export const registerUser = async (name, password) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: Math.floor(Math.random() * 100000000000),
      name,
      password
    }),
  });

  if (!response.ok) {
    throw new Error('Ошибка регистрации: ' + response.statusText);
  }

  const data = await response.json();
  return data;
};
