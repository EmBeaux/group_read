import UserShowContainer from '../../../app/javascript/react/containers/UserShowContainer'
import ArticleScrollTile from '../../../app/javascript/react/components/ArticleScrollTile'
import UserGroupTile from '../../../app/javascript/react/components/UserGroupTile'
import fetchMock from 'fetch-mock'
import { shallow } from 'enzyme';
import sinon from 'sinon';



describe('BikeShowContainer', () =>{
  let wrapper;
  let currentUserData;
  let userData;
  let groupsData;
  let shallowWrapper;

beforeEach(() =>{
  currentUserData = {
    id: 1,
    email: "matthew.bowler123@gmail.com",
    featured_groups: [
      {
        id: 4,
        name: "Paintball group",
        interest: "paintball",
        description: "We love shooting eachother",
        created_at: "2018-11-09T18:45:26.599Z",
        updated_at: "2018-11-09T18:45:26.599Z"
      },
      {
        id: 5,
        name: "Thanksgiving",
        interest: "thanksgiving turkey",
        description: "We love eating!",
        created_at: "2018-11-09T18:45:26.601Z",
        updated_at: "2018-11-09T18:45:26.601Z"
      },
      {
        id: 8,
        name: "Motocross",
        interest: "motocross",
        description: "We love dirtbikes dude.",
        created_at: "2018-11-09T18:45:26.607Z",
        updated_at: "2018-11-09T18:45:26.607Z"
      },
      {
        id: 9,
        name: "Coding!",
        interest: "coding",
        description: "We live and breath code.",
        created_at: "2018-11-09T18:45:26.610Z",
        updated_at: "2018-11-09T18:45:26.610Z"
      },
      {
        id: 10,
        name: "Tech Junkies",
        interest: "technology",
        description: "We love tech!",
        created_at: "2018-11-09T18:45:26.613Z",
        updated_at: "2018-11-09T18:45:26.613Z"
      },
      {
        id: 11,
        name: "Apple lovers",
        interest: "apple mac iphone",
        description: "We appreciate apple",
        created_at: "2018-11-09T18:45:26.616Z",
        updated_at: "2018-11-09T18:45:26.616Z"
      }
    ],
    groups: [
      {
        id: 19,
        name: "Tracking the california fire",
        interest: "California",
        description: "We are tracking California but more specifically the fire",
        created_at: "2018-11-18T02:42:51.399Z",
        updated_at: "2018-11-18T02:42:51.399Z"
      },
      {
        id: 18,
        name: "Tracking the california fire",
        interest: "California",
        description: "We are tracking California but more specifically the fire",
        created_at: "2018-11-18T02:42:51.399Z",
        updated_at: "2018-11-18T02:42:51.399Z"
      },
      {
        id: 17,
        name: "Tracking the california fire",
        interest: "California",
        description: "We are tracking California but more specifically the fire",
        created_at: "2018-11-18T02:42:51.399Z",
        updated_at: "2018-11-18T02:42:51.399Z"
      }
    ],
    memberships: [
      {
        id: 11,
        user_id: 1,
        group_id: 18,
        created_at: "2018-11-18T02:42:51.409Z",
        updated_at: "2018-11-18T02:42:51.409Z"
      }
    ],
    likes: [
      {
        id: 1,
        user_id: 1,
        article_id: 36,
        created_at: "2018-11-09T18:47:39.993Z",
        updated_at: "2018-11-09T18:47:39.993Z"
      }
    ],
    comments: [
      {
        id: 1,
        user_id: 1,
        article_id: 38,
        comment: "Tom Brady Is an amazing quarter back",
        created_at: "2018-11-09T18:47:59.612Z",
        updated_at: "2018-11-09T18:47:59.612Z",
        email: "matthew.bowler123",
        reply_id: null,
        replycount: 0
      }
    ]
  }

  userData = {
    id: 4,
    email: "matt@gmail.com",
    groups: [
      {
        id: 3,
        name: "Esports",
        interest: "esports",
        description: "We love gaming!"
      },
      {
        id: 5,
        name: "Thanksgiving",
        interest: "thanksgiving turkey",
        description: "We love eating!"
      },
      {
        id: 12,
        name: "The Best Group",
        interest: "tom brady",
        description: "This is a GOAT appreciation group."
      }
    ],
    memberships: [
      {
        id: 12,
        user_id: 4,
        group_id: 3,
        created_at: "2018-11-19T17:47:47.407Z",
        updated_at: "2018-11-19T17:47:47.407Z"
      },
      {
        id: 13,
        user_id: 4,
        group_id: 5,
        created_at: "2018-11-19T17:47:49.424Z",
        updated_at: "2018-11-19T17:47:49.424Z"
      },
      {
        id: 14,
        user_id: 4,
        group_id: 12,
        created_at: "2018-11-19T17:47:54.073Z",
        updated_at: "2018-11-19T17:47:54.073Z"
      }
    ],
    likes: [
      {
        id: 21,
        user_id: 4,
        article_id: 308,
        liked_article: {
          id: 308,
          title: "Man apologies for shouting 'Heil Hitler' at show",
          description: "Get breaking national and world news, broadcast video coverage, and exclusive interviews. Find the top news online at ABC news.",
          url: "https://abcnews.go.com/Entertainment/wireStory/man-apologies-shouting-heil-hitler-baltimore-show-59269534",
          source: "ABC News",
          image: "https://s.abcnews.com/images/US/hippodrome-gty-er-181115_hpMain_16x9_992.jpg",
          group_id: 1,
          created_at: "2018-11-18T17:56:26.681Z",
          updated_at: "2018-11-19T17:48:06.434Z",
          likecount: 2,
          commentcount: 5
        }
      }
    ],
    comments: [
      {
        id: 13,
        comment: "New Comment",
        user_id: 4,
        article_id: 308,
        commented_article: {
          id: 308,
          title: "Man apologies for shouting 'Heil Hitler' at show",
          description: "Get breaking national and world news, broadcast video coverage, and exclusive interviews. Find the top news online at ABC news.",
          url: "https://abcnews.go.com/Entertainment/wireStory/man-apologies-shouting-heil-hitler-baltimore-show-59269534",
          source: "ABC News",
          image: "https://s.abcnews.com/images/US/hippodrome-gty-er-181115_hpMain_16x9_992.jpg",
          group_id: 1,
          created_at: "2018-11-18T17:56:26.681Z",
          updated_at: "2018-11-19T17:48:06.434Z",
          likecount: 2,
          commentcount: 5
        }
      }
    ]
  }

  groupsData = [
    {
      "id": 2,
      "name": "Wine moms!",
      "interest": "Wine",
      "description": "We love wine!",
      "articles": [
        {
          "id": 220,
          "title": "Trump Assails Macron and Defends Decision to Skip Cemetery Visit",
          "description": "“The problem is that Emmanuel suffers from a very low Approval Rating in France, 26%,” wrote Mr. Trump, whose approval rating in France is 9 percent.",
          "url": "https://www.nytimes.com/2018/11/13/us/politics/trump-macron-france.html",
          "source": "The New York Times",
          "image": "https://static01.nyt.com/images/2018/11/14/us/politics/14dc-prexy/14dc-prexy-facebookJumbo.jpg",
          "group_id": 2,
          "created_at": "2018-11-15T14:44:20.941Z",
          "updated_at": "2018-11-15T14:44:20.941Z",
          "likecount": 0,
          "commentcount": 0
        },
        {
          "id": 205,
          "title": "How to conquer Red Lobster's Endless Shrimp",
          "description": "Illustration: Allison Corr Endless Shrimp at Red Lobster should be considered a national holiday. If you’ve never been to this glorious celebration of crustacean gluttony, you better run over to one right now. It’s $15.99 for all you can eat. No strings attac…",
          "url": "https://thetakeout.com/how-to-conquer-red-lobster-endless-shrimp-1830236090",
          "source": "Thetakeout.com",
          "image": "https://i.kinja-img.com/gawker-media/image/upload/s--WtnpJFoO--/c_fill,fl_progressive,g_center,h_900,q_80,w_1600/lpf7apssegzybsd0hjbl.jpg",
          "group_id": 2,
          "created_at": "2018-11-15T14:44:20.298Z",
          "updated_at": "2018-11-15T14:44:20.298Z",
          "likecount": 0,
          "commentcount": 0
        },
        {
          "id": 206,
          "title": "Make a Boozy Cranberry Slush With Just Two Ingredients",
          "description": "I don’t know that anyone has ever run out of cranberry sauce during a Thanksgiving meal. It’s very easy to make, and people tend to make a lot of it, and I usually find myself with a bit of bonus sauce the day after the turkey has been gobbled. Read more...",
          "url": "https://skillet.lifehacker.com/make-a-boozy-cranberry-slush-with-just-two-ingredients-1830385577",
          "source": "Lifehacker.com",
          "image": "https://i.kinja-img.com/gawker-media/image/upload/s--eRnVDli5--/c_fill,fl_progressive,g_center,h_900,q_80,w_1600/cs8bmsi3iawushgqybub.jpg",
          "group_id": 2,
          "created_at": "2018-11-15T14:44:20.359Z",
          "updated_at": "2018-11-15T14:44:20.359Z",
          "likecount": 0,
          "commentcount": 0
        },
      ],
      users: [],
    {
      "id": 3,
      "name": "Esports",
      "interest": "esports",
      "description": "We love gaming!",
      "articles": [
      {
        "id": 181,
        "title": "Blizzard tweaks its Overwatch Contenders feeder league",
        "description": "Blizzard has officially announced the modifications it's making to Overwatch Contenders 2019 following the leak of some of the most divisive changes. The biggest alteration will see the size of the various Contenders divisions scaled down from twelve teams to…",
        "url": "https://www.engadget.com/2018/10/31/blizzard-overwatch-contenders-league-changes/",
        "source": "Engadget",
        "image": "https://o.aolcdn.com/images/dims?thumbnail=1200%2C630&quality=80&image_uri=https%3A%2F%2Fo.aolcdn.com%2Fimages%2Fdims%3Fcrop%3D1600%252C1066%252C0%252C0%26quality%3D85%26format%3Djpg%26resize%3D1600%252C1066%26image_uri%3Dhttps%253A%252F%252Fs.yimg.com%252Fos%252Fcreatr-uploaded-images%252F2018-10%252F2fa28d70-dd04-11e8-bfaf-e7c9337a2a0d%26client%3Da1acac3e1b3290917d92%26signature%3D7a8a228bc0c91b40cee3c8689a93fba5de104082&client=amp-blogside-v2&signature=dd4a06875061beef5a218483970d71e7bb7f1d5b",
        "group_id": 3,
        "created_at": "2018-11-15T03:23:57.394Z",
        "updated_at": "2018-11-15T03:23:57.394Z",
        "likecount": 0,
        "commentcount": 0
      },
      {
        "id": 182,
        "title": "Walmart's homegrown gaming PCs are surprisingly good",
        "description": "Walmart is getting into the gaming PC business. The retailer has announced an exclusive line of three laptops and three desktop towers under the name Overpowered -- and the specs are actually pretty good. The machines, available only from Walmart, have been b…",
        "url": "https://www.engadget.com/2018/10/30/walmarts-homegrown-gaming-pcs-are-surprisingly-good/",
        "source": "Engadget",
        "image": "https://o.aolcdn.com/images/dims?thumbnail=1200%2C630&quality=80&image_uri=https%3A%2F%2Fo.aolcdn.com%2Fimages%2Fdims%3Fcrop%3D1411%252C769%252C0%252C0%26quality%3D85%26format%3Djpg%26resize%3D1600%252C872%26image_uri%3Dhttps%253A%252F%252Fs.yimg.com%252Fos%252Fcreatr-uploaded-images%252F2018-10%252F6e64b890-dc27-11e8-afff-16fbdb5b431b%26client%3Da1acac3e1b3290917d92%26signature%3Dae569d6746b42d93a46202d6b7805fdd2ca06280&client=amp-blogside-v2&signature=ba28e28f1556c51ce4d5b3c6473b4019f302ee9f",
        "group_id": 3,
        "created_at": "2018-11-15T03:23:57.475Z",
        "updated_at": "2018-11-15T03:23:57.475Z",
        "likecount": 0,
        "commentcount": 0
      },
      {
        "id": 183,
        "title": "20 startups take center stage at Berkeley SkyDeck’s demo day",
        "description": "A robot that can clean your house, a blockchain-powered social network and 18 other startups presented to investors at SkyDeck's 8th demo day.",
        "url": "http://techcrunch.com/2018/11/07/20-startups-take-center-stage-at-berkeley-skydecks-demo-day/",
        "source": "TechCrunch",
        "image": "https://techcrunch.com/wp-content/uploads/2018/11/2280342987_6162249021_o.jpg?w=615",
        "group_id": 3,
        "created_at": "2018-11-15T03:23:57.534Z",
        "updated_at": "2018-11-15T03:23:57.534Z",
        "likecount": 0,
        "commentcount": 0
      },
      {
        "id": 322,
        "title": "This Week In The Business: Wherefore Aren't Thou, Sony?",
        "description": "QUOTE | “We are exploring new and familiar ways to engage our community in 2019 and can’t wait to share our plans with you.” - Sony explains why it won’t be at E3 2019. Read more...",
        "url": "https://kotaku.com/this-week-in-the-business-wherefore-arent-thou-sony-1830512198",
        "source": "Kotaku.com",
        "image": "https://i.kinja-img.com/gawker-media/image/upload/s--R_EwSsuk--/c_fill,fl_progressive,g_center,h_900,q_80,w_1600/sq8wigxiema2ysvyzjma.png",
        "group_id": 3,
        "created_at": "2018-11-19T17:43:33.200Z",
        "updated_at": "2018-11-19T17:43:44.642Z",
        "likecount": 1,
        "commentcount": 0
          }
        ]
      }
    }
  ]


  fetchMock.get('/api/v1/users', {
      status: 200,
      body: currentUserData
    });

  fetchMock.get('/api/v1/users/1', {
      status: 200,
      body: userData
    });

  fetchMock.get('/api/v1/groups', {
      status: 200,
      body: groupsData
    });

  shallowWrapper = shallow(<GroupIndexContainer />);
  wrapper = mount(<GroupIndexContainer/>);
})

afterEach(fetchMock.restore)

  describe('example test', () => {
    it('should pass', () => {
      expect(true).toBe(true);
    });
  });

  describe('<GroupIndexContainer /> children are rendering', () => {
    it('Should render "Welcome to Group Read"', (done) =>{
      setTimeout(() => {
        let indexLogo = wrapper.find('.index-logo')
        expect(indexLogo.text()).toEqual("Welcome to Group Read")
        done()
      }, 0)
    });

    it('renders three <ArticleShowTile /> components', (done) => {
      setTimeout(() => {
        expect(wrapper.find(ArticleShowTile).length).toEqual(2);
        done()
      }, 0)
    });

    it('renders 3 <GroupSignedInTile /> components', (done) => {
      setTimeout(() => {
        expect(wrapper.find(GroupSignedInTile).length).toEqual(3);
        done()
      }, 0)
    });

    it('renders 3 <FeaturedTile /> components', (done) => {
      setTimeout(() => {
        expect(wrapper.find(FeaturedTile).length).toEqual(3);
        done()
      }, 0)
    });

    it('renders 3 <UserGroupTile /> components', (done) => {
      setTimeout(() => {
        expect(wrapper.find(UserGroupTile).length).toEqual(3);
        done()
      }, 0)
    });
  })

  describe('button clicking works', () => {
    it('button to New Group Form is working', (done) => {
      setTimeout(() => {
        wrapper.find('.circle-plus').simulate('click')
        expect(location.pathname).toEqual('/groups/new')
        done()
      }, 0)
    });
  })
});
