//Make https reqs for authorisations
async function requestLogin(user){
    var res;

    await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(response => {res = response});

    return res;
}

async function requestSignup(user){
  var res;

  await fetch('/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  })
  .then(response => response.json())
  .then(response => {res = response});

  return res;
}

async function getInformation(email){
  var res;

  await fetch('/auth/getinfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(email)
  })
  .then(response => response.json())
  .then(response => {res = response});

  return res;
}