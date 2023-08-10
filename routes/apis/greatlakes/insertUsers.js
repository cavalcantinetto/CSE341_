
const express = require('express');
const mongoose = require('mongoose');
const routes = express.Router();
const Users = require('../../../models/user');
const Turmas = require('../../../models/turmas')

const data = 

[
  {
    "userName": "Adriana Cristina Teixeira Monteiro",
    "userEmail": "adrianacteix@yahoo.com.br",
    "userPass": "115191752-7",
    "userLevel": 100,
    "userKids": [{'nome': 'Arthur Teixeira Monteiro', 'turma': 'Year 5'}, {'nome': 'Leonardo Teixeira Monteiro', 'turma': 'Year 5'}]
  },
  {
    "userName": "Adriano Fracchia Fonseca da Costa",
    "userEmail": "adrianofracchia@hotmail.com",
    "userPass": "122282695-1",
    "userLevel": 100,
    "userKids": [{'nome': 'Beatriz Aiko Kuwabara Fracchia da Costa', 'turma': 'JK'}, {'nome': 'Vitor Kazuo Kuwabara Fracchia da Costa', 'turma': 'Year 3'}]
  },
  {
    "userName": "Alan Farias Zandonadi",
    "userEmail": "alanfz@gmail.com",
    "userPass": "121068945-5",
    "userLevel": 100,
    "userKids": [{'nome': 'Alice Postal Farias Zandonadi', 'turma': 'Year 1'}]
  },
  {
    "userName": "Alana Gonsalez Baptista Trovello",
    "userEmail": "alana.trovello@gmail.com",
    "userPass": "122745015-1",
    "userLevel": 100,
    "userKids": [{'nome': 'Alice Baptista Trovello', 'turma': 'Nursery'}]
  },
  {
    "userName": "Alessandro Henrique Reis Siqueira",
    "userEmail": "alessandro_hrs@hotmail.com",
    "userPass": "123671861-6",
    "userLevel": 100,
    "userKids": [{'nome': 'Théo Pinho Siqueira', 'turma': 'Toddler'}]
  },
  {
    "userName": "Alexandre Rodrigues Ramos",
    "userEmail": "ramos.r.alexandre@gmail.com",
    "userPass": "114374833-5",
    "userLevel": 100,
    "userKids": [{'nome': 'Norberto Amaral Ramos', 'turma': 'Year 5'}]
  },
  {
    "userName": "Alfredo Dall'ara Neto",
    "userEmail": "netolada@hotmail.com",
    "userPass": "120306397-0",
    "userLevel": 100,
    "userKids": [{'nome': 'Lucas Alves Cursino de Moura Dall\'ara', 'turma': 'Year 2'}, {'nome': 'Maria Carolina Alves Cursino de Moura Dall\'ara', 'turma': 'Nursery'}]
  },
  {
    "userName": "Aline de Oliveira Godoy Camargo",
    "userEmail": "aline.ogodoy@hotmail.com",
    "userPass": "120109131-7",
    "userLevel": 100,
    "userKids": [{'nome': 'Benjamin de Oliveira Godoy de Camargo', 'turma': 'Year 2'}]
  },
  {
    "userName": "Amanda Abdouni",
    "userEmail": "amandaabdouni@hotmail.com",
    "userPass": "116819756-9",
    "userLevel": 100,
    "userKids": [{'nome': 'Mohamad Smaidi', 'turma': 'Year 2'}, {'nome': 'Nagib Smaidi', 'turma': 'JK'}]
  },
  {
    "userName": "Ana Carolina Brisola Brizzi",
    "userEmail": "carol.brisola.cb@gmail.com",
    "userPass": "121507323-9",
    "userLevel": 100,
    "userKids": [{'nome': 'Helena Brisola Brizzi', 'turma': 'SK'}]
  },
  {
    "userName": "Ana Carolina de Carvalho Silva Coelho Junior",
    "userEmail": "anacarolinadecarvalho@hotmail.com",
    "userPass": "121596791-3",
    "userLevel": 100,
    "userKids": [{'nome': 'Fernando de Carvalho Coelho Junior', 'turma': 'Year 4'}, {'nome': 'Júlia de Carvalho Coelho Junior', 'turma': 'JK-A'}, {'nome': 'Maria Eduarda de Carvalho Coelho Junior', 'turma': 'Year 6'}]
  },
  {
    "userName": "Ana Karina Machado Gonçalves",
    "userEmail": "anakmachado@yahoo.com.br",
    "userPass": "113999844-4",
    "userLevel": 100,
    "userKids": [{'nome': 'Matheus Machado Gonçalves', 'turma': 'Year 7'}]
  },
  {
    "userName": "Ana Laura Indiani Borges",
    "userEmail": "aninhaindiani@hotmail.com",
    "userPass": "116404210-5",
    "userLevel": 100,
    "userKids": [{'nome': 'Luísa Indiani Ferreira Pinto', 'turma': 'Year 2'}]
  },
  {
    "userName": "Ana Luiza Mello",
    "userEmail": "amello@maplebeartaubate.com.br",
    "userPass": "115127302-8",
    "userLevel": 100,
    "userKids": [{'nome': 'Rafael Gasch Mello', 'turma': 'Year 5'}]
  },
  {
    "userName": "Ana Paula Cavassana Germano",
    "userEmail": "paulagermano@uol.com.br",
    "userPass": "120577464-6",
    "userLevel": 100,
    "userKids": [{'nome': 'Pedro Cavassana Germano', 'turma': 'Year 2'}]
  },
  {
    "userName": "Ana Paula de Oliveira e Souza Conti",
    "userEmail": "ana@britoedias.adv.br",
    "userPass": "124330268-9",
    "userLevel": 100,
    "userKids": [{'nome': 'Maria Sofia de Oliveira Conti', 'turma': 'Early Toddler'}]
  },
  {
    "userName": "Anderson Ramos Mota",
    "userEmail": "armota85@gmail.com",
    "userPass": "120248199-1",
    "userLevel": 100,
    "userKids": [{'nome': 'Maria Helena Rodrigues Mota', 'turma': 'Year 1'}, {'nome': 'João Miguel Rodrigues Mota', 'turma': 'JK'}]
  },
  {
    "userName": "André Girardi Vieira",
    "userEmail": "agirardi@hotmail.com",
    "userPass": "120577609-6",
    "userLevel": 100,
    "userKids": [{'nome': 'Elisa Cavalcanti Girardi Vieira', 'turma': 'Year 4'}]
  },
  {
    "userName": "Andrea de Carvalho Pereira",
    "userEmail": "an_carvalho@hotmail.com",
    "userPass": "115903262-2",
    "userLevel": 100,
    "userKids": [{'nome': 'Aurora Pereira Amaro', 'turma': 'Year 4'}]
  },
  {
    "userName": "Andreia Codello Rebelo",
    "userEmail": "rebelodeia@yahoo.com.br",
    "userPass": "123936642-5",
    "userLevel": 100,
    "userKids": [{'nome': 'Maria Clara Rebelo de Oliveira', 'turma': 'JK-A'}]
  },
  {
    "userName": "Andreia Vieira da Silva",
    "userEmail": "andreiavieira.silva@hotmail.com",
    "userPass": "123425706-3",
    "userLevel": 100,
    "userKids": [{'nome': 'Maria Luiza Vieira Silva', 'turma': 'Toddler'}]
  },
  {
    "userName": "Audrey Stengler Pereira de Ulhôa Cintra",
    "userEmail": "audreystengler@hotmail.com",
    "userPass": "123852863-6",
    "userLevel": 100,
    "userKids": [{'nome': 'Gabriel Stengler de Ulhôa Cintra', 'turma': 'Nursery'}]
  },
  {
    "userName": "Benedito Carlos de Jesus",
    "userEmail": "carlosrepresen@hotmail.com",
    "userPass": "111975208-5",
    "userLevel": 100,
    "userKids": [{'nome': 'Mayara Malosti de Jesus', 'turma': 'Year 6'}]
  },
  {
    "userName": "Bianca Maria de Carvalho Solera Soares",
    "userEmail": "bisolera@hotmail.com",
    "userPass": "116819144-0",
    "userLevel": 100,
    "userKids": [{'nome': 'Carolina Solera Camacho', 'turma': 'Year 4'}]
  },
  {
    "userName": "Bruna Carolina Felix Gomes",
    "userEmail": "bruna.felixs@outlook.com",
    "userPass": "122559003-6",
    "userLevel": 100,
    "userKids": [{'nome': 'Vitória Morgado Felix Gomes', 'turma': 'Nursery'}]
  },
  {
    "userName": "Bruna Taques Gomes Correa",
    "userEmail": "bruna@alumni.usp.br",
    "userPass": "114926721-5",
    "userLevel": 100,
    "userKids": [{'nome': 'Alice Taques Gomes Correa', 'turma': 'Year 4'}, {'nome': 'Maya Taques Gomes Correa', 'turma': 'SK'}]
  },
  {
    "userName": "Bruno Degli Esposti",
    "userEmail": "bruno_degli@hotmail.com",
    "userPass": "121220222-3",
    "userLevel": 100,
    "userKids": [{'nome': 'Luiza Rodrigues Degli Esposti', 'turma': 'JK-A'}]
  },
  {
    "userName": "Bruno Monteiro de Alcântara Oliveira",
    "userEmail": "bmaoliveira@gmail.com",
    "userPass": "123414734-8",
    "userLevel": 100,
    "userKids": [{'nome': 'Dante Davanzo de Alcântara Oliveira', 'turma': 'Year 5'}]
  },
  {
    "userName": "Bruno Vargas Jannibelli",
    "userEmail": "jannibelli@gmail.com",
    "userPass": "122654780-1",
    "userLevel": 100,
    "userKids": [{'nome': 'Max Lara Jannibelli', 'turma': 'Nursery'}]
  },
  {
    "userName": "Camila Fernanda de Oliveira Antunes",
    "userEmail": "camilafeo@hotmail.com",
    "userPass": "114857641-1",
    "userLevel": 100,
    "userKids": [{'nome': 'Artur Oliveira Antunes', 'turma': 'Year 5'}]
  },
  {
    "userName": "Camila Gomes Castro Ferreira Veltri Rodrigues",
    "userEmail": "camilaveltri@outlook.com",
    "userPass": "112296173-x",
    "userLevel": 100,
    "userKids": [{'nome': 'Manuela Ferreira Veltri Rodrigues', 'turma': 'Year 7'}]
  },
  {
    "userName": "Carlos Alexandre Peixoto Costa",
    "userEmail": "carlexpeixoto@yahoo.com.br",
    "userPass": "123671871-9",
    "userLevel": 100,
    "userKids": [{'nome': 'Ravi Narayan Costa', 'turma': 'JK-B'}]
  },
  {
    "userName": "Carlos Augusto Mori Frade Gomes",
    "userEmail": "carlosamfgomes@gmail.com",
    "userPass": "122091044-2",
    "userLevel": 100,
    "userKids": [{'nome': 'Laura Mendonça Mori Frade Gomes', 'turma': 'SK'}]
  },
  {
    "userName": "Carlos Eduardo de Oliveira Teixeira",
    "userEmail": "dudatx@gmail.com",
    "userPass": "123852911-2",
    "userLevel": 100,
    "userKids": [{'nome': 'Lorena Pereira Teixeira', 'turma': 'Toddler'}]
  },
  {
    "userName": "Carlos Henrique de Souza Marques",
    "userEmail": "chsmarques@gmail.com",
    "userPass": "115907576-1",
    "userLevel": 100,
    "userKids": [{'nome': 'Maria Victoria Mastandrea Marques', 'turma': 'Year 4'}]
  },
  {
    "userName": "Carolina Furlan do Amaral",
    "userEmail": "amaralfcarol@gmail.com",
    "userPass": " ",
    "userLevel": 100,
    "userKids": [{'nome': 'Manuela Milani', 'turma': 'Year 5'}, {'nome': 'Valentina Milani', 'turma': 'Toddler'}]
  },
  {
    "userName": "Carolina Leal Marinho",
    "userEmail": "carol-leal@uol.com.br",
    "userPass": "121688498-5",
    "userLevel": 100,
    "userKids": [{'nome': 'Beatriz Leal Marinho', 'turma': 'SK'}]
  },
  {
    "userName": "Carolina Romero",
    "userEmail": "carolina.romero@outlook.com",
    "userPass": "124436978-0",
    "userLevel": 100,
    "userKids": [{'nome': 'Martina Mora', 'turma': 'Toddler'}]
  },
  {
    "userName": "Caroline Santa Rosa Fontanini Gomes Garcez",
    "userEmail": "carolinyfontanini@hotmail.com",
    "userPass": 12233445566,
    "userLevel": 100,
    "userKids": [{'nome': 'Raul Santa Rosa Fontanini Villela Godoy', 'turma': 'Toddler'}]
  },
  {
    "userName": "Cássia Mendes Botelho",
    "userEmail": "cassiabotelho06@hotmail.com",
    "userPass": "113974866-x",
    "userLevel": 100,
    "userKids": [{'nome': 'Arthur Mendes Botelho', 'turma': 'Year 6'}]
  },
  {
    "userName": "Cassius Alexander Elston III",
    "userEmail": "celston@slb.com",
    "userPass": "122559243-4",
    "userLevel": 100,
    "userKids": [{'nome': 'Cassius Alexander Elston IV', 'turma': 'SK'}]
  },
  {
    "userName": "Catharina Luiz Cerqueira Santos",
    "userEmail": "cathlcs@hotmail.com",
    "userPass": "122402197-6",
    "userLevel": 100,
    "userKids": [{'nome': 'Rodrigo Santos Diniz', 'turma': 'JK-B'}]
  },
  {
    "userName": "Claudia Bomfa Caldas",
    "userEmail": "claudiabomfa@gmail.com",
    "userPass": "114913488-4",
    "userLevel": 100,
    "userKids": [{'nome': 'Nicolas Bomfá Doro', 'turma': 'Year 5'}]
  },
  {
    "userName": "Claudia Mendes Lopes Silva",
    "userEmail": "claudia@industrialdovale.com.br",
    "userPass": "115363965-8",
    "userLevel": 100,
    "userKids": [{'nome': 'Gabriel Mendes Simões Pereira', 'turma': 'Year 5'}]
  },
  {
    "userName": "Cleonice S. Hermans",
    "userEmail": "cleohermans@yahoo.com.br",
    "userPass": "120331097-3",
    "userLevel": 100,
    "userKids": [{'nome': 'Luma Hermans', 'turma': 'Year 3'}]
  },
  {
    "userName": "Cristian Zeni",
    "userEmail": "cristian.zeni@gmail.com",
    "userPass": "121414018-x",
    "userLevel": 100,
    "userKids": [{'nome': 'Maria Helena Belache Zeni', 'turma': 'SK'}]
  },
  {
    "userName": "Cristiane Rosa Moreno Vieira",
    "userEmail": "crisrosamvieira@gmail.com",
    "userPass": "122935904-7",
    "userLevel": 100,
    "userKids": [{'nome': 'Augusto Vieira Gomes', 'turma': 'Nursery'}]
  },
  {
    "userName": "Cristina Destro",
    "userEmail": "c.destro@uol.com.br",
    "userPass": "116819238-9",
    "userLevel": 100,
    "userKids": [{'nome': 'Lorenzo Destro Fernandes', 'turma': 'Year 3'}, {'nome': 'Maitê Destro Fernandes', 'turma': 'Year 1'}]
  },
  {
    "userName": "Daniel Cauduro Salgado",
    "userEmail": "danimed32@yahoo.com.br",
    "userPass": "122563878-1",
    "userLevel": 100,
    "userKids": [{'nome': 'Antônio Figueiredo Cauduro Salgado', 'turma': 'JK-A'}, {'nome': 'Pedro Figueiredo Cauduro Salgado', 'turma': 'Toddler'}]
  },
  {
    "userName": "Daniela Andrade Britta",
    "userEmail": "danibritta@hotmail.com",
    "userPass": "120228006-7",
    "userLevel": 100,
    "userKids": [{'nome': 'Filipe Britta Veroneze', 'turma': 'Year 3'}]
  },
  {
    "userName": "Daniela Melo Mariano",
    "userEmail": "danielammariano@yahoo.com.br",
    "userPass": "116819136-1",
    "userLevel": 100,
    "userKids": [{'nome': 'Caio Mariano Simões', 'turma': 'Year 4'}, {'nome': 'Enzo Mariano Simões', 'turma': 'Year 5'}]
  },
  {
    "userName": "Daniela Rocha Ziroldo",
    "userEmail": "danielaziroldo@hotmail.com",
    "userPass": "123091478-X",
    "userLevel": 100,
    "userKids": [{'nome': 'Olivia Ziroldo Takao', 'turma': 'Nursery'}]
  },
  {
    "userName": "Daniele Rodrigues dos Santos",
    "userEmail": "danielerods@hotmail.com",
    "userPass": "122559052-8",
    "userLevel": 100,
    "userKids": [{'nome': 'Missarah Rodrigues Faroni', 'turma': 'Nursery'}]
  },
  {
    "userName": "Debora Aparecida Correa",
    "userEmail": "debora_acorrea@hotmail.com",
    "userPass": "120446394-3",
    "userLevel": 100,
    "userKids": [{'nome': 'Ayla Martins de Oliveira', 'turma': 'Year 3'}]
  },
  {
    "userName": "Deise Nancy de Morais",
    "userEmail": "dndemorais@gmail.com",
    "userPass": "116446743-8",
    "userLevel": 100,
    "userKids": [{'nome': 'Raul de Morais Urias', 'turma': 'Year 2'}]
  },
  {
    "userName": "Demes Rogério Muniz",
    "userEmail": "roger.tte@hotmail.com",
    "userPass": "116818997-4",
    "userLevel": 100,
    "userKids": [{'nome': 'Lavínia Santos Vasconcellos Muniz', 'turma': 'Year 4'}, {'nome': 'Rebeca Santos Vasconcellos Muniz', 'turma': 'Year 2'}]
  },
  {
    "userName": "Dênis Togoro Ferreira da Silva",
    "userEmail": "denistogoro@gmail.com",
    "userPass": "122946614-9",
    "userLevel": 100,
    "userKids": [{'nome': 'Isabela Agostinho Fermi Ferreira Togoro', 'turma': 'Nursery'}]
  },
  {
    "userName": "Denise Mrad Cabral",
    "userEmail": "demurad@gmail.com",
    "userPass": "116819272-9",
    "userLevel": 100,
    "userKids": [{'nome': 'Rayhan Massaud Mrad Cabral', 'turma': 'Year 3'}, {'nome': 'Munna Massoud Mrad Cabral', 'turma': 'SK'}]
  },
  {
    "userName": "Diego Bentiboglio Piatti",
    "userEmail": "diegopiatti@hotmail.com",
    "userPass": "121427893-0",
    "userLevel": 100,
    "userKids": [{'nome': 'Vicente Guimarães Bentiboglio', 'turma': 'Year 1'}]
  },
  {
    "userName": "Douglas Pereira de Lima",
    "userEmail": "pereira_douglas@hotmail.com",
    "userPass": "122844535-7",
    "userLevel": 100,
    "userKids": [{'nome': 'Maria Luiza Valente de Lima', 'turma': 'Toddler'}]
  },
  {
    "userName": "Edson da Silva Rodrigues",
    "userEmail": "esnrdgs@gmail.com",
    "userPass": "121197287-2",
    "userLevel": 100,
    "userKids": [{'nome': 'Alice Alcantara Rodrigues', 'turma': 'SK'}]
  },
  {
    "userName": "Eduardo de Orem Oliveira",
    "userEmail": "eduorem@gmail.com",
    "userPass": "124245325-8",
    "userLevel": 100,
    "userKids": [{'nome': 'CARLOS EDUARDO SILVA OREM', 'turma': 'Berçário'}, {'nome': 'Maria Barbosa Orem', 'turma': 'Toddler'}, {'nome': 'Tomás Barbosa Orem', 'turma': 'SK'}]
  },
  {
    "userName": "Eduardo Frota Redigolo",
    "userEmail": "eredigolo@yahoo.com.br",
    "userPass": "116402743-8",
    "userLevel": 100,
    "userKids": [{'nome': 'Luca Destre Redigolo', 'turma': 'Year 3'}]
  },
  {
    "userName": "Eliane dos Santos Alves",
    "userEmail": "es_alves@yahoo.com.br",
    "userPass": "122874200-5",
    "userLevel": 100,
    "userKids": [{'nome': 'Gabriel Alves Ikeda', 'turma': 'JK'}, {'nome': 'Sofia Alves Ikeda', 'turma': 'Year 4'}]
  },
  {
    "userName": "Eliane Nicollielo Derrico",
    "userEmail": "elianederrico@yahoo.com.br",
    "userPass": "122095156-0",
    "userLevel": 100,
    "userKids": [{'nome': 'Matteo Nicoliello Derrico Brito de Souza', 'turma': 'JK-B'}]
  },
  {
    "userName": "Eliane Yuri Murao",
    "userEmail": "elianemurao@hotmail.com",
    "userPass": "121066410-0",
    "userLevel": 100,
    "userKids": [{'nome': 'Daniel Murao Gentil Leite', 'turma': 'Year 2'}]
  },
  {
    "userName": "Elisa Emmerick",
    "userEmail": "elisaemmerick@gmail.com",
    "userPass": "121595536-4",
    "userLevel": 100,
    "userKids": [{'nome': 'Lis Emmerick Vieira', 'turma': 'Year 1'}]
  },
  {
    "userName": "Eloisa Couto Taube Delfim",
    "userEmail": "eloisataube93@gmail.com",
    "userPass": "122109245-5",
    "userLevel": 100,
    "userKids": [{'nome': 'Lucca Taube Delfim', 'turma': 'JK'}]
  },
  {
    "userName": "Erika Ravazzi Ramos Coli",
    "userEmail": "erikaravazzi@yahoo.com.br",
    "userPass": "122360248-5",
    "userLevel": 100,
    "userKids": [{'nome': 'Rafaela Ravazzi Ramos Godinho Coli', 'turma': 'JK'}]
  },
  {
    "userName": "Fabiola Ramos de Freitas Padilha",
    "userEmail": "fabiolafreitas21@hotmail.com",
    "userPass": "123851988-x",
    "userLevel": 100,
    "userKids": [{'nome': 'Sophie Freitas Padilha', 'turma': 'JK'}]
  },
  {
    "userName": "Fabiola Tamires dos Reis Plachta",
    "userEmail": "fabiolaplachta.personal@gmail.com",
    "userPass": "115703975-3",
    "userLevel": 100,
    "userKids": [{'nome': 'Theo Plachta', 'turma': 'Year 2'}, {'nome': 'Isabella Plachta', 'turma': 'JK'}]
  },
  {
    "userName": "Fausto Cruz",
    "userEmail": "cruz.fausto@hotmail.com",
    "userPass": "123021345-4",
    "userLevel": 100,
    "userKids": [{'nome': 'Mateus Yunes Dias Cruz', 'turma': 'Toddler'}]
  },
  {
    "userName": "Felipe da Motta Barichello",
    "userEmail": "felipebarrichello@ig.com.br",
    "userPass": "123425347-1",
    "userLevel": 100,
    "userKids": [{'nome': 'Antonio Flores de Souza Barichello', 'turma': 'Nursery'}, {'nome': 'Benicio Flores de Souza Barichello', 'turma': 'Year 2'}]
  },
  {
    "userName": "Fernanda Calixto Brandão Costa",
    "userEmail": "nanda_cbrandao@yahoo.com.br",
    "userPass": "128334455-6",
    "userLevel": 100,
    "userKids": [{'nome': 'Felipe Brandão Zeraick da Costa', 'turma': 'Early Toddler'}, {'nome': 'Lucas Brandão Zeraick da Costa', 'turma': 'JK-A'}, {'nome': 'Paulo Brandão Zeraick da Costa', 'turma': 'Year 1'}]
  },
  {
    "userName": "Fernanda Cunha Fernandes",
    "userEmail": "Fernanda.cunha@embraer.com.br",
    "userPass": "113152963-7",
    "userLevel": 100,
    "userKids": [{'nome': 'Emanuelah Cunha Fernandes', 'turma': 'Year 6'}, {'nome': 'Theo Cunha Fernandes', 'turma': 'Nursery'}]
  },
  {
    "userName": "Fernanda Farah Loureiro Ardito",
    "userEmail": "fernandafarahloureiro@yahoo.com.br",
    "userPass": "123425589-3",
    "userLevel": 100,
    "userKids": [{'nome': 'Filippo Ardito', 'turma': 'Nursery'}, {'nome': 'Vito Ardito Filho', 'turma': 'Year 2'}]
  },
  {
    "userName": "Flávia Soares Amantéa Costa",
    "userEmail": "flavia@efeitodesign.net",
    "userPass": "116458019-x",
    "userLevel": 100,
    "userKids": [{'nome': 'Theo Amantéa Costa', 'turma': 'Year 2'}]
  },
  {
    "userName": "Flávio Eduardo Pinheiro",
    "userEmail": "flavio@claris.odo.br",
    "userPass": "115630801-x",
    "userLevel": 100,
    "userKids": [{'nome': 'Nicole de Moura Santos Pinheiro', 'turma': 'Year 4'}, {'nome': 'Sophia de Moura Santos Pinheiro', 'turma': 'Year 5'}]
  },
  {
    "userName": "Francisco Bento Pereira",
    "userEmail": "chico-bala@hotmail.com",
    "userPass": "120485971-1",
    "userLevel": 100,
    "userKids": [{'nome': 'Jhonny Rocha da Silva Pereira', 'turma': 'Year 3'}]
  },
  {
    "userName": "Gabriel Akio Shimoda",
    "userEmail": "gshimoda@hotmail.com",
    "userPass": "120253544-6",
    "userLevel": 100,
    "userKids": [{'nome': 'Elena Yoko Cortez Shimoda', 'turma': 'Year 2'}, {'nome': 'Elis Yumi Cortez Shimoda', 'turma': 'JK-A'}]
  },
  {
    "userName": "Gabriela da Silva Oliveira Heliotropio de Matos",
    "userEmail": "profa.gabriela@hotmail.com",
    "userPass": "123563973-3",
    "userLevel": 100,
    "userKids": [{'nome': 'Clara Oliveira Heliotrópio de Matos', 'turma': 'Early Toddler'}, {'nome': 'Victor Oliveira Heliotropio de Matos', 'turma': 'JK-B'}]
  },
  {
    "userName": "Gabriela de Araújo Fernandes",
    "userEmail": "gabriella_fernandes08@hotmail.com",
    "userPass": "122737906-7",
    "userLevel": 100,
    "userKids": [{'nome': 'Antônio Fernandes Santos', 'turma': 'JK-B'}]
  },
  {
    "userName": "Gabriela Guadalajara G Fernandes",
    "userEmail": "gabriela_guadalajara@hotmail.com",
    "userPass": "122717140-7",
    "userLevel": 100,
    "userKids": [{'nome': 'Pedro Paulo Guadalajara Valeriani', 'turma': 'JK-A'}, {'nome': 'Valentina Guadalajara Valeriani', 'turma': 'Year 2'}]
  },
  {
    "userName": "Gabriela Padua Vicentini Chacon",
    "userEmail": "gabriela@grupogtv.com",
    "userPass": "122090501-X",
    "userLevel": 100,
    "userKids": [{'nome': 'Isabella Vicentini Chacon', 'turma': 'SK'}, {'nome': 'Laura Vicentini Chacon', 'turma': 'Nursery'}]
  },
  {
    "userName": "Gerson Fabre Marção",
    "userEmail": "fabregerson@gmail.com",
    "userPass": "113970292-0",
    "userLevel": 100,
    "userKids": [{'nome': 'Angelina Borges Marção', 'turma': 'Year 6'}]
  },
  {
    "userName": "GIMENES DOS REIS GOMES",
    "userEmail": "gimenesrg@gmail.com",
    "userPass": "122597784-8",
    "userLevel": 100,
    "userKids": [{'nome': 'Eleonora Reis da Paz', 'turma': 'Nursery'}, {'nome': 'Theodora Reis Da Paz', 'turma': 'Year 1'}]
  },
  {
    "userName": "Giovana Manfro Rorato",
    "userEmail": "gmrorato@gmail.com",
    "userPass": "122094876-7",
    "userLevel": 100,
    "userKids": [{'nome': 'Nicolas Rorato do Espírito Santo', 'turma': 'JK-B'}]
  },
  {
    "userName": "Gisele Moreira Beraldo de Toledo",
    "userEmail": "gijaberaldo@hotmail.com",
    "userPass": "122898025-1",
    "userLevel": 100,
    "userKids": [{'nome': 'Bernardo Beraldo de Toledo', 'turma': 'SK'}]
  },
  {
    "userName": "Giuliano Pennacchi Moreira",
    "userEmail": "giulianopm@uol.com.br",
    "userPass": "121569796-x",
    "userLevel": 100,
    "userKids": [{'nome': 'Gustavo Bueno Moreira', 'turma': 'SK'}, {'nome': 'Luisa Bueno Moreira', 'turma': 'Year 5'}, {'nome': 'Thais Bueno Moreira', 'turma': 'Year 5'}]
  },
  {
    "userName": "Graciane Yara Marques Moreira",
    "userEmail": "dsnapec@gmail.com",
    "userPass": 123456754,
    "userLevel": 100,
    "userKids": [{'nome': 'Zoe Marques Moreira', 'turma': 'Toddler'}]
  },
  {
    "userName": "Guilherme Martins de Andrade Bendini",
    "userEmail": "guilherme.bendini@gmail.com",
    "userPass": "122091868-4",
    "userLevel": 100,
    "userKids": [{'nome': 'Arthur Peixoto Martins Bendini', 'turma': 'JK-B'}, {'nome': 'Valentina Peixoto Martins Bendini', 'turma': 'Toddler'}]
  },
  {
    "userName": "Gustavo Paixão Macedo",
    "userEmail": "gustavo.macedo@volkswagen.com.br",
    "userPass": "111971044-3",
    "userLevel": 100,
    "userKids": [{'nome': 'Marcela Campello Macedo', 'turma': 'Year 7'}]
  },
  {
    "userName": "Gustavo Tallia Loducca",
    "userEmail": "gustavo.tallia@gmail.com",
    "userPass": "116770320-0",
    "userLevel": 100,
    "userKids": [{'nome': 'Bento Beltrão Loducca', 'turma': 'Year 2'}, {'nome': 'Martin Beltrão Loducca', 'turma': 'JK-A'}]
  },
  {
    "userName": "Hevandro Vaz Ricardo",
    "userEmail": "hevandrovaz@yahoo.com.br",
    "userPass": "122094727-1",
    "userLevel": 100,
    "userKids": [{'nome': 'Laura Muratori Ricardo', 'turma': 'JK-B'}]
  },
  {
    "userName": "Hubert Ngakam Monthe",
    "userEmail": "monthehubert@yahoo.fr",
    "userPass": "122352642-2",
    "userLevel": 100,
    "userKids": [{'nome': 'Noha Gabriel Yendé Monthe', 'turma': 'Year 1'}]
  },
  {
    "userName": "Isabela de Bona",
    "userEmail": "Isabela.bonna@bol.com.br",
    "userPass": "120306840-2",
    "userLevel": 100,
    "userKids": [{'nome': 'Luiza de Bona Gauch', 'turma': 'Year 2'}]
  },
  {
    "userName": "Jacqueline Ferreira da Cruz",
    "userEmail": "jacque-cruz@hotmail.com",
    "userPass": "120429087-8",
    "userLevel": 100,
    "userKids": [{'nome': 'Maria Flor Baptista da Cruz', 'turma': 'Year 2'}]
  },
  {
    "userName": "Janaina de Souza Monteiro Miranda",
    "userEmail": "janamonteiro@hotmail.com",
    "userPass": "121075800-3",
    "userLevel": 100,
    "userKids": [{'nome': 'Miguel Monteiro de Miranda', 'turma': 'Year 6'}]
  },
  {
    "userName": "Jéssica de Oliveira Barreto",
    "userEmail": "jessikkaoliveira20@gmail.com",
    "userPass": "122786999-x",
    "userLevel": 100,
    "userKids": [{'nome': 'Ísis Cardoso Fernandes de Oliveira', 'turma': 'Nursery'}]
  },
  {
    "userName": "Jéssyca Negrini Sene",
    "userEmail": "jessica.sene@gmail.com",
    "userPass": "122672921-6",
    "userLevel": 100,
    "userKids": [{'nome': 'Valentina Negrini Biase', 'turma': 'Year 1'}]
  },
  {
    "userName": "João Marcelo Faro Pereira Leite",
    "userEmail": "marcelo-faro@hotmail.com",
    "userPass": "123852871-5",
    "userLevel": 100,
    "userKids": [{'nome': 'Leonardo Morais Montemor Faro', 'turma': 'Toddler'}]
  },
  {
    "userName": "Jose Elias Cavalcanti Netto",
    "userEmail": "cavalcantinetto@hotmail.com",
    "userPass": "115030195-8",
    "userLevel": 100,
    "userKids": [{'nome': 'Eduardo Siqueira Cavalcanti', 'turma': 'Year 5'}, {'nome': 'Gabriel Siqueira Cavalcanti', 'turma': 'SK'}]
  },
  {
    "userName": "José Humberto Cintra de Souza",
    "userEmail": "cadhumberto@gmail.com",
    "userPass": "121068550-4",
    "userLevel": 100,
    "userKids": [{'nome': 'Lauren Costa de Souza', 'turma': 'Year 1'}]
  },
  {
    "userName": "José Vitor dos Santos Bispado Junior",
    "userEmail": "vitor@xslice.com.br",
    "userPass": "122885999-1",
    "userLevel": 100,
    "userKids": [{'nome': 'Manuela Gaeta dos Reis Bispado', 'turma': 'Nursery'}, {'nome': 'Valentina Gaeta dos Reis Bispado', 'turma': 'Year 4'}]
  },
  {
    "userName": "Joseli Senra de Oliveira Delamico",
    "userEmail": "josysenra@yahoo.com.br",
    "userPass": "122881643-8",
    "userLevel": 100,
    "userKids": [{'nome': 'Ana Laura Senra Delamico', 'turma': 'JK-B'}, {'nome': 'Miguel Senra Delamico', 'turma': 'Year 1'}]
  },
  {
    "userName": "Juliana Holanda da Silva Veloso de Oliveira",
    "userEmail": "juholandasilva@gmail.com",
    "userPass": "122280770-1",
    "userLevel": 100,
    "userKids": [{'nome': 'Luíza Holanda da Silva Veloso de Oliveira', 'turma': 'SK'}]
  },
  {
    "userName": "Juliana Moreira Moscardini",
    "userEmail": "juliana.moscardini@gmail.com",
    "userPass": "115668420-1",
    "userLevel": 100,
    "userKids": [{'nome': 'Luisa Moscardini Figueira', 'turma': 'Year 3'}, {'nome': 'Samuel Moscardini Figueira', 'turma': 'Year 1'}]
  },
  {
    "userName": "Juliana Santos Baptista",
    "userEmail": "juli.batiata@gmail.com",
    "userPass": "115754477-0",
    "userLevel": 100,
    "userKids": [{'nome': 'Sara Giacomazzi', 'turma': 'Year 5'}]
  },
  {
    "userName": "Julio Lerario Neto",
    "userEmail": "julio@oggisorvetes.com.br",
    "userPass": "122876875-4",
    "userLevel": 100,
    "userKids": [{'nome': 'Sergio Mauad Lerario', 'turma': 'JK'}]
  },
  {
    "userName": "Kaline Jessiane Gomes Padilha",
    "userEmail": "kalinejgpadilha@gmail.com",
    "userPass": "116816966-5",
    "userLevel": 100,
    "userKids": [{'nome': 'Miguel Gomes Padilha', 'turma': 'Year 5'}, {'nome': 'Mariah Gomes Padilha', 'turma': 'JK-A'}]
  },
  {
    "userName": "Karime Barboza Ferreira",
    "userEmail": "karime.barboza@gmail.com",
    "userPass": "123713492-4",
    "userLevel": 100,
    "userKids": [{'nome': 'Davi Barboza Ferreira', 'turma': 'JK-B'}]
  },
  {
    "userName": "Kelly Cristina de Castro Soares Bernardo",
    "userEmail": "kellybernardo971@gmail.com",
    "userPass": "114266558-6",
    "userLevel": 100,
    "userKids": [{'nome': 'Larissa de Castro Soares Bernardo', 'turma': 'Year 6'}]
  },
  {
    "userName": "Kleice Regiane Macedo de Assis Araújo",
    "userEmail": "kleiceassis@gmail.com",
    "userPass": "112946112-9",
    "userLevel": 100,
    "userKids": [{'nome': 'Matheus Assis Araújo', 'turma': 'Year 7'}]
  },
  {
    "userName": "Larissa Whately Paiva",
    "userEmail": "lawhately@gmail.com",
    "userPass": "123944023-6",
    "userLevel": 100,
    "userKids": [{'nome': 'Luísa Silva dos Santos', 'turma': 'Toddler'}]
  },
  {
    "userName": "Laura Liz Vanset Giacomet",
    "userEmail": "lauralizzz@hotmail.com",
    "userPass": "121478427-6",
    "userLevel": 100,
    "userKids": [{'nome': 'Bianca Vanset Giacomet', 'turma': 'SK'}]
  },
  {
    "userName": "Leandro Augusto Alves",
    "userEmail": "leandroaugustoalves@yahoo.com.br",
    "userPass": "122888695-7",
    "userLevel": 100,
    "userKids": [{'nome': 'Anne Nardy Alves', 'turma': 'Toddler'}, {'nome': 'Bernardo Nardy Alves', 'turma': 'Year 1'}]
  },
  {
    "userName": "Leandro Marcos Ferrari de Almeida",
    "userEmail": "psicologoleandroferrari@hotmail.com",
    "userPass": "122880026-1",
    "userLevel": 100,
    "userKids": [{'nome': 'Rafael Cossermelli Ferrari de Almeida', 'turma': 'SK'}]
  },
  {
    "userName": "Leonardo Martin",
    "userEmail": "leomartin09@gmail.com",
    "userPass": "116573217-8",
    "userLevel": 100,
    "userKids": [{'nome': 'Nicolas Duarte Martin', 'turma': 'Year 1'}]
  },
  {
    "userName": "Leonel Viotti Dias da Silva",
    "userEmail": "leoviotti@leoviotti.com",
    "userPass": "122835198-3",
    "userLevel": 100,
    "userKids": [{'nome': 'Ana Sofia Tan Viotti', 'turma': 'Year 2'}]
  },
  {
    "userName": "Lícia Vieira Santos Gersely",
    "userEmail": "liciapvs86@gmail.com",
    "userPass": "122874124-4",
    "userLevel": 100,
    "userKids": [{'nome': 'Caio Pereira Vieira Gersely', 'turma': 'Nursery'}, {'nome': 'Manuela Pereira Vieira Gersely', 'turma': 'JK'}]
  },
  {
    "userName": "Lívia Lopes de Oliveira",
    "userEmail": "livialopes55@gmail.com",
    "userPass": "121691742-5",
    "userLevel": 100,
    "userKids": [{'nome': 'Manuella Lopes de Arruda', 'turma': 'JK-B'}]
  },
  {
    "userName": "Lizzie Isaura Contreras Rivadeneyra",
    "userEmail": "lizzie_cr89@hotmail.com",
    "userPass": "124251554-9",
    "userLevel": 100,
    "userKids": [{'nome': 'Ailin Versiani Scott Rivadeneyra', 'turma': 'Year 1'}]
  },
  {
    "userName": "Luandra Carolina Pimenta Pioli",
    "userEmail": "luandrapimenta@hotmail.com",
    "userPass": "123423002-1",
    "userLevel": 100,
    "userKids": [{'nome': 'Felipe Pimenta Pioli', 'turma': 'Nursery'}, {'nome': 'Marcelo Pimenta Pioli', 'turma': 'Year 4'}]
  },
  {
    "userName": "Lucas Vasconcelos Nunes de Oliveira",
    "userEmail": "lucasvasconcelos16@hotmail.com",
    "userPass": "121563395-6",
    "userLevel": 100,
    "userKids": [{'nome': 'Antônio Bonani Leite Vasconcelos', 'turma': 'JK-B'}]
  },
  {
    "userName": "Luciane Ogata Perrenoud",
    "userEmail": "lucianeogata@yahoo.com.br",
    "userPass": "121066623-6",
    "userLevel": 100,
    "userKids": [{'nome': 'Clara Ogata Perrenoud', 'turma': 'Year 2'}, {'nome': 'Lis Ogata Perrenoud', 'turma': 'Year 5'}]
  },
  {
    "userName": "Luciano Marques",
    "userEmail": "luciano@aromax.com.br",
    "userPass": "120248497-9",
    "userLevel": 100,
    "userKids": [{'nome': 'Laura Costa Marques', 'turma': 'Year 1'}, {'nome': 'Miguel Costa Marques', 'turma': 'JK-A'}]
  },
  {
    "userName": "Lúcio Flávio Brito Ribeiro",
    "userEmail": "luciobribeiro@gmail.com",
    "userPass": "120437645-1",
    "userLevel": 100,
    "userKids": [{'nome': 'Davi Lucchiari Ribeiro', 'turma': 'Year 1'}]
  },
  {
    "userName": "Luis Carlos Viana do Carmo Junior",
    "userEmail": "vianaicm@yahoo.com.br",
    "userPass": "122938534-4",
    "userLevel": 100,
    "userKids": [{'nome': 'Clarice Tagliatti Viana', 'turma': 'Nursery'}]
  },
  {
    "userName": "Luiz Augusto Valério",
    "userEmail": "aguvalerio@me.com",
    "userPass": "113976824-4",
    "userLevel": 100,
    "userKids": [{'nome': 'Luiz Gustavo Cotrim Valério', 'turma': 'Year 5'}]
  },
  {
    "userName": "Luiz Barroso de Brito",
    "userEmail": "luiz@britoedias.adv.br",
    "userPass": "113881509-3",
    "userLevel": 100,
    "userKids": [{'nome': 'Felipe Rocha de Brito', 'turma': 'Year 6'}, {'nome': 'Luiza Rocha de Brito', 'turma': 'Year 1'}]
  },
  {
    "userName": "Luiz Claudio Lotufo Aguiar",
    "userEmail": "luizlotufo17@gmail.com",
    "userPass": "114874377-7",
    "userLevel": 100,
    "userKids": [{'nome': 'Victor Augusto Tupinambá Aguiar', 'turma': 'Year 5'}]
  },
  {
    "userName": "Luiz Eduardo Yamada",
    "userEmail": "eduyamada@yahoo.com.br",
    "userPass": "116823060-3",
    "userLevel": 100,
    "userKids": [{'nome': 'Augusto Hirokazu Yamada', 'turma': 'Year 1'}, {'nome': 'Heloisa Yumi  Yamada', 'turma': 'SK'}]
  },
  {
    "userName": "Luiz Guilherme Fenício Antonino",
    "userEmail": "gui.antonino18@gmail.com",
    "userPass": "120408218-2",
    "userLevel": 100,
    "userKids": [{'nome': 'Mariana Camargo Antonino', 'turma': 'Year 2'}]
  },
  {
    "userName": "Luiz Gustavo de Moraes Candido",
    "userEmail": "lgm_candido@yahoo.com.br",
    "userPass": "120248907-2",
    "userLevel": 100,
    "userKids": [{'nome': 'Matheus Mendes Candido', 'turma': 'Year 3'}]
  },
  {
    "userName": "Luiz Henrique Gomes Pereira",
    "userEmail": "lhgpereira@gmail.com",
    "userPass": "124259868-6",
    "userLevel": 100,
    "userKids": [{'nome': 'Letícia Lampert Pereira', 'turma': 'Nursery'}]
  },
  {
    "userName": "Luiz Paulo Nogueira Santos",
    "userEmail": "luizpaulo_nsantos@hotmail.com",
    "userPass": "122801252-0",
    "userLevel": 100,
    "userKids": [{'nome': 'Heloísa Lopes Nogueira', 'turma': 'Year 1'}]
  },
  {
    "userName": "Luiz Ricardo Mafetano",
    "userEmail": "lrmafetano@hotmail.com",
    "userPass": "116402615-x",
    "userLevel": 100,
    "userKids": [{'nome': 'Lara Lauria Mafetano', 'turma': 'Year 3'}, {'nome': 'Sofia Lauria Mafetano', 'turma': 'Year 7'}]
  },
  {
    "userName": "Luiza Chaves dos Santos",
    "userEmail": "lu_chaves@hotmail.com",
    "userPass": "121276256-3",
    "userLevel": 100,
    "userKids": [{'nome': 'Antonella Chaves dos Santos Hamzagic Mendes', 'turma': 'SK'}]
  },
  {
    "userName": "Marcela Chiste Bueno Pinto",
    "userEmail": "marcelachiste@gmail.com",
    "userPass": "114931711-5",
    "userLevel": 100,
    "userKids": [{'nome': 'Marina Chiste Silva', 'turma': 'Year 4'}]
  },
  {
    "userName": "Marcela Damasceno Tolentino",
    "userEmail": "mar_dam@hotmail.com",
    "userPass": "116390461-2",
    "userLevel": 100,
    "userKids": [{'nome': 'Beatriz Damasceno Tolentino', 'turma': 'Year 3'}, {'nome': 'Alicia Damasceno Tolentino', 'turma': 'Year 6'}]
  },
  {
    "userName": "Marcela Gama de Freitas",
    "userEmail": "marcela_597@hotmail.com",
    "userPass": "116496386-7",
    "userLevel": 100,
    "userKids": [{'nome': 'Maria Carolina Freitas Villaça', 'turma': 'Year 2'}]
  },
  {
    "userName": "Marcelo Abramoff Continentino",
    "userEmail": "marabra@outlook.com",
    "userPass": "120981289-7",
    "userLevel": 100,
    "userKids": [{'nome': 'David Abramoff Continentino', 'turma': 'SK'}]
  },
  {
    "userName": "Marcelo Reno da Cruz",
    "userEmail": "reno_marcelo@yahoo.com.br",
    "userPass": "120248349-5",
    "userLevel": 100,
    "userKids": [{'nome': 'Nicolas Coutinho Reno Cassia Cruz', 'turma': 'Year 1'}]
  },
  {
    "userName": "Marcos Aurélio Nogarotto",
    "userEmail": "aurelionogarotto@gmail.com",
    "userPass": "114992816-5",
    "userLevel": 100,
    "userKids": [{'nome': 'Nycole Martins Nogarotto', 'turma': 'Year 4'}]
  },
  {
    "userName": "Marcos Campos de Sá Rodrigues",
    "userEmail": "marcos@kikoautos.com",
    "userPass": "122719454-7",
    "userLevel": 100,
    "userKids": [{'nome': 'Isabela Pessoa Campos Rodrigues', 'turma': 'JK-A'}, {'nome': 'Manuela Pessoa Campos Rodrigues', 'turma': 'Year 2'}]
  },
  {
    "userName": "Marcos Paulo de Sousa",
    "userEmail": "marcos.pauloict@gmail.com",
    "userPass": "123423378-2",
    "userLevel": 100,
    "userKids": [{'nome': 'João Pedro de Miranda Sousa', 'turma': 'Nursery'}]
  },
  {
    "userName": "Marcos Rogerio Setta",
    "userEmail": "sellamercante@yahoo.com.br",
    "userPass": "116819389-8",
    "userLevel": 100,
    "userKids": [{'nome': 'Eva da Mata Sella', 'turma': 'Year 3'}]
  },
  {
    "userName": "Maria Carolina Domingos Cardoso Franco",
    "userEmail": "carolinadomingos@msn.com",
    "userPass": "116770303-0",
    "userLevel": 100,
    "userKids": [{'nome': 'João Otávio Domingos Camargo Franco', 'turma': 'Year 1'}]
  },
  {
    "userName": "Maria Celeste dos Santos Gomes",
    "userEmail": "celestedossantosgomesmaria@gmail.com",
    "userPass": "115859357-0",
    "userLevel": 100,
    "userKids": [{'nome': 'Sophia de Paula Gomes', 'turma': 'Year 3'}]
  },
  {
    "userName": "Maria Eduarda Santos da Silva",
    "userEmail": "dudaaferreira_@outlook.com",
    "userPass": "122558980-0",
    "userLevel": 100,
    "userKids": [{'nome': 'Mariah Ferreira Presoti', 'turma': 'Nursery'}]
  },
  {
    "userName": "Maria Fernanda Canavezi de Paiva",
    "userEmail": "mfernanda.canavezi@gmail.com",
    "userPass": "116701220-3",
    "userLevel": 100,
    "userKids": [{'nome': 'Lorena Canavezi Moura', 'turma': 'Year 1'}, {'nome': 'Thomaz Canavezi Moura', 'turma': 'Year 4'}]
  },
  {
    "userName": "Maria Fernanda Polimena Franco",
    "userEmail": "mfernanda_22@hotmail.com",
    "userPass": "123423337-X",
    "userLevel": 100,
    "userKids": [{'nome': 'João Pedro Polimêno Franco', 'turma': 'Nursery'}, {'nome': 'Maria Clara Polimeno Franco', 'turma': 'Year 2'}]
  },
  {
    "userName": "Maria Norbis",
    "userEmail": "merynorbis@hotmail.com",
    "userPass": "112235634-5",
    "userLevel": 100,
    "userKids": [{'nome': 'Sofia Norbis Alencar', 'turma': 'Early Toddler'}, {'nome': 'Pedro Norbis Alencar', 'turma': 'SK'}]
  },
  {
    "userName": "Maria Sylvia Bortoleto Higuchi",
    "userEmail": "mariasylviab@terra.com.br",
    "userPass": "115893976-0",
    "userLevel": 100,
    "userKids": [{'nome': 'Maria Clara Bortoleto Higuchi', 'turma': 'Year 3'}, {'nome': 'Maria Julia Bortoleto Higuchi', 'turma': 'Year 6'}]
  },
  {
    "userName": "Maria Vanilda dos Santos Luna",
    "userEmail": "corretoravanilda@gmail.com",
    "userPass": "116514517-0",
    "userLevel": 100,
    "userKids": [{'nome': 'Vivian Santos Luna', 'turma': 'Year 2'}]
  },
  {
    "userName": "Mariah Taube",
    "userEmail": "mariahprata@hotmail.com",
    "userPass": "116819410-6",
    "userLevel": 100,
    "userKids": [{'nome': 'Joaquim Otto Soldi Taube', 'turma': 'Year 3'}]
  },
  {
    "userName": "Mariana Angelo Pinto",
    "userEmail": "nana.angelo@gmail.com",
    "userPass": "122886668-5",
    "userLevel": 100,
    "userKids": [{'nome': 'Maria Fernanda Pinto Berger', 'turma': 'JK-B'}]
  },
  {
    "userName": "Mariana de Loiola Guerreiro Mrad",
    "userEmail": "marilogue@bol.com.br",
    "userPass": "121587143-0",
    "userLevel": 100,
    "userKids": [{'nome': 'Layla Guerreiro Mrad', 'turma': 'Year 1'}, {'nome': 'Rafael Guerreiro Mrad', 'turma': 'Year 7'}, {'nome': 'Yasmin Guerreiro Mrad', 'turma': 'Year 4'}]
  },
  {
    "userName": "Mariana de Souza Okabe",
    "userEmail": "okabe.mariana@gmail.com",
    "userPass": "121573039-1",
    "userLevel": 100,
    "userKids": [{'nome': 'Manuela Okabe Monteiro', 'turma': 'JK'}]
  },
  {
    "userName": "Mariana Domingues Alvarenga",
    "userEmail": "alvarenga.mda@gmail.com",
    "userPass": "123865192-6",
    "userLevel": 100,
    "userKids": [{'nome': 'Helena Alvarenga da Silva', 'turma': 'Nursery'}]
  },
  {
    "userName": "Mariane Alves da Mata",
    "userEmail": "marianealves.14@hotmail.com",
    "userPass": "124521296-8",
    "userLevel": 100,
    "userKids": [{'nome': 'Lucas da Mata Agostini', 'turma': 'Early Toddler'}, {'nome': 'Samuel da Mata Mesquita', 'turma': 'Year 1'}]
  },
  {
    "userName": "Marina Mello Alves Correa",
    "userEmail": "marinamello1984@gmail.com",
    "userPass": "122095608-9",
    "userLevel": 100,
    "userKids": [{'nome': 'Martina Correa Megda', 'turma': 'SK'}]
  },
  {
    "userName": "Marina Wandaleti Amoroso",
    "userEmail": "marina.wamoroso@gmail.com",
    "userPass": "122944500-6",
    "userLevel": 100,
    "userKids": [{'nome': 'Catarina Amoroso Ribeiro', 'turma': 'JK-B'}]
  },
  {
    "userName": "Marlene Aparecida Gonçalves Guimarães",
    "userEmail": "marlene@sorvepan.com.br",
    "userPass": "115922005-0",
    "userLevel": 100,
    "userKids": [{'nome': 'Gustavo Gonçalves Guimarães Severo', 'turma': 'Year 3'}]
  },
  {
    "userName": "Matheus Godinho Coli",
    "userEmail": "gerencia@tpttransportes.com.br",
    "userPass": "122561563-x",
    "userLevel": 100,
    "userKids": [{'nome': 'Rafael de Paula Godinho Coli', 'turma': 'JK-A'}]
  },
  {
    "userName": "Maurício Ricardo Pereira",
    "userEmail": "mauricio.pereira@gmail.com",
    "userPass": "114753424-x",
    "userLevel": 100,
    "userKids": [{'nome': 'Luiz Octavio Monteiro Pereira', 'turma': 'Year 4'}]
  },
  {
    "userName": "Mauro Braz de Linica Jùnior",
    "userEmail": "mauro.linica@gmail.com",
    "userPass": "123421582-2",
    "userLevel": 100,
    "userKids": [{'nome': 'Augusto Saar de Linica', 'turma': 'JK-A'}]
  },
  {
    "userName": "Mayara Alves Ribeiro",
    "userEmail": "ribeiromayara@live.com",
    "userPass": "121591072-1",
    "userLevel": 100,
    "userKids": [{'nome': 'Benício Ribeiro Penaranda', 'turma': 'SK'}, {'nome': 'Lorena Ribeiro Peñaranda', 'turma': 'Nursery'}, {'nome': 'Malu Ribeiro Penaranda', 'turma': 'Year 3'}]
  },
  {
    "userName": "Maylle Cristiane Emmerick",
    "userEmail": "maylle.emmerick@gmail.com",
    "userPass": "122674681-0",
    "userLevel": 100,
    "userKids": [{'nome': 'Heitor Emmerick Moreira', 'turma': 'Toddler'}]
  },
  {
    "userName": "Melina Clara Pascoli Camargo Lucchesi",
    "userEmail": "dramelinalucchesi@gmail.com",
    "userPass": "121587273-2",
    "userLevel": 100,
    "userKids": [{'nome': 'Vicenzo Lucchesi', 'turma': 'SK'}]
  },
  {
    "userName": "Mirella Karina Sebastiao",
    "userEmail": "mirellakarin@gmail.com",
    "userPass": "116511636-4",
    "userLevel": 100,
    "userKids": [{'nome': 'Mateo Montes Santos', 'turma': 'Year 2'}]
  },
  {
    "userName": "Miriam de Sousa França",
    "userEmail": "msffaria@gmail.com",
    "userPass": "120248754-3",
    "userLevel": 100,
    "userKids": [{'nome': 'Larissa França Dias', 'turma': 'Year 2'}]
  },
  {
    "userName": "Miriam Rumi Furuno",
    "userEmail": "mrumifuruno@gmail.com",
    "userPass": "124275366-7",
    "userLevel": 100,
    "userKids": [{'nome': 'Julia Mai Furuno Resende', 'turma': 'Nursery'}, {'nome': 'Henrique Hayao Furuno Resende', 'turma': 'Year 1'}]
  },
  {
    "userName": "Mohamad Nagib Smidi",
    "userEmail": "mohamad_nagib_smidi@hotmail.com",
    "userPass": "122874181-5",
    "userLevel": 100,
    "userKids": [{'nome': 'Sarah Mohamad Smidi', 'turma': 'JK-A'}, {'nome': 'Soraia Mohamad Smidi', 'turma': 'Year 2'}]
  },
  {
    "userName": "Mônica Denise Manetti",
    "userEmail": "monica.d.manetti@gmail.com",
    "userPass": "120249019-0",
    "userLevel": 100,
    "userKids": [{'nome': 'Catarina Manetti', 'turma': 'Year 4'}, {'nome': 'Mauricio Manetti', 'turma': 'Year 6'}]
  },
  {
    "userName": "Monica Mayumi Inaba",
    "userEmail": "monica_inaba@yahoo.com.br",
    "userPass": "122097715-9",
    "userLevel": 100,
    "userKids": [{'nome': 'Rafael Hiroshi Inaba Castilho', 'turma': 'Year 1'}]
  },
  {
    "userName": "Monique Costa Moreira França",
    "userEmail": "monique-costa@hotmail.com",
    "userPass": "120754510-7",
    "userLevel": 100,
    "userKids": [{'nome': 'Sofia Moreira França', 'turma': 'Year 1'}]
  },
  {
    "userName": "Nagham Nagib Smaidi",
    "userEmail": "naghamsmidi@hotmail.com",
    "userPass": "116819420-9",
    "userLevel": 100,
    "userKids": [{'nome': 'Muhamad Taha Saifi', 'turma': 'Year 2'}, {'nome': 'Soraia Saifi', 'turma': 'Year 5'}, {'nome': 'Omar Taha Saifi', 'turma': 'SK'}]
  },
  {
    "userName": "Natalia Mariane Oliveira de Miranda",
    "userEmail": "natalia540@hotmail.com",
    "userPass": "115781365-3",
    "userLevel": 100,
    "userKids": [{'nome': 'Felipe Oliveira Miranda', 'turma': 'Year 2'}, {'nome': 'Rafaela Oliveira Miranda', 'turma': 'Year 5'}]
  },
  {
    "userName": "Nathalia Alves Migoto",
    "userEmail": "nathalia.migoto@gmail.com",
    "userPass": "124500499-2",
    "userLevel": 100,
    "userKids": [{'nome': 'Luísa Migoto Morassi', 'turma': 'Nursery'}]
  },
  {
    "userName": "Nathalia Sanchez Torres",
    "userEmail": "nathalia_torres3@hotmail.com",
    "userPass": "122893041-7",
    "userLevel": 100,
    "userKids": [{'nome': 'Miguel Augusto Torres Esteves', 'turma': 'Nursery'}]
  },
  {
    "userName": "Nelson Leandro Reis",
    "userEmail": "lefutsal14@hotmail.com",
    "userPass": "114467429-3",
    "userLevel": 100,
    "userKids": [{'nome': 'Guilherme Cappeletti Reis', 'turma': 'Year 7'}]
  },
  {
    "userName": "Nelson Ricardo Benites",
    "userEmail": "benitesnr@gmail.com",
    "userPass": "116819379-5",
    "userLevel": 100,
    "userKids": [{'nome': 'Estevan Benites', 'turma': 'Year 3'}, {'nome': 'Ramon Benites', 'turma': 'Year 1'}, {'nome': 'Serena Benites', 'turma': 'JK'}]
  },
  {
    "userName": "Nicky Tavares Pereira",
    "userEmail": "nickytp@hotmail.com",
    "userPass": "123415531-x",
    "userLevel": 100,
    "userKids": [{'nome': 'Bryan Ferreira Pereira', 'turma': 'SK'}]
  },
  {
    "userName": "Nicolas Raugust Herren",
    "userEmail": "nicolasherren@yahoo.com.br",
    "userPass": "122558635-5",
    "userLevel": 100,
    "userKids": [{'nome': 'Gisele Almeida Herren', 'turma': 'JK'}]
  },
  {
    "userName": "Nicolle de Souza Alcantara da Silva",
    "userEmail": "nicolle.0810@hotmail.com",
    "userPass": "122097387-7",
    "userLevel": 100,
    "userKids": [{'nome': 'Helena Alcantara de Souza', 'turma': 'JK-B'}]
  },
  {
    "userName": "Pamela Terra",
    "userEmail": "pam_terra@hotmail.com",
    "userPass": "114006590-7",
    "userLevel": 100,
    "userKids": [{'nome': 'Matheus Terra Gonçalves', 'turma': 'Year 5'}]
  },
  {
    "userName": "Paola Suellen Rodrigues",
    "userEmail": "paola.rodrigues64@gmail.com",
    "userPass": "114067949-1",
    "userLevel": 100,
    "userKids": [{'nome': 'Helena Rodrigues dos Santos', 'turma': 'Year 4'}]
  },
  {
    "userName": "Patrícia Dias",
    "userEmail": "pdias@maplebeartaubate.com.br",
    "userPass": "122559145-4",
    "userLevel": 100,
    "userKids": [{'nome': 'Igor Dias Sprogis dos Santos', 'turma': 'Nursery'}]
  },
  {
    "userName": "Patrícia Glathardt D. M. Novelletto",
    "userEmail": "patyglathardt@hotmail.com",
    "userPass": "116404525-8",
    "userLevel": 100,
    "userKids": [{'nome': 'Lorenzo Dias Novelletto', 'turma': 'Year 2'}, {'nome': 'Nicholas Dias Novelletto', 'turma': 'Year 3'}]
  },
  {
    "userName": "Patricia Hidalgo",
    "userEmail": "pahidalgo.melo@yahoo.com.br",
    "userPass": "116819188-9",
    "userLevel": 100,
    "userKids": [{'nome': 'Júlia Hidalgo Oliveira Melo', 'turma': 'Year 4'}, {'nome': 'Lara Hidalgo Oliveira Melo', 'turma': 'JK'}]
  },
  {
    "userName": "Patricia Mara da Silva",
    "userEmail": "patricia.maraa@hotmail.com",
    "userPass": "123056778-1",
    "userLevel": 100,
    "userKids": [{'nome': 'Mikael Katsuo Shibata', 'turma': 'Toddler'}]
  },
  {
    "userName": "Paula Barroso de Brito",
    "userEmail": "paula.barroso.brito@gmail.com",
    "userPass": "122022250-1",
    "userLevel": 100,
    "userKids": [{'nome': 'Manuela de Brito Gadioli Cortez', 'turma': 'JK-A'}]
  },
  {
    "userName": "Paula Barroso de Melo Haiachi",
    "userEmail": "paulahaiachi@gmail.com",
    "userPass": "113918594-9",
    "userLevel": 100,
    "userKids": [{'nome': 'Isabella Sayuri de Melo Haiachi', 'turma': 'Year 5'}]
  },
  {
    "userName": "Paula Beiruth Quental Barbosa",
    "userEmail": "paulinhabq@yahoo.com.br",
    "userPass": "115776197-5",
    "userLevel": 100,
    "userKids": [{'nome': 'João Felipe Quental Barbosa', 'turma': 'Year 3'}]
  },
  {
    "userName": "Paula Furtado Nossaes",
    "userEmail": "paulafurt@hotmail.com",
    "userPass": "116817084-9",
    "userLevel": 100,
    "userKids": [{'nome': 'Tomás Furtado Nossaes', 'turma': 'Year 5'}]
  },
  {
    "userName": "Paula Gizzi de Almeida Pedroso",
    "userEmail": "paulagizzi@gmail.com",
    "userPass": "123422915-8",
    "userLevel": 100,
    "userKids": [{'nome': 'Lucca de Almeida Pedroso Guirado', 'turma': 'JK'}, {'nome': 'Enzo de Almeida Pedroso Guirado', 'turma': 'Year 1'}]
  },
  {
    "userName": "Paulo Sérgio de Castilho Júnior",
    "userEmail": "paulosergio.castilho@gmail.com",
    "userPass": "123425402-5",
    "userLevel": 100,
    "userKids": [{'nome': 'Marina Bastos Ferreira de Castilho', 'turma': 'Nursery'}]
  },
  {
    "userName": "Pollyanna Rodrigues Dias da Costa Belieny",
    "userEmail": "pollyannabelieny@gmail.com",
    "userPass": "123702329-4",
    "userLevel": 100,
    "userKids": [{'nome': 'Noah Rodrigues Dias Belieny', 'turma': 'maternal I'}, {'nome': 'Luana Rodrigues Dias Belieny', 'turma': 'Year 6'}, {'nome': 'Thais Rodrigues Dias de Melo', 'turma': 'Year 7'}]
  },
  {
    "userName": "Priscila Graziela Jenner",
    "userEmail": "jennerpriscila@gmail.com",
    "userPass": "120435276-8",
    "userLevel": 100,
    "userKids": [{'nome': 'Luiz Gustavo Jenner da Silva', 'turma': 'Year 2'}]
  },
  {
    "userName": "Priscila March Garcia",
    "userEmail": "magnetica2009@gmail.com",
    "userPass": "114810893-2",
    "userLevel": 100,
    "userKids": [{'nome': 'Daniel March Garcia Castro', 'turma': 'Year 5'}]
  },
  {
    "userName": "Rafael Montenegro Ahmed",
    "userEmail": "rafaahmed@hotmail.com",
    "userPass": "123703146-1",
    "userLevel": 100,
    "userKids": [{'nome': 'Alice Biaso Montenegro Felix Ahmed', 'turma': 'SK'}, {'nome': 'Lucas Biaso Montenegro Félix ahmed', 'turma': 'Year 6'}, {'nome': 'Sofia Biaso Montenegro Félix Ahmed', 'turma': 'Year 3'}]
  },
  {
    "userName": "Raquel A Oliveira Peixoto",
    "userEmail": "peixoto_raquel@hotmail.com",
    "userPass": "123892974-6",
    "userLevel": 100,
    "userKids": [{'nome': 'Giovana Oliveira Peixoto', 'turma': 'Year 4'}]
  },
  {
    "userName": "Rayane Ferreira dos Santos",
    "userEmail": "rayanecruz480@gmail.com",
    "userPass": "121569076-9",
    "userLevel": 100,
    "userKids": [{'nome': 'Luiza dos Santos Cruz', 'turma': 'Year 2'}]
  },
  {
    "userName": "Rayda Melissa Belone Narazaki",
    "userEmail": "rmbelone@hotmail.com",
    "userPass": "114039715-1",
    "userLevel": 100,
    "userKids": [{'nome': 'Ana Laura Belone Narazaki', 'turma': 'Year 6'}]
  },
  {
    "userName": "Renata Pereira Machado",
    "userEmail": "mirellacalcados@hotmail.com",
    "userPass": "120209625-6",
    "userLevel": 100,
    "userKids": [{'nome': 'Miguel Guido Machado Celete', 'turma': 'Year 2'}]
  },
  {
    "userName": "Renato do Nascimento Pereira",
    "userEmail": "renatonp@gmail.com",
    "userPass": "120345098-9",
    "userLevel": 100,
    "userKids": [{'nome': 'Lara Rezende do Nascimento', 'turma': 'Year 2'}]
  },
  {
    "userName": "Ricardo Silveira Polo",
    "userEmail": "ricardosilpolo@gmail.com",
    "userPass": "122887410-4",
    "userLevel": 100,
    "userKids": [{'nome': 'Benjamin Targa Polo', 'turma': 'Nursery'}]
  },
  {
    "userName": "Robson Silva da Paz",
    "userEmail": "robson_paz@hotmail.com",
    "userPass": "121258837-x",
    "userLevel": 100,
    "userKids": [{'nome': 'João Alcantara da Paz', 'turma': 'Year 2'}]
  },
  {
    "userName": "Rodrigo Alessandro Cabral Da Silva",
    "userEmail": "direcao@tempervale.com",
    "userPass": "123423065-3",
    "userLevel": 100,
    "userKids": [{'nome': 'Antonella Siqueira Cabral', 'turma': 'Nursery'}]
  },
  {
    "userName": "Rodrigo Camargo",
    "userEmail": "rodrigo.camargo@rccorretora.com",
    "userPass": "116657348-5",
    "userLevel": 100,
    "userKids": [{'nome': 'Davi de Castro Camargo', 'turma': 'Year 3'}, {'nome': 'Júlia de Castro Camargo', 'turma': 'JK-B'}]
  },
  {
    "userName": "Rodrigo de Campos Gomes",
    "userEmail": "email.goma@gmail.com",
    "userPass": "112946034-4",
    "userLevel": 100,
    "userKids": [{'nome': 'Rodrigo Barbosa de Campos Gomes', 'turma': 'Year 7'}]
  },
  {
    "userName": "Rodrigo Rossi Guerra",
    "userEmail": "rodrigorrg@hotmail.com",
    "userPass": "122022794-8",
    "userLevel": 100,
    "userKids": [{'nome': 'Lara Neves Guerra', 'turma': 'JK-B'}]
  },
  {
    "userName": "Ronaldo Lira Araujo",
    "userEmail": "ronaldo.lira.araujo@hotmail.com",
    "userPass": "122556921-7",
    "userLevel": 100,
    "userKids": [{'nome': 'Carolina Martins Araujo', 'turma': 'JK-A'}]
  },
  {
    "userName": "Rosana Aparecida da Cruz Barros",
    "userEmail": "rosanaracb@gmail.com",
    "userPass": "122097583 - 7",
    "userLevel": 100,
    "userKids": [{'nome': 'Maria Gabriela da Cruz Barros', 'turma': 'Year 1'}]
  },
  {
    "userName": "Rubens Lobo Almeida",
    "userEmail": "rubensalmeida19@hotmail.com",
    "userPass": "116819732-6",
    "userLevel": 100,
    "userKids": [{'nome': 'Mariah Peixoto Almeida', 'turma': 'Year 2'}]
  },
  {
    "userName": "Silvia Helena Marcondes Fernandes",
    "userEmail": "lena_psiq@hotmail.com",
    "userPass": "122102101-1",
    "userLevel": 100,
    "userKids": [{'nome': 'Henrique Marcondes Fernandes', 'turma': 'SK'}, {'nome': 'Adam Marcondes Fernandes', 'turma': 'Toddler'}]
  },
  {
    "userName": "Silvia Ribeiro do Val Pavan",
    "userEmail": "silviadoval@hotmail.com",
    "userPass": "121289916-7",
    "userLevel": 100,
    "userKids": [{'nome': 'Isadora do Val Pavan', 'turma': 'Year 5'}]
  },
  {
    "userName": "Simone Heliotropio de Matos",
    "userEmail": "sihmatos@hotmail.com",
    "userPass": "116819337-0",
    "userLevel": 100,
    "userKids": [{'nome': 'Maitê Heliotropio de Matos Guimarães', 'turma': 'Year 4'}]
  },
  {
    "userName": "Tahiana Chamoun Marchon Dupas Ribeiro",
    "userEmail": "tahianam@hotmail.com",
    "userPass": "121066494-x",
    "userLevel": 100,
    "userKids": [{'nome': 'Helena Chamoun Marchon Dupas Ribeiro', 'turma': 'Year 2'}, {'nome': 'Rafael Chamoun Marchon Dupas Ribeiro', 'turma': 'JK'}]
  },
  {
    "userName": "Tatiana Bisson Welter",
    "userEmail": "tatibw@hotmail.com",
    "userPass": "116593768-2",
    "userLevel": 100,
    "userKids": [{'nome': 'Rafaela Welter Kratz', 'turma': 'Year 1'}]
  },
  {
    "userName": "Tatiana Carina dos Santos Fontes",
    "userEmail": "tati_carina@yahoo.com.br",
    "userPass": "114818566-5",
    "userLevel": 100,
    "userKids": [{'nome': 'Manuela dos Santos Fontes', 'turma': 'Year 3'}]
  },
  {
    "userName": "Tatiane dos Santos Silva",
    "userEmail": "contato@asengenheiro.com.br",
    "userPass": "123837604-6",
    "userLevel": 100,
    "userKids": [{'nome': 'Sofia Luz dos Santos', 'turma': 'Toddler'}]
  },
  {
    "userName": "Telma Miyuki Iwamura",
    "userEmail": "telmam.05@gmail.com",
    "userPass": "116725139-8",
    "userLevel": 100,
    "userKids": [{'nome': 'Maria Eduarda Iwamura Marques', 'turma': 'Year 3'}]
  },
  {
    "userName": "Thaís Gomes dos Rego Ravagnani Vargas",
    "userEmail": "drathaisgomes@gmail.com",
    "userPass": "111079420-4",
    "userLevel": 100,
    "userKids": [{'nome': 'Davi Gomes Ravagnani Vargas', 'turma': 'Year 7'}, {'nome': 'Micaela Gomes Ravagnani Vargas', 'turma': 'Year 6'}]
  },
  {
    "userName": "Thaís Iwamoto Colacioppo",
    "userEmail": "thaiscolacioppo@gmail.com",
    "userPass": "123423254-6",
    "userLevel": 100,
    "userKids": [{'nome': 'Luísa Colacioppo e Silva', 'turma': 'Nursery'}, {'nome': 'Tobias Colacioppo e Silva', 'turma': 'Year 4'}]
  },
  {
    "userName": "Thais Meiriene da Fonseca Filippi",
    "userEmail": "seguro@mmautoseg.com.br",
    "userPass": "120637347-7",
    "userLevel": 100,
    "userKids": [{'nome': 'Marcella Filippi', 'turma': 'Year 1'}]
  },
  {
    "userName": "Thaise Kakubo",
    "userEmail": "thaise_migliorini@hotmail.com",
    "userPass": "12159832-6",
    "userLevel": 100,
    "userKids": [{'nome': 'Renato Akira Kakubo', 'turma': 'Nursery'}]
  },
  {
    "userName": "Thiago Alves de Faria Pereira",
    "userEmail": "thiago@verge.com.br",
    "userPass": "123425474-8",
    "userLevel": 100,
    "userKids": [{'nome': 'Davi de Souza Alves', 'turma': 'Nursery'}]
  },
  {
    "userName": "Thiago Cesar da Silva Pinto",
    "userEmail": "cesar_tsp@yahoo.com",
    "userPass": "124245407-x",
    "userLevel": 100,
    "userKids": [{'nome': 'Gianluca Polydoro Pinto', 'turma': 'Nursery'}]
  },
  {
    "userName": "Thiago Magalhães Uchôa",
    "userEmail": "thiagomuchoa1@hotmail.com",
    "userPass": "122881304-8",
    "userLevel": 100,
    "userKids": [{'nome': 'Lara Rodrigues Lanzana Uchôa', 'turma': 'SK'}, {'nome': 'Lucas Rodrigues Lanzana Uchôa', 'turma': 'Early Toddler'}]
  },
  {
    "userName": "Thuanny Lopes",
    "userEmail": "thulopes@gmail.com",
    "userPass": "123486751-5",
    "userLevel": 100,
    "userKids": [{'nome': 'Jimmy Tu', 'turma': 'JK'}]
  },
  {
    "userName": "Tiago Lopes de Oliveira",
    "userEmail": "tiago_tlo@hotmail.com",
    "userPass": "121333118-3",
    "userLevel": 100,
    "userKids": [{'nome': 'Alice Baldoni Lopes', 'turma': 'SK'}]
  },
  {
    "userName": "TIAGO MEIRA DE BORBA",
    "userEmail": "tiagomdborba@gmail.com",
    "userPass": "122561511-2",
    "userLevel": 100,
    "userKids": [{'nome': 'Felipe Waki de borba', 'turma': 'Year 3'}, {'nome': 'Rafael Waki de Borba', 'turma': 'JK'}]
  },
  {
    "userName": "Tiago Rezende de Castro Guimarães",
    "userEmail": "tiagorcguima@yahoo.com.br",
    "userPass": "122556169-3",
    "userLevel": 100,
    "userKids": [{'nome': 'Gabriel Takahashi Guimarães', 'turma': 'Nursery'}]
  },
  {
    "userName": "Valéria de Campos Marques",
    "userEmail": "valeriacampos_fono@yahoo.com.br",
    "userPass": "121596241-1",
    "userLevel": 100,
    "userKids": [{'nome': 'Benjamim de Campos Marques', 'turma': 'SK'}, {'nome': 'Cecília de Campos Marques', 'turma': 'Toddler'}]
  },
  {
    "userName": "Vanessa Aparecida Alexandrino de Oliveira",
    "userEmail": "vanessaalexandrino7@gmail.com",
    "userPass": "122123688-X",
    "userLevel": 100,
    "userKids": [{'nome': 'Diego Alexandrino de Oliveira', 'turma': 'Year 5'}]
  },
  {
    "userName": "Vanessa David de Assis Cyrillo",
    "userEmail": "vanrafa07@yahoo.com.br",
    "userPass": "120251538-1",
    "userLevel": 100,
    "userKids": [{'nome': 'Alice Assis Cyrillo Galvão Nunes', 'turma': 'Year 3'}]
  },
  {
    "userName": "Vanessa Villalta Lima Roman",
    "userEmail": "v.villalta@icloud.com",
    "userPass": "120714226-8",
    "userLevel": 100,
    "userKids": [{'nome': 'Pedro Villalta Roman', 'turma': 'Year 2'}]
  },
  {
    "userName": "Vicente Moreira Borges Filho",
    "userEmail": "vmborgesf@gmail.com",
    "userPass": "113228616-5",
    "userLevel": 100,
    "userKids": [{'nome': 'Gabriel Bonifácio Borges', 'turma': 'Year 5'}]
  },
  {
    "userName": "Vinicius de Almeida Carneiro",
    "userEmail": "vinicius@grupova.com.br",
    "userPass": "112870991-0",
    "userLevel": 100,
    "userKids": [{'nome': 'Maria Alice Quizzeppi de Almeida Carneiro', 'turma': 'Year 6'}]
  },
  {
    "userName": "Vitor Emanuel Simoes Antonino",
    "userEmail": "kdtvitor@hotmail.com",
    "userPass": "120244476-3",
    "userLevel": 100,
    "userKids": [{'nome': 'Lucas Machado Antonino', 'turma': 'Year 2'}]
  },
  {
    "userName": "Vivian de Toledo Pierri Silvestre",
    "userEmail": "vivianpierri@gmail.com",
    "userPass": "120346593-2",
    "userLevel": 100,
    "userKids": [{'nome': 'Lucas Pierri Silvestre', 'turma': 'Year 1'}]
  },
  {
    "userName": "Viviane Braga Alves Prado",
    "userEmail": "alves.vb@hotmail.com",
    "userPass": "121629986-9",
    "userLevel": 100,
    "userKids": [{'nome': 'Cora Alves Prado', 'turma': 'SK'}]
  },
  {
    "userName": "Viviane Fagundes de Andrade",
    "userEmail": "vivifandrade@gmail.com",
    "userPass": "121587202-1",
    "userLevel": 100,
    "userKids": [{'nome': 'Sophia Andrade Crespo', 'turma': 'SK'}]
  },
  {
    "userName": "Viviane Sobreiro Peixoto Almeida",
    "userEmail": "vivi.sobreiropa@gmail.com",
    "userPass": "122095551-6",
    "userLevel": 100,
    "userKids": [{'nome': 'Clara Peixoto Almeida', 'turma': 'SK'}]
  },
  {
    "userName": "Yamil Eduardo Pereira Galdo",
    "userEmail": "pgparticipacoes@gmail.com",
    "userPass": "114087421-4",
    "userLevel": 100,
    "userKids": [{'nome': 'Letícia Pereira Mendes', 'turma': 'Year 6'}]
  }
]




