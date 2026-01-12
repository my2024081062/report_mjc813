class gameCharater {
  #name=""; #cls=""; #sx="";
  #hp=0; #mp=0;
  #str=0; #int=0; #dex=0; #lux=0;
  #birthDate="";

  constructor(name,cls,sx,hp,mp,str,int,dex,lux,birthDate){
    this.#name = name; this.#cls = cls; this.#sx = sx;
    this.#hp = hp; this.#mp=mp; 
    this.#str = str; this.#int = int; this.#dex = dex; this.#lux = lux;
    this.#birthDate = birthDate;
  }

}