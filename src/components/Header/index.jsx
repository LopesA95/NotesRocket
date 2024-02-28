import { RiShutDownLine } from "react-icons/ri";
import { useAuth } from "../../hooks/auth";
import { Container, Logout, Profile } from "./styles";


export function Header() {
  const { signOut } = useAuth();

  return (
    <Container>
      <Profile to='/profile'>
        <img
          src="https://github.com/LopesA95.png"
          alt='Foto do Usuário'
        />

        <div>
          <span>Bem-vindo</span>
          <strong>Anderson Lopes</strong>
        </div>

      </Profile>

      <Logout onClick={signOut}>
        <RiShutDownLine />
      </Logout>

    </Container>
  );
}