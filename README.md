# ebay-app
Application to create product alerts using Ebay API.

Aplicação destinada a criação de alertas de pesquisa realizada na API do e-commerce ebay.com, através desta aplicação o usuário cria alerta de pesquisa e de tempos em tempos (determinado por ele entre as opções de 2, 10 ou 30 minutos) recebe um email, com os 3 produtos mais barato encontrado de acordo com a frase pesquisada, caso não tenha nenhum retorno o e-mail chegará dizendo que a pesquisa não retornou nenhum produto.
Esta aplicação foi desenvolvida usando NodeJS no backend, React no frontend e bancos MongoDB e Redis

# Algumas das tecnologias utilizadas
 - Mongoose (ORM),
 - Cron (Gerenciador de tarefas automáticas para NODEJS, se parece com o Cron do Linux),
 - Nodemon,
 - Prettier,
 - Eslint (usando a Style Guide do Airbnb),
 - DotEnv (para configurações de variáveis de ambiente),
 - Express,
 - Morgan (middleware de logs de requisição para API),
 - Nodemailer (transport para envio de e-mails),
 - xml2js (lib para envio de xml em requisições),
 - Youch,
 - Yup,
 - Axios,
 - React-router-dom.
 
A aplicação está utilizando containers docker para os banco de dados mongoDB e Redis.

# Funcionalidades
- Criação de Alertas;
- Pesquisa na API Finding do Ebay Developers;
- Disparo de e-mail de tempos em tempos usando Cron;
- Listagem de todos os alertas criados.

# Passos para subir a aplicação

- Clonar este projeto do GitHub (https://github.com/rgrmartins/ebay-app.git);
- Na máquina em que o projeto foi clonado é necessário ter o NodeJS instalado;
- No terminal da maquina em que o projeto foi clonado é necessário instalar as dependencias (recomendo usar Yarn) $ yarn;
- Levantar os Containers com os bancos MongoDB e Redis (as Imagens utilizadas no projeto estão logo embaixo):
	- Mongo => $ docker run --name mongoebay -p 27017:27017 -d -t mongo
	- Redis => $ docker run --name redisebay -p 6379:6379 -d -t redis:alpine
- No código do Backend é necessário preencher as informações das variáveis de ambiente, no repositório o arquivo env.example serve de molde para a criação do .env;
- para a realizar a pesquisa na API do Ebay, foi necessário se cadastrar na plataforma deles e gerar um token para usar a Finding API. o cadastro pode ser feito através da url ( https://developer.ebay.com/ );
- As APIs do eBay são praticamente todas baseadas em XML, para realizar as pesquisas necessárias precisamos realizar muitas conversões JSON <-> XML;
- As APIs de developers tem diversas funções, utilizamos somente a Finding API. Sempre é bom observar as licença e aos Termos da API do eBay para usar esta biblioteca;
- o XML utilizado para enviar requisições a API do Ebay deverá conter os seguintes atributos: method da requisição, xmls, keywords, sortOrder(Opicional) e pagination (Opicional);
- Em ambiente de desenvolvimento foi uitilizado como gerenciador de e-mail, a aplicação MailTrap, todos os emails disparados pela apliacação cai em sua api, onde podemos visualizar o layout aplicado, as informações buscadas. É necessário realizar o cadastro na aplicação deles através da url ( https://mailtrap.io/ );
- Com os containers dos bancos rodando, variáveis de ambiente configuradas é possível subir as aplicações, rodando os seguintes scripts no terminal:
	-No diretório do Backend: $ yarn dev (levanta a aplicação);
	-No diretório do Backend: $ yarn queue (Levanta a thread de processamento de fila de email com Redis);
	-No diretório do Frontend: $ yarn start
- assim o usuário poderá realizar pesquisas no ebay e receber e-mail com as 3 opções mais barata usando a aplicação.

# Observação
Está aplicação foi desenvolvida em ambiente de desenvolvimento, alguns passos como autenticação, uso e configuração do PM2 e demais configurações para deploy em produção, foram abstraidos para que fosse alcançado o objetivo em tempo hábil.
