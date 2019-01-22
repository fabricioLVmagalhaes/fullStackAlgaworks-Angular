import { FabriciomoneyUiPage } from './app.po';

describe('fabriciomoney-ui App', () => {
  let page: FabriciomoneyUiPage;

  beforeEach(() => {
    page = new FabriciomoneyUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
