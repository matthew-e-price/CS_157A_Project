import {Button, Container, Form, Navbar} from "react-bootstrap"
import {useState} from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    console.log(search)
  }

  return (
    <Navbar sticky={"top"} expand={"lg"} style={{ backgroundColor: "var(--navbar-color)" }}> start
      <Container fluid>
        <Form className="d-flex" onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="Search"
            aria-label="Search"
            style={{ border: "1px solid", borderColor: "var(--border-color)", minWidth: "320px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button type="submit" variant="outline-light" className="searchButton" width="30" height="30" />
        </Form>
      </Container>
    </Navbar>
  );
}

export default SearchBar