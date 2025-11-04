# Documentation
### ❖ What is your testing strategy?
As a self taught QA Engineer, I don't follow any particular set strategy. Most of the time it depends on the project. So, for this project, due to the nature of limited time allowance, I will try to do all of this for the assignment:
* Do a simple exploratory testing of the app in the scope mentioned
* Write *at least* one test case per filter 
* Create automation based on the defined test cases (all cases if time allows, one positive test case and one negative test case if time constraint doesn't allow it)

### ❖ Which cases did you generate? And why?
I start with generating the most obvious happy flows first, then going to the known negative test cases afterwards, to create regression catchers even after the bug is fixed. 

### ❖ Information about the test automation framework (libraries used etc.)
I used Playwright for this assignment because Playwright can be used for both UI and API testing, and also comes with built-in CLI and HTML reporter for the test results.

### ❖ Explanation about how to run tests in your framework.
do an `npm install` first, then run the tests with:
```bash
npx playwright test
```
See the HTML report with:
```bash
npx playwright show-report
```

### ❖ Which test design techniques did you use?
I used a black-box testing approach, focusing in use cases, with a little bit of exploratory testing in the start to determine which test cases should be put in the test plan.

### ❖ What patterns did you use while coding?

### ❖ Which defects did you find?
