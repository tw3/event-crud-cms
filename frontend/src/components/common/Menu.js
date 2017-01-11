import React from 'react';
import { Nav, NavItem, Glyphicon } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

// Menu component
const Menu = () => {
	return (
		<Nav bsStyle="pills">
			<IndexLinkContainer to="/">
				<NavItem>
					Home
				</NavItem>
			</IndexLinkContainer>
			<LinkContainer to="/event-edit">
				<NavItem>
					Add Event <Glyphicon glyph="plus-sign" />
				</NavItem>
			</LinkContainer>
		</Nav>
	);
};

export default Menu;
