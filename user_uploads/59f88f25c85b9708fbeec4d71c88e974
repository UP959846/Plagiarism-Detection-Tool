//Loading modules
const express = require('express');
const router = express.Router();

//Loading similarity module
var stringSimilarity = require("string-similarity");

//Get similarity percentage post request
router.post('/get-percentage', async function(req, res){
    //Get texts
    const text1 = await req.body.text1;
    const text2 = await req.body.text2;

    //Get similarity
    const similarityDecimal = stringSimilarity.compareTwoStrings(text1, text2);

    //Convert decimal to percentage
    const similarityPercentage = (similarityDecimal*100).toFixed(2);

    //Send back result
    res.json(similarityPercentage);
});

//Get multi file similarity post request
router.post('/multifile-similarity', async function(req, res){
    //Define initial variables
    var arrayOfTextsAndNames = req.body;
    const originTextAndName = req.body[0];
    var arrayOfComparisonObjects = new Array();

    //After extracting shift array to remove origin text
    arrayOfTextsAndNames.shift();

    //Add origin object to comparison object array
    const originComparisonObject = {
        name: originTextAndName.name,
        text: originTextAndName.text,
        matchToOrigin: 100,
        matchToClosestMatch: 100
    };

    arrayOfComparisonObjects.push(originComparisonObject);

    //Define needed functions
    function getPercentageSimilarity(text1, text2){
        //Get similarity
        const similarityDecimal = stringSimilarity.compareTwoStrings(text1, text2);

        //Convert decimal to percentage
        const similarityPercentage = (similarityDecimal*100).toFixed(2);

        return similarityPercentage;
    }

    function getMatchToOrigin(textAndName, index){
        var textBeingAnalysed = textAndName.text;
        var originText = originTextAndName.text;

        var percentageMatchToOrigin = getPercentageSimilarity(textBeingAnalysed, originText);

        var newComparisonObject = {
            name: textAndName.name,
            text: textAndName.text,
            matchToOrigin: percentageMatchToOrigin,
            matchToClosestMatch: null
        };

        arrayOfComparisonObjects.push(newComparisonObject);
    }

    function sortDependingOnMatchToOrigin(arrayOfComparisonObjects){
        arrayOfComparisonObjects.sort(
            function(a, b) {
                return parseFloat(a.matchToOrigin) - parseFloat(b.matchToOrigin);
            }   
        );
    }

    function makeComparisonToPredecessorAndStoreInObject(object, index){
        if (index == 0){
            return;
        }

        var textOfPredecessor = arrayOfComparisonObjects[index - 1].text;
        var textOfCurrentObject = arrayOfComparisonObjects[index].text;

        var percentageMatchToPredecessor = getPercentageSimilarity(textOfPredecessor, textOfCurrentObject);

        arrayOfComparisonObjects[index - 1].matchToClosestMatch = percentageMatchToPredecessor;
    }

    //For every text to compare to origin text and store in new comparison object, then push to comparison object array
    arrayOfTextsAndNames.forEach(getMatchToOrigin);

    //Sort comparsion objects by match to origin
    sortDependingOnMatchToOrigin(arrayOfComparisonObjects);

    //For every text, compare percentage match to the file closest to it relative to the origin file
    arrayOfComparisonObjects.forEach(makeComparisonToPredecessorAndStoreInObject);

    res.json(arrayOfComparisonObjects);
});

module.exports = router; 