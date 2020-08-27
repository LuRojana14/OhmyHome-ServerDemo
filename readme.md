# OhmyHome

## Description

**OhmyHome ** allows you to have tasks under control helping you to organize, manage and distribute them. OhmyHome is perfect for people living alone and also for multi-member households. 

## User Stories

- **404** - As a user, I want to see a descriptive error when I go to a page that doesn't exist

- **500** - As a user, I want to see an error page when it goes bankrupt

- **homepage** - As a user, I want to be able to access to public home page, understand its about, be able to register and log in

- **sign up** - As a user, I want to register to be able to log in.

- **login** - As a user, I want to be able to log in to the website in order to access the services offered by the website

- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account

- **tasks list** -cAs a user, I want to see all available tasks

- **task create** - As a user, I want to create a task to be assigned to one of the users

- **task delete** - As a user, I want to delete a task when it no longer needs to be done

- **item list** - As a user, I want to see the grocery shopping list

- **item create** - As a user, I want to create a profile so that they can choose my dog to breed

- **item delete** - As a user, I want to create a new supermarket purchase item

  

## Backlog

List of other features outside of the MVPs scope

- Notification of tasks
- Periodicity of tasks
- Face ID
- Challenge play



# Client / Front-end

## Routes (React App)

| Path                 | Component  | Permissions | Behavior                                                     |
| -------------------- | ---------- | ----------- | ------------------------------------------------------------ |
| `/`                  | SplashPage | anon only   | Home page                                                    |
| `/signup`            | SignupPage | anon only   | Signup form, link to login, navigate to edit alumni profile after signup |
| `/login`             | LoginPage  | anon only   | Login form, link to signup, navigate to home directory after login |
| `/logout`            | n/a        | anon only   | Navigate to public homepage after logout, expire session     |
| `/api/tasks`         | ListTasks  | anon only   | Show all tasks in a list                                     |
| `/api/tasks`         | Task       | anon only   | Add new task                                                 |
| `/api/tasks/:id`     | Task       | anon only   | Returns the specified task                                   |
| `/api/tasks/:id`     | EditTask   | anon only   | Edit task                                                    |
| `/api/tasks/:id`     | DeleteTask | anon only   | Delete task                                                  |
| `/api/listItems`     | ListItems  | anon only   | Show all items in a list                                     |
| `/api/listItems`     | Item       | anon only   | Add new item                                                 |
| `/api/listItems/:id` | Item       | anon only   | Returns the specified super item                             |
| `/api/listItems/:id` | EditItem   | anon only   | Edit Item                                                    |
| `/api/listItems/:id` | DeleteItem | anon only   | Delete Item                                                  |



## Components

- SplashPage
- SignupPage
- LoginPage
- SelectBar (select by...)
- BottomNav (home/add/profile)
- TaskCardList
- EditTask
- AddTask
- ChangeTask
- ItemCardList
- EditItem
- AddItem
- ProfilePage
- Message
- 404Page



# Server / Back-end

## Models

Group model

```js
{  
	groupName: { type: String, required: true },
  users: [{type : Schema.Types.ObjectId, ref: 'User'}]
  listItems: [String],
  tasks:[
  {
    task_id: {type : Schema.Types.ObjectId, ref: 'Task'}
    state: {type: String, enum:["pending", "complete"]}
    user_id: {type : Schema.Types.ObjectId, ref: 'User'}
  }
 ]
},
```

User model

```js
{   
	username: { type: String, required: true },
	password: { type: String, required: true },
  tasks:[{type : Schema.Types.ObjectId, ref: 'Task'}]
  sentMessages: [{type : Schema.Types.ObjectId, ref: 'Message'}]
  receiverMessages:[{type : Schema.Types.ObjectId, ref: 'Message'}]
}, 
```

Task model

```javascript
{ 
	title: { type: String, required: true },
  user_id: {type : Schema.Types.ObjectId, ref: 'User'}
}
```

Message Model

```javascript
{ 
	messageSender: {type : Schema.Types.ObjectId, ref: 'User'}
  messageReceiver: {type : Schema.Types.ObjectId, ref: 'User'}
  task_id: [{type : Schema.Types.ObjectId, ref: 'Task'}]
}
```



## API Endpoints (back-end routes)

| URL    | HTTP verb            | Request body        | Action                                                       | Success status | Error Status |
| ------ | -------------------- | ------------------- | ------------------------------------------------------------ | -------------- | ------------ |
| POST   | `/auth/signup`       | {username,password} | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session | 201            | 404          |
| POST   | `/auth/login`        | {username,password} | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session | 200            | 401          |
| POST   | `/auth/logout`       | {username,password} | Renders the signup form and creates user in the DB.          | 204            | 400          |
| GET    | `/auth/me`           | Saved session       | Check if user is logged in and return profile page           | 200            | 404          |
| GET    | `/api/tasks`         | (empty)             | Returns all the tasks                                        |                |              |
| POST   | `/api/tasks`         | (empty)             | Adds a new task                                              |                |              |
| GET    | `/api/tasks/:id`     |                     | Returns the specified task                                   |                |              |
| PUT    | `/api/task/:id`      | JSON                | Edits the specified task                                     |                |              |
| DELETE | `/api/task/:id`      | (empty)             | Delete the specified task                                    |                |              |
| GET    | `/api/listItems`     | (empty)             | Returns the list Items                                       |                |              |
| POST   | `/api/listItems`     | (empty)             | Adds a new item                                              |                |              |
| GET    | `/api/listItems/:id` |                     | Returns the specified item                                   |                |              |
| PUT    | `/api/listItems/:id` | JSON                | Edits the specified item                                     |                |              |
| DELETE | `/api/listItems/:id` | (empty)             | Delete the specified item                                    |                |              |



## Links

### Trello

[Trello Kanban board](https://trello.com/b/bbm80zKh/ohmyhome)

### Git

[**Client repository Link**](https://github.com/mmazzariello/OhmyHome-Client.git) [**Server repository Link**](https://github.com/LuRojana14/ohmyhome.git)

### Slides

The url to your presentation slides



