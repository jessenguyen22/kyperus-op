/**
 * KPR Button Cyberpunk Glitch Effect
 * Automatically adds data-text attribute to primary buttons for glitch effect
 */
document.addEventListener('DOMContentLoaded', function() {
  // Function to add data-text attribute to primary buttons
  function addDataTextToPrimaryButtons() {
    // Select all primary buttons
    const primaryButtons = document.querySelectorAll(
      '.m-button--primary:not(.m-button--scroll-top), ' + 
      '.shopify-payment-button__button.shopify-payment-button__button--unbranded, ' + 
      '.spr-button.spr-button-primary, ' + 
      '.m-add-to-cart, ' + 
      '.m-spinner-button, ' + 
      '.m-product-quickview-button'
    );
    
    // Loop through each button and add data-text attribute
    primaryButtons.forEach(button => {
      // Skip scroll-top button completely
      if (button.classList.contains('m-button--scroll-top')) {
        return;
      }
      
      if (!button.hasAttribute('data-text')) {
        // Get the text content, prioritize span with specific classes
        let textElement = button.querySelector('.m-add-to-cart--text');
        
        // If no specific text element found, use button's text
        let buttonText = textElement ? textElement.textContent.trim() : button.textContent.trim();
        
        // Add data-text attribute with the button's text
        button.setAttribute('data-text', buttonText);
      }
    });
  }
  
  // Run the function on page load
  addDataTextToPrimaryButtons();
  
  // Also run when the page content changes (for dynamically loaded buttons)
  const observer = new MutationObserver(function(mutations) {
    addDataTextToPrimaryButtons();
  });
  
  // Start observing the document with the configured parameters
  observer.observe(document.body, { childList: true, subtree: true });
}); 