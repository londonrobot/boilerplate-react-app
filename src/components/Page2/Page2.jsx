import { Link } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
export const Page2 = () => {
  return (
    <>
      <h1>Page2 Component</h1>
      <div className="">
        here some content
      </div>
      <Link to={'/'}>Account</Link>
    </>
  )
}

