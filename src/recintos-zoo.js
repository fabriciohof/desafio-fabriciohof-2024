class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3, tamanho: 1 }] },
        { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
        { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1, tamanho: 2 }] },
        { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
        { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1, tamanho: 3 }] }
      ];
  
      this.animaisInfo = {
        LEAO: { nome: 'LEAO', tamanho: 3, biomas: ['savana'], carnivoro: true },
        LEOPARDO: { nome: 'LEOPARDO', tamanho: 2, biomas: ['savana'], carnivoro: true },
        CROCODILO: { nome: 'CROCODILO', tamanho: 3, biomas: ['rio'], carnivoro: true },
        MACACO: { nome: 'MACACO', tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
        GAZELA: { nome: 'GAZELA', tamanho: 2, biomas: ['savana'], carnivoro: false },
        HIPOPOTAMO: { nome: 'HIPOPOTAMO', tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false },
      };
    }
  
    validarEntrada(animal, quantidade) {
      if (!this.animaisInfo[animal]) {
        return { erro: 'Animal inválido' };
      }
      if (quantidade <= 0 || !Number.isInteger(quantidade)) {
        return { erro: 'Quantidade inválida' };
      }
      return null;
    }
  
    recintoViavel(recinto, animal, quantidade) {
      const infoAnimal = this.animaisInfo[animal];
  
     
      if (!infoAnimal.biomas.includes(recinto.bioma) && recinto.bioma !== 'savana e rio') {
        return false;
      }
  
      let espacoOcupado = recinto.animais.reduce((total, a) => total + (a.quantidade * this.animaisInfo[a.especie].tamanho), 0);
      
      if (recinto.animais.length > 0 && !recinto.animais.some(a => a.especie === animal)) {
        espacoOcupado++; 
      }
  
      const espacoNecessario = quantidade * infoAnimal.tamanho;
  
      if (recinto.tamanho - espacoOcupado < espacoNecessario) return false;
      if (infoAnimal.carnivoro && recinto.animais.some(a => this.animaisInfo[a.especie].carnivoro && a.especie !== animal)) return false;
      if (infoAnimal.carnivoro && recinto.animais.length > 0 && recinto.animais[0].especie !== animal) return false;
      if (animal === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio') return false;
      if (animal === 'MACACO' && quantidade === 1 && recinto.animais.length === 0) return false;
  
      return true;
    }
  
    analisaRecintos(animal, quantidade) {
  
      const erro = this.validarEntrada(animal, quantidade);
      if (erro) return erro;
  
      const recintosViaveis = this.recintos
        .filter(recinto => this.recintoViavel(recinto, animal, quantidade))
        .map(recinto => {
          let espacoOcupado = recinto.animais.reduce((total, a) => total + (a.quantidade * this.animaisInfo[a.especie].tamanho), 0);
          const espacoNecessario = quantidade * this.animaisInfo[animal].tamanho;
          let espacoLivre = recinto.tamanho - espacoOcupado - espacoNecessario;
          
          if (recinto.animais.length > 0 && !recinto.animais.some(a => a.especie === animal)) {
            espacoLivre--;
          }
  
          return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`;
        });
  
      if (recintosViaveis.length === 0) {
        return { erro: 'Não há recinto viável' };
      }
  
      return { recintosViaveis };
    }
  }
  
  export { RecintosZoo as RecintosZoo };
  
