import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Container, Content, Links } from './styles'

import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '../../components/Button'
import { ButtonText } from '../../components/ButtonText'
import { Header } from '../../components/Header'
import { Section } from '../../components/Section'
import { Tag } from '../../components/Tag'

export function Details() {
  const [data, setData] = useState(null)

  const params = useParams();
  const navigate = useNavigate();

  function handleBack() {

    navigate(-1);
  }

  function handleRemove() {
    const confirm = window.confirm("Deseja realmente remover esta nota?");

    if (confirm) {
      api.delete(`/notes/${params.id}`).then(() => {
        navigate(-1);
      })
    }
  }

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data);
    }

    fetchNote();
  }, [params.id]);

  return (
    <Container>
      <Header />

      {
        data &&
        <main>
          <Content>
            <ButtonText
              title="Excluir nota"
              onClick={handleRemove}
            />

            <h1>
              {data.title}
            </h1>

            <p>
              {data.description}
            </p>
            {
              data.links &&
              <Section title="Links úteis">
                <Links>
                  {
                    data.links.map(link => (
                      <li key={String(link.id)}>
                        <a href={link.url} target='_blank' rel="noreferrer">
                          {link.url}
                        </a>
                      </li>
                    ))
                  }
                </Links>
              </Section>
            }

            {
              data.tags &&
              <Section title="Marcadores">
                {
                  data.tags.map(tag => (
                    <Tag
                      key={tag.id}
                      title={tag.name}
                    />
                  ))
                }
              </Section>
            }

            <Button
              title="Voltar"
              onClick={handleBack}
            />
          </Content>
        </main >
      }
    </Container >
  )
}