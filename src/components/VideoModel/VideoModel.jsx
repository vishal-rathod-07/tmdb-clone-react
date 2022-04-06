import { Modal } from 'react-bootstrap';

import './videomodel.scss';

const VideoModel = (props) => {
  return (
    <Modal
      size='xl'
      {...props}
      backdrop='static'
      keyboard={false}
      aria-labelledby='contained-modal-title-vcenter'
      fullscreen={true}
      centered
      className='video-model'
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Play Trailer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className=''>
        <iframe
          width='100%'
          height='100%'
          src={`https://www.youtube.com/embed/${props.trailerKey}`}
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      </Modal.Body>
    </Modal>
  );
};

export default VideoModel;
