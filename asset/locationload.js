window.onload = function(){
  // sawyer
  var sawyer = new Location();

  var fall = new Time(9,11);
  fall.setDays([8,[2,30]],[8,[2,30]],[8,[2,30]],[8,[2,30]],[8,[2,30]],[8,[2,30]],[9,[22,00]]);
  var spring = new Time(1,5);
  spring.setDays([8,[2,30]],[8,[2,30]],[8,[2,30]],[8,[2,30]],[8,[2,30]],[8,[2,30]],[9,[22,00]]);
  var summer = new Time(6,8);

  sawyer.update('Sawyer', [fall,spring,summer], 'studying', false);
};