describe('Cart Page Tests', () => {

    beforeEach(() => {
        cy.eyesOpen({
            appName: 'E-Commerce',
            testName: 'Cart',
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
    // toast_toastWrapper__oyIvy toast_hiding__rr8kZ 
    it('Functionally validates the cart', () => {
        cy.visit('https://sandbox.applitools.com/e-commerce/products/gorgeous-cotton-computer');

        // Select a color from the dropdown, change the quantity to 5 and add item to the cart
        cy.get('._productHandle__selectVariant__mZqg0 > select:nth-child(1)').select('gold');
        cy.get('.numeric-input_input__kigy2').clear().type('5');
        cy.get('#buyButton').click();
        // Wait for cart update
        cy.get('.cart-button_badge__zNyg0', { timeout: 10000 }).should('exist');

        // nav go cart page
        cy.get('#cartButton').click();
        cy.get('.toast_toastWrapper__oyIvy', { timeout: 10000 }).should('not.exist');

        // Confirm 5 items are added to cart
        cy.eyesCheckWindow({
            tag: 'Cart - Quantity 5'
        })

        // Click the up arrow and validate the change
        cy.get('.numeric-input_increment__3dJR8').click();
        cy.get('.toast_toastWrapper__oyIvy', { timeout: 10000 }).should('exist');
        cy.get('.toast_toastWrapper__oyIvy', { timeout: 10000 }).should('not.exist');
        cy.eyesCheckWindow({
            tag: 'Cart Increment'
        })

        // Click the up arrow and validate the change
        cy.get('.numeric-input_decrement__k6RRg').click()
        cy.get('.toast_toastWrapper__oyIvy', { timeout: 10000 }).should('exist');
        cy.get('.toast_toastWrapper__oyIvy', { timeout: 10000 }).should('not.exist');
        cy.eyesCheckWindow({
            tag: 'Cart Decrement'
        })

        // Override the quantity and set it to 3
        cy.get('.numeric-input_input__kigy2').clear().type('3');
        cy.get('.toast_toastWrapper__oyIvy', { timeout: 10000 }).should('exist');
        cy.get('.toast_toastWrapper__oyIvy', { timeout: 10000 }).should('not.exist');
        cy.eyesCheckWindow({
            tag: 'Cart - Enter Value'
        });

        // Click the remove button and confirm cart is empty:
        cy.get('.line-item_remove__vZAy3 > button:nth-child(1)').click();
        // Wait for update
        cy.get('.cart_emptyStateHeading__KhUYD', { timeout: 10000 }).should('exist');
        cy.eyesCheckWindow({
            tag: 'Cart - Empty'
        });
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