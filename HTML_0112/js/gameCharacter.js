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
  printList() { //게임 리스트를 배열에서 가져와 화면에 출력
    $("#characters").empty();
    this.#characters.sort((a, b) => a.id - b.id);
    for (let character of this.#characters) {
      $("#characters").append(this.printRow(character));
    }
  }

  printRow(character) { //화면에 출력될 배열요소를 html째로 가져옴
    let html = `
      <div class="listDataRow">
          <div class="listItem">
              <div class="itemData text-wrapper">
                  ${character.name}
              </div>
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
              <div class="itemData text-wrapper">
                  ${character.birthDate}
              </div>
          </div>
      </div>
    `;
    return html;
  }


  insertGameCharacter() { //추가
    let insertGameCharacter = this.createGameCharacter();
    $("#img").attr(`src`, `${insertGameCharacter.src}`);
    this.#characters.push(insertGameCharacter);
  }

  updateGameCharacter() { //수정
    let updateGameCharacter = this.createGameCharacter();
    let findIndex = this.#characters.findIndex((character) => {
      return character.id * 1 === updateGameCharacter.id * 1;
    })
    if (findIndex === -1)
      return;
    else
      this.#characters = this.#characters.with(findIndex, updateGameCharacter);
  }

  deleteStudent() { //삭제
    let findIndex = this.#characters.findIndex((character) => {
      return character.id * 1 === $("#id").val() * 1;
    })
    if (findIndex === -1)
      return;
    else
      this.#characters.splice(findIndex, 1);
  }

  clearInput() { //완료후 입력창 클리어
    $("#title").val('');
    $("#genre").val('');
    $("#grade").val('');
    $("#price").val('');
    $("#src").val('');
  }

  setInputData(item) { //클릭된 상품으로 입력창 초기화
    $("#title").val(`${item.title}`);
    $("#genre").val(`${item.genre}`);
    $("#grade").val(`${item.grade}`);
    $("#price").val(`${item.price}`);
    $("#src").val(`${item.src}`);
    $("#img").attr(`src`, `${item.src}`);

  }

  printItem(title) { //클릭된 상품을 배열에서 찾기
    let findItem = this.#characters.find((item) => item.title * 1 === title * 1);
    if (findItem === undefined)
      return;
    else
      this.setInputData(findItem);
  }
}

$(() => {
  let character = new gameCharacter();
  nint.print();
  $("#insert").click(function (e) {
    e.preventDefault();
    character.insertGameCharacter();
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

  $(document).on(`click`, ".character", function (e) {
    nint.printItem($(e.currentTarget).children().first().text());
  });
})