# Assessment Documentation

The main goal of this assessment is to create a React Application using TypeScript in order to show a list of countries, and then showing for each country the data associated to it.  

## Instructions

Fork the current repository and start the skeleton executing the following scripts:

```s
yarn install
yarn start 
```

The application provides a basic setup using **Create React App** with a typescript template. 

The description of the API is available [here](https://restcountries.eu/?ref=public-apis)

## Requirements

During the implementation, you must accomplish the following functional and technical requirements

### Tech Requirements

1. You must use Hooks and Functional Components
   2. **Done** 
2. You must use TypeScript for typing your methods, your components and the data structures associated
   3. **Done**
3. You must not use any third party JavaScript utility libraries
   4. **Done, but lodash would've been so nice**
4. You can use any style approach you prefer (CSS, CSS Preprocessors, Styled Components, etc.)
   5. **Done - just plain CSS for something this small**
5. You can use any library you like for fetching the data (also the builtin fetch would be totally fine)
   6. **Done - used plain fetch**
6. You can use any testing library for unit testing some of your code (Jest is already setup in the project and ready to be executed through the command `yarn test`)
   7. **Done** - Added `msw` to mock endpoints for tests

### Functional Requirements

1. Show a main page with the list of countries, allowing filtering and sorting (asc/desc) by the population of the capital city of the country 
   2. *Note: The API link provided above was returning a 500 for me. After finding the actual endpoints it uses, I found those also throw 500s. I ended up using a [separate API](https://documenter.getpostman.com/view/1134062/T1LJjU52?version=latest) which seemed to be similar enough. The biggest difference is that I did not fetch the population of each capital city, but instead just used the population of the country. It is certainly possible to do this, but I felt that the mutations and mappings I was doing already showcased enough understanding of API responses, Promises and JavaScript*
   
2. Selecting a country, show the following information of the country:
   1. Capital City with the related info
   2. Language
   3. Currency

3. Provide a way to filter out countries by name or code
   
4. Provide a way to sort countries (asc/desc) by the population of its capital city 
   
5.  Add tests associated to the filter and sorting features
   
6.  Add styles for displaying the items in a user friendly way
