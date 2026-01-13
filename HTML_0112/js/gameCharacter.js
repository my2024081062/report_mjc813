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
      cls: $("#cls").val(),
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

  checkInputValueIsError(forInsert) {
    if (forInsert === `forInsert` && this.#characters.some((character) => {
      return character.id * 1 === $("#id").val() * 1
    })) {
      alert(`아이디가 중복되었습니다`);
      return true;
    }
    if ($("#name").val().length < 2 || $("#name").val().length > 10) {
      alert(`이름은 2글자 이상 10글자 미만으로 해주세요`);
      $("#name").focus();
      return true;
    }
    const statements = ["str", "int", "dex", "lux"];
    for (const statement of statements) {
      if ($(`#${statement}`).val() < 0 || $(`#${statement}`).val() > 200) {
        alert(`${statement}를 0이상 200이하로 설정해주세요.`);
        $(`#${statement}`).focus();
        return true;
      }
    }
  }

  insertGameCharacter() {
    //조건문 검사
    if (this.checkInputValueIsError(`forInsert`)) return;
    //게임 캐릭터 생성해서 배열에 푸쉬
    let newCharacter = this.createGameCharacter(`forInsert`);
    this.#characters.push(newCharacter);
    this.clearInput();
  }

  updateGameCharacter() {
    //조건문 검사
    if (this.checkInputValueIsError(``)) return;
    //아이디 검색해서 일치하는 배열의 객체를 수정함
    let updateCharacter = this.createGameCharacter(`forUpdate`);
    let findIndex = this.findCharacterIndex($("#id").val());
    if (findIndex === -1)
      return;
    else this.#characters = this.#characters.with(findIndex, updateCharacter);
    this.clearInput();
  }

  deleteGameCharacter() {
    //조건문 검사 필요없음
    //아이디 검색해서 일치하는 배열의 객체를 삭제
    let findIndex = this.findCharacterIndex($("#id").val());
    if (findIndex === -1)
      return;
    else this.#characters.splice(findIndex, 1);
    this.clearInput();
  }

  changeCls(cls) {
    if (cls === "W")
      return "전사";
    if (cls === "M")
      return "마법사";
    if (cls === "A")
      return "궁수";
    if (cls === "T")
      return "도적";
  }

  changeSx(sx) {
    if (sx === "M")
      return "남자";
    if (sx === "F")
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

  printListHtml() {
    $(".listDataBlock").empty();
    for (let character of this.#characters) {
      $(".listDataBlock").append(this.showCharacters(character));
    }
  }

  printListAttack(id) {
    $("#attStrTarget").empty();
    $("#attStrTarget").append(`<option value = "0">선택하세요</option>`);
    $("#attIntTarget").empty();
    $("#attIntTarget").append(`<option value = "0">선택하세요</option>`);

    for (let character of this.#characters) {
      if (character.id * 1 === id * 1) continue;
      $("#attStrTarget").append(`<option value = "${character.id}">${character.name}</option>`);
      $("#attIntTarget").append(`<option value = "${character.id}">${character.name}</option>`);
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

  findCharacter(id) {
    return this.#characters.find((character) => {
      return character.id * 1 === id * 1;
    });
  }
  findCharacterIndex(id) {
    return this.#characters.findIndex((character) => {
      return character.id * 1 === id * 1;
    });
  }
  checkTargetHp(targetId, attackId){
    if (this.findCharacter(targetId).hp <= 0) {
      let findIndex = this.findCharacterIndex(targetId);
      if (findIndex === -1)
        return;
      else {
        this.#characters.splice(findIndex, 1);
        this.printListHtml();
        this.printListAttack(attackId);
      }
    }
  }

  attackStr() {
    const targetId = $("#attStrTarget").val() * 1;
    const attackId = $("#id").val() * 1;
    if (this.findCharacter(targetId) === undefined || this.findCharacter(attackId) === undefined) 
      return;
    else 
      this.findCharacter(targetId).hp -= this.findCharacter(attackId).str;
    this.checkTargetHp(targetId, attackId);
  }
  attackInt() {
    const targetId = $("#attIntTarget").val() * 1;
    const attackId = $("#id").val() * 1;
    if (this.findCharacter(targetId) === undefined || this.findCharacter(attackId) === undefined) 
      return;
    else if (this.findCharacter(attackId).mp < this.findCharacter(attackId).int) {
      alert(`남은 mp가 int보다 부족하여 공격할 수 없습니다.`);
      return;
    }
    else {
      this.findCharacter(targetId).hp -= this.findCharacter(attackId).int;
      this.findCharacter(attackId).mp -= this.findCharacter(attackId).int;
    }
    this.checkTargetHp(targetId, attackId);
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
  });

  $("#btnUpt").click(function (e) {
    e.preventDefault();
    character.updateGameCharacter();
    character.printListHtml();
    character.printListAttack();
  });

  $("#btnDel").click(function (e) {
    e.preventDefault();
    character.deleteGameCharacter();
    character.printListHtml();
    character.printListAttack();
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
