<h1 align="center">🌐 Rocket Notes</h1>

<p align="center">It is a Back-End application that allows users to register in a database, adding notes, links and tags linked to the same existing user</p>
<br/>
<br/>
<p align="center">Using Node.Js with insomnia, beekeeper, SQLite3 and dependencies such as Express, Knex and Bcryptjs I developed a Back-End with CRUD functionalities. Having authentications to verify existing users and update data.</p>
<br/>

<p align="center">Project developed during the course <strong>Explorer</strong> offered by<a href="https://app.rocketseat.com.br/"> RocketSeat</a>.<br/>
<br/>


<h1 align="center">⚙️Routes</h1>



| Método | Rota	| Descrição	| Parâmetros | Observação |
| --- | --- | --- | --- | --- |
| POST | /sessions | Returns authentication data for an existing user | `email`, `password` | send parameters in `body` | 
| GET	| /users	| Returns a specific user	| `token` |	send authentication `token` in `header` |
| POST | /users | Create a new user | `name`, `email`, `password` | send parameters in the `body` of the request |
|| PUT | /users | Updates a specific user | `token`, `name`, `email`, `password`, `newPassword` (optional) | send `token` through `header` and the rest in `body` |
| PATCH | /users/avatar | Updates a specific user's avatar | `token`, `avatar` | send `token` through `header` and `avatar` in `multipart` format |
| GET | /notes | Returns all notes for a user | `token` | send authentication `token` in `header` |
| GET | /notes:id | Returns a specific note | `id`, `token` |  send `token` via `header` and `id` via route |
| POST | /notes | Create a note | `title`, `description`, `tags`(array, optional), `links`(array, optional) | send `token` through `header` and the rest in `body` |
| DELETE | /notes/:id | Deletes a specific note | `id`, `token` | send `token` via `header` and `id` via route |
| GET | /tags | Returns tags created by a user | `token` | send authentication `token` in `header` |
| GET | /files/:filename | Returns avatar files | `filename` | send `filename` via route |


> Note: all parameters sent and responded to in the body of the request and response are in `JSON` format.


<h2 align="center">🧱 Prerequisites</h2>
<br/>

<p align="center">Before starting, you will need to have the following tools installed on your machine: <a href="https://git-scm.com">Git</a>, insomnia, Beekeeper <br/>
Furthermore, it is good to have an editor to work with the code like <a href="https://code.visualstudio.com/">VSCode</a></p>
<br/>
<br/>
<h2 align="center">🎲Running the application</h2>
<br/>

<p align="center">

```bash
# Clone this repository
$ git clone https://github.com/SahRB/Rocket-Notes-Backend
$ npm install 
# configure package.json to use nodemon and knex to start the migrate

```
</p>
<br/>
<br/>

<h2 align="center">🛠 Technologies</h2>
<br/>

<p align="center">The following tools were used to build the project:<br/>
<br/>  
JavaScript - Node.js
<br/>
Insomnia - BeeKeeper - Sqlite3
<br/>
<br/>

<p align="center">Made with ❤️ by Sabrina Barros 💁🏻‍♀️ <a href="https://www.linkedin.com/in/sabrina-barrosz/">Contact</a></p>
