This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
### Live Url

https://wallettxexplorer.com

# How to setup & use Wallet Transactions Explorer

If you are launching it locally, create accounts with etherscan, bscscan and polygon, and set up your api keys. Create the following .env environment variables and assign them the api keys you just set up with the block explorers:

REACT_APP_ETHERSCAN_API_KEY=
REACT_APP_BSCSCAN_API_KEY=
REACT_APP_POLYGONSCAN_API_KEY=

## Exploring Wallet Transactions

Select the network you want to search transactions on, and then enter two wallet address that you want to find transactions between.

Hit search and wait for the search to finish.

Once the search finishes, if there have been transaction between those two wallets within both of their past 10,000 transactions, those transactions will be loaded in the table below.

Clicking on a transaction's row will prompt you to be taken to view the transaction on its block explorer.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
