const { rest } = require('msw');
const { setupServer } = require('msw/node');
const populationsResponse = require('../__fixtures__/mock-country-populations.json');
const currenciesResponse = require('../__fixtures__/mock-country-currencies.json');
const capitalsResponse = require('../__fixtures__/mock-country-capitals.json');
const capitalPopulationResponse = require('../__fixtures__/mock-capital-population.json');

const baseUrl = 'https://countriesnow.space/api/v0.1/countries';

export const mswHandlers = setupServer(
  rest.get(`${baseUrl}/population`, (req: any, res: any, ctx: any) => {
    return res(ctx.status(200), ctx.json(populationsResponse));
  }),

  // tslint:disable-next-line
  rest.get(`${baseUrl}/currency`, (req: any, res: any, ctx: any) => {
    return res(ctx.status(200), ctx.json(currenciesResponse));
  }),

  rest.get(`${baseUrl}/capital`, (req: any, res: any, ctx: any) => {
    return res(ctx.status(200), ctx.json(capitalsResponse));
  }),

  rest.post(`${baseUrl}/population/cities`, (req: any, res: any, ctx: any) => {
    return res(ctx.status(200), ctx.json(capitalPopulationResponse));
  })
);
