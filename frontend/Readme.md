# Frontend Repository

## Design Thinking Process: Figma Planning

[View Figma Design](https://www.figma.com/file/IaWuNKthplI6NdOV6QEb9x/snippet-share?type=design&node-id=0-1&mode=design)


1. **Page 1: Create Snippets**
   - Users can create snippets with the following details:
     - Title
     - Text/Code content
     - Time to expiry (drop-down selection)
   - Upon submission, a unique URL is generated for the snippet.

2. **Page 2: Snippet List**
   - Users can view all existing snippets.
   - Displayed information includes:
     - Snippet title
     - View count per snippet
     - Time to expiry per snippet
   - Users can:
     - Sort the list by:
       1. Most recently uploaded snippet
       2. Highest view count
     - Navigate through pages using pagination (e.g., after 10 snippets, users can click to the next page).

3. **Page 3: Viewing Individual Snippets**
   - Upon entering a unique URL or clicking a snippet from the view list, users can:
     - View the snippet content
     - See the view count
     - Check the time to expiry
     - Upon page refresh, the view count increases by 1


## Features ##

## <span style="font-size: 16px">Feature 1: Create New Snippet</span>

User can input snippet title, multiline content of snippet, and set the time to expiry for each snippet. Upon clicking "custom", the user can input a custom time to expiry in terms of weeks, days, hours, and minutes. 

Upon snippet creation, the user will be given a unique URL to access the newly created snippet. The URL can be copied to the clipboard in a UI popup.

## <span style="font-size: 16px">Feature 2: View All Snippets</span>

User can view all uploaded snippets, including snippet upload time and view count per snippet.

User can sort all snippets by most recent upload or by descending view count.

## <span style="font-size: 16px">Feature 3: View Individual Snippet</span>

User can click into each individual snippet to view individual snippets. 

User can view snippet title, content, time to expiry, and view count and copy content to the clipboard.

</details>

## Technologies ##

The following tools were used in this project:

- [Node.js](https://nodejs.org/en/)
- [React](https://pt-br.reactjs.org/)
- [Material UI](https://mui.com/material-ui/)

## Folder Structure ##

> <details>
>   <summary><span style="font-size: 18px">📦 src</span></summary>
>   <ul>
>     <details>
>       <summary>📂 assets</summary>
>       <ul>
>         <li>
>           📜sort.png
>         </li>
>         <li>
>           📜visible.png
>         </li>
>       </ul>
>     </details>
>     <details>
>       <summary>📂 atoms</summary>
>       <ul>
>         <li>📂Button
>           <ul><li>📜Button.js</li></ul>
>         </li>
>         <li>📂Copy
>           <ul><li>📜Copy.js</li></ul>
>         </li>
>         <li>📂Pagination
>           <ul><li>📜Pagination.js</li></ul>
>         </li>
>         <li>📂Sort
>           <ul><li>📜Sort.js</li></ul>
>         </li>
>         <li>📂TimePicker
>           <ul>
>             <li>📜TimePicker.css</li>
>             <li>📜TimePicker.js</li>
>           </ul>
>         </li>
>       </ul>
>     </details>
>     <details>
>       <summary>📂 components</summary>
>       <ul>
>       <li>📂Home
>         <ul>
>           <li> 📜Home.css</li>
>           <li>📜Home.js</li>
>         </ul>
>       </li>
>       <li> 📂NavBar
>         <ul>
>           <li>📜NavBar.css</li>
>           <li>📜Navbar.js</li>
>         </ul>
>       </li>
>       <li>📂Snippets
>       <ul>
>         <li>📂Snippets.css</li>
>         <li>📂Snippets.js</li>
>       </ul>
>       </li>
>       <li>📂ViewSnippet
>         <ul>
>           <li>📜View.css</li>
>           <li>📜View.js</li>
>         </ul>
>       </li>
>       <li>useFetch.js</li>
>     </details>
>     <details>
>       <summary>📂 pages</summary>
>       <ul>
>         <li>📂HomePage
>           <ul><li>HomePage.js</li></ul>
>         </li>
>         <li>📂SnippetsPage
>           <ul><li>SnippetsPage.js</li></ul>
>         </li>
>         <li>📂ViewPage
>           <ul><li>ViewPage.js</li></ul>
>         </li>
>       </ul>
>     </details>
>     <details>
>       <summary>📂 theme</summary>
>       <ul><li>📜Theme.js</li></ul>
>     </details>
>     <li>📜App.css</li>
>     <li>📜App.js</li>
>     <li>📜App.test.js</li>
>     <li>📜index.css</li>
>     <li>📜reportWebVitals.js</li>
>     <li>📜setupTests.js</li>
>   </ul>
> </details>


### Atomic Components (Atoms) 

This directory contains atomic components, which are the smallest, reusable building blocks of the React application's user interface. Atomic components are easy to reuse and are independent of each other.

#### Table of Contents

- [Button](#button)
- [Copy](#copy)
- [Pagination](#pagination)
- [Sort](#sort)
- [TimePicker](#timepicker)

---

#### Button

The `Button` atom has four variants, namely the root button, "save" button for any confirmation purposes, the "disabled" variant and the "pagi" variant for pagination.

**Usage:**

```jsx
import DefaultButton from '../../atoms/Button/Button';

// Example usage
<DefaultButton label ={'Create Snippet'} disabled = {disabled} variant={variant} align='center' onClick={handleSubmit}/> 
```

#### Copy

The `Copy` atom allows users to copy selected content to the clipboard. In this case, it was used to copy the unique URL of each snippet or the snippet content.

**Usage:**

```jsx
import CopyToClipboardButton from '../../atoms/Copy/Copy';

// Example usage
<CopyToClipboardButton textCopy={url}/>
```

#### Pagination

The `Pagination` component allows users to navigate through pages of uploaded snippets. It displays the current page number and the total number of pages.

**Usage:**

```jsx
import Pagination from '../../atoms/Pagination/Pagination';

// Example usage
<Pagination currPageNum={page} totalPage={totalPage}/>

```   
#### Sort

The `Sort` component provides sorting functionality for the view snippet table. Users can sort by most recent upload or by descending view count.

**Usage:**

```jsx
import Sort from '../../atoms/Sort/Sort'

// Example usage
<Sort sort={sort} setSort={setSort}/>

```
#### TimePicker

The `TimePicker` component allows users to a custom time to expiry for each snippet. Users can input a custom time to expiry in terms of weeks, days, hours, and minutes.

**Usage:**

```jsx
import TimePicker from '../../atoms/TimePicker/TimePicker';

// Example usage
{option === 'Custom' && 
  <TimePicker setCustom={setCustom}/>}

```

  ### Components

This directory contains various components that make up different parts of the React application's user interface. These components serve as building blocks for constructing the application's views and user interactions.

#### Table of Contents

- [Home](#home)
- [NavBar](#navbar)
- [Snippets](#snippets)
- [ViewSnippet](#viewsnippet-individual-snippet)

---

#### Home

The `Home` component represents the core functionality of the application. It allows users to create a new snippet and navigate to the view snippets page.

#### NavBar

The `NavBar` component represents the navigation bar of the application. It contains links to the home page and the view snippets page.

#### Snippets

The `Snippets` component represents the view snippets page of the application. It contains a table of all uploaded snippets, including snippet upload time and view count per snippet.

#### ViewSnippet (Individual Snippet)

The `ViewSnippet` component represents the individual snippet page of the application. It contains the title, content, time to expiry, and view count of the individual snippet.

## Automated Tests:
1) Automated tests are implemented using Jest and the React testing library.
2) The tests are located in the `__tests__` folder in this frontend repository.
3) To run the tests, you will need to have the frontend application running on your machine.
4) If this is your first time running the tests, you will need to run `npm install` and `npm install --save-dev` in the `frontend` folder to install the required dependencies.
5) Once the dependencies are installed, you can run `npm test` in the `frontend` folder to run the tests.

## Future Improvements:
1) Implementing a user authentication system and a search bar to search for snippets by title.
2) Code refactoring to improve code readability and maintainability.
3) Increasing test coverage for frontend.


## Instructions to run the application:
- Head back to the root directory and run ```docker-compose up``` to start the containers for the application as specified in the root directory's [instructions](../Readme.md).
- Once the containers are up and running, the frontend application can be accessed at http://localhost:3000.
