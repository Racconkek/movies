import { MovieCreate } from '../../types/movie';
import { Button, Form, Modal } from 'react-bulma-components';
import { observer } from 'mobx-react';
import { useState } from 'react';

interface IMovieModalProps {
  name?: string;
  description?: string;
  show?: boolean;
  onClose?: () => void;
  onSubmit?: (payload: MovieCreate) => void;
  submitText?: string;
}

const MovieModal = ({
  show,
  onClose,
  onSubmit,
  name: prevName,
  description: prevDescription,
  submitText,
}: IMovieModalProps) => {
  const [name, setName] = useState<string>(prevName ?? '');
  const [description, setDescription] = useState<string>(prevDescription ?? '');

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    if (value && value.length < 255) {
      setName(value);
    }
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const value = e.target.value;
    if (value && value.length < 255) {
      setDescription(value);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Content>
        <Modal.Card>
          <Modal.Card.Header>
            <Modal.Card.Title>Добавить фильм</Modal.Card.Title>
          </Modal.Card.Header>
          <Modal.Card.Body>
            <Form.Field>
              <Form.Label>Название</Form.Label>
              <Form.Control>
                <Form.Input placeholder="Введите название фильма" type="text" value={name} onChange={onNameChange} />
              </Form.Control>
            </Form.Field>
            <Form.Field>
              <Form.Label>Описание</Form.Label>
              <Form.Control>
                <Form.Textarea
                  placeholder="Введите описание фильма"
                  value={description}
                  onChange={onDescriptionChange}
                />
              </Form.Control>
            </Form.Field>
          </Modal.Card.Body>
          <Modal.Card.Footer>
            <Button
              color={'grey-dark'}
              onClick={() => {
                onSubmit({ name, description });
                onClose();
              }}
            >
              {submitText ?? 'Создать'}
            </Button>
            <Button color={'white'} onClick={onClose}>
              Отмена
            </Button>
          </Modal.Card.Footer>
        </Modal.Card>
      </Modal.Content>
    </Modal>
  );
};

export default observer(MovieModal);
