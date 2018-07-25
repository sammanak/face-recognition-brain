import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return(
		<div>
			<p className='f4'>
				{'This Magic brain will detect faces in your pictures. Give it a try!'}
			</p>
			<div className='center'>
				<div className='form center pa3 shadow-5 br3 w-50'>
					<input  className='f4 pa2 w-70 center br3' style={{border: 'none'}} type='text' onChange={onInputChange} />
					<button 
						className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple br3 ml2' style={{border: 'none'}} 
						onClick={onButtonSubmit} 
						>Detect</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;