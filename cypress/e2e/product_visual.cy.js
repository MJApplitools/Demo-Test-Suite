describe('Product Page - Visual', () => {

    beforeEach(() => {
        cy.eyesOpen({
            appName: 'E-Commerce',
            testName: 'Product Page Visual',
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

    it('Visually validate the product page', () => {
        cy.visit('https://sandbox.applitools.com/e-commerce/products/gorgeous-cotton-computer');

        cy.eyesCheckWindow({
            tag: 'Home',
            // Apply a Layout Match Level region around the countdown timer (if it exists)
            layout: [
                {selector: '._productHandle__productBox__Oll8x > div:nth-child(2) > div:nth-child(3) > p:nth-child(1)'},
            ]
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