// const data = [
//     {
//       "userName": "Adriana Cristina Teixeira Monteiro",
//       "userEmail": "adrianacteix@yahoo.com.br",
//       "userPass": "1151917527",
//       "userLevel": 100,
//       "userKids": ["Arthur Teixeira Monteiro" , "Leonardo Teixeira Monteiro"]
//     },
//     {
//       "userName": "Adriano Fracchia Fonseca da Costa",
//       "userEmail": "adrianofracchia@hotmail.com",
//       "userPass": 1222826951,
//       "userLevel": 100,
//       "userKids": ["Beatriz Aiko Kuwabara Fracchia da Costa" , "Vitor Kazuo Kuwabara Fracchia da Costa"]
//     },
//     {
//       "userName": "Alan Farias Zandonadi",
//       "userEmail": "alanfz@gmail.com",
//       "userPass": 1210689455,
//       "userLevel": 100,
//       "userKids": ["Alice Postal Farias Zandonadi"]
//     },
//     {
//       "userName": "Alana Gonsalez Baptista Trovello",
//       "userEmail": "alana.trovello@gmail.com",
//       "userPass": 1227450151,
//       "userLevel": 100,
//       "userKids": ["Alice Baptista Trovello"]
//     },
//     {
//       "userName": "Alessandro Henrique Reis Siqueira",
//       "userEmail": "alessandro_hrs@hotmail.com",
//       "userPass": 1236718616,
//       "userLevel": 100,
//       "userKids": ["Théo Pinho Siqueira"]
//     },
//     {
//       "userName": "Alexandre Rodrigues Ramos",
//       "userEmail": "ramos.r.alexandre@gmail.com",
//       "userPass": 1143748335,
//       "userLevel": 100,
//       "userKids": ["Norberto Amaral Ramos"]
//     },
//     {
//       "userName": "Alfredo Dall\"ara Neto",
//       "userEmail": "netolada@hotmail.com",
//       "userPass": 1203063970,
//       "userLevel": 100,
//       "userKids": ["Lucas Alves Cursino de Moura Dall\"ara" , "Maria Carolina Alves Cursino de Moura Dall\"ara"]
//     },
//     {
//       "userName": "Aline de Oliveira Godoy Camargo",
//       "userEmail": "aline.ogodoy@hotmail.com",
//       "userPass": 1201091317,
//       "userLevel": 100,
//       "userKids": ["Benjamin de Oliveira Godoy de Camargo"]
//     },
//     {
//       "userName": "Amanda Abdouni",
//       "userEmail": "amandaabdouni@hotmail.com",
//       "userPass": 1168197569,
//       "userLevel": 100,
//       "userKids": ["Mohamad Smaidi" , "Nagib Smaidi"]
//     },
//     {
//       "userName": "Ana Carolina Brisola Brizzi",
//       "userEmail": "carol.brisola.cb@gmail.com",
//       "userPass": 1215073239,
//       "userLevel": 100,
//       "userKids": ["Helena Brisola Brizzi"]
//     },
//     {
//       "userName": "Ana Carolina de Carvalho Silva Coelho Junior",
//       "userEmail": "anacarolinadecarvalho@hotmail.com",
//       "userPass": 1215967913,
//       "userLevel": 100,
//       "userKids": ["Fernando de Carvalho Coelho Junior" , "Júlia de Carvalho Coelho Junior" , "Maria Eduarda de Carvalho Coelho Junior"]
//     },
//     {
//       "userName": "Ana Karina Machado Gonçalves",
//       "userEmail": "anakmachado@yahoo.com.br",
//       "userPass": 1139998444,
//       "userLevel": 100,
//       "userKids": ["Matheus Machado Gonçalves"]
//     },
//     {
//       "userName": "Ana Laura Indiani Borges",
//       "userEmail": "aninhaindiani@hotmail.com",
//       "userPass": 1164042105,
//       "userLevel": 100,
//       "userKids": ["Luísa Indiani Ferreira Pinto"]
//     },
//     {
//       "userName": "Ana Luiza Mello",
//       "userEmail": "amello@maplebeartaubate.com.br",
//       "userPass": 1151273028,
//       "userLevel": 100,
//       "userKids": ["Rafael Gasch Mello"]
//     },
//     {
//       "userName": "Ana Paula Cavassana Germano",
//       "userEmail": "paulagermano@uol.com.br",
//       "userPass": 1205774646,
//       "userLevel": 100,
//       "userKids": ["Pedro Cavassana Germano"]
//     },
//     {
//       "userName": "Ana Paula de Oliveira e Souza Conti",
//       "userEmail": "ana@britoedias.adv.br",
//       "userPass": 1243302689,
//       "userLevel": 100,
//       "userKids": ["Maria Sofia de Oliveira Conti"]
//     },
//     {
//       "userName": "Anderson Ramos Mota",
//       "userEmail": "armota85@gmail.com",
//       "userPass": 1202481991,
//       "userLevel": 100,
//       "userKids": ["Maria Helena Rodrigues Mota" , "João Miguel Rodrigues Mota"]
//     },
//     {
//       "userName": "André Girardi Vieira",
//       "userEmail": "agirardi@hotmail.com",
//       "userPass": 1205776096,
//       "userLevel": 100,
//       "userKids": ["Elisa Cavalcanti Girardi Vieira"]
//     },
//     {
//       "userName": "Andrea de Carvalho Pereira",
//       "userEmail": "an_carvalho@hotmail.com",
//       "userPass": 1159032622,
//       "userLevel": 100,
//       "userKids": ["Aurora Pereira Amaro"]
//     },
//     {
//       "userName": "Andreia Codello Rebelo",
//       "userEmail": "rebelodeia@yahoo.com.br",
//       "userPass": 1239366425,
//       "userLevel": 100,
//       "userKids": ["Maria Clara Rebelo de Oliveira"]
//     },
//     {
//       "userName": "Andreia Vieira da Silva",
//       "userEmail": "andreiavieira.silva@hotmail.com",
//       "userPass": 1234257063,
//       "userLevel": 100,
//       "userKids": ["Maria Luiza Vieira Silva"]
//     },
//     {
//       "userName": "Audrey Stengler Pereira de Ulhôa Cintra",
//       "userEmail": "audreystengler@hotmail.com",
//       "userPass": 1238528636,
//       "userLevel": 100,
//       "userKids": ["Gabriel Stengler de Ulhôa Cintra"]
//     },
//     {
//       "userName": "Benedito Carlos de Jesus",
//       "userEmail": "carlosrepresen@hotmail.com",
//       "userPass": 1119752085,
//       "userLevel": 100,
//       "userKids": ["Mayara Malosti de Jesus"]
//     },
//     {
//       "userName": "Bianca Maria de Carvalho Solera Soares",
//       "userEmail": "bisolera@hotmail.com",
//       "userPass": 1168191440,
//       "userLevel": 100,
//       "userKids": ["Carolina Solera Camacho"]
//     },
//     {
//       "userName": "Bruna Carolina Felix Gomes",
//       "userEmail": "bruna.felixs@outlook.com",
//       "userPass": 1225590036,
//       "userLevel": 100,
//       "userKids": ["Vitória Morgado Felix Gomes"]
//     },
//     {
//       "userName": "Bruna Taques Gomes Correa",
//       "userEmail": "bruna@alumni.usp.br",
//       "userPass": 1149267215,
//       "userLevel": 100,
//       "userKids": ["Alice Taques Gomes Correa" , "Maya Taques Gomes Correa"]
//     },
//     {
//       "userName": "Bruno Degli Esposti",
//       "userEmail": "bruno_degli@hotmail.com",
//       "userPass": 1212202223,
//       "userLevel": 100,
//       "userKids": ["Luiza Rodrigues Degli Esposti"]
//     },
//     {
//       "userName": "Bruno Monteiro de Alcântara Oliveira",
//       "userEmail": "bmaoliveira@gmail.com",
//       "userPass": 1234147348,
//       "userLevel": 100,
//       "userKids": ["Dante Davanzo de Alcântara Oliveira"]
//     },
//     {
//       "userName": "Bruno Vargas Jannibelli",
//       "userEmail": "jannibelli@gmail.com",
//       "userPass": 1226547801,
//       "userLevel": 100,
//       "userKids": ["Max Lara Jannibelli"]
//     },
//     {
//       "userName": "Camila Fernanda de Oliveira Antunes",
//       "userEmail": "camilafeo@hotmail.com",
//       "userPass": 1148576411,
//       "userLevel": 100,
//       "userKids": ["Artur Oliveira Antunes"]
//     },
//     {
//       "userName": "Camila Gomes Castro Ferreira Veltri Rodrigues",
//       "userEmail": "camilaveltri@outlook.com",
//       "userPass": "112296173x",
//       "userLevel": 100,
//       "userKids": ["Manuela Ferreira Veltri Rodrigues"]
//     },
//     {
//       "userName": "Carlos Alexandre Peixoto Costa",
//       "userEmail": "carlexpeixoto@yahoo.com.br",
//       "userPass": 1236718719,
//       "userLevel": 100,
//       "userKids": ["Ravi Narayan Costa"]
//     },
//     {
//       "userName": "Carlos Augusto Mori Frade Gomes",
//       "userEmail": "carlosamfgomes@gmail.com",
//       "userPass": 1220910442,
//       "userLevel": 100,
//       "userKids": ["Laura Mendonça Mori Frade Gomes"]
//     },
//     {
//       "userName": "Carlos Eduardo de Oliveira Teixeira",
//       "userEmail": "dudatx@gmail.com",
//       "userPass": 1238529112,
//       "userLevel": 100,
//       "userKids": ["Lorena Pereira Teixeira"]
//     },
//     {
//       "userName": "Carlos Henrique de Souza Marques",
//       "userEmail": "chsmarques@gmail.com",
//       "userPass": 1159075761,
//       "userLevel": 100,
//       "userKids": ["Maria Victoria Mastandrea Marques"]
//     },
//     {
//       "userName": "Carolina Furlan do Amaral",
//       "userEmail": "amaralfcarol@gmail.com",
//       "userPass": "113239207x",
//       "userLevel": 100,
//       "userKids": ["Manuela Milani" , "Valentina Milani"]
//     },
//     {
//       "userName": "Carolina Leal Marinho",
//       "userEmail": "carol-leal@uol.com.br",
//       "userPass": 1216884985,
//       "userLevel": 100,
//       "userKids": ["Beatriz Leal Marinho"]
//     },
//     {
//       "userName": "Cássia Mendes Botelho",
//       "userEmail": "cassiabotelho06@hotmail.com",
//       "userPass": "113974866x",
//       "userLevel": 100,
//       "userKids": ["Arthur Mendes Botelho"]
//     },
//     {
//       "userName": "Cassius Alexander Elston III",
//       "userEmail": "celston@slb.com",
//       "userPass": 1225592434,
//       "userLevel": 100,
//       "userKids": ["Cassius Alexander Elston IV"]
//     },
//     {
//       "userName": "Catharina Luiz Cerqueira Santos",
//       "userEmail": "cathlcs@hotmail.com",
//       "userPass": 1224021976,
//       "userLevel": 100,
//       "userKids": ["Rodrigo Santos Diniz"]
//     },
//     {
//       "userName": "Claudia Bomfa Caldas",
//       "userEmail": "claudiabomfa@gmail.com",
//       "userPass": 1149134884,
//       "userLevel": 100,
//       "userKids": ["Nicolas Bomfá Doro"]
//     },
//     {
//       "userName": "Claudia Mendes Lopes Silva",
//       "userEmail": "claudia@industrialdovale.com.br",
//       "userPass": 1153639658,
//       "userLevel": 100,
//       "userKids": ["Gabriel Mendes Simões Pereira"]
//     },
//     {
//       "userName": "Cleonice S. Hermans",
//       "userEmail": "cleohermans@yahoo.com.br",
//       "userPass": 1203310973,
//       "userLevel": 100,
//       "userKids": ["Luma Hermans"]
//     },
//     {
//       "userName": "Cristian Zeni",
//       "userEmail": "cristian.zeni@gmail.com",
//       "userPass": "121414018x",
//       "userLevel": 100,
//       "userKids": ["Maria Helena Belache Zeni"]
//     },
//     {
//       "userName": "Cristiane Rosa Moreno Vieira",
//       "userEmail": "crisrosamvieira@gmail.com",
//       "userPass": 1229359047,
//       "userLevel": 100,
//       "userKids": ["Augusto Vieira Gomes"]
//     },
//     {
//       "userName": "Cristina Destro",
//       "userEmail": "c.destro@uol.com.br",
//       "userPass": 1168192389,
//       "userLevel": 100,
//       "userKids": ["Lorenzo Destro Fernandes" , "Maitê Destro Fernandes"]
//     },
//     {
//       "userName": "Daniel Cauduro Salgado",
//       "userEmail": "danimed32@yahoo.com.br",
//       "userPass": 1225638781,
//       "userLevel": 100,
//       "userKids": ["Antônio Figueiredo Cauduro Salgado" , "Pedro Figueiredo Cauduro Salgado"]
//     },
//     {
//       "userName": "Daniela Andrade Britta",
//       "userEmail": "danibritta@hotmail.com",
//       "userPass": 1202280067,
//       "userLevel": 100,
//       "userKids": ["Filipe Britta Veroneze"]
//     },
//     {
//       "userName": "Daniela Melo Mariano",
//       "userEmail": "danielammariano@yahoo.com.br",
//       "userPass": 1168191361,
//       "userLevel": 100,
//       "userKids": ["Caio Mariano Simões" , "Enzo Mariano Simões"]
//     },
//     {
//       "userName": "Daniela Rocha Ziroldo",
//       "userEmail": "danielaziroldo@hotmail.com",
//       "userPass": "123091478X",
//       "userLevel": 100,
//       "userKids": ["Olivia Ziroldo Takao"]
//     },
//     {
//       "userName": "Daniele Rodrigues dos Santos",
//       "userEmail": "danielerods@hotmail.com",
//       "userPass": 1225590528,
//       "userLevel": 100,
//       "userKids": ["Missarah Rodrigues Faroni"]
//     },
//     {
//       "userName": "Debora Aparecida Correa",
//       "userEmail": "debora_acorrea@hotmail.com",
//       "userPass": 1204463943,
//       "userLevel": 100,
//       "userKids": ["Ayla Martins de Oliveira"]
//     },
//     {
//       "userName": "Deise Nancy de Morais",
//       "userEmail": "dndemorais@gmail.com",
//       "userPass": 1164467438,
//       "userLevel": 100,
//       "userKids": ["Raul de Morais Urias"]
//     },
//     {
//       "userName": "Demes Rogério Muniz",
//       "userEmail": "roger.tte@hotmail.com",
//       "userPass": 1168189974,
//       "userLevel": 100,
//       "userKids": ["Lavínia Santos Vasconcellos Muniz" , "Rebeca Santos Vasconcellos Muniz"]
//     },
//     {
//       "userName": "Dênis Togoro Ferreira da Silva",
//       "userEmail": "denistogoro@gmail.com",
//       "userPass": 1229466149,
//       "userLevel": 100,
//       "userKids": ["Isabela Agostinho Fermi Ferreira Togoro"]
//     },
//     {
//       "userName": "Denise Mrad Cabral",
//       "userEmail": "demurad@gmail.com",
//       "userPass": 1168192729,
//       "userLevel": 100,
//       "userKids": ["Rayhan Massaud Mrad Cabral" , "Munna Massoud Mrad Cabral"]
//     },
//     {
//       "userName": "Diego Bentiboglio Piatti",
//       "userEmail": "diegopiatti@hotmail.com",
//       "userPass": 1214278930,
//       "userLevel": 100,
//       "userKids": ["Vicente Guimarães Bentiboglio"]
//     },
//     {
//       "userName": "Douglas Pereira de Lima",
//       "userEmail": "pereira_douglas@hotmail.com",
//       "userPass": 1228445357,
//       "userLevel": 100,
//       "userKids": ["Maria Luiza Valente de Lima"]
//     },
//     {
//       "userName": "Edson da Silva Rodrigues",
//       "userEmail": "esnrdgs@gmail.com",
//       "userPass": 1211972872,
//       "userLevel": 100,
//       "userKids": ["Alice Alcantara Rodrigues"]
//     },
//     {
//       "userName": "Eduardo de Orem Oliveira",
//       "userEmail": "eduorem@gmail.com",
//       "userPass": 1242453258,
//       "userLevel": 100,
//       "userKids": ["CARLOS EDUARDO SILVA OREM" , "Maria Barbosa Orem" , "Tomás Barbosa Orem"]
//     },
//     {
//       "userName": "Eduardo Frota Redigolo",
//       "userEmail": "eredigolo@yahoo.com.br",
//       "userPass": 1164027438,
//       "userLevel": 100,
//       "userKids": ["Luca Destre Redigolo"]
//     },
//     {
//       "userName": "Eliane dos Santos Alves",
//       "userEmail": "es_alves@yahoo.com.br",
//       "userPass": 1228742005,
//       "userLevel": 100,
//       "userKids": ["Gabriel Alves Ikeda" , "Sofia Alves Ikeda"]
//     },
//     {
//       "userName": "Eliane Nicollielo Derrico",
//       "userEmail": "elianederrico@yahoo.com.br",
//       "userPass": 1220951560,
//       "userLevel": 100,
//       "userKids": ["Matteo Nicoliello Derrico Brito de Souza"]
//     },
//     {
//       "userName": "Eliane Yuri Murao",
//       "userEmail": "elianemurao@hotmail.com",
//       "userPass": 1210664100,
//       "userLevel": 100,
//       "userKids": ["Daniel Murao Gentil Leite"]
//     },
//     {
//       "userName": "Elisa Emmerick",
//       "userEmail": "elisaemmerick@gmail.com",
//       "userPass": 1215955364,
//       "userLevel": 100,
//       "userKids": ["Lis Emmerick Vieira"]
//     },
//     {
//       "userName": "Eloisa Couto Taube Delfim",
//       "userEmail": "eloisataube93@gmail.com",
//       "userPass": 1221092455,
//       "userLevel": 100,
//       "userKids": ["Lucca Taube Delfim"]
//     },
//     {
//       "userName": "Erika Ravazzi Ramos Coli",
//       "userEmail": "erikaravazzi@yahoo.com.br",
//       "userPass": 1223602485,
//       "userLevel": 100,
//       "userKids": ["Rafaela Ravazzi Ramos Godinho Coli"]
//     },
//     {
//       "userName": "Fabiola Ramos de Freitas Padilha",
//       "userEmail": "fabiolafreitas21@hotmail.com",
//       "userPass": "123851988x",
//       "userLevel": 100,
//       "userKids": ["Sophie Freitas Padilha"]
//     },
//     {
//       "userName": "Fabiola Tamires dos Reis Plachta",
//       "userEmail": "fabiolaplachta.personal@gmail.com",
//       "userPass": 1157039753,
//       "userLevel": 100,
//       "userKids": ["Theo Plachta" , "Isabella Plachta"]
//     },
//     {
//       "userName": "Fausto Cruz",
//       "userEmail": "cruz.fausto@hotmail.com",
//       "userPass": 1230213454,
//       "userLevel": 100,
//       "userKids": ["Mateus Yunes Dias Cruz"]
//     },
//     {
//       "userName": "Felipe da Motta Barichello",
//       "userEmail": "felipebarrichello@ig.com.br",
//       "userPass": 1234253471,
//       "userLevel": 100,
//       "userKids": ["Antonio Flores de Souza Barichello" , "Benicio Flores de Souza Barichello"]
//     },
//     {
//       "userName": "Fernanda Calixto Brandão Costa",
//       "userEmail": "nanda_cbrandao@yahoo.com.br",
//       "userPass": 1283344556,
//       "userLevel": 100,
//       "userKids": ["Felipe Brandão Zeraick da Costa" , "Lucas Brandão Zeraick da Costa", "Paulo Brandão Zeraick da Costa"]
//     },
//     {
//       "userName": "Fernanda Cunha Fernandes",
//       "userEmail": "Fernanda.cunha@embraer.com.br",
//       "userPass": 1131529637,
//       "userLevel": 100,
//       "userKids": ["Emanuelah Cunha Fernandes" , "Theo Cunha Fernandes"]
//     },
//     {
//       "userName": "Fernanda Farah Loureiro Ardito",
//       "userEmail": "fernandafarahloureiro@yahoo.com.br",
//       "userPass": 1234255893,
//       "userLevel": 100,
//       "userKids": ["Filippo Ardito" , "Vito Ardito Filho"]
//     },
//     {
//       "userName": "Flávia Soares Amantéa Costa",
//       "userEmail": "flavia@efeitodesign.net",
//       "userPass": "116458019x",
//       "userLevel": 100,
//       "userKids": ["Theo Amantéa Costa"]
//     },
//     {
//       "userName": "Flávio Eduardo Pinheiro",
//       "userEmail": "flavio@claris.odo.br",
//       "userPass": "115630801x",
//       "userLevel": 100,
//       "userKids": ["Nicole de Moura Santos Pinheiro" , "Sophia de Moura Santos Pinheiro"]
//     },
//     {
//       "userName": "Francisco Bento Pereira",
//       "userEmail": "chico-bala@hotmail.com",
//       "userPass": 1204859711,
//       "userLevel": 100,
//       "userKids": ["Jhonny Rocha da Silva Pereira"]
//     },
//     {
//       "userName": "Gabriel Akio Shimoda",
//       "userEmail": "gshimoda@hotmail.com",
//       "userPass": 1202535446,
//       "userLevel": 100,
//       "userKids": ["Elena Yoko Cortez Shimoda" , "Elis Yumi Cortez Shimoda"]
//     },
//     {
//       "userName": "Gabriela da Silva Oliveira Heliotropio de Matos",
//       "userEmail": "profa.gabriela@hotmail.com",
//       "userPass": 1235639733,
//       "userLevel": 100,
//       "userKids": ["Clara Oliveira Heliotrópio de Matos" , "Victor Oliveira Heliotropio de Matos"]
//     },
//     {
//       "userName": "Gabriela de Araújo Fernandes",
//       "userEmail": "gabriella_fernandes08@hotmail.com",
//       "userPass": 1227379067,
//       "userLevel": 100,
//       "userKids": ["Antônio Fernandes Santos"]
//     },
//     {
//       "userName": "Gabriela Guadalajara G Fernandes",
//       "userEmail": "gabriela_guadalajara@hotmail.com",
//       "userPass": 1227171407,
//       "userLevel": 100,
//       "userKids": ["Pedro Paulo Guadalajara Valeriani" , "Valentina Guadalajara Valeriani"]
//     },
//     {
//       "userName": "Gabriela Padua Vicentini Chacon",
//       "userEmail": "gabriela@grupogtv.com",
//       "userPass": "122090501X",
//       "userLevel": 100,
//       "userKids": ["Isabella Vicentini Chacon" , "Laura Vicentini Chacon"]
//     },
//     {
//       "userName": "Gerson Fabre Marção",
//       "userEmail": "fabregerson@gmail.com",
//       "userPass": 1139702920,
//       "userLevel": 100,
//       "userKids": ["Angelina Borges Marção"]
//     },
//     {
//       "userName": "GIMENES DOS REIS GOMES",
//       "userEmail": "gimenesrg@gmail.com",
//       "userPass": 1225977848,
//       "userLevel": 100,
//       "userKids": ["Eleonora Reis da Paz" , "Theodora Reis Da Paz"]
//     },
//     {
//       "userName": "Giovana Manfro Rorato",
//       "userEmail": "gmrorato@gmail.com",
//       "userPass": 1220948767,
//       "userLevel": 100,
//       "userKids": ["Nicolas Rorato do Espírito Santo"]
//     },
//     {
//       "userName": "Gisele Moreira Beraldo de Toledo",
//       "userEmail": "gijaberaldo@hotmail.com",
//       "userPass": 1228980251,
//       "userLevel": 100,
//       "userKids": ["Bernardo Beraldo de Toledo"]
//     },
//     {
//       "userName": "Giuliano Pennacchi Moreira",
//       "userEmail": "giulianopm@uol.com.br",
//       "userPass": "121569796x",
//       "userLevel": 100,
//       "userKids": ["Gustavo Bueno Moreira" , "Luisa Bueno Moreira" , "Thais Bueno Moreira"]
//     },
//     {
//       "userName": "Guilherme Martins de Andrade Bendini",
//       "userEmail": "guilherme.bendini@gmail.com",
//       "userPass": 1220918684,
//       "userLevel": 100,
//       "userKids": ["Arthur Peixoto Martins Bendini" , "Valentina Peixoto Martins Bendini"]
//     },
//     {
//       "userName": "Gustavo Paixão Macedo",
//       "userEmail": "gustavo.macedo@volkswagen.com.br",
//       "userPass": 1119710443,
//       "userLevel": 100,
//       "userKids": ["Marcela Campello Macedo"]
//     },
//     {
//       "userName": "Gustavo Tallia Loducca",
//       "userEmail": "gustavo.tallia@gmail.com",
//       "userPass": 1167703200,
//       "userLevel": 100,
//       "userKids": ["Bento Beltrão Loducca" , "Martin Beltrão Loducca"]
//     },
//     {
//       "userName": "Hevandro Vaz Ricardo",
//       "userEmail": "hevandrovaz@yahoo.com.br",
//       "userPass": 1220947271,
//       "userLevel": 100,
//       "userKids": ["Laura Muratori Ricardo"]
//     },
//     {
//       "userName": "Hubert Ngakam Monthe",
//       "userEmail": "monthehubert@yahoo.fr",
//       "userPass": 1223526422,
//       "userLevel": 100,
//       "userKids": ["Noha Gabriel Yendé Monthe"]
//     },
//     {
//       "userName": "Isabela de Bona",
//       "userEmail": "Isabela.bonna@bol.com.br",
//       "userPass": 1203068402,
//       "userLevel": 100,
//       "userKids": ["Luiza de Bona Gauch"]
//     },
//     {
//       "userName": "Jacqueline Ferreira da Cruz",
//       "userEmail": "jacque-cruz@hotmail.com",
//       "userPass": 1204290878,
//       "userLevel": 100,
//       "userKids": ["Maria Flor Baptista da Cruz"]
//     },
//     {
//       "userName": "Janaina de Souza Monteiro Miranda",
//       "userEmail": "janamonteiro@hotmail.com",
//       "userPass": 1210758003,
//       "userLevel": 100,
//       "userKids": ["Miguel Monteiro de Miranda"]
//     },
//     {
//       "userName": "Jéssica de Oliveira Barreto",
//       "userEmail": "jessikkaoliveira20@gmail.com",
//       "userPass": "122786999x",
//       "userLevel": 100,
//       "userKids": ["Ísis Cardoso Fernandes de Oliveira"]
//     },
//     {
//       "userName": "Jéssyca Negrini Sene",
//       "userEmail": "jessica.sene@gmail.com",
//       "userPass": 1226729216,
//       "userLevel": 100,
//       "userKids": ["Valentina Negrini Biase"]
//     },
//     {
//       "userName": "João Marcelo Faro Pereira Leite",
//       "userEmail": "marcelo-faro@hotmail.com",
//       "userPass": 1238528715,
//       "userLevel": 100,
//       "userKids": ["Leonardo Morais Montemor Faro"]
//     },
//     {
//       "userName": "Jose Elias Cavalcanti Netto",
//       "userEmail": "cavalcantinetto@hotmail.com",
//       "userPass": 1150301958,
//       "userLevel": 100,
//       "userKids": ["Eduardo Siqueira Cavalcanti" , "Gabriel Siqueira Cavalcanti"]
//     },
//     {
//       "userName": "José Humberto Cintra de Souza",
//       "userEmail": "cadhumberto@gmail.com",
//       "userPass": 1210685504,
//       "userLevel": 100,
//       "userKids": ["Lauren Costa de Souza"]
//     },
//     {
//       "userName": "José Vitor dos Santos Bispado Junior",
//       "userEmail": "vitor@xslice.com.br",
//       "userPass": 1228859991,
//       "userLevel": 100,
//       "userKids": ["Manuela Gaeta dos Reis Bispado" , "Valentina Gaeta dos Reis Bispado"]
//     },
//     {
//       "userName": "Joseli Senra de Oliveira Delamico",
//       "userEmail": "josysenra@yahoo.com.br",
//       "userPass": 1228816438,
//       "userLevel": 100,
//       "userKids": ["Ana Laura Senra Delamico" , "Miguel Senra Delamico"]
//     },
//     {
//       "userName": "Juliana Holanda da Silva Veloso de Oliveira",
//       "userEmail": "juholandasilva@gmail.com",
//       "userPass": 1222807701,
//       "userLevel": 100,
//       "userKids": ["Luíza Holanda da Silva Veloso de Oliveira"]
//     },
//     {
//       "userName": "Juliana Moreira Moscardini",
//       "userEmail": "juliana.moscardini@gmail.com",
//       "userPass": 1156684201,
//       "userLevel": 100,
//       "userKids": ["Luisa Moscardini Figueira" , "Samuel Moscardini Figueira"]
//     },
//     {
//       "userName": "Juliana Santos Baptista",
//       "userEmail": "juli.batiata@gmail.com",
//       "userPass": 1157544770,
//       "userLevel": 100,
//       "userKids": ["Sara Giacomazzi"]
//     },
//     {
//       "userName": "Julio Lerario Neto",
//       "userEmail": "julio@oggisorvetes.com.br",
//       "userPass": 1228768754,
//       "userLevel": 100,
//       "userKids": ["Sergio Mauad Lerario"]
//     },
//     {
//       "userName": "Kaline Jessiane Gomes Padilha",
//       "userEmail": "kalinejgpadilha@gmail.com",
//       "userPass": 1168169665,
//       "userLevel": 100,
//       "userKids": ["Miguel Gomes Padilha" , "Mariah Gomes Padilha"]
//     },
//     {
//       "userName": "Karime Barboza Ferreira",
//       "userEmail": "karime.barboza@gmail.com",
//       "userPass": 1237134924,
//       "userLevel": 100,
//       "userKids": ["Davi Barboza Ferreira"]
//     },
//     {
//       "userName": "Kelly Cristina de Castro Soares Bernardo",
//       "userEmail": "kellybernardo971@gmail.com",
//       "userPass": 1142665586,
//       "userLevel": 100,
//       "userKids": ["Larissa de Castro Soares Bernardo"]
//     },
//     {
//       "userName": "Kleice Regiane Macedo de Assis Araújo",
//       "userEmail": "kleiceassis@gmail.com",
//       "userPass": 1129461129,
//       "userLevel": 100,
//       "userKids": ["Matheus Assis Araújo"]
//     },
//     {
//       "userName": "Larissa Whately Paiva",
//       "userEmail": "lawhately@gmail.com",
//       "userPass": 1239440236,
//       "userLevel": 100,
//       "userKids": ["Luísa Silva dos Santos"]
//     },
//     {
//       "userName": "Laura Liz Vanset Giacomet",
//       "userEmail": "lauralizzz@hotmail.com",
//       "userPass": 1214784276,
//       "userLevel": 100,
//       "userKids": ["Bianca Vanset Giacomet"]
//     },
//     {
//       "userName": "Leandro Augusto Alves",
//       "userEmail": "leandroaugustoalves@yahoo.com.br",
//       "userPass": 1228886957,
//       "userLevel": 100,
//       "userKids": ["Anne Nardy Alves" , "Bernardo Nardy Alves"]
//     },
//     {
//       "userName": "Leandro Marcos Ferrari de Almeida",
//       "userEmail": "psicologoleandroferrari@hotmail.com",
//       "userPass": 1228800261,
//       "userLevel": 100,
//       "userKids": ["Rafael Cossermelli Ferrari de Almeida"]
//     },
//     {
//       "userName": "Leonardo Martin",
//       "userEmail": "leomartin09@gmail.com",
//       "userPass": 1165732178,
//       "userLevel": 100,
//       "userKids": ["Nicolas Duarte Martin"]
//     },
//     {
//       "userName": "Leonel Viotti Dias da Silva",
//       "userEmail": "leoviotti@leoviotti.com",
//       "userPass": 1228351983,
//       "userLevel": 100,
//       "userKids": ["Ana Sofia Tan Viotti"]
//     },
//     {
//       "userName": "Lícia Vieira Santos Gersely",
//       "userEmail": "liciapvs86@gmail.com",
//       "userPass": 1228741244,
//       "userLevel": 100,
//       "userKids": ["Caio Pereira Vieira Gersely" , "Manuela Pereira Vieira Gersely"]
//     },
//     {
//       "userName": "Lívia Lopes de Oliveira",
//       "userEmail": "livialopes55@gmail.com",
//       "userPass": 1216917425,
//       "userLevel": 100,
//       "userKids": ["Manuella Lopes de Arruda"]
//     },
//     {
//       "userName": "Lizzie Isaura Contreras Rivadeneyra",
//       "userEmail": "lizzie_cr89@hotmail.com",
//       "userPass": 1242515549,
//       "userLevel": 100,
//       "userKids": ["Ailin Versiani Scott Rivadeneyra"]
//     },
//     {
//       "userName": "Luandra Carolina Pimenta Pioli",
//       "userEmail": "luandrapimenta@hotmail.com",
//       "userPass": 1234230021,
//       "userLevel": 100,
//       "userKids": ["Felipe Pimenta Pioli" , "Marcelo Pimenta Pioli"]
//     },
//     {
//       "userName": "Lucas Vasconcelos Nunes de Oliveira",
//       "userEmail": "lucasvasconcelos16@hotmail.com",
//       "userPass": 1215633956,
//       "userLevel": 100,
//       "userKids": ["Antônio Bonani Leite Vasconcelos"]
//     },
//     {
//       "userName": "Luciane Ogata Perrenoud",
//       "userEmail": "lucianeogata@yahoo.com.br",
//       "userPass": 1210666236,
//       "userLevel": 100,
//       "userKids": ["Clara Ogata Perrenoud" , "Lis Ogata Perrenoud"]
//     },
//     {
//       "userName": "Luciano Marques",
//       "userEmail": "luciano@aromax.com.br",
//       "userPass": 1202484979,
//       "userLevel": 100,
//       "userKids": ["Laura Costa Marques" , "Miguel Costa Marques"]
//     },
//     {
//       "userName": "Lúcio Flávio Brito Ribeiro",
//       "userEmail": "luciobribeiro@gmail.com",
//       "userPass": 1204376451,
//       "userLevel": 100,
//       "userKids": ["Davi Lucchiari Ribeiro"]
//     },
//     {
//       "userName": "Luis Carlos Viana do Carmo Junior",
//       "userEmail": "vianaicm@yahoo.com.br",
//       "userPass": 1229385344,
//       "userLevel": 100,
//       "userKids": ["Clarice Tagliatti Viana"]
//     },
//     {
//       "userName": "Luiz Augusto Valério",
//       "userEmail": "aguvalerio@me.com",
//       "userPass": 1139768244,
//       "userLevel": 100,
//       "userKids": ["Luiz Gustavo Cotrim Valério"]
//     },
//     {
//       "userName": "Luiz Barroso de Brito",
//       "userEmail": "luiz@britoedias.adv.br",
//       "userPass": 1138815093,
//       "userLevel": 100,
//       "userKids": ["Felipe Rocha de Brito" , "Luiza Rocha de Brito"]
//     },
//     {
//       "userName": "Luiz Claudio Lotufo Aguiar",
//       "userEmail": "luizlotufo17@gmail.com",
//       "userPass": 1148743777,
//       "userLevel": 100,
//       "userKids": ["Victor Augusto Tupinambá Aguiar"]
//     },
//     {
//       "userName": "Luiz Eduardo Yamada",
//       "userEmail": "eduyamada@yahoo.com.br",
//       "userPass": 1168230603,
//       "userLevel": 100,
//       "userKids": ["Augusto Hirokazu Yamada" , "Heloisa Yumi  Yamada"]
//     },
//     {
//       "userName": "Luiz Guilherme Fenício Antonino",
//       "userEmail": "gui.antonino18@gmail.com",
//       "userPass": 1204082182,
//       "userLevel": 100,
//       "userKids": ["Mariana Camargo Antonino"]
//     },
//     {
//       "userName": "Luiz Gustavo de Moraes Candido",
//       "userEmail": "lgm_candido@yahoo.com.br",
//       "userPass": 1202489072,
//       "userLevel": 100,
//       "userKids": ["Matheus Mendes Candido"]
//     },
//     {
//       "userName": "Luiz Henrique Gomes Pereira",
//       "userEmail": "lhgpereira@gmail.com",
//       "userPass": 1242598686,
//       "userLevel": 100,
//       "userKids": ["Letícia Lampert Pereira"]
//     },
//     {
//       "userName": "Luiz Paulo Nogueira Santos",
//       "userEmail": "luizpaulo_nsantos@hotmail.com",
//       "userPass": 1228012520,
//       "userLevel": 100,
//       "userKids": ["Heloísa Lopes Nogueira"]
//     },
//     {
//       "userName": "Luiz Ricardo Mafetano",
//       "userEmail": "lrmafetano@hotmail.com",
//       "userPass": "116402615x",
//       "userLevel": 100,
//       "userKids": ["Lara Lauria Mafetano" , "Sofia Lauria Mafetano"]
//     },
//     {
//       "userName": "Luiza Chaves dos Santos",
//       "userEmail": "lu_chaves@hotmail.com",
//       "userPass": 1212762563,
//       "userLevel": 100,
//       "userKids": ["Antonella Chaves dos Santos Hamzagic Mendes"]
//     },
//     {
//       "userName": "Marcela Chiste Bueno Pinto",
//       "userEmail": "marcelachiste@gmail.com",
//       "userPass": 1149317115,
//       "userLevel": 100,
//       "userKids": ["Marina Chiste Silva"]
//     },
//     {
//       "userName": "Marcela Damasceno Tolentino",
//       "userEmail": "mar_dam@hotmail.com",
//       "userPass": 1163904612,
//       "userLevel": 100,
//       "userKids": ["Beatriz Damasceno Tolentino" , "Alicia Damasceno Tolentino"]
//     },
//     {
//       "userName": "Marcela Gama de Freitas",
//       "userEmail": "marcela_597@hotmail.com",
//       "userPass": 1164963867,
//       "userLevel": 100,
//       "userKids": ["Maria Carolina Freitas Villaça"]
//     },
//     {
//       "userName": "Marcelo Abramoff Continentino",
//       "userEmail": "marabra@outlook.com",
//       "userPass": 1209812897,
//       "userLevel": 100,
//       "userKids": ["David Abramoff Continentino"]
//     },
//     {
//       "userName": "Marcelo Reno da Cruz",
//       "userEmail": "reno_marcelo@yahoo.com.br",
//       "userPass": 1202483495,
//       "userLevel": 100,
//       "userKids": ["Nicolas Coutinho Reno Cassia Cruz"]
//     },
//     {
//       "userName": "Marcos Aurélio Nogarotto",
//       "userEmail": "aurelionogarotto@gmail.com",
//       "userPass": 1149928165,
//       "userLevel": 100,
//       "userKids": ["Nycole Martins Nogarotto"]
//     },
//     {
//       "userName": "Marcos Campos de Sá Rodrigues",
//       "userEmail": "marcos@kikoautos.com",
//       "userPass": 1227194547,
//       "userLevel": 100,
//       "userKids": ["Isabela Pessoa Campos Rodrigues" , "Manuela Pessoa Campos Rodrigues"]
//     },
//     {
//       "userName": "Marcos Paulo de Sousa",
//       "userEmail": "marcos.pauloict@gmail.com",
//       "userPass": 1234233782,
//       "userLevel": 100,
//       "userKids": ["João Pedro de Miranda Sousa"]
//     },
//     {
//       "userName": "Marcos Rogerio Setta",
//       "userEmail": "sellamercante@yahoo.com.br",
//       "userPass": 1168193898,
//       "userLevel": 100,
//       "userKids": ["Eva da Mata Sella"]
//     },
//     {
//       "userName": "Maria Carolina Domingos Cardoso Franco",
//       "userEmail": "carolinadomingos@msn.com",
//       "userPass": 1167703030,
//       "userLevel": 100,
//       "userKids": ["João Otávio Domingos Camargo Franco"]
//     },
//     {
//       "userName": "Maria Celeste dos Santos Gomes",
//       "userEmail": "celestedossantosgomesmaria@gmail.com",
//       "userPass": 1158593570,
//       "userLevel": 100,
//       "userKids": ["Sophia de Paula Gomes"]
//     },
//     {
//       "userName": "Maria Eduarda Santos da Silva",
//       "userEmail": "dudaaferreira_@outlook.com",
//       "userPass": 1225589800,
//       "userLevel": 100,
//       "userKids": ["Mariah Ferreira Presoti"]
//     },
//     {
//       "userName": "Maria Fernanda Canavezi de Paiva",
//       "userEmail": "mfernanda.canavezi@gmail.com",
//       "userPass": 1167012203,
//       "userLevel": 100,
//       "userKids": ["Lorena Canavezi Moura" , "Thomaz Canavezi Moura"]
//     },
//     {
//       "userName": "Maria Fernanda Polimena Franco",
//       "userEmail": "mfernanda_22@hotmail.com",
//       "userPass": "123423337X",
//       "userLevel": 100,
//       "userKids": ["João Pedro Polimêno Franco" , "Maria Clara Polimeno Franco"]
//     },
//     {
//       "userName": "Maria Norbis",
//       "userEmail": "merynorbis@hotmail.com",
//       "userPass": 1122356345,
//       "userLevel": 100,
//       "userKids": ["Sofia Norbis Alencar" , "Pedro Norbis Alencar"]
//     },
//     {
//       "userName": "Maria Sylvia Bortoleto Higuchi",
//       "userEmail": "mariasylviab@terra.com.br",
//       "userPass": 1158939760,
//       "userLevel": 100,
//       "userKids": ["Maria Clara Bortoleto Higuchi" , "Maria Julia Bortoleto Higuchi"]
//     },
//     {
//       "userName": "Maria Vanilda dos Santos Luna",
//       "userEmail": "corretoravanilda@gmail.com",
//       "userPass": 1165145170,
//       "userLevel": 100,
//       "userKids": ["Vivian Santos Luna"]
//     },
//     {
//       "userName": "Mariah Taube",
//       "userEmail": "mariahprata@hotmail.com",
//       "userPass": 1168194106,
//       "userLevel": 100,
//       "userKids": ["Joaquim Otto Soldi Taube"]
//     },
//     {
//       "userName": "Mariana Angelo Pinto",
//       "userEmail": "nana.angelo@gmail.com",
//       "userPass": 1228866685,
//       "userLevel": 100,
//       "userKids": ["Maria Fernanda Pinto Berger"]
//     },
//     {
//       "userName": "Mariana de Loiola Guerreiro Mrad",
//       "userEmail": "marilogue@bol.com.br",
//       "userPass": 1215871430,
//       "userLevel": 100,
//       "userKids": ["Layla Guerreiro Mrad" , 'Rafael Guerreiro Mrad' , 'Yasmin Guerreiro Mrad']
//     },
//     {
//       "userName": "Mariana de Souza Okabe",
//       "userEmail": "okabe.mariana@gmail.com",
//       "userPass": 1215730391,
//       "userLevel": 100,
//       "userKids": ["Manuela Okabe Monteiro"]
//     },
//     {
//       "userName": "Mariana Domingues Alvarenga",
//       "userEmail": "alvarenga.mda@gmail.com",
//       "userPass": 1238651926,
//       "userLevel": 100,
//       "userKids": ["Helena Alvarenga da Silva"]
//     },
//     {
//       "userName": "Mariane Alves da Mata",
//       "userEmail": "marianealves.14@hotmail.com",
//       "userPass": 1245212968,
//       "userLevel": 100,
//       "userKids": ["Lucas da Mata Agostini" , "Samuel da Mata Mesquita"]
//     },
//     {
//       "userName": "Marina Mello Alves Correa",
//       "userEmail": "marinamello1984@gmail.com",
//       "userPass": 1220956089,
//       "userLevel": 100,
//       "userKids": ["Martina Correa Megda"]
//     },
//     {
//       "userName": "Marina Wandaleti Amoroso",
//       "userEmail": "marina.wamoroso@gmail.com",
//       "userPass": 1229445006,
//       "userLevel": 100,
//       "userKids": ["Catarina Amoroso Ribeiro"]
//     },
//     {
//       "userName": "Marlene Aparecida Gonçalves Guimarães",
//       "userEmail": "marlene@sorvepan.com.br",
//       "userPass": 1159220050,
//       "userLevel": 100,
//       "userKids": ["Gustavo Gonçalves Guimarães Severo"]
//     },
//     {
//       "userName": "Matheus Godinho Coli",
//       "userEmail": "gerencia@tpttransportes.com.br",
//       "userPass": "122561563x",
//       "userLevel": 100,
//       "userKids": ["Rafael de Paula Godinho Coli"]
//     },
//     {
//       "userName": "Maurício Ricardo Pereira",
//       "userEmail": "mauricio.pereira@gmail.com",
//       "userPass": "114753424x",
//       "userLevel": 100,
//       "userKids": ["Luiz Octavio Monteiro Pereira"]
//     },
//     {
//       "userName": "Mauro Braz de Linica Jùnior",
//       "userEmail": "mauro.linica@gmail.com",
//       "userPass": 1234215822,
//       "userLevel": 100,
//       "userKids": ["Augusto Saar de Linica"]
//     },
//     {
//       "userName": "Mayara Alves Ribeiro",
//       "userEmail": "ribeiromayara@live.com",
//       "userPass": 1215910721,
//       "userLevel": 100,
//       "userKids": ["Benício Ribeiro Penaranda" , "Lorena Ribeiro Peñaranda" , "Malu Ribeiro Penaranda"]
//     },
//     {
//       "userName": "Maylle Cristiane Emmerick",
//       "userEmail": "maylle.emmerick@gmail.com",
//       "userPass": 1226746810,
//       "userLevel": 100,
//       "userKids": ["Heitor Emmerick Moreira"]
//     },
//     {
//       "userName": "Melina Clara Pascoli Camargo Lucchesi",
//       "userEmail": "dramelinalucchesi@gmail.com",
//       "userPass": 1215872732,
//       "userLevel": 100,
//       "userKids": ["Vicenzo Lucchesi"]
//     },
//     {
//       "userName": "Mirella Karina Sebastiao",
//       "userEmail": "mirellakarin@gmail.com",
//       "userPass": 1165116364,
//       "userLevel": 100,
//       "userKids": ["Mateo Montes Santos"]
//     },
//     {
//       "userName": "Miriam de Sousa França",
//       "userEmail": "msffaria@gmail.com",
//       "userPass": 1202487543,
//       "userLevel": 100,
//       "userKids": ["Larissa França Dias"]
//     },
//     {
//       "userName": "Miriam Rumi Furuno",
//       "userEmail": "mrumifuruno@gmail.com",
//       "userPass": 1242753667,
//       "userLevel": 100,
//       "userKids": ["Julia Mai Furuno Resende" , "Henrique Hayao Furuno Resende"]
//     },
//     {
//       "userName": "Mohamad Nagib Smidi",
//       "userEmail": "mohamad_nagib_smidi@hotmail.com",
//       "userPass": 1228741815,
//       "userLevel": 100,
//       "userKids": ["Sarah Mohamad Smidi" , "Soraia Mohamad Smidi"]
//     },
//     {
//       "userName": "Mônica Denise Manetti",
//       "userEmail": "monica.d.manetti@gmail.com",
//       "userPass": 1202490190,
//       "userLevel": 100,
//       "userKids": ["Catarina Manetti" , "Mauricio Manetti"]
//     },
//     {
//       "userName": "Monica Mayumi Inaba",
//       "userEmail": "monica_inaba@yahoo.com.br",
//       "userPass": 1220977159,
//       "userLevel": 100,
//       "userKids": ["Rafael Hiroshi Inaba Castilho"]
//     },
//     {
//       "userName": "Monique Costa Moreira França",
//       "userEmail": "monique-costa@hotmail.com",
//       "userPass": 1207545107,
//       "userLevel": 100,
//       "userKids": ["Sofia Moreira França"]
//     },
//     {
//       "userName": "Nagham Nagib Smaidi",
//       "userEmail": "naghamsmidi@hotmail.com",
//       "userPass": 1168194209,
//       "userLevel": 100,
//       "userKids": ["Muhamad Taha Saifi" , "Soraia Saifi" , "Omar Taha Saifi"]
//     },
//     {
//       "userName": "Natalia Mariane Oliveira de Miranda",
//       "userEmail": "natalia540@hotmail.com",
//       "userPass": 115781365,
//       "userLevel": 100,
//       "userKids": ["Felipe Oliveira Miranda" , "Rafaela Oliveira Miranda"]
//     },
//     {
//       "userName": "Nathalia Alves Migoto",
//       "userEmail": "nathalia.migoto@gmail.com",
//       "userPass": 1245004992,
//       "userLevel": 100,
//       "userKids": ["Luísa Migoto Morassi"]
//     },
//     {
//       "userName": "Nathalia Sanchez Torres",
//       "userEmail": "nathalia_torres3@hotmail.com",
//       "userPass": 1228930417,
//       "userLevel": 100,
//       "userKids": ["Miguel Augusto Torres Esteves"]
//     },
//     {
//       "userName": "Nelson Leandro Reis",
//       "userEmail": "lefutsal14@hotmail.com",
//       "userPass": 1144674293,
//       "userLevel": 100,
//       "userKids": ["Guilherme Cappeletti Reis"]
//     },
//     {
//       "userName": "Nelson Ricardo Benites",
//       "userEmail": "benitesnr@gmail.com",
//       "userPass": 1168193795,
//       "userLevel": 100,
//       "userKids": ["Estevan Benites" , "Ramon Benites" , "Serena Benites"]
//     },
//     {
//       "userName": "Nicky Tavares Pereira",
//       "userEmail": "nickytp@hotmail.com",
//       "userPass": "123415531x",
//       "userLevel": 100,
//       "userKids": ["Bryan Ferreira Pereira"]
//     },
//     {
//       "userName": "Nicolas Raugust Herren",
//       "userEmail": "nicolasherren@yahoo.com.br",
//       "userPass": 1225586355,
//       "userLevel": 100,
//       "userKids": ["Gisele Almeida Herren"]
//     },
//     {
//       "userName": "Nicolle de Souza Alcantara da Silva",
//       "userEmail": "nicolle.0810@hotmail.com",
//       "userPass": 1220973877,
//       "userLevel": 100,
//       "userKids": ["Helena Alcantara de Souza"]
//     },
//     {
//       "userName": "Pamela Terra",
//       "userEmail": "pam_terra@hotmail.com",
//       "userPass": 1140065907,
//       "userLevel": 100,
//       "userKids": ["Matheus Terra Gonçalves"]
//     },
//     {
//       "userName": "Paola Suellen Rodrigues",
//       "userEmail": "paola.rodrigues64@gmail.com",
//       "userPass": 1140679491,
//       "userLevel": 100,
//       "userKids": ["Helena Rodrigues dos Santos"]
//     },
//     {
//       "userName": "Patrícia Dias",
//       "userEmail": "pdias@maplebeartaubate.com.br",
//       "userPass": 1225591454,
//       "userLevel": 100,
//       "userKids": ["Igor Dias Sprogis dos Santos"]
//     },
//     {
//       "userName": "Patrícia Glathardt D. M. Novelletto",
//       "userEmail": "patyglathardt@hotmail.com",
//       "userPass": 1164045258,
//       "userLevel": 100,
//       "userKids": ["Lorenzo Dias Novelletto" , "Nicholas Dias Novelletto"]
//     },
//     {
//       "userName": "Patricia Hidalgo",
//       "userEmail": "pahidalgo.melo@yahoo.com.br",
//       "userPass": 1168191889,
//       "userLevel": 100,
//       "userKids": ["Júlia Hidalgo Oliveira Melo" , "Lara Hidalgo Oliveira Melo"]
//     },
//     {
//       "userName": "Patricia Mara da Silva",
//       "userEmail": "patricia.maraa@hotmail.com",
//       "userPass": 1230567781,
//       "userLevel": 100,
//       "userKids": ["Mikael Katsuo Shibata"]
//     },
//     {
//       "userName": "Paula Barroso de Brito",
//       "userEmail": "paula.barroso.brito@gmail.com",
//       "userPass": 1220222501,
//       "userLevel": 100,
//       "userKids": ["Manuela de Brito Gadioli Cortez"]
//     },
//     {
//       "userName": "Paula Barroso de Melo Haiachi",
//       "userEmail": "paulahaiachi@gmail.com",
//       "userPass": 1139185949,
//       "userLevel": 100,
//       "userKids": ["Isabella Sayuri de Melo Haiachi"]
//     },
//     {
//       "userName": "Paula Beiruth Quental Barbosa",
//       "userEmail": "paulinhabq@yahoo.com.br",
//       "userPass": 1157761975,
//       "userLevel": 100,
//       "userKids": ["João Felipe Quental Barbosa"]
//     },
//     {
//       "userName": "Paula Furtado Nossaes",
//       "userEmail": "paulafurt@hotmail.com",
//       "userPass": 1168170849,
//       "userLevel": 100,
//       "userKids": ["Tomás Furtado Nossaes"]
//     },
//     {
//       "userName": "Paula Gizzi de Almeida Pedroso",
//       "userEmail": "paulagizzi@gmail.com",
//       "userPass": 1234229158,
//       "userLevel": 100,
//       "userKids": ["Lucca de Almeida Pedroso Guirado" , "Enzo de Almeida Pedroso Guirado"]
//     },
//     {
//       "userName": "Paulo Sérgio de Castilho Júnior",
//       "userEmail": "paulosergio.castilho@gmail.com",
//       "userPass": 1234254025,
//       "userLevel": 100,
//       "userKids": ["Marina Bastos Ferreira de Castilho"]
//     },
//     {
//       "userName": "Pollyanna Rodrigues Dias da Costa Belieny",
//       "userEmail": "pollyannabelieny@gmail.com",
//       "userPass": 1237023294,
//       "userLevel": 100,
//       "userKids": ["Noah Rodrigues Dias Belieny" , "Luana Rodrigues Dias Belieny" , "Thais Rodrigues Dias de Melo"]
//     },
//     {
//       "userName": "Priscila Graziela Jenner",
//       "userEmail": "jennerpriscila@gmail.com",
//       "userPass": 1204352768,
//       "userLevel": 100,
//       "userKids": ["Luiz Gustavo Jenner da Silva"]
//     },
//     {
//       "userName": "Priscila March Garcia",
//       "userEmail": "magnetica2009@gmail.com",
//       "userPass": 1148108932,
//       "userLevel": 100,
//       "userKids": ["Daniel March Garcia Castro"]
//     },
//     {
//       "userName": "Rafael Montenegro Ahmed",
//       "userEmail": "rafaahmed@hotmail.com",
//       "userPass": 1237031461,
//       "userLevel": 100,
//       "userKids": ["Alice Biaso Montenegro Felix Ahmed" , "Lucas Biaso Montenegro Félix Ahmed" , "Sofia Biaso Montenegro Félix Ahmed"]
//     },
//     {
//       "userName": "Raquel A Oliveira Peixoto",
//       "userEmail": "peixoto_raquel@hotmail.com",
//       "userPass": 1238929746,
//       "userLevel": 100,
//       "userKids": ["Giovana Oliveira Peixoto"]
//     },
//     {
//       "userName": "Rayane Ferreira dos Santos",
//       "userEmail": "rayanecruz480@gmail.com",
//       "userPass": 1215690769,
//       "userLevel": 100,
//       "userKids": ["Luiza dos Santos Cruz"]
//     },
//     {
//       "userName": "Rayda Melissa Belone Narazaki",
//       "userEmail": "rmbelone@hotmail.com",
//       "userPass": 1140397151,
//       "userLevel": 100,
//       "userKids": ["Ana Laura Belone Narazaki"]
//     },
//     {
//       "userName": "Renata Pereira Machado",
//       "userEmail": "mirellacalcados@hotmail.com",
//       "userPass": 1202096256,
//       "userLevel": 100,
//       "userKids": ["Miguel Guido Machado Celete"]
//     },
//     {
//       "userName": "Renato do Nascimento Pereira",
//       "userEmail": "renatonp@gmail.com",
//       "userPass": 1203450989,
//       "userLevel": 100,
//       "userKids": ["Lara Rezende do Nascimento"]
//     },
//     {
//       "userName": "Ricardo Silveira Polo",
//       "userEmail": "ricardosilpolo@gmail.com",
//       "userPass": 1228874104,
//       "userLevel": 100,
//       "userKids": ["Benjamin Targa Polo"]
//     },
//     {
//       "userName": "Robson Silva da Paz",
//       "userEmail": "robson_paz@hotmail.com",
//       "userPass": "121258837x",
//       "userLevel": 100,
//       "userKids": ["João Alcantara da Paz"]
//     },
//     {
//       "userName": "Rodrigo Alessandro Cabral Da Silva",
//       "userEmail": "direcao@tempervale.com",
//       "userPass": 1234230653,
//       "userLevel": 100,
//       "userKids": ["Antonella Siqueira Cabral"]
//     },
//     {
//       "userName": "Rodrigo Camargo",
//       "userEmail": "rodrigo.camargo@rccorretora.com",
//       "userPass": 1166573485,
//       "userLevel": 100,
//       "userKids": ["Davi de Castro Camargo" , "Júlia de Castro Camargo"]
//     },
//     {
//       "userName": "Rodrigo de Campos Gomes",
//       "userEmail": "email.goma@gmail.com",
//       "userPass": 1129460344,
//       "userLevel": 100,
//       "userKids": ["Rodrigo Barbosa de Campos Gomes"]
//     },
//     {
//       "userName": "Rodrigo Rossi Guerra",
//       "userEmail": "rodrigorrg@hotmail.com",
//       "userPass": 1220227948,
//       "userLevel": 100,
//       "userKids": ["Lara Neves Guerra"]
//     },
//     {
//       "userName": "Ronaldo Lira Araujo",
//       "userEmail": "ronaldo.lira.araujo@hotmail.com",
//       "userPass": 1225569217,
//       "userLevel": 100,
//       "userKids": ["Carolina Martins Araujo"]
//     },
//     {
//       "userName": "Rosana Aparecida da Cruz Barros",
//       "userEmail": "rosanaracb@gmail.com",
//       "userPass": "122097583 7",
//       "userLevel": 100,
//       "userKids": ["Maria Gabriela da Cruz Barros"]
//     },
//     {
//       "userName": "Rubens Lobo Almeida",
//       "userEmail": "rubensalmeida19@hotmail.com",
//       "userPass": 116819732,
//       "userLevel": 100,
//       "userKids": ["Mariah Peixoto Almeida"]
//     },
//     {
//       "userName": "Silvia Helena Marcondes Fernandes",
//       "userEmail": "lena_psiq@hotmail.com",
//       "userPass": 1221021011,
//       "userLevel": 100,
//       "userKids": ["Henrique Marcondes Fernandes" , "Adam Marcondes Fernandes"]
//     },
//     {
//       "userName": "Silvia Ribeiro do Val Pavan",
//       "userEmail": "silviadoval@hotmail.com",
//       "userPass": 1212899167,
//       "userLevel": 100,
//       "userKids": ["Isadora do Val Pavan"]
//     },
//     {
//       "userName": "Simone Heliotropio de Matos",
//       "userEmail": "sihmatos@hotmail.com",
//       "userPass": 1168193370,
//       "userLevel": 100,
//       "userKids": ["Maitê Heliotropio de Matos Guimarães"]
//     },
//     {
//       "userName": "Tahiana Chamoun Marchon Dupas Ribeiro",
//       "userEmail": "tahianam@hotmail.com",
//       "userPass": "121066494x",
//       "userLevel": 100,
//       "userKids": ["Helena Chamoun Marchon Dupas Ribeiro" , "Rafael Chamoun Marchon Dupas Ribeiro"]
//     },
//     {
//       "userName": "Tatiana Bisson Welter",
//       "userEmail": "tatibw@hotmail.com",
//       "userPass": 1165937682,
//       "userLevel": 100,
//       "userKids": ["Rafaela Welter Kratz"]
//     },
//     {
//       "userName": "Tatiana Carina dos Santos Fontes",
//       "userEmail": "tati_carina@yahoo.com.br",
//       "userPass": 1148185665,
//       "userLevel": 100,
//       "userKids": ["Manuela dos Santos Fontes"]
//     },
//     {
//       "userName": "Tatiane dos Santos Silva",
//       "userEmail": "contato@asengenheiro.com.br",
//       "userPass": 1238376046,
//       "userLevel": 100,
//       "userKids": ["Sofia Luz dos Santos"]
//     },
//     {
//       "userName": "Telma Miyuki Iwamura",
//       "userEmail": "telmam.05@gmail.com",
//       "userPass": 1167251398,
//       "userLevel": 100,
//       "userKids": ["Maria Eduarda Iwamura Marques"]
//     },
//     {
//       "userName": "Thaís Gomes dos Rego Ravagnani Vargas",
//       "userEmail": "drathaisgomes@gmail.com",
//       "userPass": 1110794204,
//       "userLevel": 100,
//       "userKids": ["Davi Gomes Ravagnani Vargas" , "Micaela Gomes Ravagnani Vargas"]
//     },
//     {
//       "userName": "Thaís Iwamoto Colacioppo",
//       "userEmail": "thaiscolacioppo@gmail.com",
//       "userPass": 1234232546,
//       "userLevel": 100,
//       "userKids": ["Luísa Colacioppo e Silva" , "Tobias Colacioppo e Silva"]
//     },
//     {
//       "userName": "Thais Meiriene da Fonseca Filippi",
//       "userEmail": "seguro@mmautoseg.com.br",
//       "userPass": 1206373477,
//       "userLevel": 100,
//       "userKids": ["Marcella Filippi"]
//     },
//     {
//       "userName": "Thaise Kakubo",
//       "userEmail": "thaise_migliorini@hotmail.com",
//       "userPass": 121598326,
//       "userLevel": 100,
//       "userKids": ["Renato Akira Kakubo"]
//     },
//     {
//       "userName": "Thiago Alves de Faria Pereira",
//       "userEmail": "thiago@verge.com.br",
//       "userPass": 1234254748,
//       "userLevel": 100,
//       "userKids": ["Davi de Souza Alves"]
//     },
//     {
//       "userName": "Thiago Cesar da Silva Pinto",
//       "userEmail": "cesar_tsp@yahoo.com",
//       "userPass": "124245407x",
//       "userLevel": 100,
//       "userKids": ["Gianluca Polydoro Pinto"]
//     },
//     {
//       "userName": "Thiago Magalhães Uchôa",
//       "userEmail": "thiagomuchoa1@hotmail.com",
//       "userPass": 1228813048,
//       "userLevel": 100,
//       "userKids": ["Lara Rodrigues Lanzana Uchôa" , "Lucas Rodrigues Lanzana Uchôa"]
//     },
//     {
//       "userName": "Thuanny Lopes",
//       "userEmail": "thulopes@gmail.com",
//       "userPass": 1234867515,
//       "userLevel": 100,
//       "userKids": ["Jimmy Tu"]
//     },
//     {
//       "userName": "Tiago Lopes de Oliveira",
//       "userEmail": "tiago_tlo@hotmail.com",
//       "userPass": 1213331183,
//       "userLevel": 100,
//       "userKids": ["Alice Baldoni Lopes"]
//     },
//     {
//       "userName": "TIAGO MEIRA DE BORBA",
//       "userEmail": "tiagomdborba@gmail.com",
//       "userPass": 1225615112,
//       "userLevel": 100,
//       "userKids": ["Felipe Waki de borba" , "Rafael Waki de Borba"]
//     },
//     {
//       "userName": "Tiago Rezende de Castro Guimarães",
//       "userEmail": "tiagorcguima@yahoo.com.br",
//       "userPass": 1225561693,
//       "userLevel": 100,
//       "userKids": ["Gabriel Takahashi Guimarães"]
//     },
//     {
//       "userName": "Valéria de Campos Marques",
//       "userEmail": "valeriacampos_fono@yahoo.com.br",
//       "userPass": 1215962411,
//       "userLevel": 100,
//       "userKids": ["Benjamim de Campos Marques" , "Cecília de Campos Marques"]
//     },
//     {
//       "userName": "Vanessa Aparecida Alexandrino de Oliveira",
//       "userEmail": "vanessaalexandrino7@gmail.com",
//       "userPass": "122123688X",
//       "userLevel": 100,
//       "userKids": ["Diego Alexandrino de Oliveira"]
//     },
//     {
//       "userName": "Vanessa David de Assis Cyrillo",
//       "userEmail": "vanrafa07@yahoo.com.br",
//       "userPass": 1202515381,
//       "userLevel": 100,
//       "userKids": ["Alice Assis Cyrillo Galvão Nunes"]
//     },
//     {
//       "userName": "Vanessa Villalta Lima Roman",
//       "userEmail": "v.villalta@icloud.com",
//       "userPass": 1207142268,
//       "userLevel": 100,
//       "userKids": ["Pedro Villalta Roman"]
//     },
//     {
//       "userName": "Vicente Moreira Borges Filho",
//       "userEmail": "vmborgesf@gmail.com",
//       "userPass": 1132286165,
//       "userLevel": 100,
//       "userKids": ["Gabriel Bonifácio Borges"]
//     },
//     {
//       "userName": "Vinicius de Almeida Carneiro",
//       "userEmail": "vinicius@grupova.com.br",
//       "userPass": 1128709910,
//       "userLevel": 100,
//       "userKids": ["Maria Alice Quizzeppi de Almeida Carneiro"]
//     },
//     {
//       "userName": "Vitor Emanuel Simoes Antonino",
//       "userEmail": "kdtvitor@hotmail.com",
//       "userPass": 1202444763,
//       "userLevel": 100,
//       "userKids": ["Lucas Machado Antonino"]
//     },
//     {
//       "userName": "Vivian de Toledo Pierri Silvestre",
//       "userEmail": "vivianpierri@gmail.com",
//       "userPass": 1203465932,
//       "userLevel": 100,
//       "userKids": ["Lucas Pierri Silvestre"]
//     },
//     {
//       "userName": "Viviane Braga Alves Prado",
//       "userEmail": "alves.vb@hotmail.com",
//       "userPass": 1216299869,
//       "userLevel": 100,
//       "userKids": ["Cora Alves Prado"]
//     },
//     {
//       "userName": "Viviane Fagundes de Andrade",
//       "userEmail": "vivifandrade@gmail.com",
//       "userPass": 1215872021,
//       "userLevel": 100,
//       "userKids": ["Sophia Andrade Crespo"]
//     },
//     {
//       "userName": "Viviane Sobreiro Peixoto Almeida",
//       "userEmail": "vivi.sobreiropa@gmail.com",
//       "userPass": 1220955516,
//       "userLevel": 100,
//       "userKids": ["Clara Peixoto Almeida"]
//     },
//     {
//       "userName": "Yamil Eduardo Pereira Galdo",
//       "userEmail": "pgparticipacoes@gmail.com",
//       "userPass": 1140874214,
//       "userLevel": 100,
//       "userKids": ["Letícia Pereira Mendes"]
//     }
//   ]

