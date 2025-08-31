# Query vs Store

## What is React Query?

- React Query (now called TanStack Query) is a data-fetching and state synchronization library for React applications.
- It is not a state management library like Redux, but it solves a specific problem: managing server state.

- 👉 Server state = Data that lives on the backend (API/DB), which you fetch, cache, update, and re-fetch.
- 👉 Client state = Data that lives in your app UI (filters, modals open/close, theme toggle, form inputs).

- React Query makes server state management easy by handling:

- Data fetching (useQuery)

- Data caching

- Background refetching

- Pagination & infinite scrolling

- Retry & error handling

- Synchronization (stale vs fresh data)

##  When to use React Query?

### Use React Query when:

- Your app heavily relies on data from an API.

- You need caching so users don’t wait for the same API call again.

- You need auto refetch (e.g., chat messages, dashboards, job listings).

- You want to avoid writing a lot of boilerplate for API calls.

- Don’t use React Query for purely local state like:

- Toggle dark mode

- Sidebar open/close

- Multi-step form values

- That’s better handled with React’s useState, useReducer, or Redux.

### Real-Life Example with React Query
- Example 1: Job Listing App

- Imagine you’re building a Job Portal (like your Arya project 😉).

- You fetch jobs from an API:

```js
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

function JobList() {
  const { data, isLoading, error } = useQuery(['jobs'], () =>
    axios.get('/api/jobs').then(res => res.data)
  )

  if (isLoading) return <p>Loading jobs...</p>
  if (error) return <p>Error fetching jobs</p>

  return (
    <ul>
      {data.map(job => (
        <li key={job.id}>{job.title}</li>
      ))}
    </ul>
  )
}

```

## ✅ React Query will:

- Cache the jobs list (if you visit another page and come back, no refetch needed).

- Auto-refetch in background when you come back to the tab.

- Handle retries if network fails.

- If you used Redux, you’d have to:

- Write actions (FETCH_JOBS, FETCH_JOBS_SUCCESS, FETCH_JOBS_ERROR)

- Write reducers

- Use middleware (Redux Thunk/Saga) for async fetching

- Manually handle caching & refetch logic

- That’s a lot of boilerplate 🚨.

## Example 2: Infinite Scrolling (Candidates Feed)

- In a social media-like feed (like your Node.js project 🚀), React Query helps with infinite scroll:

```js
const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteQuery(['candidates'], fetchCandidates, {
  getNextPageParam: (lastPage) => lastPage.nextCursor,
})

```
- 👉 Redux would make this painful (you’d have to manage cursors, page numbers, loading states, etc.), but React Query gives it out of the box.

## When to use both Redux + React Query together?

### Many apps combine both:

- Use Redux for UI/client state (selected filters, theme, auth token).

- Use React Query for API/server state (jobs, candidates, chat messages).

- 👉 Example: In your Arya platform,

- Redux → Keep "current filter selection", "logged-in recruiter details".

- React Query → Fetch "shortlisted candidates", "job listings", "payment transactions".

- ✅ Bottom line:

- If you just need server state management → React Query.

- If you need global client state → Redux.

- For modern apps, React Query + small Redux (or Zustand/Context) is the sweet spot.