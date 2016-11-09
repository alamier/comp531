/**
 * Created by zhou on 10/25/16.
 */
import { expect } from 'chai'
import Reducer from './reducers'
import common from './reducers'
import Action from './actions'

describe('Test the combine reducer', () => {
    it('should return the initial state:Reducer', () => {
        expect(Reducer(undefined, {})).to.eql({
            articles: {
                "articles": {},
                "avatars": {},
                "searchKeyword": ""
            },
            common: {
                "error": "",
                "location": "",
                "success": ""
            },
            followers: {
                "followers": {}
            },
            profile: {
                "avatar": "",
                "email": "",
                "headline": "",
                "username": "",
                "zipcode": ""
            }
        })
    })
})

describe('Test the follower reducer', () => {
    it('should update the followers', () => {
        expect(Reducer(undefined, {})).to.eql({
            articles: {
                "articles": {},
                "avatars": {},
                "searchKeyword": ""
            },
            common: {
                "error": "",
                "location": "",
                "success": ""
            },
            followers: {
                "followers": {}
            },
            profile: {
                "avatar": "",
                "email": "",
                "headline": "",
                "username": "",
                "zipcode": ""
            }
        })
    })
})

describe('Test the profile reducer', () => {
    it('should update headline', () => {
        expect(Reducer(undefined, {
            type:Action.UPDATE_HEADLINE,
            username:"test",
            headline:"test"
        })).to.eql({
            articles: {
                "articles": {},
                "avatars": {},
                "searchKeyword": ""
            },
            common: {
                "error": "",
                "location": "",
                "success": ""
            },
            followers: {
                "followers": {}
            },
            profile: {
                "avatar": "",
                "email": "",
                "headline": "test",
                "username": "test",
                "zipcode": ""
            }
        })
    })

    it('should update profile', () => {
        expect(Reducer(undefined, {
            type:Action.UPDATE_PROFILE,
            email:"test"
        })).to.eql({
            articles: {
                "articles": {},
                "avatars": {},
                "searchKeyword": ""
            },
            common: {
                "error": "",
                "location": "",
                "success": ""
            },
            followers: {
                "followers": {}
            },
            profile: {
                "avatar": "",
                "email": "test",
                "headline": "",
                "username": "",
                "zipcode": ""
            }
        })
    })
})

describe('Test the article reducer', () => {
    it('should add the article', () => {
        expect(Reducer({articles:{articles:{1:{id:1,body:"something"}},"avatars": {}, "searchKeyword": ""}}, {
            type:Action.ADD_ARTICLE,
            article:{id:2,body:"sdfsf"}
        })).to.eql({
            articles: {
                "articles": {
                    1:{id:1,body:"something"},
                    2:{id:2,body:"sdfsf"}
                },
                "avatars": {},
                "searchKeyword": ""
            },
            common: {
                "error": "",
                "location": "",
                "success": ""
            },
            followers: {
                "followers": {}
            },
            profile: {
                "avatar": "",
                "email": "",
                "headline": "",
                "username": "",
                "zipcode": ""
            }
        })
    })

    it('should update articles', () => {
        expect(Reducer({articles:{articles:{1:{id:1,body:"something"}},"avatars": {}, "searchKeyword": ""}}, {
            type:Action.UPDATE_ARTICLES,
            articles:{1:{id:1,body:"sdfsf"}}
        })).to.eql({
            articles: {
                "articles": {
                    1:{id:1,body:"sdfsf"}
                },
                "avatars": {},
                "searchKeyword": ""
            },
            common: {
                "error": "",
                "location": "",
                "success": ""
            },
            followers: {
                "followers": {}
            },
            profile: {
                "avatar": "",
                "email": "",
                "headline": "",
                "username": "",
                "zipcode": ""
            }
        })
    })

    it('should add keyword', () => {
        expect(Reducer({}, {
            type:Action.SEARCH_KEYWORD,
            keyword:"keyword test"
        })).to.eql({
            articles: {
                "articles": {
                    },
                "avatars": {},
                "searchKeyword": "keyword test"
            },
            common: {
                "error": "",
                "location": "",
                "success": ""
            },
            followers: {
                "followers": {}
            },
            profile: {
                "avatar": "",
                "email": "",
                "headline": "",
                "username": "",
                "zipcode": ""
            }
        })
    })

    it('should update avatar', () => {
        expect(Reducer({avatars:{1:'test'}}, {
            type:Action.UPDATE_AVATARS,
            avatars:{1:'test1',2:'test2'}
        })).to.eql({
            articles: {
                "articles": {
                },
                "avatars":{1:'test1',2:'test2'},
                "searchKeyword": ""
            },
            common: {
                "error": "",
                "location": "",
                "success": ""
            },
            followers: {
                "followers": {}
            },
            profile: {
                "avatar": "",
                "email": "",
                "headline": "",
                "username": "",
                "zipcode": ""
            }
        })
    })
})

