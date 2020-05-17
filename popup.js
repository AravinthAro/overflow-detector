/**
 * Set message in popup
 */

 const setMsg = (msg) =>{
    document.getElementById('responseText').innerHTML = msg;
 }

/**
 * Function to send message, detect scroll and receiver response to post in popup
 */
const detectScroll = () => {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        document.getElementById('loader').classList.remove('hide');
        chrome.tabs.sendMessage(tabs[0].id, {
            detectScroll: true
        },
        (count) =>{
            document.getElementById('loader').classList.add('hide');
            if(count){
                setMsg(`${count==1?'Only one item':count+' items'} found exceeding its parent node's width.`);
            }else{
                setMsg('None of the DOM elements exceeds its parent\'s width'); 
                document.getElementById('mainBtn').remove();
            }
        });
    });
}

/**
 * On click event to trigger scroll detect function
 */
document.getElementById('mainBtn').addEventListener('click', detectScroll);
