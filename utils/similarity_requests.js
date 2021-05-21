//Make https reqs for files

//Post request for similarity check
async function requestSimilarity(text1, text2){
    var res;

    //Prepare texts for post
    const texts = {text1: text1, text2: text2}

    //Post
    await fetch('/similarity/get-percentage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(texts),
      })
      .then(response => response.json())
      .then(percentage => {res = percentage});

    return res;
}

//Post request for multiple file similarity check
async function requestMultiFileSimilarity(arrayOfTextsAndNames){
  var res;

  //Post
  await fetch('/similarity/multifile-similarity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arrayOfTextsAndNames),
    })
    .then(response => response.json())
    .then(output => {res = output});

  res.reverse();

  return res;
}