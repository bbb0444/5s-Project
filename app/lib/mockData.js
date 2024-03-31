export const getPosts = async (count) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...posts]);
    }, 1000);
  });
};

const posts_empty = [];
const posts_two = [
  {
    id: 23,
    s3_bucket_link:
      "https://5s-project.s3.ap-southeast-2.amazonaws.com/nose/231c1ea4-b8a5-4dd7-9ede-4c0e06c42bf5",
    category_key: 3,
    description: "Sally's face",
    created_at: "2024-03-30T22:23:51.893Z",
  },
];
const posts_four = [
  {
    id: 23,
    s3_bucket_link:
      "https://5s-project.s3.ap-southeast-2.amazonaws.com/nose/231c1ea4-b8a5-4dd7-9ede-4c0e06c42bf5",
    category_key: 3,
    description: "Sally's face",
    created_at: "2024-03-30T22:23:51.893Z",
  },
  {
    id: 24,
    s3_bucket_link:
      "https://5s-project.s3.ap-southeast-2.amazonaws.com/nose/231c1ea4-b8a5-4dd7-9ede-4c0e06c42bf5",
    category_key: 3,
    description: "Sally's face",
    created_at: "2024-03-30T22:23:51.893Z",
  },
];
const posts = [
  {
    id: 11,
    s3_bucket_link:
      "https://5s-project.s3.ap-southeast-2.amazonaws.com/nose/864b542f-4cac-466c-a644-a85d1a22848c",
    category_key: 3,
    description: "",
    created_at: "2024-03-28T21:51:22.546Z",
  },
  {
    id: 12,
    s3_bucket_link:
      "https://5s-project.s3.ap-southeast-2.amazonaws.com/nose/ff0badbf-6938-4d7a-a9e2-36aaccf218f9",
    category_key: 3,
    description: "",
    created_at: "2024-03-28T21:51:23.416Z",
  },
  {
    id: 13,
    s3_bucket_link:
      "https://5s-project.s3.ap-southeast-2.amazonaws.com/nose/931f8aaf-e24c-491e-81fe-3ac6db603d86",
    category_key: 3,
    description: "",
    created_at: "2024-03-28T21:51:26.058Z",
  },
  {
    id: 14,
    s3_bucket_link:
      "https://5s-project.s3.ap-southeast-2.amazonaws.com/nose/fd2ee2e9-f73a-49f1-97d4-97921cc668e6",
    category_key: 3,
    description: "",
    created_at: "2024-03-28T21:53:39.998Z",
  },
  {
    id: 18,
    s3_bucket_link:
      "https://5s-project.s3.ap-southeast-2.amazonaws.com/nose/078564bb-b68b-4b32-a23e-0c36d4bae098",
    category_key: 3,
    description: "ayo",
    created_at: "2024-03-28T23:43:53.896Z",
  },
  {
    id: 19,
    s3_bucket_link:
      "https://5s-project.s3.ap-southeast-2.amazonaws.com/nose/864b542f-4cac-466c-a644-a85d1a22848c",
    category_key: 3,
    description: "",
    created_at: "2024-03-28T21:51:22.546Z",
  },
  {
    id: 22,
    s3_bucket_link:
      "https://5s-project.s3.ap-southeast-2.amazonaws.com/nose/ff0badbf-6938-4d7a-a9e2-36aaccf218f9",
    category_key: 3,
    description: "",
    created_at: "2024-03-28T21:51:23.416Z",
  },
  {
    id: 23,
    s3_bucket_link:
      "https://5s-project.s3.ap-southeast-2.amazonaws.com/nose/931f8aaf-e24c-491e-81fe-3ac6db603d86",
    category_key: 3,
    description: "",
    created_at: "2024-03-28T21:51:26.058Z",
  },
  {
    id: 24,
    s3_bucket_link:
      "https://5s-project.s3.ap-southeast-2.amazonaws.com/nose/fd2ee2e9-f73a-49f1-97d4-97921cc668e6",
    category_key: 3,
    description: "",
    created_at: "2024-03-28T21:53:39.998Z",
  },
  {
    id: 28,
    s3_bucket_link:
      "https://5s-project.s3.ap-southeast-2.amazonaws.com/nose/078564bb-b68b-4b32-a23e-0c36d4bae098",
    category_key: 3,
    description: "ayo",
    created_at: "2024-03-28T23:43:53.896Z",
  },
];
