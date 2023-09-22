describe('Category Pages', () => {

    beforeEach(() => {
        cy.eyesOpen({
            appName: 'E-Commerce',
            testName: 'Automotive Category Page',
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
    it('Visually validate a category page', () => {
        cy.visit('https://sandbox.applitools.com/e-commerce/type/Automotive');

        cy.eyesCheckWindow({
            tag: 'Automotive Category',
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