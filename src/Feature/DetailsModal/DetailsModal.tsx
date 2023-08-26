import ArtCard from '../../Components/Art-Cart/Art-Cart';
import Modal from '../../Components/Modal/Modal';
import * as Styled from './styles';

type Props = {
  handleToggleDetailsModal: () => void;
};

const DetailsModal = ({ handleToggleDetailsModal }: Props) => {
  return (
    <Modal handleToggleDetailsModal={handleToggleDetailsModal}>
      <Styled.DetailsModal direction="column">
        <h3>How to play</h3>

        // TODO Add example SVG
        <ArtCard />

        <span>Guess the film in 5 takes.</span>

        <ul>
          <li>
            Your guess can be anything you want. Any correct letters will be
            added to the pool.
          </li>
          <li>There will be a new film to guess each day.</li>
        </ul>

        <p>
          <span>HINT</span> you can use your hint if you're stuck. But beware,
          this will cost you a take.
        </p>

        <p>
          Cineguessr was created as a portfolio project, you can view the source
          code <a href="#">HERE</a>.
        </p>
      </Styled.DetailsModal>
    </Modal>
  );
};

export default DetailsModal;
