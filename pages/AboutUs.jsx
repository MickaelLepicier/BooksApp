const { Link, Outlet } = ReactRouterDOM

export function AboutUs() {
  return (
    <section>
      <h1>About Us</h1>

      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
        officia at in ipsam voluptatum debitis sed, distinctio esse, dolorum,
        culpa quae corporis blanditiis provident. Blanditiis aliquam accusamus
        commodi a quis.
      </p>

      <nav>
        <Link to="/about/team">Team</Link> |
        <Link to="/about/vision">Vision</Link>
      </nav>

      <Outlet />
    </section>
  )
}
