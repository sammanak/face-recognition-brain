import React, { Component } from 'react';

class Rank extends Component {
	constructor() {
		super();
		this.state = {
			emoji: ''
		}
	}

	componentDidMount() {
		this.generateEmoji(this.props.entries)
	}

	componentDidUpdate(prevProps, nextProps) {
		if (prevProps.entries === this.props.entries && prevProps.name === this.props.name) {
			return null;
		}
		this.generateEmoji(this.props.entries)
	}


	generateEmoji = (entries) => {
		fetch(`https://bjo8n367z3.execute-api.us-east-1.amazonaws.com/prod/rank?rank=${entries}`)
			.then(res => res.json())
			.then(data => this.setState({ emoji: data.input }))
			.catch(console.log)
	}

	render() {
		return (
			<div>
				<div className='white f3'>
					{`${this.props.name}, your current entry count is `}
				</div>
				<div className='white f2'>
					{`${this.props.entries}`}
				</div>
				<div className='white f3'>
					{`Rank Badge: ${this.state.emoji}`}
				</div>
			</div>
		);	
	}
}

export default Rank;
