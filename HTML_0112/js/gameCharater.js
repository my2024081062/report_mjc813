class gameCharater {
  #name=""; #cls=""; #sx="";
  #hp=0; #mp=0;
  #str=0; #int=0; #dex=0; #lux=0;
  #birthDate="";

  createGameCharater(){
    this.#name = $("#name").val();
    this.#cls = $("#cls").val();
  }

}

$(() => {
  $("#insert").click(function (e) {
    e.preventDefault();
    nint.addGameCharater();
    nint.print();
    nint.clearInput();
  });

  $("#update").click(function (e) {
    e.preventDefault();
    nint.updateGameCharater();
    nint.print();
    nint.clearInput();
  });

  $("#delete").click(function (e) {
    e.preventDefault();
    nint.deleteGameCharater();
    nint.print();
    nint.clearInput();
  });
})

