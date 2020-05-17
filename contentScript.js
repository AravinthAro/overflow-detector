/**
 * HTML tags to skip in DOM elements 
 */
let notTagQuery = '*';
['html', 'head', 'script', 'link', 'style', 'meta', 'title'].forEach((tag) => {
    notTagQuery += `:not(${tag})`;
});

/**
 * Util functions
 *  @getStyle - To get CSS property of an DOM element
 */
 const getStyle = (elem, prop) => window.getComputedStyle(elem).getPropertyValue(prop);

/**
 * 
 * @param {Object} request -> To initiate the process
 * @param {*} sender 
 * @param {Callback function} sendResponse -> Callback function to send response
 */

 /**
  * @conditions_when_width_exceeding_child_is_not_detected_as_overflowing_one
  * 1. When child element is either absolute or fixed positioned
  * 2. When parent element has zero width
  * 3. When child element margin is set in negative
  * 4. When parent element overflow is deliberatly set to hide the overflow
  */
const onMessage = (request, sender, sendResponse) => {
    let itemCount = 0;
    if (request.detectScroll) {
        for (let item of document.querySelectorAll(notTagQuery)) {
            if (['absolute', 'fixed'].includes(getStyle(item, 'position')) || !item.parentNode.offsetWidth || getStyle(item, 'margin').includes('-') || getStyle(item.parentNode, 'overflow') == 'hidden') {
                continue;
            } else if (item.offsetWidth > item.parentNode.offsetWidth + 2) {
                item.style.backgroundColor = 'yellow';
                itemCount++;
            }
        }
    }
    window.scroll({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth'
    });
    sendResponse(itemCount);
    return true;
}

/**
 * Event listener function
 */
chrome.runtime.onMessage.addListener(onMessage);