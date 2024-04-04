# 5 Senses Project

![landing page for the website](https://github.com/bbb0444/5s-Project/blob/main/landingPage.png)

An art project exploring the relationship between the way people see eachothers
senses...

[current deployment of website](https://5s-project.vercel.app/)

## Tech Stack

This project is built on Next.js using GSAP core and Framer Motion for
animations.

## running locally

This project uses Amazon S3 & Vercel Postgres for handling Image & Text
uploading. All keys require to access these services are taken from the
.env.local file of the running machine.

if you would like to run the project locally change the api post route to use
the mock data located in @/app/lib

Run locally using

```bash
npm run dev
```
