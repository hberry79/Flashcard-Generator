function BasiCard(front, back){
  this.front = front;
  this.back = back;
}//end of basicCard constructor

function ClozeCard(text, cloze){
  
  if(this instanceof ClozeCard){
    this.text = text;//returns partial text
    this.cloze = cloze;//returns full text
  }
  else {
    return new ClozeCard(text, cloze);
  }
}//end of clozeCard constructor


var firstCard = new Basicard('Who was the first president of the United States', 'George Washington');
var secondCard = new Basicard('Who is the cutest cat in the world?', 'Monroe!');


ClozeCard.prototype.partial = function(){
 
  if(this.text.includes(this.cloze)){
     return this.text.replace(this.cloze, '...');
  }
  else{
    return "Sorry this does not exits!";
  }
}


var firstCloze = ClozeCard('George Washington is the first president of the United States', 'George Washington');
var secondCloze = ClozeCard('George Washington is the first president of the United States', 'George Washington');