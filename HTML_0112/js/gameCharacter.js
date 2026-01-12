class gameCharacter {
  static id = 2;
  #characters = [
    {
      id: 1, name: "신사임걸", cls: "마법사", sx: "여자",
      hp: 203, mp: 395,
      str: 50, int: 50, dex: 50, lux: 50,
      birthDate: "2010-01-01"
    }
  ];

  createGameCharacter(forInsert) {
    return {
      id: forInsert === `forInsert` ? gameCharacter.id++ : $("#id").val(),
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

  insertGameCharacter(){
    //조건문 검사
    
    //게임 캐릭터 생성해서 배열에 푸쉬
    let newCharacter = this.createGameCharacter(`forInsert`);
    this.#characters.push(newCharacter);
  }
  
  updateGameCharacter(){
    //조건문 검사

    //아이디 검색해서 일치하는 배열의 객체를 수정함
    let updateCharacter = this.createGameCharacter(`forUpdate`);
    let findIndex = this.#characters.findIndex((character)=>{
      return character.id *1 === $("#id").val() *1;
    });
    if (findIndex===-1)
      return;
    this.#characters.with(findIndex,updateCharacter);
  }

  deleteGameCharacter(){
    //조건문 검사

    //아이디 검색해서 일치하는 배열의 객체를 삭제
    let findIndex = this.#characters.findIndex((character)=>{
      return character.id *1 === $("#id").val() *1;
    });
    if (findIndex===-1)
      return;
    this.#characters.splice(findIndex,1);
  }

  showCharacters(character){
    return `
    <div class="listDataRow">
      <div class="listItem">
        <div class="itemData text-wrapper">${character.name}</div>
      </div>
      <div class="listItem">
        <div class="itemData text-wrapper">${character.cls}</div>
      </div>
      <div class="listItem">
        <div class="itemData text-wrapper">${character.sx}</div>
      </div>
      <div class="listItem">
        <div class="itemData text-wrapper">${character.hp}</div>
      </div>
      <div class="listItem">
        <div class="itemData text-wrapper">${character.mp}</div>
      </div>
      <div class="listItem">
        <div class="itemData text-wrapper">${character.birthDate}</div>
      </div>
    </div>
    `;
  }

  print(){
    $(".listDataBlock").empty();
    for (let character of this.#characters) {
      $(".listDataBlock").append(this.showCharaters(character));
    }
  }
}

$(() => {
  let character = new gameCharacter();
  character.print();
  $("#insert").click(function (e) {
    e.preventDefault();
    character.insertGameCharater();
    character.print();
    character.clearInput();
  });

  $("#update").click(function (e) {
    e.preventDefault();
    character.updateGameCharacter();
    character.print();
    character.clearInput();
  });

  $("#delete").click(function (e) {
    e.preventDefault();
    character.deleteGameCharacter();
    character.print();
    character.clearInput();
  });

  $(document).on(`click`, ".game", function (e) {
    nint.printItem($(e.currentTarget).children().first().text());
  });
})
