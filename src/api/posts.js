const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));

const posts = [
  {
    id: 1,
    title: '리덕스 미들웨어',
    body: '리턱스 미들웨어를 직접 만들어보면 이해하기가 쉽죠.',
  },
  {
    id: 2,
    title: 'redux-thunk',
    body: 'redux-thunk를 사용하여 비동기 작업을 처리합시다.',
  },
  {
    id: 3,
    title: 'redux-saga',
    body: '나중에 redux-saga를 사용하여 비동기 작업을 처리합니다.',
  },
];

export const getPosts = async () => {
  await sleep(500);
  return posts;
};

export const getPostById = async (id) => {
  await sleep(500);
  return posts.find((post) => post.id === id);
};
