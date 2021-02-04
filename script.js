function getRequestKey() {
  fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKEY}`)
  .then((r) => r.json())
  .then((data) => requestToken = data.request_token)
}

function printRequestKey() {
  console.log(requestToken);
  redirectUrlEl.classList.remove('isNotVisibile');
  redirectUrlEl.href = `https://www.themoviedb.org/authenticate/${requestToken}`;
}

function getOtherThings() {
  fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=${requestToken}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify({
      request_token: requestToken
    })
  })
  .then((r) => r.json())
  .then((data) => {
    console.log(data);
    return fetch(`https://api.themoviedb.org/3/${apiKEY}&session_id=${data.session_id}`);
  })
}












// INIT
const authData = {
  apiKEY: '696db31b9a852f60d5897e6aa7856b0d',
  requestToken: null,
}
let { apiKEY, requestToken } = authData;

const getReqTokenBtn = document.querySelector('.getRequestTokenBtn');
getReqTokenBtn.addEventListener('click', getRequestKey);

const printReqTokenBtn = document.querySelector('.printRequestTokenBtn');
printReqTokenBtn.addEventListener('click', printRequestKey);

const redirectUrlEl = document.querySelector('.linkRedirectToAuth');

const finalBtn = document.querySelector('.finalBtn');
finalBtn.addEventListener('click', getOtherThings);
