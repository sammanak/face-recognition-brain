import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';
 
const Logo = () => {
	return(
		<div className='ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 110, width: 110, display: 'flex', alignContent: 'center' }} >
			 <div className="Tilt-inner pa2 center" style={{ alignSelf: 'center', display: 'flex', alignContent: 'center' }}>
			 	<img style={{ width: '75px', alignSelf: 'center'}} alt='Logo' src={brain} />
			 </div>
			</Tilt>
		</div>
	);
}

export default Logo;