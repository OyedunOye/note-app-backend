## API Reference

#### Create new user

```http
  POST {BASE_URL}users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `firstName` | `string` | **Required**. Your first name |
| `lastName` | `string` | **Required**. Your last name |
| `email` | `string` | **Required**. Your email address|
| `password` | `string` | **Required**. Password that will be required for login |

#### User login

```http
  POST {BASE_URL}login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Your registered email|
| `password`      | `string` | **Required**. Password created on registration|

#### Get all user notes

```http
  GET {BASE_URL}notes
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. Extracted from user authentication on login |

#### Create a new note

```http
  POST {BASE_URL}notes
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. Extracted from user authentication on login |
| `title`      | `string` | **Required**. New note title |
| `content`      | `string` | **Required**. New note body |

#### Edit an existing note
```http
  PATCH {BASE_URL}notes/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. Extracted from user authentication on login |
| `id`      | `string` | **Required**. Id of item to update |
| `title`      | `string` | **Required**. New note title |
| `content`      | `string` | **Required**. New note body |

#### Delete a note
```http
  DELETE {BASE_URL}notes/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to update |
| `token`      | `string` | **Required**. Extracted from user authentication on login |

#### Get a single note

```http
  GET {BASE_URL}notes/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |
| `token`      | `string` | **Required**. Extracted from user authentication on login |



## Authors

- [@Shade](https://github.com/OyedunOye)
- [@Peter](https://github.com/Peter-Odo)

## Run Locally
Clone the project

```bash
  git clone https://github.com/OyedunOye/note-app-backend
```

Go to the project directory

```bash
  cd note-app-backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```
