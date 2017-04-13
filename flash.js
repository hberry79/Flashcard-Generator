//==============================
//dependencies
//==============================
var inquirer = require("inquirer");
var fs = require("fs");
var cardFile = ("./cards.json")

//==============================
//code to run and construct the cards
//==============================

function ClozeCard(text, cloze){
  this.text = text;
  this.cloze= cloze;
}//end of clozeCard constructor


function BasicCard(front, back){
  this.front = front;
  this.back = back;
}//end of basicCard constructor

//==============================
//code to ask user for input to make cards
//==============================

//first figure out if they are making a cloze or regular
inquirer.prompt([{
        type: "list",
        name: "cardType",
        message: "What tpe of card are you making??",
        choices: ["Basic Card", "ClozeCard"]
    }
]).then(function(cardInputSetup) {
    if (cardInputSetup.cardType === "Basic Card") {
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
        ]).then(function(CardInfoBasic) {
          console.log(CardInfoBasic);
          //add to constructor
          var card = new BasicCard(cardInputSetup.front, cardInputSetup.back);

          fs.appendFile(cardFile, card, function(err) {
            if (err) {
              console.log(err);
              }
          });//end of fs.appendFile
        }); //end of basic card info grab
    } else {
        return inquirer.prompt([
          //ask for close card info
        ]).then(function(CardInfoCloze) {});//end of close card info grab
    }
}); //end of inquirer.prompt

function getCards (){
  fs.readFile(cardFile, "utf8",function (error, data){
    console.log(data);
  });

getCards();
}