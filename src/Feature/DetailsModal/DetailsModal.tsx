import React from 'react';
import ArtCard from '../../Components/Art-Cart/Art-Cart';
import * as Styled from './styles';

type Props = {
  handleToggleDetailsModal: () => void;
};

const DetailsModal = ({ handleToggleDetailsModal }: Props) => {
  const handleCloseModal = (e: React.MouseEvent) => {
    const modalEl = document.getElementById('modal');
    const closeIcon = document.getElementById('close-icon');
    if (modalEl === e.target || closeIcon === e.target) {
      handleToggleDetailsModal();
    }
  };

  return (
    <Styled.Modal
      initial={{ translateY: 10, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1, transition: { duration: 0.2 } }}
      exit={{ translateY: 10, opacity: 0, transition: { duration: 0.2 } }}
      id="modal"
      onClick={handleCloseModal}
    >
      <Styled.Container direction="column" justify="flex-start">
        <Styled.CloseIcon id="close-icon" />
        <h3>How to play</h3>

        <ArtCard />

        <span>Guess the film in 5 tries.</span>

        <ul>
          <li>
            Your guess can be anything you want. Any correct letters will be
            added to the pool.
          </li>
          <li>There will be a new film to guess each day.</li>
        </ul>

        <p>
          <span>HINT</span> you can use your hint if you're stuck. But beware,
          this will cost you a life.
        </p>

        <p>
          Cineguessr was created as a portfolio project, you can view the source
          code <a href="#">HERE</a>.
        </p>
      </Styled.Container>
    </Styled.Modal>
  );
};

export default DetailsModal;
