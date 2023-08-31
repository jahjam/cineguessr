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
          Congratulations, you guessed right! Tomorrow there will be a new film to guess, so be sure to return to have a
          crack at that one!
        </p>
        <p>
          Your stats will be accumulated over time, however, they are browser specific, so if you change browsers your
          stats won't carry over.
        </p>
      </div>;
      break;
    case 'lose':
      endState = <div>
        <h2>Too bad!</h2>
        <p>
          Commiserations, you couldn't guess it correctly this time! Don't worry though, as tomorrow there will be a new
          film to guess, so be sure to return to have a crack at that one!
        </p>
        <p>
          Your stats will be accumulated over time, however, they are browser specific, so if you change browsers your
          stats won't carry over.
        </p>
      </div>;
      break;
    default:
      endState = <div>
        <h2>Thanks for playing today!</h2>
        <p>
          Tomorrow there will be a new film to guess, so be sure to return to have a
          crack at that one!
        </p>
        <p>
          Your stats will be accumulated over time, however, they are browser specific, so if you change browsers your
          stats won't carry over.
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
