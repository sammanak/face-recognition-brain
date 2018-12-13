import React from 'react';
import './FaceRegonition.css';

const FaceRegonition = ({ imageUrl, boxes }) => {
	return(
		<div className='center'>
			<div className='absolute mt2'>
				<img src={imageUrl} id='inputimage' alt='' className='pt20' width='500px' height='auto' />
				{
					boxes.map(box => {
						return <div className='bounding-box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }} key={box.faceId} ></div>
					})
				}
			</div>
		</div>
	);
}


export default FaceRegonition;