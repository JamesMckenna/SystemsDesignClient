# systemsdesign.rocks

## Project Notes:

This project is a prototype client application and will go through radical changes before it is considered ready for a production deployment. Currently it is a straight up VueJs / VueX / Vue-Router application, but will eventually be rebuilt to take advantage of both server-side rendering, and client-side rendering, with the intent of harding the app's security. Backend For Frontend Architecture would allow for a more secure user session, allow for tokens to be cached on the server as opposed to in client-side JavaScript code. More research is needed. 

Another architectual option that is being considered, is a hybrid server-side rendering that provides the client code as a single page application. Each web page / nav anchor link will be server-side rendered. The page that is returned to the client can, if needed, act as a 'single page application', or to be concise, provide atomic functionallity to the user based on what page is navigated too. All security, authorization and link generation, can be checked and rendered on the server before returning the page to the user. Once the page has been returned back to the user / browser, the page can act as a single page appilcation and perform opertions to mutate state as a traditional SPA would. Again, more research is needed.

Take for example, the Create Blog functionality. The server-side rendering will allow for links / anchor tags to be rendered (or not), too the client based on the user's privilege. So a user with the privilege level of BlogAuthor, would see and be able to click the link to the Create Blog page. With traditional SPA Architecture and _ONLY_ client-side rendering, it is **_possible_** to hack into the client-side JavaScript, to show a button or link that the user doesn't have the privilege level too access. 
On the Create Blog page, a library such as [ProseMirror](https://prosemirror.net/) can be linked too and then the page can do any required processing (in this example, rich-text editting) client-side. The blog author could click a preview button to well, preview the blog before saving it, and click another button to continue editting without needing to  contact the backend. When the blog is finalized and ticky-boo, then send to the backend to presist to permenant storage.

Another example where an client app can be 'split as server rendered or client rendered' would be the static pages of a website. They can be built as a traditional SPA where as any webpage containing dynamic content, or where the user enters content / data, would be rendered server-side. 

In short, I like the security server-side rendering offers, but don't believe a client needs to contact the backend for every little user interaction. Take advantage of the improvements made to hardware and off load processing to the client when it makes sense to do so.

More research needed before any decision is made.

