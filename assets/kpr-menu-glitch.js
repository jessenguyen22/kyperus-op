/**
 * KPR Menu Glitch Effect
 * Automatically adds data-text attribute to menu links and footer links for glitch effect
 */
document.addEventListener('DOMContentLoaded', function() {
  // Function to add data-text attribute to all interactive elements
  function addDataTextToElements() {
    // Process header menu links
    processHeaderMenuLinks();
    
    // Process footer links
    processFooterLinks();
  }
  
  // Function to process header menu links
  function processHeaderMenuLinks() {
    const menuLinks = document.querySelectorAll('.m-menu__link--main');
    
    menuLinks.forEach(link => {
      if (!link.hasAttribute('data-text')) {
        // Get the text content, excluding any child elements with arrow
        const arrowElement = link.querySelector('.m-menu__arrow');
        let linkText = '';
        
        if (arrowElement) {
          // Create a temporary clone to get text without arrow
          const tempLink = link.cloneNode(true);
          const tempArrow = tempLink.querySelector('.m-menu__arrow');
          if (tempArrow) {
            tempArrow.remove();
          }
          linkText = tempLink.textContent.trim();
        } else {
          linkText = link.textContent.trim();
        }

        // Add data-text attribute with the link's text
        link.setAttribute('data-text', linkText);
      }
    });
  }
  
  // Function to process footer links
  function processFooterLinks() {
    // Process main footer links
    const footerLinks = document.querySelectorAll('.m-footer .m-link-lists--item .m-link');
    footerLinks.forEach(link => {
      if (!link.hasAttribute('data-text')) {
        const linkText = link.textContent.trim();
        link.setAttribute('data-text', linkText);
      }
    });
    
    // Process bottom footer menu links
    const bottomMenuLinks = document.querySelectorAll('.m-footer--bottom-menu-item .m-link');
    bottomMenuLinks.forEach(link => {
      if (!link.hasAttribute('data-text')) {
        const linkText = link.textContent.trim();
        link.setAttribute('data-text', linkText);
      }
    });
    
    // Process footer switchers
    const footerSwitchers = document.querySelectorAll('.m-footer .m-switcher-dropdown');
    footerSwitchers.forEach(switcher => {
      if (!switcher.hasAttribute('data-text')) {
        // Try to find text content excluding any icons
        let switcherText = '';
        
        // Get all direct text nodes
        const textNodes = Array.from(switcher.childNodes)
          .filter(node => node.nodeType === 3) // Text nodes only
          .map(node => node.textContent.trim())
          .filter(text => text.length > 0);
          
        if (textNodes.length > 0) {
          switcherText = textNodes.join(' ');
        } else {
          // Fallback to all text content
          switcherText = switcher.textContent.trim();
        }
        
        switcher.setAttribute('data-text', switcherText);
      }
    });
  }

  // Run the function on page load
  addDataTextToElements();

  // Also run when the page content changes (for dynamically loaded content)
  const observer = new MutationObserver(function(mutations) {
    addDataTextToElements();
  });

  // Start observing the document with the configured parameters
  observer.observe(document.body, { childList: true, subtree: true });
}); 