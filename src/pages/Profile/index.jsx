import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import avatarPlaceholder from '../../assets/avatar_placeholder.svg';
import { api } from '../../services/api';


import { Button } from '../../components/Button';
import { ButtonText } from '../../components/ButtonText';
import { Input } from '../../components/Input';


import { Avatar, Container, Form } from "./styles";



export function Profile() {
  const { user, updatedProfile } = useAuth();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [passwordOld, setPasswordOld] = useState();
  const [passwordNew, setPasswordNew] = useState();

  const navigate = useNavigate();

  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

  const [avatar, setAvatar] = useState(avatarUrl);
  const [avatarFile, setAvatarFile] = useState(null);


  async function handleUpdate() {
    const updated = {
      name,
      email,
      password: passwordNew,
      old_password: passwordOld
    }

    const userUpdated = Object.assign(user, updated);

    await updatedProfile({ user: userUpdated, avatarFile });
  }

  function handleBack() {
    navigate(-1);
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
        <ButtonText
          title={<FiArrowLeft size={24} />}
          onClick={handleBack} />
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