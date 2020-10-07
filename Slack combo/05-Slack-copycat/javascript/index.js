const batch = 387;
const baseUrl = "https://wagon-chat.herokuapp.com/";
const yourMessage = document.getElementById('your-message');
const yourName = document.getElementById('your-name');
const allMessages = document.querySelector('.message');
const sendMessage = document.querySelector('.btn-primary');
const refreshMessage = document.querySelector('#refresh');
const names = document.querySelector('.names');
let groupNames = [];
let uniqueNames;

const getNames = () => {
  names.innerHTML = '';
  uniqueNames = Array.from(new Set(groupNames));
  uniqueNames.forEach((name) => {
    names.insertAdjacentHTML('beforeend',
      `<p>${name}</p>`);
  });
};

const fetchMessages = () => {
  allMessages.innerHTML = '';
  fetch(`${baseUrl}${batch}/messages`)
    .then(response => response.json())
    .then((data) => {
      data.messages.forEach((message) => {
        groupNames.push(message.author);
        allMessages.insertAdjacentHTML('beforeend',
          `<li class="message-content">
            <p id="name">${message.author}</p>
            <p>${message.content}</p>
          </li>`
        );
      });
      getNames();
    });
};

refreshMessage.addEventListener('click', (event) => {
  fetchMessages();
});

const sendMessageToAPI = (event) => {
  event.preventDefault();
  fetch(`${baseUrl}${batch}/messages`, {
    method: "POST",
    body: JSON.stringify({
      author: `${yourName.value}`,
      content: `${yourMessage.value}`
    })
  });
  setTimeout(fetchMessages(), 2000);
  yourMessage.value = '';
};

sendMessage.addEventListener('click', sendMessageToAPI);
