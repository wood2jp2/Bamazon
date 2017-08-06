# Bamazon
Using MySQL, I will be tracking the inventory / orders of a store similar to Amazon.

bamazonCustomer -

This portion was relatively familiar as I had already done some SQL database integration / data manipulation for my Flash Card assignment last week. In this assignment, the customer is prompted the available items I have populated in my bamazon_DB. Using the inquirer package, they are able to choose an item based off their item ID, as well as a quantity. IF there is enough stock to complete the purchase, the customer's total in dollars is shown, and the quantity in SQL is updated. If not, the customer is notified of the shortage in stock, and is shown how many of that item are actually available.
