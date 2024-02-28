import { useState } from 'react';

import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';


import { Button } from '../../components/Button';
import { Input } from '../../components/Input';


import { Avatar, Container, Form } from "./styles";



export function Profile() {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [passwordOld, setPasswordOld] = useState();
  const [passwordNew, setPasswordNew] = useState();


  async function handleUpdate() {
    const user = {
      name,
      email,
      password: passwordNew,
      old_password: passwordOld
    }

    await updateProfile({ user });
  }

  return (
    <Container>
      <header>
        <Link to='/'>
          <FiArrowLeft />
        </Link>
      </header>

      <Form>

        <Avatar>
          <img
            src="https://github.com/LopesA95.png"
            alt='foto do ususário'
          />
          <label htmlFor="avatar">
            <FiCamera />
            <input
              id='avatar'
              type='file'
            />
          </label>
        </Avatar>
        <Input
          placeholder='Nome'
          type='text'
          icon={FiUser}
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <Input
          placeholder='E-mail'
          type='text'
          icon={FiMail}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Input
          placeholder='Senha atual'
          type='password'
          icon={FiLock}
          onChange={e => setPasswordOld(e.target.value)}
        />

        <Input
          placeholder='Nova atual'
          type='password'
          icon={FiLock}
          onChange={e => setPasswordNew(e.target.value)}
        />
        <Button title='Salvar' onClick={handleUpdate}/>


      </Form>
    </Container>
  )
}