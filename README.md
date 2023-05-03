# CIS-4500-Project
## Description:
There are thousands of counties in the United States. Each one at a different position in the housing market. Some have more expensive housing, while others have more affordable housing. Researching the housing costs of individual counties can be tedious and time-consuming. Well, we've made that simple! Our application allows you to search for counties in the United States and give you information about housing costs in that county. You can also use the slidebar to narrow down the counties that meet a certain criteria, such as the median listing price, median square footage, total available listings, etc. You will also have access to past information, so you can see the trends from the past to the present of the counties in the housing market. If there are any counties that you have interest in, our application allows you to favorite that county for ease of access in the future. In addition, you can compare two counties easily.

Collow: The County Version of Zillow

(Data Up To February 2023)

## Directories:
- client
    - public 
        - CollowLogo.png
        - collowName.png
        - index.html
    - src 
        - components
            - CountyCard.js
            - LazyTable.js
            - SideBar.js
        - helpers
            - formatter.js
        - pages
            - CompareFavoritesPage.js
            - CountyDirectoryPage.js
            - HomePage.js
            - SearchCountiesPage.js
        - App.js
        - config.json
        - index.js
    - .gitignore
    - package-lock.json
    - package.json
- data
    - County.csv
    - Hotness.csv
    - Listing_Count.csv
    - Listing_Price.csv
    - Square_Footage.csv
    - Supply_and_Demand.csv
- server
    - .gitignore
    - config.json
    - package-lock.json
    - package.json
    - routes.js
    - server.js
- README.md
