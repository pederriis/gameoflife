class colorTools{
    


   static makeRandomColor() {
    var randomColor;
  
    randomColor = {
      red: floor(random() * 255),
      green: floor(random() * 255),
      blue: floor(random() * 255),
    };
    return randomColor;
  }
}