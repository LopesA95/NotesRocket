import { useState } from 'react';

import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';


import { api } from '../../services/api';
import avatarPlaceholder from '../../assets/avatar_placeholder.svg';


import { Button } from '../../components/Button';
import { Input } from '../../components/Input';


import { Avatar, Container, Form } from "./styles";



export function Profile() {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [passwordOld, setPasswordOld] = useState();
  const [passwordNew, setPasswordNew] = useState();

  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

  const [avatar, setAvatar] = useState(avatarUrl);
  const [avatarFile, setAvatarFile] = useState(null);


  async function handleUpdate() {
    const user = {
      name,
      email,
      password: passwordNew,
      old_password: passwordOld
    }

    await updateProfile({ user, avatarFile });
  }

  function handleChangeAvatar(e) {
    const file = e.target.files[0];
    setAvatarFile(file);

    const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview);
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
            src={avatar}
            alt='foto do ususário'
          />
          <label htmlFor="avatar">
            <FiCamera />
            <input
              id='avatar'
              type='file'
              onChange={handleChangeAvatar}
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
        <Button title='Salvar' onClick={handleUpdate} />


      </Form>
    </Container>
  )
}