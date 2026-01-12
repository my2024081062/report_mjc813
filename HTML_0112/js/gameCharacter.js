class gameCharacter {
  static id = 2;
  #characters = [
    {
      id: 1, name: "신사임걸", cls: "M", sx: "F",
      hp: 203, mp: 395,
      str: 50, int: 50, dex: 50, lux: 50,
      birthDate: "2010-01-01"
    }
  ];

  createGameCharacter(forInsert) {
    return {
      id: forInsert === `forInsert` ? gameCharacter.id++ : $("#id").val(),
      name: $("#name").val(),
      cls:$("#cls").val(),
      sx: $("input:radio[name=sx]:checked").val(),
      hp: $("#hp").val(),
      mp: $("#mp").val(),
      str: $("#str").val(),
      int: $("#int").val(),
      dex: $("#dex").val(),
      lux: $("#lux").val(),
      birthDate: $("#birthDate").val()
    }
  }

  insertGameCharacter() {
    //조건문 검사

    //게임 캐릭터 생성해서 배열에 푸쉬
    let newCharacter = this.createGameCharacter(`forInsert`);
    this.#characters.push(newCharacter);
  }

  updateGameCharacter() {
    //조건문 검사

    //아이디 검색해서 일치하는 배열의 객체를 수정함
    let updateCharacter = this.createGameCharacter(`forUpdate`);
    let findIndex = this.findCharacterIndex($("#id").val());
    if (findIndex === -1)
      return;
    else this.#characters = this.#characters.with(findIndex, updateCharacter);
  }

  deleteGameCharacter() {
    //조건문 검사

    //아이디 검색해서 일치하는 배열의 객체를 삭제
    let findIndex = this.findCharacterIndex($("#id").val());
    if (findIndex === -1)
      return;
    else this.#characters.splice(findIndex, 1);
  }

  changeCls(cls){
    if(cls==="W")
      return "전사";
    if(cls==="M")
      return "마법사";
    if(cls==="A")
      return "궁수";
    if(cls==="T")
      return "도적";
  }

  changeSx(sx){
    if(sx==="M")
      return "남자";
    if(sx==="F")
      return "여자";
  }

  showCharacters(character) {
    return `
    <div class="listDataRow">
      <div class="listItem">
        <div class="itemData text-wrapper">${character.name}</div>
      </div>
      <div class="listItem">
        <div class="itemData text-wrapper">${this.changeCls(character.cls)}</div>
      </div>
      <div class="listItem">
        <div class="itemData text-wrapper">${this.changeSx(character.sx)}</div>
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
      <div class="listItem" style="display:none; visibility:hidden;">
        <div class="itemData text-wrapper">${character.id}</div>
      </div>
    </div>
    `;
  }

  printListAttack(id){
    $("#attStrTarget").empty();
    $("#attStrTarget").append(`<option value = "0">선택하세요</option>`);
    $("#attIntTarget").empty();
    $("#attIntTarget").append(`<option value = "0">선택하세요</option>`);

    for (let character of this.#characters) {
      if(character.id *1 === id*1) continue;
      $("#attStrTarget").append(`<option value = "${character.id}">${character.name}</option>`);
      $("#attIntTarget").append(`<option value = "${character.id}">${character.name}</option>`);
    }
  }

  printListHtml() {
    $(".listDataBlock").empty();
    for (let character of this.#characters) {
      $(".listDataBlock").append(this.showCharacters(character));
    }
  }

  clearInput() { //완료후 입력창 클리어
    $("#id").val(0);
    $("#name").val("");
    $("#cls").val("W");
    $("#sxM").prop("checked", true);
    $("#sxF").prop("checked", false);
    $("#hp").val(1000);
    $("#mp").val(1000);
    $("#birthDate").val("2021-01-01");
    $("#str").val(0);
    $("#int").val(0);
    $("#dex").val(0);
    $("#lux").val(0);
  }

  setInputData(character) { //클릭된 상품으로 입력창 초기화
    $("#id").val(character.id);
    $("#name").val(character.name);
    $("#cls").val(character.cls);
    $(`input[name="sx"][value="${character.sx}"]`).prop("checked", true);
    $("#hp").val(character.hp);
    $("#mp").val(character.mp);
    $("#birthDate").val(character.birthDate);
    $("#str").val(character.str);
    $("#int").val(character.int);
    $("#dex").val(character.dex);
    $("#lux").val(character.lux);

    this.printListAttack(character.id);
  }
  
  printItem(id) { //클릭된 캐릭터 배열에서 찾기
    let findItem = this.#characters.find((character) => character.id * 1 === id * 1);
    if (findItem === undefined)
      return;
    else
      this.setInputData(findItem);
  }

  findCharacter(id){
    return this.#characters.find((character)=>{
      return character.id *1 === id *1;
    });
  }

  findCharacterIndex(id){
    return this.#characters.findIndex((character)=>{
      return character.id *1 === id *1;
    });
  }

  attackStr(){
    if($("#attStrTarget").val()*1 === 0 || this.findCharacterIndex($("#id").val()) === -1) return;
    else this.findCharacter($("#attStrTarget").val()).hp -= this.findCharacter($("#id").val()).str;
  }

  attackInt(){
    if($("#attIntTarget").val()*1 === 0 || this.findCharacterIndex($("#id").val()) === -1) return;
    this.findCharacter($("#attIntTarget").val()).hp -= this.findCharacter($("#id").val()).int;
    this.findCharacter($("#id").val()).mp -= this.findCharacter($("#id").val()).int;
  }
}

$(() => {
  let character = new gameCharacter();
  character.printListHtml();
  character.printListAttack();
  $("#btnAdd").click(function (e) {
    e.preventDefault();
    character.insertGameCharacter();
    character.printListHtml();
    character.printListAttack();
    character.clearInput();
  });

  $("#btnUpt").click(function (e) {
    e.preventDefault();
    character.updateGameCharacter();
    character.printListHtml();
    character.printListAttack();
    character.clearInput();
  });
  $("#btnDel").click(function (e) {
    e.preventDefault();
    character.deleteGameCharacter();
    character.printListHtml();
    character.printListAttack();
    character.clearInput();
  });

  $(document).on(`click`, ".listDataRow", function (e) {
    character.printItem($(e.currentTarget).children().last().text());
  });
  
  $(document).on(`click`, "#btnAttStr", function (e) {
    character.attackStr();
    character.printListHtml();
  });

  $(document).on(`click`, "#btnAttInt", function (e) {
    character.attackInt();
    character.printListHtml();
  });
})
