# Find a Friend API

API para a adoção de animais, projeto do curso rocketseat sessão NodeJS

## Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:NicolasFreitas1/findAFriendApi.git
```

Entre no diretório do projeto

```bash
  cd findAFriendApi
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run start:dev
```

Para rodar os testes unitários

```bash
  npm run test
```

Para rodar os testes end to end

```bash
  npm run test:e2e
```

## Documentação da API

#### Cadastro de pets

- Necessário estar logado

```http
  POST /pets
```

Request body

São as informações envidas no corpo da requisição para que seja possível o cadastro dos Pets.

> `name` - Obrigatório

> O parâmetro de `name` é uma string e faz referência ao nome do Pet.

Ex.: `"name": "Bob"`

>

> `description` - Obrigatório

> O parâmetro de `description` é uma string e faz referência descrição do Pet

Ex.: ` "description": "Bob is a Cat",`

>

> `age` - Obrigatório

> O parâmetro de `age` é um enum e serve para indicar a idade do Pet.

```
valores possíveis: {
  BABY
  YOUNG
  OLD
}
```

Ex.: `"age": "BABY"`

>

> `size` - Obrigatório

> O parâmetro de `size` é um enum e faz referência ao tamanho do Pet.

```
valores possíveis: {
  SMALL
  MEDIUM
  BIG
}
```

Ex.: `"size": "MEDIUM"`

>

> `energy_level` - Obrigatório

> O parâmetro de `energy_level` é um enum e faz referência ao nível de energia do Pet.

```
valores possíveis: {
  VERY_LOW
  LOW
  MEDIUM
  HIGH
  VERY_HIGH
}
```

Ex.: `"energy_level": "MEDIUM"`

>

> `independence_level` - Obrigatório

> O parâmetro de `independence_level` é um enum e faz referência ao nível de independência do Pet ao seu dono

```
valores possíveis: {
  LOW
  MEDIUM
  HIGH
}
```

Ex.: `"independence_level": "HIGH"`

>

> `environment` - Obrigatório

> O parâmetro de `environment` é um enum e faz referência ao tamanho do ambiente necessário para o pet.

```
valores possíveis: {
  SMALL
  MEDIUM
  BIG
}
```

Ex.: `"environment": "MEDIUM"`

>

> O parâmetro de `adoptions_requirements` é um array e faz referência ao requisitos de adoção do pet.

Ex.: `"adoption_requirements": ["Ambiente climatizado", "Muita comida"]`

>

#### Detalhes de um pet

```http
  GET /pets/details/:petId
```

| Parâmetro | Tipo     | Descrição                               |
| :-------- | :------- | :-------------------------------------- |
| `petId`   | `string` | **Obrigatório**. O UUID do pet desejado |

#### Listagem dos pets por cidade

```http
  GET /pets/:city
```

| Parâmetro | Tipo     | Descrição                                               |
| :-------- | :------- | :------------------------------------------------------ |
| `city`    | `string` | **Obrigatório**. A cidade de onde deseja buscar os pets |

| Query Params         | Tipo                | Descrição                                                |
| :------------------- | :------------------ | :------------------------------------------------------- |
| `age`                | `Age`               | **Opcional**. Idade do Pet para filtrar                  |
| `size`               | `Size`              | **Opcional**. Tamanho do Pet para filtrar                |
| `energy_level`       | `EnergyLevel`       | **Opcional**. Nível de energia do Pet para filtrar       |
| `independence_level` | `IndependenceLevel` | **Opcional**. Nível de independência do Pet para filtrar |
| `environment`        | `Environment`       | **Opcional**. Tamanho do ambiente do Pet para filtrar    |

#### Listagem de pets por org

```http
  GET /pets/org
```

#### Cadastro da ORG

```http
  POST /orgs
```

Request body

São as informações envidas no corpo da requisição para que seja possível o cadastro dos Pets.

> `name` - Obrigatório

> O parâmetro de `name` é uma string e faz referência ao nome da ORG.

Ex.: `"name": "Seu Cãopanheiro"`

>

> `email` - Obrigatório

> O parâmetro de `email` é uma string e faz referência ao email que será usado na hora da autenticação da ORG.

Ex.: ` "email": "seucaopanheiro@email.com",`

>

> `password` - Obrigatório

> O parâmetro de `password` é uma string da senha usada na hora da autenticação da ORG.

Ex.: `"password": "123456"`

>

> `cep` - Obrigatório

> O parâmetro de `cep` é uma string e faz referência á localização da ORG.

Ex.: `"cep": "8888-888"`

>

> `phone` - Obrigatório

> O parâmetro de `phone` é um string e faz referência ao numero do whatsapp da ORG.

Ex.: `"phone": "48999999999"`

>

> `address` - Obrigatório

> O parâmetro de `address` é uma e faz referência á localização da ORG

Ex.: `"address": "rua x "`

>

#### Autenticação da ORG

```http
  POST /sessions
```

Request body

Informações necessárias para realização da autenticação da ORG

> `email` - Obrigatório

> O parâmetro de `email` é uma string e faz referência ao email que será usado na hora da autenticação da ORG.

Ex.: ` "email": "seucaopanheiro@email.com",`

>

> `password` - Obrigatório

> O parâmetro de `password` é uma string da senha usada na hora da autenticação da ORG.

Ex.: `"password": "123456"`

>

#### Refresh token

```http
  POST /token/refresh
```

Verifica se possui um token ja válido e gera um novo com base no token vencido

#### Perfil da ORG

```http
  POST /orgs/profile
```

Retorna as informações da ORG
