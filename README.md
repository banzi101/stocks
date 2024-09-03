## Welcome!

You are creating a simple paper-trading webapp that lets users practice trading stocks on the NASDAQ without spending any money. Please watch the following 2 minute video for a walkthrough:

https://youtu.be/_iASIMXQohY

## Website designs & requirements

The design and video are there just for reference. We will accept any website that somewhat resembles the original design, as long as the functionality is there.

- Using a design library can greatly improve your efficiency. We recommend Ant Design, TailwindCSS or Chakra UI.
- The design uses the font **Montserrat.**

If you are unsure about requirements:

- Make your own resonable assumptions and proceed. Don't forget to discuss them in your README.
- You don’t need to ask / wait for our approval.

### Dashboard (`/`)
- Displays portfolio's value & profit / loss. (Please refer to "Key Metrics Explained" at the bottom for calculation explanations.)
- Displays the **Symbol**, **Current Value**, **Total Shares** & **Profit / Loss**. Opens the Stock Selling Modal when clicked.

### Stock Selling Modal (`/`)
- Displays the purchase price & total shares owned.
- Users can sell any amount of the stock.
- After a stock is sold, it no longer needs to be accounted for in any of the stats. (i.e. you can delete it from the database)

### Stock Buying Page (`/buy`)

- When a user enters something in the NASDAQ Symbol field, the API performs a lookup and finds the price of the stock.
    - Handle the case where the Symbol is invalid / doesn’t exist.
- The price of the stock is displayed and also filled into the price box. The default quantity should be `1`.
- If the quantity is adjusted, the total price should change as well.
- When Buy is clicked, the share is added to the database.
    - To simplify things, **you can only buy shares you don’t own already**.
    - This is so you don’t need to keep track of multiple purchase prices.

## Marking Criteria

You don’t need to finish this assessment with 100% to get an interview. Please make your best effort and we will consider it case-by-case. 

| Category                    | Description                                                                                                                                       | Percentage |
|-----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|------------|
| Functionality               | Do all features work as expected? Does the website handle normal errors a user can make?                                                           | 20%        |
| Database & API              | Is the choice of database & API appropriate? Is the database & API implementation efficient & secure?                                              | 20%        |
| Design                      | Does the website resemble the original design? Is the use of CSS & HTML efficient? Is the design responsive? (i.e. can use on mobile & desktop)     | 20%        |
| Code Quality                | Is the code written readable and efficient? Does the structure of the code make sense?                                                             | 20%        |
| Maintainability & Scalability | Is the code maintainable? Will there be any issues if a lot of users use the site? Is the chosen framework & libraries appropriate? Is the usage of frameworks & libraries efficient? | 10%        |
| Tools                       | Does the project use software tools efficiently? (e.g. CI/CD, linting, code format, Git)                                                           | 10%        |


## Notes / Questions

- You are **encouraged to use AI tools** to help you complete this.
- In your README, you can add information about your project if you want to share with us. (e.g. explain assumptions / decisions, discuss challenges)
- You must commit progressively to your GitHub so we can see how you are progressing.
    - Please name your commits appropriately.
    - You don’t need to use branches for this project.
- This is a solo project. You cannot work together with someone else. Do not share solutions before the **14th of September**. After that you can do whatever you want with this project.
- You don’t need to write tests for this project.

### Deployment & Databases

- Please deploy your website whether it’s complete or not.
    - We may refuse to download and run your code for security reasons.
    - We recommend using Vercel https://vercel.com/ - it is completely free.
- Local, file-based databases are not accepted. (e.g. `.sqlite` database)
    - We recommend MongoDB Atlas, Supabase or Firebase. All are completely free.
- If you want to build a backend, please do so within the same repository.
    - You can deploy a backend on Firebase or Vercel for no costs at all.
    - Hint: you might not need to deploy a backend separately. Research the APIs and libraries available.

### Stock Pricing & API

- As long as the stock prices are no more than a day old, we will accept it.
- We recommend this API: https://finnhub.io/docs/api/, it is completely free with a 60 calls / minute limit.
- We will not reimburse any API / hosting fees.

## Key Metrics Explained
The **Total Value** of your portfolio is calculated by summing up the current market value of all your owned shares. This represents how much your portfolio is worth today based on the latest market prices.

The **Total Profit/Loss** reflects the difference between the current value of your portfolio and the amount you originally invested. It shows whether you’ve made a profit or incurred a loss based on the purchase prices of your shares.

Each stock in your portfolio displays the following:

- **Symbol**: The NASDAQ symbol of the stock.
- **Current Value**: The latest market price of the stock.
- **Total Shares**: The total number of shares you own.
- **Profit/Loss**: The net gain or loss for this stock, calculated as `(Current Value - Buy Price) * Shares Owned`.

<details>
  <summary>Example Calculations</summary>

  ### Example Portfolio:
  --- 
  **MSFT**  
  - Current Value: $400  
  - Buy Price: $300  
  - Shares Owned: 10  
  
  **AAPL**  
  - Current Value: $200  
  - Buy Price: $300  
  - Shares Owned: 10

  ### Example Calculations
  ---
  **MSFT's Stock Information**  
  Symbol: MSFT  
  Current Value: $400  
  Total Shares: 10  
  Profit/Loss: ($400 - $300) * 10 = $1000 Profit
  
  **AAPL's Stock Information**  
  Symbol: AAPL  
  Current Value: $200  
  Total Shares: 10  
  Profit/Loss: ($200 - $300) * 10 = -$1000 Loss

  **Portfolio's Total Value**  
  Total Value
  = MSFT + AAPL  
  = ($400 * 10) + ($200 * 10)  
  = $6000
  
  **Portfolio's Total Profit/Loss**  
  Total Profit/Loss 
  = (MSFT Current Value - MSFT Buy Price) * MSFT Shares Owned + (AAPL Current Value - AAPL Buy Price) * AAPL Shares Owned  
  = ($400 - $300) * 10 + ($200 - $300) * 10  
  = $1000 + (-$1000)  
  = $0

  ---

</details>
