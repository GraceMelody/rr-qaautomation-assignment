# Documentation
### ❖ What is your testing strategy?
As a self taught QA Engineer, I don't follow any particular set strategy. Most of the time it depends on the project. So, for this project, due to the nature of limited time allowance, I will try to do all of this for the assignment:
* Do a simple exploratory testing of the app in the scope mentioned
* Write *at least* one test case per filter 
* Create automation based on the defined test cases (all cases if time allows, one positive test case and one negative test case if time constraint doesn't allow it)

### ❖ Which cases did you generate? And why?
I start with generating the most obvious happy flows first, then going to the known negative test cases afterwards, to create regression catchers even after the bug is fixed. 

### ❖ Information about the test automation framework (libraries used etc.)
I used Playwright for this assignment because Playwright can be used for both UI and API testing, and also comes with built-in CLI and HTML reporter for the test results. Although we can use extra frameworks like Allure for Playwright, I've kept it simple with the built-in reporter for now.

### ❖ Explanation about how to run tests in your framework.
do an `npm install` first, then run the tests with:
```bash
npx playwright test (optionally specific file name here)
```
or use this to run with trace on
```bash
npx playwright test --trace on
```
then drag the trace file [here](trace.playwright.dev) to see the run details.
![Trace Viewer](https://i.ibb.co/Fbg4bFQ6/image.png)

See the HTML report with:
```bash
npx playwright show-report
```

### ❖ Which test design techniques did you use?
I used a black-box testing approach, focusing in use cases, with a little bit of exploratory testing in the start to determine which test cases should be put in the test plan.

### ❖ What patterns did you use while coding?
I used POM (Page Object Model) for this project to reduce repetition and improve readability of the code itself. It also adds extra maintainability of the code for future improvements.

### ❖ Which defects did you find?
- I found that when you're querying using the search bar, it will only query for movies, even though the `type` has been set to TV shows.
![TV Show doesn't get queried](https://s12.gifyu.com/images/b314V.gif)
- I cannot verify if the default page shows both movies and TV shows or just movies, and I cannot confirm which is the expected behavior, although when inspecting the API calls, both calls for movies and TV shows exist.
