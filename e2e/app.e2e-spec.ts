import { KalakalareviewPage } from './app.po';

describe('kalakalareview App', () => {
  let page: KalakalareviewPage;

  beforeEach(() => {
    page = new KalakalareviewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
