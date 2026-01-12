class gameCharater {
  static id = 1;
  #charaters = [
    {
      id: NaN, name: "", cls: "", sx: "",
      hp: 0, mp: 0,
      str: 0, int: 0, dex: 0, lux: 0,
      birthDate: ""
    }
  ];

  createGameCharater(forInsert) {
    return {
      id: forInsert === `forInsert` ? gameCharater.id++ : {},
      name: $("#name").val(),
      sx: $("#sx").val(),
      hp: $("#hp").val(),
      mp: $("#mp").val(),
      str: $("#str").val(),
      int: $("#int").val(),
      dex: $("#dex").val(),
      lux: $("#lux").val(),
      birthDate: $("#birthDate").val()
    }
  }

}

$(() => {
  let charater = new gameCharater();
  nint.print();
  $("#insert").click(function (e) {
    e.preventDefault();
    charater.insertGameCharater();
    charater.print();
    charater.clearInput();
  });

  $("#update").click(function (e) {
    e.preventDefault();
    charater.updateGameCharater();
    charater.print();
    charater.clearInput();
  });

  $("#delete").click(function (e) {
    e.preventDefault();
    charater.deleteGameCharater();
    charater.print();
    charater.clearInput();
  });

  $(document).on(`click`, ".game", function (e) {
    nint.printItem($(e.currentTarget).children().first().text());
  });
})

