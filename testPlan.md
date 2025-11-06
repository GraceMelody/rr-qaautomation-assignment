# Test Plan for [tmdb](https://tmdb-discover.surge.sh/)

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
3. Type nothing ("")
4. Click search logo (optionally press enter on the search bar)
5. Check if results shows all movies based on ordering in current tab

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
1. Open [tmdb](https://tmdb-discover.surge.sh/)
2. Make sure the default filter is on `Movies` already
3. Check if it filters TV Shows out

#### Filter: Movies only
1. Open [tmdb](https://tmdb-discover.surge.sh/)
2. Select `Movies` from the dropdown
3. Check if it filters TV Shows out

#### Filter: TV Shows only
1. Open [tmdb](https://tmdb-discover.surge.sh/)
2. Select `TV Shows` from the dropdown
3. Check if it filters Movies out

#### Filter: Both (API)
1. Open [tmdb](https://tmdb-discover.surge.sh/)
#TODO: make result show both movies and tv shows using API call

### ➢ Year of Release
### ➢ Rating
### ➢ Genre
## ❖ Pagination
Last couple of pages in the list doesn't work I assume due to those numbers being an estimate of how many pages there should be, but there might be a miscalculation that causes it to not work.