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

  let endState;

  switch (alert) {
    case 'win':
      endState = <div>
        <h2>Correct!</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, cum
          veniam! Numquam nostrum voluptate, nulla consequatur, blanditiis,
          deleniti id possimus natus aliquid facere similique eius expedita
          fugiat molestiae sit assumenda.
        </p>
      </div>;
      break;
    case 'lose':
      endState = <div>
        <h2>Too bad!</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis illo
          hic deserunt magnam quisquam natus sapiente est cumque alias nisi.
          Saepe magni atque pariatur ullam cumque quae magnam eos eum.
        </p>
      </div>;
      break;
    default:
      endState = <div>
        <h2>Thanks for playing!</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis illo
          hic deserunt magnam quisquam natus sapiente est cumque alias nisi.
          Saepe magni atque pariatur ullam cumque quae magnam eos eum.
        </p>
      </div>;
  }

  return (
    <Modal isEndState={true} handleToggleDetailsModal={handleToggleDetailsModal}>
      <Styled.EndStateModal>{endState}</Styled.EndStateModal>
    </Modal>
  );
};

export default EndStateModal;
