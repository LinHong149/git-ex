# GitExpress

## Inspiration

As programmers, we use git a lot, maybe too much. Many apps like Figma, Canva, and Adobe Express are collaborative tools, but only have basic version history. We wanted to integrate git version control with Adobe Express to enable more effective and efficient designs. Being able to compare branches side by side and merging agreed on features is obvious, yet difficult. No longer will you wake up seeing random changes on your main file!

![Fatal Flaw](https://cdn.discordapp.com/attachments/1070372249959407646/1243246584452485300/Slide_16_9_-_3.png?ex=6650c71c&is=664f759c&hm=086240d24b6d73e498269108ab737bda65e2895ef063a83b854b946214a5153b&)
![GitExpress](https://cdn.discordapp.com/attachments/1070372249959407646/1243246584842420305/Slide_16_9_-_4.png?ex=6650c71c&is=664f759c&hm=3cb3372e34af4a6076df81e21f4426b943a81825fc8965a61261ce0f00c2bb81&)

## What it does

Using Adobe's SDK's, we collect all objects within a file including: images, text, containers, and much more. After collecting the unique ids and variables like current translation and rotation, we store a local copy to the browser and push the changes to a remote server hosting the git repository. This repository tracks changes and allows for integration without imposing storage bloat on the user's computers.

![Creating Branch](https://cdn.discordapp.com/attachments/1070372249959407646/1243246583987048529/MacBook_Air_-_16.png?ex=6650c71c&is=664f759c&hm=9aa4a40452367172cef3b860d7b867b86c60b7388e886ac3ff5e56402f58b0f7&)
![Merge Conflicts](https://cdn.discordapp.com/attachments/1070372249959407646/1243246583311499334/MacBook_Air_-_15.png?ex=6650c71b&is=664f759b&hm=3b3de53a2b946559e2a66d01ea939c022e63ae1b344095e8a238716007bc7a33&)

## How we built it

We ended up using the Add-on UI SDK and Document Sandbox to manipulate the Adobe Express file. The SDK was the main runtime and included functions to deal with local storage. We used React components and JavaScript to integrate the frontend with this SDK. We ended up needing to proxy the Document Sandbox as having two runtimes would never run together.

The Document Sandbox provided access to all the nodes. The structure of a file was a very steep hierarchy with many few objects and many inheritances. We traced the documentation to go from BaseNodes to Nodes then to specific ones like TextNode or ImageRectangleNode. Each object has a unique id, which made it the perfect way to track changes. By comparing ids and values within the object, we can see what changed. We also considered hashing the entire object to quickly determine whether it changed.

After comparing how it changed, we retrieved the data by going through the hierarchy and passed the information from the Sandbox directory to the UI directory as a JSON file. We created multiple GIT apis, including: Init, Commit, Add, Fetch and Status. This allowed our application to have a version history that can be viewed and edited as pleased.

INTEGRATION HELL(HEHEHAHA): At this point we had a separate frontend that was created using React-and-Javascript-with-Document-Sandbox-support, styled with Spectrum CSS and Spectrum Web Components. We integrated the frontend and the backend with api calls passing data from the user to the api call to the endpoint and then back.

![GitExpress](https://cdn.discordapp.com/attachments/1070372249959407646/1243246585257922560/Slide_16_9_-_5.png?ex=6650c71c&is=664f759c&hm=43f098c6f5d99ce47a0fcd0c795bf10c6880fcba272459f715afbb9a00f91982&)

## Challenges we ran into

We had a lot of trouble getting both the SDK and Sandbox to work. Without the Sandbox, we wouldn't be able to access the objects. Without the SDK, we wouldn't be able to check any file metadata or access local storage. When we finally figured out the proxy, we felt we crossed a huge milestone.

Another challenge we faced was determining how to track changes. We narrowed it down between replicating git or using git. We decided against reinventing git as it seemed like a very dangerous rabbit hole. Using git wasn't very easy though. Extensions are very picky about what modules they let you run. We weren't able to run simple-git on the extension, so we ended up needing a remote Node server. We used simple-git to create local repositories and an API for our extension to call.

The final major challenge was determining how to show changes. Unlike code, where you can look at the lines and get a relative understanding, looking at the coordinates and id of an object doesn't give you much for visuals. We decided to take a snapshot of the canvas along with code to assist the user.

## Accomplishments that we're proud of

Visually, our extension surpassed our expectations. We weren't that confident since the original repo was bare HTML, CSS, and JS. After converting to React, we hit another wall of not being able to use Tailwind CSS. After learning Adobe's Spectrum, we were able to make a stunning design.

## What we learned

This project reinforced our learning of object oriented programming. Going through the hierarchy of objects and seeing the structure of the file was an excellent practical use of theory. We drew out the relations to further our understanding. We know much more about OOP than before this project.

We also learned about proxying for Adobe Express. We learned about the runtimes and how proxies work. The abstraction was confusing at first, but after much tinkering and reading, we have a much stronger understanding.

## What's next for GitExpress

Connect to remote repositories like GitHub or GitLab to enable further collaboration.

Create branches and merging behaviours to simulate GitHub desktop.

Use Cohere API to generate Version Names based on the user's commit message.

## Demo (Youtube)

[![Demo Video](https://cdn.discordapp.com/attachments/1070372249959407646/1243245661361799208/Thumbnail.png?ex=6650c640&is=664f74c0&hm=e2124b725d371f756a8b6fcc0be6b56e7f069f7a4254ae09f276635347a433c9)](https://www.youtube.com/watch?v=Sw63SwE4vj4 "Demo Video")


## Prototype (Figma)

https://www.figma.com/proto/US1cJmJUMhVqEAqKFelYJq/GitExpress?node-id=100-2880&t=OJyN5FH1q9oRyUGR-0&scaling=contain&page-id=0%3A1&starting-point-node-id=100%3A2880&show-proto-sidebar=1

## Built With
- adobe
- express.js
- figma
- git
- node.js
