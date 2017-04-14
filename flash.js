//==============================
//dependencies
//==============================
var inquirer = require("inquirer");
var fs = require("fs");
var cardFile = ("./cards.json")
var card = "";
var clozeCardMade = "";

//==============================
//code to run and construct the cards
//==============================

function ClozeCard(text, cloze, study){
  this.text = text;
  this.cloze = cloze;
  this.study = study;
}//end of clozeCard constructor


function BasicCard(front, back){
  this.front = front;
  this.back = back;
}//end of basicCard constructor

//==============================
//main code to ask user for input to make cards
//==============================

//first figure out if they are making a cloze or regular
inquirer.prompt([{
        type: "list",
        name: "cardType",
        message: "What tpe of card are you making??",
        choices: ["Basic Card", "ClozeCard", "Neither, I want to study the cards already made"]
}]).then(function(cardInputSetup) {
    if (cardInputSetup.cardType === "Basic Card") {
        makeBasicCard();
    } 
    else if (cardInputSetup.cardType === "ClozeCard"){
        makeClozeCard();
    }
    else{
        getCards();
    }
}); //end of inquirer.prompt

//==============================
//defining functions
//==============================

function makeBasicCard(){
  return inquirer.prompt([
        {
            type: "input",
            name: "front",
            message: "What do you want the front of the card to say? (full question)"
        },
        {
            type: "input",
            name: "back",
            message: "What do you want the back of the card to say? (answer)"
        }
        ]).then(function(cardInfoBasic) {
          //add to constructor
          card = new BasicCard(cardInfoBasic.front, cardInfoBasic.back);
            console.log(card);

          fs.appendFile(cardFile, JSON.stringify(card), function(err) {
            if (err) {
              console.log(err);
              }
          });//end of fs.appendFile
        }); //end of basic card info grab
}

//==============================

function makeClozeCard(){
  return inquirer.prompt([
          //ask for close card info
          {
            type: "input",
            name: "text",
            message: "What is the full statment to memorize? (ex- George Washington was the first president of the USA.)"
          },
          {
              type: "input",
              name: "cloze",
              message: "What is the cloze to omit?(ex - George Washington)"
          },
          {
              type: "input",
              name: "study",
              message: "Now type the partial text omitting the cloze(ex - _____ was the first president of the USA.)"
          },
        ]).then(function(cardInfoCloze) {
          //add to constructor
          clozeCardMade = new ClozeCard(cardInfoCloze.text, cardInfoCloze.cloze, cardInfoCloze.study);
            console.log(clozeCardMade);

          fs.appendFile(cardFile, JSON.stringify(clozeCardMade) + "\n", function(err) {
            if (err) {
              console.log(err);
              }
          });//end of fs.appendFile
        });//end of close card info grab
}

//==============================

function getCards (){
  //I put this here just in case I had time to take this to the interface. Each card is in an object to make it easy to display.
  fs.readFile(cardFile, "utf8",function (err, data){
    if (err){
      throw err;
    }
    console.log(data);
  });
}