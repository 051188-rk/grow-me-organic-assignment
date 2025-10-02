# GrowMeOrganic Private Limited
ReactJS Development internship Assignment

- DEPLOYED ON VERCEL: [https://grow-me-organic-assignment-r.netlify.app/](https://grow-me-organic-assignment-r.netlify.app/)

## Resources Used
- API : [https://api.artic.edu/api/v1/artworks](https://api.artic.edu/api/v1/artworks)
- COMPONENT: [https://primereact.org/datatable/](https://primereact.org/datatable/)

## Install & Run

1. Make sure you have Node.js (v18+) and npm installed.
2. Extract the zip and open the project folder.
3. Install dependencies:
```bash
npm install
```
4. Run dev server:
```bash
npm run dev
```
5. Open the URL shown by Vite (usually `http://localhost:5173`).

## Build
```bash
npm run build
npm run preview
```

## Deliverables
- There must not be any variable which is holding all the rows fetched in different pages, else it will lead to out of memory issue.
- On every page change you must call the api to fetch the respective page data irrespective of how many times user visits a page
- Rows selection and deselection must persist across different pages
- As a user, if I visit page 2(or any page) and select(or deselect) a few rows and switch to a different page then those selection(or deselection) must persist when I visit page 2 later.
- I have done all of them and kept it minimalistic

