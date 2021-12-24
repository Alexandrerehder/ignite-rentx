
# Funcionamento geral - arquitetura de pastas - Fluxo de funcionalidades

Rotas -> Controller -> (UseCase -> CarsRepository -> ICarsRepository) -> Entity(Cars)

Controller "handles" requests using UseCase methods (execute())

UseCase executes (execute()) functions using CarsRepository methods(create(), findByName(), etc)

CarsRepository implements ICarsRepository to entity management(Cars)

# PACKAGE.JSON - Entender a maioria das flags

# test:

--runInBand (faz com que o jest rode um test de cada vez)


# Libs e conceitos utilizados que devem ser explicados da melhor forma

- Structure (Modules, repositories, useCases, Controller, Spec, DTO's, Entities, Infra, Shared, Utils, tmp)

- TypeORM (migrations, seed, queryBuilder, Entity)

- Express (Routes, Request, Response, (HTTP - Methods, Security, Why))

- DayJS (...)

- FS, multer (read, update, upload files/paths)

- Middlewares (Verifications, code reuse, etc)

- Errors (Error != Custom Error(ex: AppError))

- Container (index of classes)

- Swagger (Documentation)

- Docker - (Docker Compose - ...) - (MakeFile - phones, Facility)

- Yarn (Package Manager, Why not NPM?, - @types)

- Jest (Unit test, Facility, Why not ...?)

- SuperTest (Integration Test)

- NVM (Node Version Manager, .nvmrc)

- .gitignore (node_modules, ENV's, etc)

- package.json (description, scripts, dependencies, etc)

- Eslint (rules, plugins, TS, etc)

- TypeScript (...)

- .env (Security, etc)


# API, REST e RESTFUL

# API
Cliente (Client) Garçom (pedidos, levar seus pedidos, para a cozinha) (API) Cozinha (Server)

Acrônimo de Application Programming Interface (Interface de Programação de Aplicações) é basicamente um conjunto de rotinas e padrões estabelecidos por uma aplicação, para que outras aplicações possam utilizar as funcionalidades desta aplicação.

Responsável por estabelecer comunicação entre diferentes serviços.
Meio de campo entre as tecnologias.
Intermediador para troca de informações.

# REST
um acrônimo para Representational State Transfer (Transferência de Estado Representativo).

Será feita a transferência de dados de uma maneira simbólica, figurativa, representativa, de maneira didática.

A transferência de dados, geralmente, usando o protocolo HTTP.

O REST delimita algumas obrigações nessas transferências de dados.

Resources seria então: Uma entidade ou um objeto.

# 6 NECESSIDADES (constraints) para ser RESTful

# Uniform Interface: 
Manter uma uniformidade, uma constância, um padrão na construção da interface. Nossa API precisa ser coerente para quem vai consumi-lá. Precisa fazer sentido para o cliente e não ser confusa. Logo, coisas como: o uso correto dos verbos HTTP; endpoints coerentes (todos os endpoints no plural, por exemplo); usar somente uma linguagem de comunicação (json) e não várias ao mesmo tempo; sempre enviar respostas aos clientes; são exemplos de aplicação de uma interface uniforme.

# Client-server:
Separação do cliente e do armazenamento de dados (servidor), dessa forma, poderemos ter uma portabilidade do nosso sistema, usando o React para WEB e React Native para o smartphone, por exemplo.

# Stateless: 
Cada requisição que o cliente faz para o servidor, deverá conter todas as informações necessárias para o servidor entender e responder (RESPONSE) a requisição (REQUEST). Exemplo: A sessão do usuário deverá ser enviada em todas as requisições, para saber se aquele usuário está autenticado e apto a usar os serviços, e o servidor não pode lembrar que o cliente foi autenticado na requisição anterior. Nos nossos cursos, temos por padrão usar tokens para as comunicações.

# Cacheable: 
As respostas para uma requisição, deverão ser explicitas ao dizer se aquela resquição, pode ou não ser cacheada pelo cliente.

# Layered 
System: O cliente acessa a um endpoint, sem precisar saber da complexidade, de quais passos estão sendo necessários para o servidor responder a requisição, ou quais outras camadas o servidor estará lidando, para que a requisição seja respondida.

# Code on demand (optional): 
Dá a possibilidade da nossa aplicação pegar códigos, como o javascript, por exemplo, e executar no cliente.

# RESTFUL
RESTful, é a aplicação dos padrões REST.

# BOAS PRÁTICAS
Utilizar verbos HTTP para nossas requisições.
Utilizar plural ou singular na criação dos endpoints? NÃO IMPORTA! use um padrão!!
Não deixar barra no final do endpoint
Nunca deixe o cliente sem resposta!

# VERBOS HTTP
GET: Receber dados de um Resource.
POST: Enviar dados ou informações para serem processados por um Resource.
PUT: Atualizar dados de um Resource.
DELETE: Deletar um Resource

# STATUS DAS RESPOSTAS
1xx: Informação
2xx: Sucesso
200: OK
201: CREATED
204: Não tem conteúdo PUT POST DELETE
3xx: Redirection
4xx: Client Error
400: Bad Request
404: Not Found!
5xx: Server Error 500: Internal Server Error



