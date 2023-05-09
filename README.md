# Heyo Code Reviewers

I'd like to summarize my approach and reasoning with this code challenge here. I did a number of things I'm proud of, 
and a few I would never leave in place for an actual production release.

### Data fetching
The API linked below does not seem to be supported any longer. I did find some older tutorials on youtube that used 
this so that I could grab the endpoint in case that still worked, but sadly it does not. In its place, I used the
[Countries Now API](https://countriesnow.space/). This is... _not_ a great API, but it's free and gave me _most_ of 
what I needed. 

The biggest gap, which I hope you'll forgive, is that this API only allows you to fetch a single city or 
country's city populations at a time. Meaning I did not include a mechanism to sort by capital city population, because 
that'd require 250+ requests - most of which will fail because crummy API. It DID however include the country's total
population, so I made that a sortable column on the primary table.

This API also required three separate calls to get the "baseline" data, which needed a little mutation love before being
returned to the UI. Not a big deal, but I think the `restcountries` API would've returned everything in a nice little 
package. 

### Styling
Surprising, I know, but I am not a designer. This is a pretty bare-bones design, but everything is easily readable and 
interact-able (don't think that's a word). If this were a larger project, I definitely would've used Sass or Less with 
a pre-processor. I simply decided against spending the time to do so, but if anyone doubts I am able to do that or 
wants to see it done, I will happily make the addition. 

In the real world, I use more generic class names like `flex justify-between border-left` instead of incredibly 
specific id-like classNames. Reason being is that I did not want to spend the time creating all of those classes when 
they'd likely only be used once or twice. I think generic, composable, and easily reusable classes are the strength of 
CSS (maybe its only strength...?). 

### Testing
I added MSW to mock endpoints. This library has become near and dear to me of late, and it allows for such an 
improvement in testing QoL. I didn't go too crazy with it, but would be happy to discuss/defend its inclusion in any 
project.

React testing-library is old hat by now, and I've definitely developed a personal pattern around this lib. My coverage
here is obviously lacking, but hopefully the tests I included show enough of my comfort with it as a tool.

### Project
I updated the dependencies in package.json to their latest version. Asking forgiveness instead of permission here. 
I don't believe anything I wrote is specific to R18 outside of `createRoot` in /index.tsx, but it irks me to use 
packages that are more than 1 major version behind. Also included are a prettier and eslint script/command. Not a big 
deal, but I like having that auto-formatted standard look to my code.

You can clone this project by running `$ git clone git@github.com:daveboehm/countries-assessment.git`
Then run 
`yarn`
`yarn start` or `yarn test` depending on what you want to see.

## Cheers!

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
2. You must use TypeScript for typing your methods, your components and the data structures associated
3. You must not use any third party JavaScript utility libraries
4. You can use any style approach you prefer (CSS, CSS Preprocessors, Styled Components, etc.)
5. You can use any library you like for fetching the data (also the builtin fetch would be totally fine)
6. You can use any testing library for unit testing some of your code (Jest is already setup in the project and ready to be executed through the command `yarn test`)

### Functional Requirements

1. Show a main page with the list of countries, allowing filtering and sorting (asc/desc) by the population of the capital city of the country 
   
2. Selecting a country, show the following information of the country:
   1. Capital City with the related info
   2. Language
   3. Currency

3. Provide a way to filter out countries by name or code
   
4. Provide a way to sort countries (asc/desc) by the population of its capital city 
   
5.  Add tests associated to the filter and sorting features
   
6.  Add styles for displaying the items in a user friendly way
