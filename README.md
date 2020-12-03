# systemsdesign.rocks

## Project Notes:

This project is a prototype client application and will go through radical changes before it is considered ready for a production deployment. Currently it is a straight up VueJs application, but will eventually be rebuilt to take advantage of both server-side rendering, and client side-rendering, with the intent of harding the app's security. Backend For Frontend Architecture would allow for a more secure user session, allow for tokens to be cached on the server as opposed to in client side JavaScript code. 

Another architectual option that is being considered, is a hybrid server-side rendering that provides the client code as a single page application. Each web page / nav anchor link will be server-side rendered. The page that is returned to the client can, if needed, be a 'single page application' or to be concise, provide atomic functionallity to the user based on what page is navigated too. All security, authorization and link generation, can be checked and rendered on the server before returning the page to the user. Once the page has been returned back to the user / browser, the page can act as a single page applcation and perform opertions to mutate state as a tradition SPA would.

Take for example, the Create Blog functionality. The server-side rendering will allow for links / anchor tags, to be rendered or not too the client based on the user's privilege. With tradistional SPA Architecture, it is **_possible_** to hack into the client side JavaScript, and show a button or link that the user doesn't have the privilege level too access. So a user with the privilege level of BlogAuthor, would see and be able to click the link to the Create Blog page. On the Create Blog page, a library such as [ProseMirror](https://prosemirror.net/) can be linked and then the page can do required processing (in this example, rich-text editting). The blog author could click a preview link to well, preview the blog before saving it, and then click another link to continue editting without ever contacting the backend.

Or the static pages of a website can be built as a traditional SPA and any webpage where state would be mutated, or provide user entered content / data, would be rendered server-side. 

In short, I like the security server-side rendering offers, but don't believe a client needs to contact the backend for every little user interaction.
