//Make https reqs for files

//Post request for file upload
async function requestUpload(file){
    var res;

    //Make new form data
    const dataInForm = new FormData();

    //Attach email to form data 
    dataInForm.set('email', localStorage.getItem("loggedIn"));
     
    //Prepare options for post request
    const settings = {
            method: 'POST',
            body: dataInForm
    };

    //Attach file
    settings.body.append('code-file', file);

    await fetch('/files/upload', settings)
    .then(response => {res = response.text()});

    return res;
}

//Post request to get all file data
async function requestFiles(){
    var res;

    const email = {email: await localStorage.getItem("loggedIn")};

    await fetch('/files/getfiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email),
    })
    .then(response => response.json())
    .then(response => {res = response});
  
    return res;
}

//Post request to get file data
async function requestFile(name){
  var res;

  const nameObj = {name: name};

  await fetch('/files/getfile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(nameObj),
  })
  .then(response => response.json())
  .then(response => {res = response[0]});

  return res;
}

//Post request to delete file
async function requestDelete(){
  var res;

  const name = {name: await localStorage.getItem("fileName")};

    await fetch('/files/deletefile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(name),
    })
    .then(response => response.json())
    .then(response => {res = response});
  
    return res;
}

//Get request to receive file contents in array of lines
async function requestContents(cookieName){
  var res;

  //Get name of file being viewed
  const name = await localStorage.getItem(cookieName);

  var file;
  var fileText;

  //Get files text content from server
  file = await fetch(name)
  .then(res => res.text())
  .then(fileContent => {
    fileText = fileContent;
  });

  //Make into array of lines
  const fileTextLines = await fileText.split("\n");

  //Format for viewing (HTML is funny about rendering HTML)
  fileTextLines.forEach(function(line, index){
    if(line.includes("\r")){
      fileTextLines[index] = line.replace(/\r/ , "\n");
    }
    if(line.includes("<")){
      fileTextLines[index] = line.replace(/</ , "&lt");
    }
  });

  res = fileTextLines;

  return res;
}

//Get request to receive file contents in full
async function requestContentsFull(cookieName){
  var res;

  //Get name of file being viewed
  const name = await localStorage.getItem(cookieName);

  var file;
  var fileText;

  //Get files text content from server
  file = await fetch(name)
  .then(res => res.text())
  .then(fileContent => {
    fileText = fileContent;
  });

  res = fileText;

  return res;
}

async function requestContentsFullFromName(name){
  var res;

  var file;
  var fileText;

  //Get files text content from server
  file = await fetch(name)
  .then(res => res.text())
  .then(fileContent => {
    fileText = fileContent;
  });

  res = fileText;

  return res;
}