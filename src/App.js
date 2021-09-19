import './App.css';

function App() {
  var isEmpty = false;
  var result;
  if (isEmpty) {
    result = <p><a href="/">BACK TO HOME</a></p>
  }
  else {
    result = <Footer></Footer>
  }
    return (
    <div className="App">
      <Header name="namehere" title="titlehere"></Header>
  <Body></Body>
  if (isEmpty) {
    result = <p><a href="/">BACK TO HOME</a></p>
  }
  else {
    result = <Footer></Footer>
  }
    </div>
  );
}

function Header(props){
  return  <h1>Hello {props.name}! you are here {props.title} !</h1>
}

function Body(){
  return null
}

function Footer() {
  var isLoggined = true
  if (isLoggined) {
    return (
      <p className="footer">
        <ul>
          <li><a href="/logout">Logout</a></li>
          <li><a href="/transform">transform</a></li>
          <li><a href="/profile">profile</a></li>
          <li><a href="/community/page/1?number=10">community</a></li>
        </ul>
      </p>

    )
  } else {
    return (
      <p className="footer">
        <ul>
          <li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>
        </ul>
      </p>
    )
  }

}
export default App;
