import HttpPostService from "./HttpPostService";

class PostService {
  constructor() {
    this.idGenerator = 1;
    this.posts = [
      {
        id: this.idGenerator++,
        title: "COVID-19 variant, first reported in UK, confirmed in Illinois ",
        author: "WGN Web Desk"
      },
      {
        id: this.idGenerator++,
        title: "IRS delays start of tax season to Feb. 12",
        author: "Bill Johnson",
        body: `Tax filing season won’t start until Feb. 12 to give the IRS more time to adjust to changes Congress made late last year in the tax code and the second round of coronavirus-related stimulus payments lawmakers approved, the agency said Friday.

        It kept the traditional April 15 filing deadline, which was pushed back to July 15 last year due to the coronavirus pandemic.
        
        Filing usually starts in January, and the delay "allows the IRS time to do additional programming and testing of IRS systems following the Dec. 27 tax law changes that provided a second round of Economic Impact Payments and other benefits," the agency said in a statement.
        
        But it also means some taxpayers could have to wait longer than usual for their refunds.
        
        Urging electronic filing: The IRS said it anticipates 9 out of 10 taxpayers will get their refunds within 21 days of when they file — if they file electronically, have direct deposit of their payments and there are no issues with their return.
        
        If recipients of the Earned Income and Additional Child tax credits follow the same procedure, they are likely to receive their refunds the first week of March, the agency said.
        
        "This would be the same experience for [those] taxpayers if the filing season opened in late January."
        
        Not unprecedented: The filing season start date has occasionally slipped into February in the past, often because Congress changed some tax laws late in the previous calendar year.
        
        That happened in December, when Congress made some long-temporary tax provisions permanent, continued others for up to five years, and also directed the IRS to distribute economic relief payments to millions of Americans by Friday.
        
        Pandemic challenges: In the backdrop of all that, routine IRS operations have been hamstrung throughout much of the past year due to effects of the coronavirus pandemic, including a mail backlog numbering in the millions that slowed last year’s tax return processing and refunds.
        
        The IRS earlier Friday announced that tax preparation companies that partner with the agency in the Free File Alliance can accepts returns now. Taxpayers qualify for free use of tax software to file their returns if they make $72,000 or less.
        
        “Given the pandemic, this is one of the nation’s most important filing seasons ever," IRS Commissioner Chuck Rettig said. "This start date will ensure that people get their needed tax refunds quickly while also making sure they receive any remaining stimulus payments they are eligible for as quickly as possible.`
      },
      {
        id: this.idGenerator++,
        title:
          "Third stimulus check: Here’s when you might get a $1,400 direct payment",
        author: "Jack Action"
      },
      {
        id: this.idGenerator++,
        title: "COVID-19 variant, first reported in UK, confirmed in Illinois ",
        author: "WGN Web Desk"
      },
      {
        id: this.idGenerator++,
        title: "IRS delays start of tax season to Feb. 12",
        author: "Bill Johnson"
      },
      {
        id: this.idGenerator++,
        title:
          "Third stimulus check: Here’s when you might get a $1,400 direct payment",
        author: "Jack Action"
      }
    ];
  }

  getPosts() {
    return this.createResponsePromise(this.posts);
  }

  findPostById(id) {
    return this.createResponsePromise(
      this.posts.filter(post => post.id === id)[0]
    );
  }

  createPost(post) {
    Object.assign(post, { id: this.idGenerator++ });
    return this.createResponsePromise(this.posts.push(post));
  }

  createResponsePromise(item) {
    return Promise.resolve({ data: item });
  }
}

var postService;

console.log(process.env.REACT_APP_BACKEND_TYPE);
if (process.env.REACT_APP_BACKEND_TYPE === "local") {
  postService = new PostService();
} else {
  postService = new HttpPostService();
}

export default postService;
