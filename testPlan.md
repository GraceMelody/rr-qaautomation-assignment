# Test Plan for [tmdb](https://tmdb-discover.surge.sh/)

Disclaimer: this test plan is not an extensive test plan, due to the limited amount of time I have to do this task. There needs to be more cases covering the interaction between multiple filtering options, in where I have found a bug (see README, last section).

## ❖ Filtering Options:
### ➢ Categories: Popular, Trending, Newest, Top Rated
#### Checking if all pages would load in some way and checking if the URLs are correct 
1. Open [tmdb](https://tmdb-discover.surge.sh/)
2. Check slug URL `/popular` by default
3. Click on `Trend` tab
4. Check slug URL `/trend` after clicking
5. Click on `Newest` tab
6. Check slug URL `/new` after clicking
7. Click on `Top Rated` tab
8. Check slug URL `/top` after clicking
9. Click on `Popular` tab
10. Check slug URL `/popular` after clicking

This covers checking if all pages would load in some way, but **DOES NOT** cover if the pages would load from a specific page, e.g. when in `/popular` would `/new` or `/top` load or not, etc. 

We can expand more on this by covering all the routes later.

#### Negative test: navigate to specific pages using specific URL 
1. Open https://tmdb-discover.surge.sh/popular
2. Check if page loads `Popular` tab properly
3. Open https://tmdb-discover.surge.sh/trend
4. Check if page loads `Trend` tab properly
5. Open https://tmdb-discover.surge.sh/new
6. Check if page loads `Newest` tab properly
7. Open https://tmdb-discover.surge.sh/top
8. Check if page loads `Top Rated` tab properly

Note: The negative test case caused by going to a page using a specific slug doesn't work because I assume this page is a single-page application where the links are actually being updated by JS itself, so that clicking links modifies the browser URL bar without triggering a page load.

### ➢ Titles

Note: The search is **NOT** based on titles after trying some terms out. Not quite sure what it's based on right now as I cannot really see the movie details from the page.

#### Happy flow - One page one result
1. Open [tmdb](https://tmdb-discover.surge.sh/)
2. Go to search bar
3. Type a specific movie title (e.g. `Chainsaw Man - The Movie: Reze Arc`)
4. Click search logo (optionally press enter on the search bar)
5. Check if results contain movie title specified in step 3 based on ordering in current tab

#### Happy flow - Multiple page multiple result
1. Open [tmdb](https://tmdb-discover.surge.sh/)
2. Go to search bar
3. Type a specific movie title (e.g. `Ghibli`)
4. Click search logo (optionally press enter on the search bar)
5. Check if results contain movie title specified in step 3 based on ordering in current tab

#### Happy flow - One page multiple results
1. Open [tmdb](https://tmdb-discover.surge.sh/)
2. Go to search bar
3. Type a specific movie title (e.g. `Bee Movie`) that will yield more than one but less than 20 results
4. Click search logo (optionally press enter on the search bar)
5. Check if results contain movie title specified in step 3 based on ordering in current tab

#### Blank search
1. Open [tmdb](https://tmdb-discover.surge.sh/)
2. Go to search bar
3. Type something first to modify search bar
4. Type nothing ("")
5. Click search logo (optionally press enter on the search bar)
6. Check if results shows all movies based on ordering in current tab

#### No results
1. Open [tmdb](https://tmdb-discover.surge.sh/)
2. Go to search bar
3. Type random string that will yield no results (e.g. `aasdf`)
4. Click search logo (optionally press enter on the search bar)
5. Check if results shows no movies

#### Negative test case - Search for TV Series
1. Open [tmdb](https://tmdb-discover.surge.sh/)
2. Go to search bar
3. Search for a specific TV Series (e.g. `Tagesschau`)
4. Click search logo (optionally press enter on the search bar)
5. Check if there are results


### ➢ Type: Movies or TV Shows

#### Filter: Default
##### !!Note: This test case is on pending due to not knowing the expected behavior!!
1. Open [tmdb](https://tmdb-discover.surge.sh/)
2. Make sure the default filter is on `Movies` already
3. Check if it filters TV Shows out

#### Filter: Movies only
1. Open [tmdb](https://tmdb-discover.surge.sh/)
2. Save the list of Movies shown
3. Select `Movies` from the dropdown
4. Check if it filters TV Shows out by seeing if the titles are still the same 
Note: step 4 is designed that way due to the nature of the current behavior. Current behavior is that the main page only shows `Movies`

#### Filter: TV Shows only
1. Open [tmdb](https://tmdb-discover.surge.sh/)
2. Save the list of Movies shown
2. Select `TV Shows` from the dropdown
3. Check if it filters Movies out by comparing if the previous list is different than the currently shown list.

### ➢ Year of Release

#### Happy flow - Filter by year (Starting year)
1. Open [tmdb](https://tmdb-discover.surge.sh/)
2. Save the list of movies shown 
3. Add filter in starting year (2024)
4. Compare movie list with the list on 2nd step
5. See if movies shown is either 2024 or 2025

#### Happy flow - Filter by year (Ending year)
1. Open [tmdb](https://tmdb-discover.surge.sh/)
2. Save the list of movies shown 
3. Add filter in ending year (1901)
4. Compare movie list with the list on 2nd step
5. See if movies shown is either from 1900 or 1901

#### Happy flow - Filter by year (Both)
1. Open [tmdb](https://tmdb-discover.surge.sh/)
2. Save the list of movies shown 
3. Add filter in both dropdowns (2007-2008)
4. Compare movie list with the list on 2nd step
5. See if movies shown is either from 2007 or 2008

#### Negative flow - Filter by year (Same year)
1. Open [tmdb](https://tmdb-discover.surge.sh/)
2. Save the list of movies shown 
3. Add filter in both dropdowns (2007-2007)
4. Compare movie list with the list on 2nd step
5. See if movies shown is only from 2007

Note: For these two latter category (Rating and Genre), I don't have the ground truth to compare with other than doing the API call to the same source of website to confirm if the results are displayed properly. This can be improved if there are other ways to confirm the list of movies other than directly calling the same API (e.g. comparing with the DB itself), however this is the only solution that we can do to test this for now. 

### ➢ Rating

#### Happy flow - Filter by rating
1. Call API using filter of ratings 5* and up
2. Open [tmdb](https://tmdb-discover.surge.sh/)
3. Select 5* and up rating filter
4. Compare the list of 20 movies shown in the first page and the first 20 results of the API call in step 1

### ➢ Genre

#### Happy flow - Filter by one genre
1. Call API using filter of genre action
2. Open [tmdb](https://tmdb-discover.surge.sh/)
3. Select genre filter (action)
4. Compare the list of 20 movies shown in the first page and the first 20 results of the API call in step 1

#### Happy flow - Filter by more than one genre
1. Call API using filter of genre action
2. Open [tmdb](https://tmdb-discover.surge.sh/)
3. Select genre filter (action and comedy)
4. Compare the list of 20 movies shown in the first page and the first 20 results of the API call in step 1


## ❖ Pagination

#### Happy flow - View second page (Same year)
1. Open [tmdb](https://tmdb-discover.surge.sh/)
2. Click on the second page of the list 
3. See if page loads and shows movies

#### Negative flow - View last page 
1. Open [tmdb](https://tmdb-discover.surge.sh/)
2. Click on the last page of the list 
3. See if page loads and shows movies



Last couple of pages in the list doesn't work I assume due to those numbers being an estimate of how many pages there should be, but there might be a miscalculation that causes it to not work.

I'm assuming this might have something to do with the mechanism that controls showing both `Movies` and `TV Shows`.