describe('Test the common reducer', () => {
    it('should return the initial state:common', () => {
        expect(common({ followers: {followers:"follower1"} }, {
            type:Action.FOLLOWER_UPDATE,
            followers:{followers:"follower2"}
        })).to.eql({
            articles: {
                "articles": {},
                "avatars": {},
                "searchKeyword": ""
              },
              common: {
                "error": "",
                "location": "",
                "success": ""
              },
              followers: {
                "followers": {followers:"follower2"}
             },
              profile: {
              "avatar": "",
               "email": "",
               "headline": "",
                "username": "",
               "zipcode": ""
              }
        })
    })

    it('should state success', () => {
        expect(common(undefined,
            {
                type: Action.SUCCESS,
                success: "succeed test"

            })).to.eql(
            {
                articles: {
                    "articles": {},
                    "avatars": {},
                    "searchKeyword": ""
                },
                common: {
                    "error": "",
                    "location": "",
                    "success": "succeed test"
                },
                followers: {
                    "followers": {}
                },
                profile: {
                    "avatar": "",
                    "email": "",
                    "headline": "",
                    "username": "",
                    "zipcode": ""
                }
            })
    })

    it('should state error', () => {
        expect(common(undefined,
            {
                type: Action.ERROR,
                error: "error test"

            })).to.eql(
            {
                articles: {
                    "articles": {},
                    "avatars": {},
                    "searchKeyword": ""
                },
                common: {
                    "error": "error test",
                    "location": "",
                    "success": ""
                },
                followers: {
                    "followers": {}
                },
                profile: {
                    "avatar": "",
                    "email": "",
                    "headline": "",
                    "username": "",
                    "zipcode": ""
                }
            })
    })

    it('should navigate to main', () => {
        expect(common(undefined,
            {
                type: Action.NAV_MAIN,
            })).to.eql(
            {
                articles: {
                    "articles": {},
                    "avatars": {},
                    "searchKeyword": ""
                },
                common: {
                    "error": "",
                    "location": "main",
                    "success": ""
                },
                followers: {
                    "followers": {}
                },
                profile: {
                    "avatar": "",
                    "email": "",
                    "headline": "",
                    "username": "",
                    "zipcode": ""
                }
            })
    })

    it('should navigate to profile', () => {
        expect(common(undefined,
            {
                type: Action.NAV_PROFILE,
            })).to.eql(
            {
                articles: {
                    "articles": {},
                    "avatars": {},
                    "searchKeyword": ""
                },
                common: {
                    "error": "",
                    "location": "profile",
                    "success": ""
                },
                followers: {
                    "followers": {}
                },
                profile: {
                    "avatar": "",
                    "email": "",
                    "headline": "",
                    "username": "",
                    "zipcode": ""
                }
            })
    })

    it('should navigate out', () => {
        expect(common(undefined,
            {
                type: Action.NAV_OUT,
            })).to.eql(
            {
                articles: {
                    "articles": {},
                    "avatars": {},
                    "searchKeyword": ""
                },
                common: {
                    "error": "",
                    "location": "",
                    "success": ""
                },
                followers: {
                    "followers": {}
                },
                profile: {
                    "avatar": "",
                    "email": "",
                    "headline": "",
                    "username": "",
                    "zipcode": ""
                }
            })
    })
})