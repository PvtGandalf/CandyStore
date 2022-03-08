# Assignment 4

**Assignment due at 11:59pm on Monday, 2/28/2022**<br>
**Grading demo due by 5:00pm on Friday 3/18/2022**

The goal of this assignment is to use Redux to maintain the global state of an application.  You will specifically implement a basic shopping cart application for the "Penny Candy Store", an online store that sells penny candy.

Your job is to implement the Redux-based application described below.  The implementation is broken down into a couple different sub-tasks.

## 1. Display a list of all available products

The application you'll write will allow users to add products into a shopping cart and then to "buy" the products in their cart.  This, in turn will result in a change to the store's inventory of each product that was purchased.

The first task in the assignment is to display a list of all of the available products, which are specified in [`src/data/products.json`](src/data/products.json).  I'd encourage you to use the [`useProducts()` hook](src/hooks/useProducts.js) to "fetch" the products, but it's fine if you want to just `import` the product data JSON file directly.

Each product is comprised of several pieces of data:
  * `id` - A unique product ID
  * `name` - The name of the product
  * `price` - The price-per-unit of the product
  * `inStock` - The number of units of the product the store has in stock
  * `photoUrl` - A URL for an image of the product

To display the list of products, you should first add them to a Redux store.  The store should initially begin with an empty inventory, and products should be added via an action (e.g. `RECEIVE_PRODUCTS`).

Once the products are added to the store, you should implement a component to display an individual product and use this component to display a list of products based on the data from the store.  Each product item displayed in the list should have the following visual elements:
  * The name of the product.
  * The product image.
  * The price of a unit of the product.
  * The number of units in stock.
  * A small text/number input field where the user can enter the number of units of the product they want to add to their cart.
      * This field should initially contain the value 0 for all products, and, importantly, users should be able to modify the value of this field independently for each different product.  In other words, if I enter a value for the Swedish Fish product, it should not affect the values for any of the other products.
  * A button that says "add to cart".

You should add some CSS to make this list relatively visually appealing.  The styling doesn't need to be super polished, but you should make your application look roughly like a regular online store.  For example, all of the product images displayed in the product list should be the same size.  You may choose how to implement this CSS.  For example, writing a simple CSS file is fine, or you can use Emotion (or another CSS-in-JS library, if you want to explore).

## 2. Add a shopping cart widget

Once your app can successfully display the list of products, you should add a shopping cart widget to the app.  Specifically, you should modify the app so that when the user enters a positive number of units for a specific product and clicks the "add to cart" button for that product, the specified number of units of that product are added to the shopping cart.  The data for the shopping cart should also be kept in the Redux store.

The shopping cart itself should be implemented as a distinct component, and visually, the shopping cart should look like one you might expect in a typical online store.  Specifically, it should list the products the user has added to the cart along with the total cost of all products.  Each product should be listed with the following information:
  * The name of the product
  * The price-per-unit of the product
  * The total number of units of the product added to the cart
  * The total cost of the units of the product (e.g. if Swedish Fish cost $0.01 each and the user has added 5 of them to their cart, the total cost of Swedish Fish is $0.05)

Like the product list, you should write CSS to make the shopping cart relatively visually appealing, though, again, high polish is not necessary here.

The shopping cart and the product list should interact in the following ways:
  * When the user clicks the "add to cart" button for a product and units of that product are added to the shopping cart, the same number of units should be deducted from the in-stock inventory of the product.  For example if the user enters a quantity of 5 Swedish Fish and clicks the "add to cart" button, the number of Swedish Fish in the cart should increase by 5, and the number of Swedish Fish in stock in the product list should decrease by 5.

  * If the user enters a quantity greater than the number of units in stock for a product and tries to add that quantity to their cart, they should be prevented from doing so.  Try to display an appropriate error to the user when this happens.

  * If a user adds all of the units of a given product to their cart, the "add to cart" button for that product should become disabled (to do this, you should just be able to add the [`disabled` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled) to the `<button>` element), and its text should change to "out of stock".

The shopping cart should also have the following features:
  * The shopping cart should be implemented so that it is initially hidden and is only displayed when the user clicks a button or link.  The text of that button/link should contain the number of distinct products in the cart (not the total number of items of the products).  For example, if the user has 40 Swedish Fish, 2 Tootsie Pops, and 10 Jolly Ranchers in their cart, the button/link should say something like "Cart (3)".  This displayed count should be derived from data in the Redux store.

  * There should be some mechanism that allows the user to remove a product from their cart (e.g. a "remove" button or link for each product in the cart).  If a product is removed from the user's cart, the appropriate number of units of that product should be added back to the in-stock inventory in the product list.

  * The shopping cart should contain a "checkout" button.  For this app, the "checkout" button should simply empty out the shopping cart (i.e. remove all products from it) *without* adding those products back to the in-stock inventory.

Think carefully about how to design the Redux elements related to the shopping cart.  For example, you'll likely need several actions, e.g. one to add an item to the cart, one to remove an item from the cart and place it back in inventory, one to checkout, etc.  Importantly, some actions will affect multiple parts of the store.  For example, the "add to cart" action will both add items to the cart and subtract them from the inventory.

## Assignment submission

We'll be using GitHub Classroom for this assignment, and you will submit your assignment via GitHub.  Just make sure your completed files are committed and pushed by the assignment's deadline to the master branch of the GitHub repo that was created for you by GitHub Classroom.  A good way to check whether your files are safely submitted is to look at the master branch your assignment repo on the github.com website (i.e. https://github.com/osu-cs499-w22/assignment-4-YourGitHubUsername/). If your changes show up there, you can consider your files submitted.

## Assignment grading

This assignment is worth 10 points total.

Remember that in this course, programming assignments will be graded based on effort instead of correctness, and you will get full credit for an assignment if it is submitted on time and is clearly the product of a determined effort to solve the problem.  Again, If you’re unable to solve the homework problem, make sure to submit all code you’ve written, and then describe in comments in the source code the following three things:
  1. How you attempted to solve the problem.
  2. Where you ran into trouble.
  3. What options you think (conceptually) might lead to a working solution.
