# Stocks App Frontend

Hi. If you're maintaining, or viewing this as a project in the future, welcome.

I'm Afraz, and we probably haven't met. But it is guaranteed that I gave you the link to this project. There is no way someone would know about this. (*I can't say about Linkedin*).

------

About a basic walkthrough of the code organization. (Since the code factorings are messy and I kind of don't want to make this hell for you to understand.)

#### Part 1: Folder Structure

The folder structure inside the `/src` is mostly descriptive for what it is. So in reducers, you would find reducers, in components (*you get it*).

However:

Initially I was using zustand for state management. (Google it, its an awesome library for state management, way simpler than Redux). Then, I swapped zustand for Redux since I could manage multiple reducers within one store provider.

That is the reason inside `src/stores` you would find two 'stores'. 

``````markdown
--- stores
------- searchStore.js  <---(deprecated)
------- store.js
``````

The searchStore.js file contains Zustand state management code that is deprecated. The store.js is a valid import.



Another tardiness on my part was the organization inside `src/contexts/auth/` folder. You see, I'd came up with a logic on how to write Protected Routes functionality, didn't work. So me, being the sharp developer I am, decided to go to ChatGPT and ruin my code instead of giving 5 minutes to reading the docs. Not that it didn't come to that, but after an hour of splendid time waste.

Anyways, I couldn't figure out where to keep this ProtectedRoute Component. It's usable I agree, so should've gone inside the components folder. However, since my app is using all authentication in this very directory, I decided to keep it here and inform you of the setup.

``````markdown 
--- contexts
------ auth
--------- ProtectedRoute.jsx
--------- authContext.jsx
--------- AuthProvider.jsx
``````



#### Part 2: Code imports

Alright, I might've made a few structural errors here. 🙂

The `src/scenes` contains all the views of the app.

In here, the `/global/PostAuth.jsx` component handles the dashboard and the views. Which, instead of delving into scenes, some are components and some are scenes in the adjacent `/dashboard` directory.

------



*If you made it this far, consider following me on Linkedin https://linkedin.com/in/afraz-butt/*.

*But since you are seeing this repository, there is a 97% chance that you know me, and you can reach out to me on Whatsapp as well. But be reminded, I won't remember about the code or anything by then. I don't remember what I wore yesterday, this code is an overkill.*