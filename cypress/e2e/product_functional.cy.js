describe('Product Page - Functional', () => {

    beforeEach(() => {
        cy.eyesOpen({
            appName: 'E-Commerce',
            testName: Cypress.currentTest.title,
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

    it('Functionally validates the color selector', () => {
        cy.visit('https://sandbox.applitools.com/e-commerce/products/gorgeous-cotton-computer');

        // Select a color from the dropdown and validate the change
        cy.get('._productHandle__selectVariant__mZqg0 > select:nth-child(1)').select('gold')
        cy.eyesCheckWindow({
            tag: 'Select Color',
            // Apply a Layout Match Level region around the countdown timer (if it exists)
            layout: [
                {selector: '._productHandle__productBox__Oll8x > div:nth-child(2) > div:nth-child(3) > p:nth-child(1)'},
            ]
        })
    })

    it('Functionally validates the quantity selector', () => {
        cy.visit('https://sandbox.applitools.com/e-commerce/products/gorgeous-cotton-computer');

        // Click the up arrow and validate the change
        cy.get('.numeric-input_increment__3dJR8').click()
        cy.eyesCheckWindow({
            tag: 'Quantity 2',
            // Apply a Layout Match Level region around the countdown timer (if it exists)
            layout: [
                {selector: '._productHandle__productBox__Oll8x > div:nth-child(2) > div:nth-child(3) > p:nth-child(1)'},
            ]
        })

        // Click the down arrow and validate the change
        cy.get('.numeric-input_decrement__k6RRg').click()
        cy.eyesCheckWindow({
            tag: 'Quantity 1',
            // Apply a Layout Match Level region around the countdown timer (if it exists)
            layout: [
                {selector: '._productHandle__productBox__Oll8x > div:nth-child(2) > div:nth-child(3) > p:nth-child(1)'},
            ]
        })

        // Enter a value and validate the change
        cy.get('.numeric-input_input__kigy2').clear().type('5');
        cy.eyesCheckWindow({
            tag: 'Quantity 5',
            // Apply a Layout Match Level region around the countdown timer (if it exists)
            layout: [
                {selector: '._productHandle__productBox__Oll8x > div:nth-child(2) > div:nth-child(3) > p:nth-child(1)'},
            ]
        })

        // Click Buy Now and validate the cart update
        cy.get('#buyButton').click();
        // Wait for cart update
        cy.get('.cart-button_badge__zNyg0', { timeout: 10000 }).should('exist');
        cy.eyesCheckWindow({
            tag: 'Cart Updated',
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