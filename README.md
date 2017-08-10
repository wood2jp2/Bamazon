# Bamazon
Using MySQL, I will be tracking the inventory / orders of a store similar to Amazon.

bamazonCustomer -

This portion was relatively familiar as I had already done some SQL database integration / data manipulation for my Flash Card assignment last week. In this assignment, the customer is prompted the available items I have populated in my bamazon_DB. Using the inquirer package, they are able to choose an item based off their item ID, as well as a quantity. IF there is enough stock to complete the purchase, the customer's total in dollars is shown, and the quantity in SQL is updated. If not, the customer is notified of the shortage in stock, and is shown how many of that item are actually available. I also added a promise-like thingy to loop back through the inquirer / products once something was purchased.

bamazonManager -

This was set up similar to bamazonCustomer. The difference was that the manager had authority to do four commands: view all products, view products that needed restocking (less than 5 in stock), add to any product's inventory, or add a new product. A switch statement was much easier than doing if statements. Utilizing that, I was able to throw an action based off the manager's answer. The first two options were simply displaying the data for all products / products that were in low quantity (using a 'WHERE stock_quantity <=5' statement). Adding stock required me to first pull down the item in question from the database, then taking the manager's new quantity and adding that to that total, then updating the value in SQL, which required some research on my end. Lastly, adding a new product in wasn't too difficult, just a 'INSERT INTO' statement with some template literals, which are now my new favorite thing for strings (way easier than all those quotes and plus signs)

bamazonSupervisor -

The tough part here was figuring out how to join the two tables (departments and products) based off my very limited SQL experience. The 'Add New Department' functionality acted the same as adding a new product in the above iterations. Once I was able to join the two tables, I added the profits column using a SUM / AS statement. I then realized going back that I had to set the default for the product_sales tab on the products table to 0.00, otherwise, when a new product was added, the code would break. Anyways, I'm tired of typing. You get the idea.
