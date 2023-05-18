import { useContext } from 'react';
import Modal from '../../Components/Modal/Modal';
import { AlertContext } from '../../store/alert-context';
import * as Styled from './styles';

type Props = {
  handleToggleDetailsModal: () => void;
};

const EndStateModal = ({ handleToggleDetailsModal }: Props) => {
  const alertContext = useContext(AlertContext);
  const { alert } = alertContext;

  const endState =
    alert === 'win' ? (
      <div>
        <h2>Correct!</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, cum
          veniam! Numquam nostrum voluptate, nulla consequatur, blanditiis,
          deleniti id possimus natus aliquid facere similique eius expedita
          fugiat molestiae sit assumenda.
        </p>
      </div>
    ) : (
      <div>
        <h2>Too bad!</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis illo
          hic deserunt magnam quisquam natus sapiente est cumque alias nisi.
          Saepe magni atque pariatur ullam cumque quae magnam eos eum.
        </p>
      </div>
    );

  return (
    <Modal handleToggleDetailsModal={handleToggleDetailsModal}>
      <Styled.EndStateModal>{endState}</Styled.EndStateModal>
    </Modal>
  );
};

export default EndStateModal;
