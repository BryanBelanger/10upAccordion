/********************************

 Name: WordPress Accessible Accordion
 Usage:

 	let componentInstance = new TenUp.ComponentAccordion( {
		target: '.TenUp_Accordion', // ID (or class) of accordion container
	}, function() {
		console.log( 'Amazing callback function!' );
	} );

 ********************************/

'use strict';

const init = ( options, callback ) => {

	if ( 'undefined' === typeof options.target ) {
		return false;
	}

	const accordion = document.querySelector( options.target );

	if ( ! accordion ) {
		return;
	}

	// This is our global accordion index to keep unique ids
	let	accordionHeaders  = accordion.querySelectorAll( '.accordion-header' );
	let	accordionContent  = accordion.querySelectorAll( '.accordion-content' );

	accordionHeaders.forEach( ( header, i ) => {
		// Set ARIA and ID attributes
		header.setAttribute( 'id', 'tab' + '-' + i );
		header.setAttribute( 'aria-selected', 'false' );
		header.setAttribute( 'aria-expanded', 'false' );
		header.setAttribute( 'aria-controls', 'panel' + '-' + i );
		header.setAttribute( 'role', 'tab' );

		eventListenerHandle( header );
	} );

	accordionContent.forEach( ( content, i ) => {
		// Set ARIA and ID attributes
		content.setAttribute( 'id', 'panel' + '-' + i );
		content.setAttribute( 'aria-hidden', 'true' );
		content.setAttribute( 'aria-labelledby', 'tab' + '-' + i );
		content.setAttribute( 'role', 'tabpanel' );
	} );

	// Execute the callback function
	if ( typeof callback === 'function' ) {
		callback.call();
	}
};

const eventListenerHandle = ( target ) => {

	target.addEventListener( 'click', function() {
		accordionHandle( target );
	} );

};

const accordionHandle = ( accordion ) => {

	let nextPanel = accordion.nextElementSibling;
	let nextPanelLabel = nextPanel.getElementsByClassName( 'accordion-label' )[0];

	accordion.classList.toggle( 'is-active' );
	nextPanel.classList.toggle( 'is-active' );

	nextPanelLabel.setAttribute( 'tabindex', -1 );
	nextPanelLabel.focus();

	if ( nextPanel.classList.contains( 'is-active' ) ) {

		accordion.setAttribute( 'aria-selected', 'true' );
		accordion.setAttribute( 'aria-expanded', 'true' );
		nextPanel.setAttribute( 'aria-hidden', 'false' );

	} else {

		accordion.setAttribute( 'aria-selected', 'false' );
		accordion.setAttribute( 'aria-expanded', 'false' );
		nextPanel.setAttribute( 'aria-hidden', 'true' );

	}
};

export default init;