// const users = Users.insertMany(data).then((data)=>console.log(data)).catch((err) => {console.log(err)})
// const turmas = Turmas.insertMany(data).then((data)=>console.log(data)).catch((err) => {console.log(err)})


// const dados = 
// [
//   {
//     "userPass": "122091868-4",
//     "userVencimento": 30
//   },
//   {
//     "userPass": "124245325-8",
//     "userVencimento": 12
//   },
//   {
//     "userPass": "128334455-6",
//     "userVencimento": 10
//   },
//   {
//     "userPass": "124245407-x",
//     "userVencimento": "05"
//   },
//   {
//     "userPass": "124275366-7",
//     "userVencimento": 15
//   },
//   {
//     "userPass": "120485971-1",
//     "userVencimento": 20
//   },
//   {
//     "userPass": "124275366-7",
//     "userVencimento": 15
//   },
//   {
//     "userPass": "124259868-6",
//     "userVencimento": "01"
//   },
//   {
//     "userPass": "122886668-5",
//     "userVencimento": 10
//   },
//   {
//     "userPass": "124330268-9",
//     "userVencimento": 25
//   },
//   {
//     "userPass": 234,
//     "userVencimento": 10
//   },
//   {
//     "userPass": "123091478-X",
//     "userVencimento": 10
//   },
//   {
//     "userPass": "122563878-1",
//     "userVencimento": 15
//   },
//   {
//     "userPass": "112235634-5",
//     "userVencimento": 30
//   },
//   {
//     "userPass": "113152963-7",
//     "userVencimento": 10
//   },
//   {
//     "userPass": "113239207-x",
//     "userVencimento": 30
//   },
//   {
//     "userPass": "122091868-4",
//     "userVencimento": 30
//   },
//   {
//     "userPass": "116514517-0",
//     "userVencimento": 10
//   },
//   {
//     "userPass": 123456754,
//     "userVencimento": "01"
//   }
// ]
const dados = [
  {
    "UserPass": "121068945-5",
    "mensalista": true
  },
  {
    "UserPass": "122745015-1",
    "mensalista": true
  },
  {
    "UserPass": "120109131-7",
    "mensalista": true
  },
  {
    "UserPass": "113999844-4",
    "mensalista": true
  },
  {
    "UserPass": "115127302-8",
    "mensalista": true
  },
  {
    "UserPass": "120577464-6",
    "mensalista": true
  },
  {
    "UserPass": "124330268-9",
    "mensalista": true
  },
  {
    "UserPass": "123852863-6",
    "mensalista": true
  },
  {
    "UserPass": "111975208-5",
    "mensalista": true
  },
  {
    "UserPass": "122559003-6",
    "mensalista": true
  },
  {
    "UserPass": "121220222-3",
    "mensalista": true
  },
  {
    "UserPass": "122654780-1",
    "mensalista": true
  },
  {
    "UserPass": "112296173-x",
    "mensalista": true
  },
  {
    "UserPass": "122091044-2",
    "mensalista": true
  },
  {
    "UserPass": "113974866-x",
    "mensalista": true
  },
  {
    "UserPass": "122559243-4",
    "mensalista": true
  },
  {
    "UserPass": "122402197-6",
    "mensalista": true
  },
  {
    "UserPass": "122935904-7",
    "mensalista": true
  },
  {
    "UserPass": "116819136-1",
    "mensalista": true
  },
  {
    "UserPass": "122559052-8",
    "mensalista": true
  },
  {
    "UserPass": "120446394-3",
    "mensalista": true
  },
  {
    "UserPass": "116446743-8",
    "mensalista": true
  },
  {
    "UserPass": "122946614-9",
    "mensalista": true
  },
  {
    "UserPass": "116819272-9",
    "mensalista": true
  },
  {
    "UserPass": "122844535-7",
    "mensalista": true
  },
  {
    "UserPass": "121197287-2",
    "mensalista": true
  },
  {
    "UserPass": "124245325-8",
    "mensalista": true
  },
  {
    "UserPass": "122095156-0",
    "mensalista": true
  },
  {
    "UserPass": "113152963-7",
    "mensalista": true
  },
  {
    "UserPass": "123563973-3",
    "mensalista": true
  },
  {
    "UserPass": "122717140-7",
    "mensalista": true
  },
  {
    "UserPass": "113970292-0",
    "mensalista": true
  },
  {
    "UserPass": "122094876-7",
    "mensalista": true
  },
  {
    "UserPass": "111971044-3",
    "mensalista": true
  },
  {
    "UserPass": "122352642-2",
    "mensalista": true
  },
  {
    "UserPass": "120429087-8",
    "mensalista": true
  },
  {
    "UserPass": "121075800-3",
    "mensalista": true
  },
  {
    "UserPass": "115030195-8",
    "mensalista": true
  },
  {
    "UserPass": "122881643-8",
    "mensalista": true
  },
  {
    "UserPass": "115668420-1",
    "mensalista": true
  },
  {
    "UserPass": "123713492-4",
    "mensalista": true
  },
  {
    "UserPass": "114266558-6",
    "mensalista": true
  },
  {
    "UserPass": "112946112-9",
    "mensalista": true
  },
  {
    "UserPass": "123944023-6",
    "mensalista": true
  },
  {
    "UserPass": "122888695-7",
    "mensalista": true
  },
  {
    "UserPass": "122835198-3",
    "mensalista": true
  },
  {
    "UserPass": "121691742-5",
    "mensalista": true
  },
  {
    "UserPass": "124251554-9",
    "mensalista": true
  },
  {
    "UserPass": "123423002-1",
    "mensalista": true
  },
  {
    "UserPass": "121563395-6",
    "mensalista": true
  },
  {
    "UserPass": "120248497-9",
    "mensalista": true
  },
  {
    "UserPass": "122938534-4",
    "mensalista": true
  },
  {
    "UserPass": "113881509-3",
    "mensalista": true
  },
  {
    "UserPass": "116823060-3",
    "mensalista": true
  },
  {
    "UserPass": "120248907-2",
    "mensalista": true
  },
  {
    "UserPass": "122719454-7",
    "mensalista": true
  },
  {
    "UserPass": "123423378-2",
    "mensalista": true
  },
  {
    "UserPass": "116770303-0",
    "mensalista": true
  },
  {
    "UserPass": "115859357-0",
    "mensalista": true
  },
  {
    "UserPass": "122558980-0",
    "mensalista": true
  },
  {
    "UserPass": "116514517-0",
    "mensalista": true
  },
  {
    "UserPass": "122886668-5",
    "mensalista": true
  },
  {
    "UserPass": "114753424-x",
    "mensalista": true
  },
  {
    "UserPass": "121587273-2",
    "mensalista": true
  },
  {
    "UserPass": "124275366-7",
    "mensalista": true
  },
  {
    "UserPass": "122893041-7",
    "mensalista": true
  },
  {
    "UserPass": "122559145-4",
    "mensalista": true
  },
  {
    "UserPass": "116817084-9",
    "mensalista": true
  },
  {
    "UserPass": "123702329-4",
    "mensalista": true
  },
  {
    "UserPass": "123703146-1",
    "mensalista": true
  },
  {
    "UserPass": "114039715-1",
    "mensalista": true
  },
  {
    "UserPass": "122887410-4",
    "mensalista": true
  },
  {
    "UserPass": "116657348-5",
    "mensalista": true
  },
  {
    "UserPass": "112946034-4",
    "mensalista": true
  },
  {
    "UserPass": "116819337-0",
    "mensalista": true
  },
  {
    "UserPass": "116593768-2",
    "mensalista": true
  },
  {
    "UserPass": "123837604-6",
    "mensalista": true
  },
  {
    "UserPass": "111079420-4",
    "mensalista": true
  },
  {
    "UserPass": "123423254-6",
    "mensalista": true
  },
  {
    "UserPass": "122881304-8",
    "mensalista": true
  },
  {
    "UserPass": "123486751-5",
    "mensalista": true
  },
  {
    "UserPass": "122556169-3",
    "mensalista": true
  },
  {
    "UserPass": "121596241-1",
    "mensalista": true
  },
  {
    "UserPass": "112870991-0",
    "mensalista": true
  },
  {
    "UserPass": "120346593-2",
    "mensalista": true
  },
  {
    "UserPass": "121587202-1",
    "mensalista": true
  },
  {
    "UserPass": "114087421-4",
    "mensalista": true
  }
];
let counter = 0;
dados.forEach((e) => {
  const filter = {
    userPass: e.UserPass
  };
  const update = {
    mensalista: e.mensalista
  }
  console.log(filter)
  console.log(update)
  const users = Users.findOneAndUpdate(filter, update, {new: true}).then((data) => {console.log(data)}).catch((err) => console.log(err));
})



module.exports = routes;