export default class ClientItem {
  id: string;
  nomePreferido: string;
  contatoEmail: string;
  contatoCelular: string;
  identidade: string;
  classificacaoJuridica:number;
  status: "A" | "I";

  constructor (){
    this.id = "";
    this.nomePreferido="";
    this.contatoEmail="";
    this.contatoCelular="";
    this.identidade="";
    this.classificacaoJuridica=0;
    this.status="A"
  }

}
