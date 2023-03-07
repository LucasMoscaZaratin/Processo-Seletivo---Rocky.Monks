import { readFileSync, writeFile } from "fs";

const correct=()=>{
    const dataPush=()=>{
        const data_1=readFileSync('./base de dados/broken_database_1.json', 'utf-8');
        const dados=JSON.parse(data_1);

        const data_2=readFileSync('./base de dados/broken_database_2.json', 'utf-8');
        const dados_2=JSON.parse(data_2);

        return[dados, dados_2];
    };
   
    const correct_letter=()=>{
        var wrong_latter_a=/[æ]/g;
        var wrong_latter_o=/[ø]/g;
        const [dados,dados_2]=dataPush();

        for(let i=0; i<dados.length;i++){
            let nome=dados[i].nome; 
            nome=nome.replace(wrong_latter_a, "a")
            nome=nome.replace(wrong_latter_o, "o") 
            nome=nome[0].toUpperCase()+nome.substring(1);
            dados[i].nome=nome;
        };
       
        for(let i=0; i<dados_2.length;i++){
            let marca = dados_2[i].marca; 
            marca=marca.replace(wrong_latter_a, "a")  
            marca=marca.replace(wrong_latter_o, "o") 
            marca=marca[0].toUpperCase()+marca.substring(1);
            dados_2[i].marca=marca;
            };

        for(let i=0; i<dados.length;i++){
            dados[i].vendas=parseInt(dados[i].vendas);
        };    
           
        return[dados,dados_2]; 
  
    }
     
    correct_letter();

    correct_sells();
    
    const new_database=()=>{
        const[dados, dados_2]=correct_letter();

        writeFile('./new database/correct_database_1.json',JSON.stringify(dados), (err) =>{
            if (err) throw err;
            console.log('Arquivo salvo com sucesso')
        })

        writeFile('./new database/correct_database_2.json',JSON.stringify(dados_2), (err) =>{
            if (err) throw err;
            console.log('Arquivo salvo com sucesso')    
        })
        
    };
    new_database();
 
};
correct();
