import GroupIndexContainer from '../../../app/javascript/react/containers/GroupIndexContainer'
import GroupSignedInTile from '../../../app/javascript/react/components/GroupSignedInTile'
import ArticleShowTile from '../../../app/javascript/react/components/ArticleShowTile'
import FeaturedTile from '../../../app/javascript/react/components/FeaturedTile'
import UserGroupTile from '../../../app/javascript/react/components/UserGroupTile'
// import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router'
import fetchMock from 'fetch-mock'
import { shallow } from 'enzyme';
import sinon from 'sinon';



describe('BikeShowContainer', () =>{
  let wrapper;
  let currentUserData;
  let articleData;
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

  articleData = [
    {
      id: 365,
      title: "The Beatles’ White Album at 50: Paul is dead, the Manson family murders and ‘granny music s***’",
      description: "David Lister looks back at the groundbreaking 1968 album that saw John Lennon and Paul McCartney moving in different musical directions",
      url: "http://www.independent.co.uk/arts-entertainment/music/features/the-beatles-white-album-50th-anniversary-reissue-tracklist-john-lennon-paul-mccartney-a8644761.html",
      source: "Independent",
      image: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/11/21/13/the-beatles.jpg",
      group_id: 1,
      created_at: "2018-11-21T17:10:00.347Z",
      updated_at: "2018-11-21T17:10:00.347Z",
      likecount: 0,
      commentcount: 0
    },
    {
      id: 364,
      title: "Cris Carter believes Malcolm Jenkins reached his ‘breaking point’ after the Eagles’ loss to the Saints (VIDEO)",
      description: "Cris Carter reacts to Malcolm Jenkins calling out the Philadelphia Eagles after suffering their worst loss of the season to the New Orleans Saints. Hear what Cris had to say about Jenkins and the Eagles.",
      url: "https://www.foxsports.com/watch/first-things-first/video/1376823875960",
      source: "Fox Sports",
      image: "https://b.fssta.com/uploads/2018/11/1121_tf_jenkins_1280x720_1376859203838.vresize.1200.630.high.97.jpg",
      group_id: 1,
      created_at: "2018-11-21T16:57:02.414Z",
      updated_at: "2018-11-21T16:57:02.414Z",
      likecount: 0,
      commentcount: 0
    }
  ]

  fetchMock.get('/api/v1/users', {
      status: 200,
      body: currentUserData
    });

  fetchMock.get('/api/v1/articles', {
      status: 200,
      body: articleData
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
