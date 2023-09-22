describe('Home page', () => {

    beforeEach(() => {
        cy.eyesOpen({
            appName: 'E-Commerce',
            testName: 'Home Page',
            // Tell the UFG which environments to run cross browser tests on
            browser: [
                {width: 1400, height: 800, name: 'firefox'},
                {width: 1400, height: 800, name: 'chrome'},
                {width: 1400, height: 800, name: 'safari'},
                {width: 1400, height: 800, name: 'edgechromium'}
            ],            
            // Set the concurrency that tests are rendered with on the UFG
            concurrentSessions: 5
        })
    })
    it('Visually validate the home page', () => {
        cy.visit('https://sandbox.applitools.com/e-commerce');

        // Uncomoment this to see what happens when a product is removed and the grid changes
        // cy.get('a.product-card_productCardStyle__hiUnf:nth-child(2)').invoke('remove');

        cy.eyesCheckWindow({
            tag: 'Home',
            // Apply a Layout Match Level region around our product grid;
            layout: {selector: '.productsList_listingContainerStyle__naU6k'},
            // Layout algorithm enhancements for handling dynamic grids
            enablePatterns: true,
            useDom: true
        })
    })

    afterEach(() => {
        cy.eyesClose()
    })

    after(async () => {
        // Wait for all UFG renders to finish and log test results
        const results = await cy.eyesGetAllTestResults();
        console.log(results);
    })
})