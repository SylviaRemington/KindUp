### MVP FOR README:

#### README should have:
 - Screenshot or logo ✅ DONE!
 - Description of the app ✅ DONE! 
 - Planning materials ✅ Partially done - need to add a few more links and details.
 - Attribution if any ✅ DONE!
 - Technologies used ✅ DONE!
 - Next steps / stretch goals ✅ DONE!
 - Link to deployed version - Tristan Hall will provide us with the GitHub education links.

<br>

# KindUp

#### MEN Stack CRUD App - General Assembly Project 2 by Sylvia Remington

## Welcome to the KindUp Movement!
KindUp is a full-stack web application that encourages users to spread positivity through random acts of kindness. Users can create, view, edit, and delete their own kind acts... as well as view, comment on, and like others’ contributions! This application uses MongoDB, Express, Node.js, and EJS, with authentication and user-specific features to build a meaningful, interactive experience. The experience of taking action and participating in Random Acts Of Kindness is a fun path for contributing to the planet and feeling better along the way!

![KindUp Screenshot](https://raw.githubusercontent.com/SylviaRemington/KindUp/refs/heads/main/public/images/KindUp%20Homepage%20Screenshot.png)

<br>

## **Key Features:**

- **KindAct Dashboard:** Logged-in users can create, read, update, and delete their own acts of kindness.

- **Public Kind Acts Catalogue of Ideas You Can Use for Random Acts Of Kindness:** Logged-In Users can browse all submitted kind acts on the kind acts index page.

- **User Comments:** Registered users can leave thoughtful comments on individual kind acts.

- **Likes System:** (Future Stretch Goal) Users can “like” a kindness, with each like tied to their user account.

- **Auth & Permissions:** Only creators can edit or delete their own kind acts, with route protection in place.

- **Kindness Metadata:** Each act includes title, description, and custom checkboxes for unique kindness types - e.g. If the kind act is a tried-and-true-tested act or brand new, there will be a notation under the description of the kind act!

<br>

## Tech Stack
- **Node.js** - the backend runtime environment for running JavaScript on the server
- **Express.js** – the server framework that handles routes, server logic, and middleware
- **EJS** – as my templating engine for rendering dynamic HTML templates for the frontend
- **Mongoose** – to connect and interact with MongoDB using models and schemas to define data 
- **MongoDB** – my database for storing Kind Acts, User Accounts, Comments, and Likes
- **CSS** – for basic styling, layout, & visual formatting (inside a public/ directory)
- **Session-based authentication** – using express-session to track logged-in users / manages user login sessions for authentication
- **dotenv** - environment variables from an .env file & loads session secret for further safety of data
- **method-override** - lets forms use PUT & DELETE methods / overrides the GET & POST
- **morgan** - logs http requests to the terminal for debugging purposes
- **express-session** - for user-login sessions / manages user-login sessions
- **bcrypt** - for password encryting / securely encrypts passwords for storage & comparison
- **connect-flash** - creates success alerts for better user experience once they sign-up or sign-in
- **Bulma** - css library which provides css classes & helps style my html code... yay!

<br>

## Next Steps & Stretch Goals:
- **Create 'like' functionality** with a button
- **Add Instructions Link** and/or Page
- **In Comment Section** - Add timestamp to Comments Section (in the Comment Model) with full functionality
- **In Comment Section**  - Add save functionality while writing comments (in case they are writing a lot about the KindAct or their experience with it and want to save along the way before they submit it.)
- **In Comment Section**  - Making sure that commenting is fully functional and linked to user accounts (pretty sure this is completely done, but double check it). Edit/Delete features are planned as stretch goals.
- **In Comment Section**  - Adding ability to edit and delete comments if the user has created their comment.
- **Adding Admin access** - So that admin can have ability to view, add, edit, and delete all the Kind Acts and also this same ability with all Comments.
- **Adding ability for users to add videos** to their KindAct creations. And also, adding the ability for all users to add videos in the comments section in case a different user has implemented this kind act as well, and would like to share their experience with it.
- **Add specific timeout for total session*** - Changing from Express defaults timeouts of sessions to my own.
- **Also, adding a pop-up to warn 5 minutes before session timeout.**

<br>

## Key Takeaways
#### Challenges & Wins:
- **Wins:** Enthusiastic that I was able to create my first ever full stack web application! This is a big win for me.
- **Challenges:** Learning and figuring out how the entire app interacts with one another. I found the most challenging part was linking all the routes and keeping track of how all the routes interact with one another. I think I'm still learning about this, and don't have full understanding of it yet. Also, adding authorization to protect routes, and seeing how it interacts with authentication was (and still is) a little bit confusing to me. I haven't fully grasped this and how it all works and interacts. Lastly, I'm still learning about Kanban boards and Trello. I don't have experience working with these; thus, I need to learn more about them in order to fully implement them effectively in the future.

#### Future Improvements:
- Already defined in "Next Steps & Stretch Goals" above

#### Other Random Thoughts About The Project: Squirrel!
- I really enjoyed creating this app. Even though app creation is so lengthy & time-consuming, it's so wonderful to be able to create a product/project that has the potential to help others. That's why I'm doing this... and it's exciting to learn with this long-term target in mind.

<br>

## Resources/Credits/Attribution
- YouTube & Peter Sharp https://www.theliberators.org/social-experiments
- YouTube & Peter Sharp https://www.petersharp.com.au/
- [Bulma](https://bulma.io/) CSS framework for styling
- Homepage screenshot taken using Mac OS built-in screenshot tool

<br>

# In Depth Planning Process
#### If after the above generalized overview, you'd like more detailed information, please see the following below.

## Setup & Installation Requirements
#### MVP Requirements for Application Project:
- 
- 
- 
#### Addtl Setup & Installation Requirements:
- 
- 
- 

## Planning / Process / Ideas
#### Early Concepts:
- Project planning link: https://link.excalidraw.com/l/ArZSbb1GP9u/74hyTOpuWxt
- Trello Board link: TBA
- ERD link: TBA

#### Folder Structure
➜  KindUp git:(main) ✗ tree -I "node_modules|.git|*.json|*.map" -a -L 3
.
├── .env
├── .gitignore
├── LICENSE.md
├── README.md
├── controllers
│   ├── auth.js
│   └── comment-actions.js
├── middleware
│   ├── is-signed-in.js
│   └── pass-user-to-view.js
├── models
│   ├── Comment.js
│   ├── KindAct.js
│   ├── Like.js
│   └── User.js
├── public
│   ├── css
│   │   └── style.css
│   └── images
│       └── KindUp Homepage Screenshot.png
├── server.js
└── views
    ├── auth
    │   ├── sign-in.ejs
    │   └── sign-up.ejs
    ├── index.ejs
    ├── kindacts
    │   ├── edit.ejs
    │   ├── index-of-kind-acts.ejs
    │   ├── new.ejs
    │   └── show.ejs
    └── partials
        └── _navbar.ejs

#### Planning Process:
1. Created ...(more info here)
2. Flowchart above to understand order of operations
3. Mapped out Data Structure needed for card deck
4. Pseudocode (maybe create a link to access & go to a different page)
5. Actionable tasks translated to Kanban Board via Trello or...
- 
- 
- 

#### Design Process:
- Initial wireframes
- Mockups with initial designs
- Choosing a theme
- 
- 
- 

#### Code Process:
- 
- 
- 







#### Known Bugs:
- 
- 
- 







